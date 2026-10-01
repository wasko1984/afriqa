'use client';
import { createContext, useContext, useState } from 'react';
import type { Plan } from '../lib/plan-schema';
type ActivePlan = {plan:Plan;problem:string};
const Context = createContext<{active:ActivePlan|null;setActive:(value:ActivePlan|null)=>void}|null>(null);
export function PlanProvider({children}:{children:React.ReactNode}) {
  const [active,setActive]=useState<ActivePlan|null>(null);
  return <Context.Provider value={{active,setActive}}>{children}</Context.Provider>;
}
export function usePlan(){const value=useContext(Context);if(!value)throw new Error('Plan provider is missing.');return value;}
