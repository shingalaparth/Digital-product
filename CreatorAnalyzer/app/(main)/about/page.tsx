"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Heart, Sparkles, Users, Zap, ShieldCheck, MessageSquare } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

const stats = [
 { value:"15,000+", label:"Active Users Across India"},
 { value:"2,500,000+", label:"Reels Analyzed by AI"},
 { value:"₹5.5 Cr+", label:"Client Revenue Driven"},
 { value:"4.2s", label:"Avg. Snapshot Time"},
];

const values = [
 { 
 icon: Target, 
 title:"Built, Not Borrowed", 
 description:"We solve problems we've experienced firsthand. We don't build features because competitors have them — we build what Indian entrepreneurs actually need."
 },
 { 
 icon: Heart, 
 title:"Accessibility First", 
 description:"Cheap doesn't mean low-quality. We democratize enterprise-grade AI for solo founders and lean teams."
 },
 { 
 icon: Sparkles, 
 title:"Radical Transparency", 
 description:"We never hide metrics or roadmap gaps. Your feedback directly shapes our engine."
 },
 { 
 icon: Users, 
 title:"Community Growth", 
 description:"We celebrate our customers' wins as our own. When your engagement grows, ReelDNA wins."
 },
];

const differentiators = [
 {
 title:"Built by a D2C Founder",
 description:"Mehul built this to solve his own analysis fatigue at Diorin. Every feature is battle-tested in a real e-commerce environment.",
 icon: Zap
 },
 {
 title:"India-First Infrastructure",
 description:"INR pricing, WhatsApp reporting, and AI trained on Indian niche data. Not just a US tool translated for India.",
 icon: ShieldCheck
 },
 {
 title:"Obsessed with Speed",
 description:"Forget 6-week consulting. Get insights in 4 seconds. We value your time as much as you do.",
 icon: MessageSquare
 }
];

export default function AboutPage() {
 const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.1 }
 }
 };

 const itemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0 }
 };

 return (
 <div className="relative overflow-x-hidden  text-body">
 <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]"/>

 {/* Hero Section */}
 <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-24">
 <div className="hero-section absolute inset-0 opacity-60"/>
 <div className="relative z-10 px-4">
 <Breadcrumbs items={[{ label:"About", href:"/about"}]} />
 </div>
 <div className="section-shell relative z-10 mt-8 text-center sm:mt-16">
 <motion.p 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90 sm:text-xs"
 >
 OUR MISSION
 </motion.p>
 <motion.h1 
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-5xl lg:text-7xl"
 >
 Built by Founders, <br className="hidden sm:block"/> For <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Builders</span>.
 </motion.h1>
 <motion.p 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-body sm:text-xl"
 >
 ReelDNA is independent social media intelligence platform designed to put enterprise-grade AI in the pockets of every Indian entrepreneur.
 </motion.p>
 </div>
 </section>

 {/* Stats Bar */}
 <section className="relative z-10 -mt-10 mb-16 sm:mb-24">
 <div className="section-shell">
 <motion.div 
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
 >
 {stats.map((s) => (
 <motion.div
 key={s.label}
 variants={itemVariants}
 className="rounded-3xl border border-border bg-card/80 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/40 sm:p-8"
 >
 <p className="text-3xl font-black italic tracking-tighter text-headline sm:text-4xl lg:text-5xl">
 {s.value}
 </p>
 <p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted">{s.label}</p>
 </motion.div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* Differentiation */}
 <section className="py-16 sm:py-16">
 <div className="section-shell">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold text-headline sm:text-5xl italic tracking-tighter">Why ReelDNA Is Different</h2>
 </div>
 <div className="grid gap-6 md:grid-cols-3">
 {differentiators.map((d) => {
 const Icon = d.icon;
 return (
 <div key={d.title} className="group relative rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50">
 <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-6 group-hover:bg-primary group-hover:text-bg transition-all">
 <Icon className="h-6 w-6"/>
 </div>
 <h3 className="text-xl font-bold text-headline mb-3">{d.title}</h3>
 <p className="text-sm text-muted leading-relaxed">{d.description}</p>
 </div>
 )
 })}
 </div>
 </div>
 </section>

 {/* Roadmap Timeline */}
 <section className="py-16 sm:py-24 border-t border-border bg-surface/20">
 <div className="section-shell">
 <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
 <div className="lg:w-1/3">
 <h2 className="text-3xl font-bold text-headline sm:text-4xl">What We&apos;re Building</h2>
 <p className="mt-4 text-body">Our commitment to the Indian ecosystem means we never stop evolving. Here is where we are going.</p>
 </div>
 <div className="lg:w-2/3 space-y-6">
 {[
 { phase:"Ongoing (2025)", title:"Deep-Dive Content AI", d:"Automated hook, format, and CTA extraction across all niches.", status:"Current"},
 { phase:"Next 6 Months", title:"Omnichannel Intelligence", d:"Expanding to YouTube Shorts, LinkedIn Video, and TikTok analysis.", status:"Pending"},
 { phase:"Future (2026+)", title:"Competitor Revenue Engine", d:"Using AI to estimate competitor ad-spend and revenue impact.", status:"Future"}
 ].map((step, i) => (
 <div key={i} className={classNames(
"relative rounded-3xl border p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start transition-all",
 i === 0 ? "border-primary/40 bg-card":"border-border bg-card/40"
 )}>
 <div className="flex-shrink-0">
 <span className={classNames(
"inline-flex rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest",
 i === 0 ? "bg-primary text-bg":"bg-muted/20 text-muted"
 )}>
 {step.phase}
 </span>
 </div>
 <div>
 <h4 className="text-xl font-bold text-headline mb-2">{step.title}</h4>
 <p className="text-sm text-muted">{step.d}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* Values Grid */}
 <section className="py-16 sm:py-24">
 <div className="section-shell">
 <div className="text-center mb-16">
 <h2 className="text-2xl font-bold text-headline sm:text-4xl">Our Values</h2>
 </div>
 <div className="grid gap-6 sm:grid-cols-2">
 {values.map((v) => {
 const Icon = v.icon;
 return (
 <div key={v.title} className="flex gap-6 items-start p-6 rounded-3xl border border-border bg-card/50">
 <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
 <Icon className="h-5 w-5"/>
 </div>
 <div>
 <h3 className="font-bold text-headline mb-2">{v.title}</h3>
 <p className="text-sm text-muted leading-relaxed">{v.description}</p>
 </div>
 </div>
 )
 })}
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="relative overflow-hidden py-16 sm:py-24">
 <div className="hero-section absolute inset-0 opacity-40"/>
 <div className="section-shell relative z-10 text-center">
 <div className="rounded-3xl border border-primary/30 bg-card p-10 sm:p-20">
 <h2 className="text-3xl font-bold text-headline sm:text-6xl italic tracking-tighter">Join the India-First <br/> Data Revolution</h2>
 <p className="mx-auto mt-6 max-w-xl text-lg text-body">
 Get actionable intelligence in 4 seconds. No credit card required to start.
 </p>
 <div className="mt-10 flex flex-wrap justify-center gap-4">
 <Link
 href="/pricing"
 className="inline-flex items-center gap-2 rounded-2xl bg-primary px-10 py-5 text-lg font-bold text-bg transition hover:bg-primary-dark"
 >
 Start Free Trial <ArrowRight className="h-5 w-5"/>
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* India Presence Signature */}
 <section className="pb-16 pt-8 contrast-low opacity-60">
 <div className="section-shell text-center">
 <p className="text-[10px] uppercase tracking-[0.3em] font-black text-muted">A Proudly Indian Product</p>
 <div className="mt-4 flex justify-center gap-6 saturate-0 grayscale opacity-80">
 <span className="text-sm font-bold tracking-tighter italic">Mumbai</span>
 <span className="text-sm font-bold tracking-tighter italic">Bengaluru</span>
 <span className="text-sm font-bold tracking-tighter italic">Delhi</span>
 <span className="text-sm font-bold tracking-tighter italic">Surat</span>
 </div>
 </div>
 </section>
 </div>
 );
}

function classNames(...values: Array<string | false | null | undefined>): string {
 return values.filter(Boolean).join(" ");
}
