import {describe,it,expect,vi,beforeEach} from 'vitest';
vi.mock('../lib/gemini',()=>({generatePlan:vi.fn()}));
import { generatePlan } from '../lib/gemini';
import { POST } from '../app/api/plan/route';
import { samplePlan } from './fixtures';
const request=(body:unknown)=>new Request('http://localhost/api/plan',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
describe('plan API boundary',()=>{
  beforeEach(()=>vi.resetAllMocks());
  it('rejects malformed JSON without calling the provider',async()=>{
    const response=await POST(new Request('http://localhost/api/plan',{method:'POST',body:'{'}));
    expect(response.status).toBe(400);expect(generatePlan).not.toHaveBeenCalled();
  });
  it('rejects oversized input without calling the provider',async()=>{
    expect((await POST(request({problem:'x'.repeat(3001)}))).status).toBe(400);
    expect(generatePlan).not.toHaveBeenCalled();
  });
  it.each(['AbortError','TimeoutError','APIConnectionTimeoutError'])('maps %s to a recoverable timeout',async(name)=>{
    vi.mocked(generatePlan).mockRejectedValue(Object.assign(new Error('private detail'),{name}));
    const response=await POST(request({problem:'Sales are falling'}));
    expect(response.status).toBe(504);expect((await response.json()).error.code).toBe('TIMEOUT');
  });
  it('explains missing configuration safely',async()=>{
    vi.mocked(generatePlan).mockRejectedValue(Object.assign(new Error('private detail'),{code:'MISSING_KEY'}));
    const response=await POST(request({problem:'Sales are falling'}));
    expect(response.status).toBe(503);expect((await response.json()).error.code).toBe('CONFIGURATION');
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });
  it('rejects empty input before generation',async()=>{expect((await POST(request({problem:' '}))).status).toBe(400);});
  it('returns a complete validated plan',async()=>{vi.mocked(generatePlan).mockResolvedValue(samplePlan() as never);const response=await POST(request({problem:'Losing customers'}));expect(response.status).toBe(200);expect((await response.json()).plan.actions).toHaveLength(3);});
  it('rejects incomplete output instead of reporting success',async()=>{vi.mocked(generatePlan).mockResolvedValue({coreProblem:'Missing details'} as never);expect((await POST(request({problem:'Losing customers'}))).status).toBe(502);});
  it('returns a recoverable quota error without raw secrets',async()=>{vi.mocked(generatePlan).mockRejectedValue(Object.assign(new Error('secret-provider-detail'),{status:429}));const response=await POST(request({problem:'Losing customers'}));expect(response.status).toBe(429);expect(await response.text()).not.toContain('secret-provider-detail');});
});
