import { z } from 'zod';
const text = z.string().trim().min(1).max(4000);
const basePlanSchema = z.object({
  coreProblem: text,
  possibleCauses: z.array(text).min(1).max(5),
  priority: z.object({level:z.enum(['Low','Medium','High']),explanation:text}),
  actions: z.array(z.object({title:text,task:text,successCheck:text})).length(3),
  sevenDayPlan: z.array(z.object({day:z.number().int().min(1).max(7),task:text,successCheck:text})).length(7),
  successCheck:text,
  assumptions:z.array(text).max(8),
  resources:z.array(z.object({title:text,content:text})).max(3),
});
export const planSchema = basePlanSchema.refine(p=>p.sevenDayPlan.every((d,i)=>d.day===i+1),{message:'The plan must cover Days 1–7 in order.'});
export const planJsonSchema = z.toJSONSchema(basePlanSchema);
export type Plan = z.infer<typeof planSchema>;
export const problemSchema = z.object({problem:z.string().trim().min(1,'Enter a problem to get started.').max(3000,'Keep your problem under 3,000 characters.')});
