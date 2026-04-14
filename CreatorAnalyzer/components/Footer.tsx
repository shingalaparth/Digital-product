"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const columns = [
 {
 title:"Product",
 links: [
 { label:"Features", href:"/#features"},
 { label:"Pricing", href:"/pricing"},
 { label:"Platforms", href:"/platforms/instagram-analytics"},
 { label:"What's New", href:"/#"},
 ],
 },
 {
 title:"Solutions",
 links: [
 { label:"For D2C Brands", href:"/solutions/d2c-brands"},
 { label:"For Social Media Managers", href:"/solutions/social-media-managers"},
 { label:"For Marketing Agencies", href:"/solutions/marketing-agencies"},
 { label:"For Content Creators", href:"/solutions/content-creators"},
 { label:"For Video Editors", href:"/solutions/video-editors"},
 { label:"For Coaches", href:"/#"},
 ],
 },
 {
 title:"Resources",
 links: [
 { label:"Blog", href:"/blog"},
 { label:"Case Studies", href:"/resources/case-studies"},
 { label:"Free Tools", href:"/resources/free-tools"},
 { label:"Help Center", href:"/resources/help-center"},
 { label:"Competitor Analysis Guide", href:"/blog/competitor-analysis"},
 { label:"Content Strategy Guide", href:"/blog/social-media-strategy"},
 { label:"Industry Guides", href:"/blog/industry-guides"},
 ],
 },
 {
 title:"Compare",
 links: [
 { label:"vs Socialinsider", href:"/compare/vs-socialinsider"},
 { label:"vs Sprout Social", href:"/compare/vs-sprout-social"},
 { label:"vs Not Just Analytics", href:"/compare/vs-not-just-analytics"},
 ],
 },
 {
 title:"Company",
 links: [
 { label:"About", href:"/about"},
 { label:"Contact", href:"/contact"},
 { label:"Privacy Policy", href:"/#"},
 { label:"Terms of Service", href:"/#"},
 ],
 },
];

export function Footer() {
 const year = new Date().getFullYear();
 const pathname = usePathname();

 const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
 if (pathname ==="/"&& href.startsWith("/#")) {
 const id = href.split("#")[1];
 const element = document.getElementById(id);
 if (element) {
 e.preventDefault();
 element.scrollIntoView({ behavior:"smooth"});
 } else if (id ==="") {
 e.preventDefault();
 window.scrollTo({ top: 0, behavior:"smooth"});
 }
 } else if (pathname ==="/"&& href ==="/") {
 e.preventDefault();
 window.scrollTo({ top: 0, behavior:"smooth"});
 }
 };

 return (
 <footer className="relative bg-bg pt-16 pb-10 text-headline">
 {/* Inverted corner overlays */}
 <div className="pointer-events-none absolute left-0 top-0 flex h-12 w-full justify-between">
 <div
 className="h-12 w-12"
 style={{
 backgroundImage:
"radial-gradient(circle at 0 100%, transparent 48px, var(--bg) 48px)",
 }}
 />
 <div
 className="h-12 w-12"
 style={{
 backgroundImage:
"radial-gradient(circle at 100% 100%, transparent 48px, var(--bg) 48px)",
 }}
 />
 </div>

 <div className="section-shell">
 <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-7">
 {/* Brand column */}
 <div className="lg:col-span-2">
 <Link
 href="/"
 onClick={(e) => handleLinkClick(e,"/")}
 className="mb-6 flex items-center gap-2 text-2xl font-bold tracking-tight text-headline"
 >
 <span>
 Reel<span className="text-primary">DNA</span>
 </span>
 </Link>
 <p className="max-w-xs text-sm leading-relaxed text-muted">
 AI-powered competitor intelligence for social media. Stop guessing what to
 post&nbsp;— let data tell you exactly what works.
 </p>
 </div>

 {/* Link columns */}
 {columns.map((col) => (
 <div key={col.title}>
 <h4 className="mb-6 text-xs font-black uppercase tracking-widest text-muted">
 {col.title}
 </h4>
 <ul className="space-y-4 text-sm font-medium text-body">
 {col.links.map((link) => (
 <li key={link.label}>
 <Link
 href={link.href}
 onClick={(e) => handleLinkClick(e, link.href)}
 className="transition-colors hover:text-primary"
 >
 {link.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>

 {/* Bottom bar */}
 <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs font-medium text-muted md:flex-row">
 <p>© {year} ReelDNA. Built in India 🇮🇳 with AI for modern creators.</p>
 </div>
 </div>
 </footer>
 );
}
