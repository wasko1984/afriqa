import type {Plan} from '../lib/plan-schema';
export function PlanView({plan}:{plan:Plan}){return <>
  <section className="card summary"><p className="eyebrow">{plan.domain} perspective</p><p className="possible-label">The core problem</p><h2>{plan.coreProblem}</h2><span className="priority">{plan.priority.level} priority</span><p className="priority-note">{plan.priority.explanation}</p></section>
  <h2 className="section-title">What might be causing it</h2><section className="card"><p className="possible-label">Possible explanations to investigate, based on what you shared.</p><ul className="causes">{plan.possibleCauses.map((cause,i)=><li key={i}>{cause}</li>)}</ul></section>
  <h2 className="section-title">Your next three actions</h2><section className="action-grid" aria-label="Recommended actions">{plan.actions.map((action,i)=><article className="card" key={i}><span className="action-number">0{i+1}</span><h3>{action.title}</h3><p>{action.task}</p><div className="check"><b>Success check</b>{action.successCheck}</div></article>)}</section>
  <h2 className="section-title">Your seven-day action plan</h2><section className="timeline" aria-label="Seven-day plan">{plan.sevenDayPlan.map(day=><article className="card day" key={day.day}><span className="day-label">Day {day.day}</span><div><p>{day.task}</p><small><strong>Check:</strong> {day.successCheck}</small></div></article>)}</section>
  <section className="card success"><h2>How you’ll know you’re making progress</h2><p>{plan.successCheck}</p></section>
  {plan.resources.length>0&&<><h2 className="section-title">Resources to get started</h2><section className="resource-grid">{plan.resources.map((resource,i)=><article className="card" key={i}><h3>{resource.title}</h3><p>{resource.content}</p></article>)}</section></>}
  {plan.assumptions.length>0&&<details className="assumptions" open><summary>Missing context and assumptions</summary><ul>{plan.assumptions.map((assumption,i)=><li key={i}>{assumption}</li>)}</ul></details>}
  <p className="privacy">Use this plan as a starting point. Check suggestions against your situation; outcomes are not guaranteed.</p>
  </>;}
