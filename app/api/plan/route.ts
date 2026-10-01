import {generatePlan} from '../../../lib/gemini';
import {problemSchema,planSchema} from '../../../lib/plan-schema';
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
    if(detail.code==='MISSING_KEY')return failure(503,'CONFIGURATION','AI generation is not configured yet. Please contact the demo owner.');
    if(detail.status===429)return failure(429,'QUOTA','The free AI service is busy or its quota has been reached. Wait a little, then retry.');
    if(detail.name==='AbortError'||detail.name==='TimeoutError'||detail.name==='APIConnectionTimeoutError')return failure(504,'TIMEOUT','The AI took too long. Please retry.');
    return failure(502,'GENERATION','Unable to generate a complete plan. Please retry.');
  }
}
