import 'server-only';
import {GoogleGenAI} from '@google/genai';
import {planJsonSchema,planSchema} from './plan-schema';
import {buildPrompt} from './plan-prompt';
export async function generatePlan(problem:string){
  const apiKey=process.env.GEMINI_API_KEY;
  if(!apiKey)throw Object.assign(new Error('Missing AI configuration'),{code:'MISSING_KEY'});
  const client=new GoogleGenAI({apiKey});
  const response=await client.interactions.create({
    model:process.env.GEMINI_MODEL||'gemini-3.1-flash-lite',
    input:buildPrompt(problem),store:false,
    response_format:{type:'text',mime_type:'application/json',schema:planJsonSchema},
  },{timeout:45000,maxRetries:0,signal:AbortSignal.timeout(45000)});
  if(response.status!=='completed'||!response.output_text)throw new Error('Incomplete AI response');
  return planSchema.parse(JSON.parse(response.output_text));
}
