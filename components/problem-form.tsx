'use client';
import {useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import {planSchema,problemSchema} from '../lib/plan-schema';
import {usePlan} from './plan-provider';
export function ProblemForm(){
  const router=useRouter();const {setActive}=usePlan();
  const [problem,setProblem]=useState('');const [loading,setLoading]=useState(false);const [error,setError]=useState('');const [lastProblem,setLastProblem]=useState<string|null>(null);
  const busy=useRef(false);
  async function generate(text:string){
    if(busy.current)return;
    const input=problemSchema.safeParse({problem:text});
    if(!input.success){setError(input.error.issues[0].message);setLastProblem(null);return;}
    busy.current=true;setLoading(true);setError('');setLastProblem(input.data.problem);setActive(null);
    try {
      const response=await fetch('/api/plan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(input.data),signal:AbortSignal.timeout(55000)});
      const payload=await response.json();
      if(!response.ok)throw new Error(typeof payload.error?.message==='string'?payload.error.message:'Unable to generate a plan. Please retry.');
      const parsed=planSchema.safeParse(payload.plan);
      if(!parsed.success)throw new Error('The response was incomplete. Please retry.');
      setActive({plan:parsed.data,problem:input.data.problem});router.push('/results');
    }catch(caught){
      const failure=caught as Error;
      setError(failure.name==='TimeoutError'||failure.name==='AbortError'?'The AI took too long. Please retry.':failure instanceof TypeError?'Unable to connect. Check your internet and retry.':failure.message||'Unable to generate a plan. Please retry.');
    }finally{busy.current=false;setLoading(false);}
  }
  return <section className="form-card" aria-labelledby="form-heading"><h2 id="form-heading">Let’s work through it.</h2><p className="form-note">One problem. A clear direction. A plan you can act on.</p><form onSubmit={event=>{event.preventDefault();void generate(problem);}} noValidate><label htmlFor="problem">What problem are you facing?</label><textarea id="problem" value={problem} onChange={event=>setProblem(event.target.value)} placeholder="My small food business is losing customers. I have a limited budget and need to know what to do first…" aria-describedby="problem-help problem-count" aria-invalid={Boolean(error)} disabled={loading}/><div className="field-meta"><span id="problem-help">Include your context, resources, and constraints.</span><span id="problem-count">{problem.length.toLocaleString()} / 3,000</span></div><button type="submit" className="primary full" disabled={loading}>{loading?<><span className="spinner" aria-hidden="true"/>Analyzing your problem…</>:<>Submit <span aria-hidden="true">↗</span></>}</button></form>{loading&&<p className="status" role="status">Turning your situation into practical next steps. This may take a moment.</p>}{error&&<div className="error" role="alert"><div>{error}</div>{lastProblem&&!loading&&<button className="retry" onClick={()=>void generate(lastProblem)}>Retry</button>}</div>}<p className="privacy">Your problem is sent to Google’s AI service. Omit sensitive details. This demo uses the free tier; content may be used to improve Google’s products.</p></section>;
}
