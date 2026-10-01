'use client';
import Link from 'next/link';
import {usePlan} from '../../components/plan-provider';
import {PlanView} from '../../components/plan-view';
import {SiteShell} from '../../components/site-shell';
export default function Results(){const {active}=usePlan();return <SiteShell>{active?<main className="results"><div className="result-heading"><div><p className="eyebrow">From problem to possibility</p><h1>Your next steps, made clear.</h1></div><Link href="/" className="back-link">← Describe another problem</Link></div><PlanView plan={active.plan}/></main>:<main className="empty-result"><p className="eyebrow">Start with your situation</p><h1>Your plan begins with a problem.</h1><p>There’s no active plan in this tab. Describe your situation to generate one. Refreshing this page clears your current plan.</p><Link href="/" className="primary">Describe your problem</Link></main>}</SiteShell>;}
