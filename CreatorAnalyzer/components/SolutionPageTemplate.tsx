"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Quote } from "lucide-react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export type SolutionCard = {
 title: string;
 description: string;
};

export type SolutionRoiItem = {
 label: string;
 value: string;
};

export type SolutionTestimonial = {
 quote: string;
 name: string;
 role: string;
};

export type SolutionFaqItem = {
 question: string;
 answer: string;
};

export type SolutionPageData = {
 breadcrumbs: Crumb[];
 eyebrow: string;
 title: string;
 subtitle: string;
 hook?: string;
 painPoints: string[];
 solutions: SolutionCard[];
 roi?: SolutionRoiItem[];
 testimonial?: SolutionTestimonial;
 faq: SolutionFaqItem[];
};

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function SolutionPageTemplate({ data }: { data: SolutionPageData }) {
 const [openFaq, setOpenFaq] = useState<number | null>(null);

 return (
 <div className="relative overflow-x-hidden text-body">
 <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]"/>

 {/* Hero Section containing Breadcrumbs for unified background */}
 <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-20">
 <div className="hero-section absolute inset-0 opacity-60"/>
 <div className="relative z-10 px-4">
 <Breadcrumbs items={data.breadcrumbs} />
 </div>
 <div className="section-shell relative z-10 mt-8 text-center sm:mt-12">
 <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90 sm:text-xs">
 {data.eyebrow}
 </p>
 <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
 {data.title}
 </h1>
 <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-body sm:text-lg">
 {data.subtitle}
 </p>
 {data.hook && (
 <p className="mx-auto mt-4 max-w-2xl text-sm italic text-primary/80 sm:text-base">
 {data.hook}
 </p>
 )}
 <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8">
 <Link
 href="/pricing"
 className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition hover:bg-primary-dark sm:text-base"
 >
 Start Free 7-Day Trial <ArrowRight className="h-4 w-4"/>
 </Link>
 </div>
 </div>
 </section>

 {/* ---- Pain Points ---- */}
 <section className="border-y border-border py-16 sm:py-24">
 <div className="section-shell">
 <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
 Sound Familiar?
 </h2>
 <div className="mx-auto mt-8 max-w-3xl space-y-4 sm:mt-10">
 {data.painPoints.map((pain) => (
 <div
 key={pain}
 className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 sm:p-5"
 >
 <Quote className="mt-0.5 h-5 w-5 flex-shrink-0 text-hot/70"/>
 <p className="text-sm leading-relaxed text-body sm:text-base">{pain}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ---- How We Solve It ---- */}
 <section className="py-16 sm:py-24">
 <div className="section-shell">
 <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
 How labhook Solves This
 </h2>
 <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
 {data.solutions.map((sol, idx) => (
 <article
 key={sol.title}
 className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 sm:p-6"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
 <div className="absolute left-0 top-0 h-full w-[3px] bg-primary/70 transition-all duration-300 group-hover:w-[5px] group-hover:bg-primary"/>
 <div className="relative z-10">
 <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
 {idx + 1}
 </span>
 <h3 className="mt-3 text-lg font-bold text-headline transition-colors group-hover:text-primary">
 {sol.title}
 </h3>
 <p className="mt-2 text-sm leading-relaxed text-muted">{sol.description}</p>
 </div>
 </article>
 ))}
 </div>
 </div>
 </section>

 {/* ---- ROI ---- */}
 {data.roi && data.roi.length > 0 && (
 <section className="border-y border-hot/30 py-16 sm:py-24">
 <div className="hero-section absolute inset-0 opacity-20"/>
 <div className="section-shell relative z-10">
 <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
 The ROI Math
 </h2>
 <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
 {data.roi.map((item) => (
 <div
 key={item.label}
 className="rounded-2xl border border-border bg-card p-5 text-center sm:p-6"
 >
 <p className="text-3xl font-black italic tracking-tighter text-hot sm:text-4xl">
 {item.value}
 </p>
 <p className="mt-2 text-sm text-muted">{item.label}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* ---- Testimonial ---- */}
 {data.testimonial && (
 <section className="py-16 sm:py-24">
 <div className="section-shell">
 <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8">
 <Quote className="h-8 w-8 text-primary/40"/>
 <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">
 &ldquo;{data.testimonial.quote}&rdquo;
 </p>
 <div className="mt-4">
 <p className="font-semibold text-headline">{data.testimonial.name}</p>
 <p className="text-sm text-muted">{data.testimonial.role}</p>
 </div>
 </div>
 </div>
 </section>
 )}

 {/* ---- FAQ ---- */}
 {data.faq.length > 0 && (
 <section className="border-y border-border py-16 sm:py-24">
 <div className="section-shell">
 <div className="grid gap-12 md:grid-cols-[1fr,1.5fr] lg:grid-cols-[1fr,2fr]">
 <div>
 <h2 className="text-3xl font-bold tracking-tight text-headline sm:text-4xl lg:text-5xl lg:leading-[1.1]">
 Frequently Asked <br className="hidden lg:block"/> Questions
 </h2>
 </div>
 <div className="space-y-3">
 {data.faq.map((item, index) => {
 const isOpen = openFaq === index;
 return (
 <article
 key={item.question}
 className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-soft"
 >
 <button
 type="button"
 className="flex w-full items-center justify-between gap-3 px-5 py-5 text-left text-base font-semibold text-headline sm:px-6"
 onClick={() => setOpenFaq(isOpen ? null : index)}
 aria-expanded={isOpen}
 >
 <span className="flex-1">{item.question}</span>
 <div
 className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-transform duration-300 ${isOpen ? "rotate-45":""}`}
 >
 <Plus className="h-4 w-4"/>
 </div>
 </button>
 <div
 className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100":"grid-rows-[0fr] opacity-0"}`}
 >
 <div className="overflow-hidden">
 <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-6 sm:text-base">
 {item.answer}
 </p>
 </div>
 </div>
 </article>
 );
 })}
 </div>
 </div>
 </div>
 </section>
 )}

 {/* ---- CTA ---- */}
 <section className="relative overflow-hidden py-16 sm:py-24">
 <div className="hero-section absolute inset-0 opacity-40"/>
 <div className="section-shell relative z-10">
 <div className="rounded-3xl border border-primary/30 bg-card p-5 text-center sm:p-10">
 <h2 className="text-3xl font-bold text-headline sm:text-4xl">
 Ready to Outperform Your Competitors?
 </h2>
 <p className="mx-auto mt-3 max-w-xl text-base text-body">
 Start your free trial and see your competitors&apos; full strategy in 30 seconds.
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
 No credit card required · 30-day money-back guarantee
 </p>
 </div>
 </div>
 </section>
 </div>
 );
}
