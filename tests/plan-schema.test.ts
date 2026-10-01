import { describe, expect, it } from 'vitest';
import { planSchema } from '../lib/plan-schema';
import { samplePlan } from './fixtures';
describe('complete decision plans', () => {
  it('accepts a complete structured plan', () => expect(planSchema.safeParse(samplePlan()).success).toBe(true));
  it('rejects a missing core problem', () => expect(planSchema.safeParse({...samplePlan(), coreProblem: undefined}).success).toBe(false));
  it('rejects blank required content', () => expect(planSchema.safeParse({...samplePlan(), coreProblem: '   '}).success).toBe(false));
  it('rejects fewer than three actions', () => { const p=samplePlan(); p.actions.pop(); expect(planSchema.safeParse(p).success).toBe(false); });
  it('rejects a missing day', () => { const p=samplePlan(); p.sevenDayPlan.pop(); expect(planSchema.safeParse(p).success).toBe(false); });
  it('rejects duplicated days', () => { const p=samplePlan(); p.sevenDayPlan[1].day=1; expect(planSchema.safeParse(p).success).toBe(false); });
  it('rejects invalid priority', () => expect(planSchema.safeParse({...samplePlan(), priority: {level:'Urgent', explanation:'Now'}}).success).toBe(false));
});
