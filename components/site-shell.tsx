import Link from 'next/link';
export function SiteShell({children}:{children:React.ReactNode}){
  return <div className="shell"><header className="navigation"><Link href="/" className="brand"><span className="brand-mark" aria-hidden="true">A</span>AFRIQA</Link><span className="nav-note">Clarity for your next move</span></header>{children}<footer className="footer"><span>AFRIQA · Practical decisions. Real next steps.</span><span>Built for everyday challenges.</span></footer></div>;
}
