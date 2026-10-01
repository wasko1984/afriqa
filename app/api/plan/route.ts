import {generatePlan} from '../../../lib/gemini';
import {problemSchema,planSchema} from '../../../lib/plan-schema';
import {ZodError} from 'zod';
export const runtime='nodejs';
export const maxDuration=60;
function failure(status:number,code:string,message:string){return Response.json({error:{code,message}},{status,headers:{'Cache-Control':'no-store'}});}
export async function POST(request:Request){
  let body:unknown;
  try {body=await request.json();}catch{return failure(400,'INVALID_INPUT','Enter a valid problem to get started.');}
  const input=problemSchema.safeParse(body);
  if(!input.success)return failure(400,'INVALID_INPUT',input.error.issues[0].message);
  try {
    const plan=planSchema.parse(await generatePlan(input.data.problem));
    return Response.json({plan},{headers:{'Cache-Control':'no-store'}});
  }catch(error){
    const detail=error as {status?:number;name?:string;code?:string};
    console.error('AFRIQA_GENERATION_FAILURE',{
      kind:error instanceof ZodError?'INVALID_PLAN':error instanceof SyntaxError?'INVALID_JSON':detail.code==='MISSING_KEY'?'CONFIGURATION':detail.name==='AbortError'||detail.name==='TimeoutError'||detail.name==='APIConnectionTimeoutError'?'TIMEOUT':detail.name==='APIConnectionError'?'CONNECTION':'PROVIDER_OR_INCOMPLETE',
      providerStatus:typeof detail.status==='number'?detail.status:undefined,
      invalidFields:error instanceof ZodError?error.issues.map(issue=>String(issue.path[0]||'plan')):undefined,
    });
    if(detail.code==='MISSING_KEY')return failure(503,'CONFIGURATION','AI generation is not configured yet. Please contact the demo owner.');
    if(detail.status===429)return failure(429,'QUOTA','The free AI service is busy or its quota has been reached. Wait a little, then retry.');
    if(detail.name==='AbortError'||detail.name==='TimeoutError'||detail.name==='APIConnectionTimeoutError')return failure(504,'TIMEOUT','The AI took too long. Please retry.');
    return failure(502,'GENERATION','Unable to generate a complete plan. Please retry.');
  }
}
