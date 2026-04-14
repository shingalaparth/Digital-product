import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Clock, Users, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";

export const metadata: Metadata = {
 title:"Social Media Competitor Analysis Case Studies | ReelDNA",
 description:
"See how D2C brands, agencies, and creators use ReelDNA to analyze competitors and boost engagement. Real results, real metrics, real growth.",
};

const caseStudies = [
 {
 id:"diorin",
 title:"Diorin — India's D2C Jewelry Brand",
 subtitle:"How a founder saved 40+ hours monthly and grew engagement by 134%",
 author:"Mehul Kalathiya",
 role:"Founder, Diorin",
 metrics: [
 { label:"Engagement Increase", value:"+134%", icon: <TrendingUp className="h-5 w-5"/> },
 { label:"Time Saved", value:"41 hrs/mo", icon: <Clock className="h-5 w-5"/> },
 { label:"Revenue Impact", value:"+34%", icon: <ArrowUpRight className="h-5 w-5"/> },
 ],
 challenge:"Mehul spent 3-4 hours weekly manually tracking 8+ competitors across Instagram, TikTok, and YouTube. He couldn't scale without hiring a full-time analyst.",
 solution:"Implemented ReelDNA to auto-track 12 competitors with daily updates, trending hook alerts via WhatsApp, and automated content performance summaries.",
 results: [
"Before: 4.2% engagement → After: 9.8% engagement",
"Before: 2 viral Reels/mo → After: 5 viral Reels/mo",
"Manual time reduced from 45 hours to 4 hours per month",
"34% increase in Instagram-driven revenue over 6 months",
 ],
 tags: ["D2C","Jewelry","India"],
 },
 {
 id:"priya-smm",
 title:"Priya — Freelance Social Media Manager",
 subtitle:"From intuition-based strategy to data-driven credibility (+60% retainer growth)",
 author:"Priya",
 role:"Freelance SMM",
 metrics: [
 { label:"Client Retention", value:"94%", icon: <Users className="h-5 w-5"/> },
 { label:"Retainer Growth", value:"+60%", icon: <TrendingUp className="h-5 w-5"/> },
 { label:"Avg Engagement", value:"+47%", icon: <TrendingUp className="h-5 w-5"/> },
 ],
 challenge:"Managing 6 mid-sized brands, Priya struggled to justify content recommendations with data and delivering consistent results without a baseline.",
 solution:"Used ReelDNA to build custom competitive intelligence briefing reports for each client, showing content gaps and trending hook frameworks.",
 results: [
"Retainer raised from ₹15k to ₹24k per month per client",
"Proposal conversion rate jumped from 35% to 68%",
"Client retention improved from 60% to 94% year-over-year",
"30% time savings on monthly strategy development",
 ],
 tags: ["Freelance","Agency","SMM"],
 },
 {
 id:"navi-agency",
 title:"NaviAgency — Performance Marketing",
 subtitle:"Reducing strategic turnaround time from 14 days to 72 hours",
 author:"NaviAgency Team",
 role:"Creative Strategy Unit",
 metrics: [
 { label:"Turnaround Time", value:"-78%", icon: <Clock className="h-5 w-5"/> },
 { label:"NPS Score", value:"71", icon: <Users className="h-5 w-5"/> },
 { label:"Organic Impact", value:"+23%", icon: <TrendingUp className="h-5 w-5"/> },
 ],
 challenge:"Understanding organic competitors for 25+ DTC clients was too slow. Creative direction decisions took 2 weeks per competitor.",
 solution:"Integrated ReelDNA alerts into Slack. The team now identifies trending hooks 48h before they peak, enabling 40% more campaign concepts monthly.",
 results: [
"Time to strategic recommendation reduced from 14 to 3 days",
"Creative throughput increased by 40% monthly",
"Won 8 new clients specifically mentioning 'competitor intelligence' capability",
"₹8.5L in new retainers added within 3 months",
 ],
 tags: ["Marketing Agency","High Performance"],
 },
];

export default function CaseStudiesPage() {
 return (
 <div className="relative overflow-x-hidden  text-body">
 <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]"/>

 {/* Hero */}
 <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-20">
 <div className="hero-section absolute inset-0 opacity-60"/>
 <div className="relative z-10 px-4">
 <Breadcrumbs items={[{ label:"Resources", href:"#"}, { label:"Case Studies", href:"/resources/case-studies"}]} />
 </div>
 <div className="section-shell relative z-10 mt-8 text-center sm:mt-12">
 <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
 Real Metrics, Real Growth Stories
 </h1>
 <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-body sm:text-lg">
 See how brands, agencies, and creators are using ReelDNA to stay ahead of the competition and grow their social media presence.
 </p>
 </div>
 </section>

 {/* Case Studies Grid */}
 <section className="py-16 sm:py-24">
 <div className="section-shell space-y-20">
 {caseStudies.map((study, idx) => (
 <div key={study.id} className={`flex flex-col gap-10 lg:flex-row ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
 {/* Content Side */}
 <div className="flex-1 space-y-6">
 <div className="flex flex-wrap gap-2">
 {study.tags.map(tag => (
 <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
 {tag}
 </span>
 ))}
 </div>
 <h2 className="text-2xl font-bold text-headline sm:text-3xl lg:text-4xl">
 {study.title}
 </h2>
 <p className="text-lg font-medium text-primary">
 {study.subtitle}
 </p>
 <div className="space-y-4 text-sm leading-relaxed text-body sm:text-base">
 <div className="rounded-xl border-l-4 border-primary bg-surface p-4 italic">
 <p>&ldquo;{study.challenge}&rdquo;</p>
 </div>
 <div>
 <h3 className="font-bold text-headline">The Solution:</h3>
 <p className="text-muted">{study.solution}</p>
 </div>
 <div>
 <h3 className="font-bold text-headline">Key Results:</h3>
 <ul className="mt-2 grid gap-2 sm:grid-cols-2">
 {study.results.map(r => (
 <li key={r} className="flex items-center gap-2 text-sm">
 <TrendingUp className="h-4 w-4 text-primary"/>
 {r}
 </li>
 ))}
 </ul>
 </div>
 </div>
 <div className="flex items-center gap-4 pt-4">
 <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center font-bold text-primary">
 {study.author[0]}
 </div>
 <div>
 <p className="text-sm font-bold text-headline">{study.author}</p>
 <p className="text-xs text-muted">{study.role}</p>
 </div>
 </div>
 </div>

 {/* Metrics Side */}
 <div className="flex-shrink-0 lg:w-[400px]">
 <div className="rounded-3xl border border-border bg-card p-8">
 <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted mb-8">Metrics Snapshot</h3>
 <div className="space-y-6">
 {study.metrics.map(m => (
 <div key={m.label} className="flex items-center gap-4">
 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
 {m.icon}
 </div>
 <div>
 <p className="text-xs font-semibold uppercase tracking-wider text-muted">{m.label}</p>
 <p className="text-2xl font-bold text-headline">{m.value}</p>
 </div>
 </div>
 ))}
 </div>
 <div className="mt-10">
 <Link
 href="/pricing"
 className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-bg transition hover:bg-primary-dark"
 >
 Achieve Similar Results <ArrowRight className="h-4 w-4"/>
 </Link>
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* CTA */}
 <section className="relative overflow-hidden py-16 sm:py-24">
 <div className="hero-section absolute inset-0 opacity-40"/>
 <div className="section-shell relative z-10">
 <div className="rounded-3xl border border-primary/30 bg-card p-5 text-center sm:p-10">
 <h2 className="text-3xl font-bold text-headline sm:text-4xl">
 Ready to Write Your Success Story?
 </h2>
 <p className="mx-auto mt-3 max-w-xl text-base text-body">
 Join 500+ brands and creators who use ReelDNA to automate their competitor intelligence.
 </p>
 <div className="mt-6 flex justify-center">
 <Link
 href="/pricing"
 className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-bold text-bg transition hover:bg-primary-dark"
 >
 Start Free 7-Day Trial <ArrowRight className="h-4 w-4"/>
 </Link>
 </div>
 <p className="mt-3 text-sm text-muted">
 14-day free trial · 30-day money-back guarantee · Cancel anytime
 </p>
 </div>
 </div>
 </section>
 </div>
 );
}
