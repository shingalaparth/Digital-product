import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export const metadata: Metadata = {
 title:"Blog – Social Media Guides & Strategy | labhook",
 description:
"In-depth guides on competitor analysis, social media strategy, and industry-specific marketing. Data-driven frameworks for D2C brands, agencies, and creators.",
};

const categories = [
 {
 title:"Competitor Analysis",
 description:
"Master the art of analyzing competitors on social media. Step-by-step framework, tools comparison, common mistakes, and how to turn insights into growth.",
 href:"/blog/competitor-analysis",
 readTime:"15 min read",
 badge:"Framework",
 },
 {
 title:"Social Media Content Strategy",
 description:
"Build a winning content strategy with audience research, content pillars, hook formulas, posting optimization, and data-driven iteration.",
 href:"/blog/social-media-strategy",
 readTime:"18 min read",
 badge:"Guide",
 },
 {
 title:"Industry-Specific Strategies",
 description:
"Niche-specific strategies for D2C brands, restaurants, wedding photography, online coaching, and real estate — with real benchmarks and compliance tips.",
 href:"/blog/industry-guides",
 readTime:"20 min read",
 badge:"Deep Dive",
 },
];

export default function BlogIndexPage() {
 return (
 <div className="relative overflow-x-hidden  text-body">
 <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]"/>

 {/* Hero */}
 <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-20">
 <div className="hero-section absolute inset-0 opacity-60"/>
 <div className="relative z-10 px-4">
 <Breadcrumbs items={[{ label:"Blog", href:"/blog"}]} />
 </div>
 <div className="section-shell relative z-10 mt-8 text-center sm:mt-12">
 <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90 sm:text-xs">
 labhook BLOG
 </p>
 <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
 Guides, Frameworks & Strategies for Social Media Growth
 </h1>
 <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-body sm:text-lg">
 Data-driven, research-backed guides used by D2C brands, agencies, and creators to grow faster on Instagram and beyond.
 </p>
 </div>
 </section>

 {/* Articles Grid */}
 <section className="py-16 sm:py-24">
 <div className="section-shell">
 <div className="grid gap-6 md:grid-cols-3">
 {categories.map((cat) => (
 <Link
 key={cat.href}
 href={cat.href}
 className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft sm:p-8"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
 <div className="relative z-10">
 <div className="flex items-center gap-2">
 <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
 {cat.badge}
 </span>
 <span className="text-[10px] font-semibold text-muted">{cat.readTime}</span>
 </div>
 <h2 className="mt-4 text-xl font-bold text-headline transition-colors group-hover:text-primary sm:text-2xl">
 {cat.title}
 </h2>
 <p className="mt-3 text-sm leading-relaxed text-muted">
 {cat.description}
 </p>
 <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
 Read Full Guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"/>
 </span>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="relative overflow-hidden py-16 sm:py-24">
 <div className="hero-section absolute inset-0 opacity-40"/>
 <div className="section-shell relative z-10">
 <div className="rounded-3xl border border-primary/30 bg-card p-5 text-center sm:p-10">
 <h2 className="text-3xl font-bold text-headline sm:text-4xl">
 Stop Guessing. Start Growing.
 </h2>
 <p className="mx-auto mt-3 max-w-xl text-base text-body">
 labhook turns competitive intelligence into actionable growth strategy — automatically.
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
 7-day free trial · 30-day money-back guarantee · Cancel anytime
 </p>
 </div>
 </div>
 </section>
 </div>
 );
}
