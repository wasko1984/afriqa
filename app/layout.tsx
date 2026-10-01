import type { Metadata } from 'next';
import { PlanProvider } from '../components/plan-provider';
import './globals.css';
export const metadata: Metadata = {title:'AFRIQA — Your next move, made clear',description:'Turn your everyday problem into three practical actions and a seven-day plan.'};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><PlanProvider>{children}</PlanProvider></body></html>;
}
