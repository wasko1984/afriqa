import {describe,it,expect,vi} from 'vitest';
vi.mock('../lib/gemini',()=>({generatePlan:vi.fn()}));
import { generatePlan } from '../lib/gemini';
import { POST } from '../app/api/plan/route';
import { samplePlan } from './fixtures';
const request=(body:unknown)=>new Request('http://localhost/api/plan',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
describe('plan API boundary',()=>{
  it('rejects empty input before generation',async()=>{expect((await POST(request({problem:' '}))).status).toBe(400);});
  it('returns a complete validated plan',async()=>{vi.mocked(generatePlan).mockResolvedValue(samplePlan() as never);const response=await POST(request({problem:'Losing customers'}));expect(response.status).toBe(200);expect((await response.json()).plan.actions).toHaveLength(3);});
  it('rejects incomplete output instead of reporting success',async()=>{vi.mocked(generatePlan).mockResolvedValue({coreProblem:'Missing details'} as never);expect((await POST(request({problem:'Losing customers'}))).status).toBe(502);});
  it('returns a recoverable quota error without raw secrets',async()=>{vi.mocked(generatePlan).mockRejectedValue(Object.assign(new Error('secret-provider-detail'),{status:429}));const response=await POST(request({problem:'Losing customers'}));expect(response.status).toBe(429);expect(await response.text()).not.toContain('secret-provider-detail');});
});
