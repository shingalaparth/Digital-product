"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Plus, X, Star, ShieldCheck, Zap, MessageSquare, Minus } from "lucide-react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { landingContent } from "../../../lib/landing-content";

type BillingCycle = "annual" | "monthly";

function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = landingContent.pricing;
  const faqs = landingContent.faq;

  return (
    <div className="relative overflow-x-hidden bg-bg text-body">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-16">
        <div className="bg-hero-gradient absolute inset-0 opacity-60" />
        <div className="relative z-10 px-4">
          <Breadcrumbs items={[{ label: "Pricing", href: "/pricing" }]} />
        </div>
        <div className="section-shell relative z-10 mt-8 text-center sm:mt-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90 sm:text-xs">
            {landingContent.pricingHeadline}
          </p>
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
            Simple, Transparent Pricing in INR
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-body sm:text-lg">
            {landingContent.pricingSubtext}
          </p>

          {/* Founding Member Deal Banner */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-bold text-primary animate-pulse">
              <Star className="h-4 w-4 fill-primary" />
              Founding Member Deal: 50% Off Lifetime until June 30, 2026
            </div>
          </div>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={cn("text-sm font-medium transition-colors", billing === "monthly" ? "text-headline" : "text-muted")}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setBilling(billing === "annual" ? "monthly" : "annual")}
              className="relative h-7 w-12 rounded-full bg-surface-dark border border-border transition-colors hover:border-primary/50"
              aria-label="Toggle annual billing"
            >
              <div
                className={cn(
                  "absolute top-0.5 h-6 w-6 rounded-full bg-primary shadow-glow transition-transform duration-200",
                  billing === "annual" ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
            <span className={cn("text-sm font-medium transition-colors", billing === "annual" ? "text-headline" : "text-muted")}>
              Annual <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="pb-16 sm:pb-24">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
               const price = billing === "annual" ? plan.priceAnnual : plan.priceMonthly;
               const subtitle = billing === "annual" ? plan.subtitleAnnual : plan.subtitleMonthly;

               return (
                <article
                  key={plan.key}
                  className={cn(
                    "relative flex flex-col rounded-3xl border p-6 transition-all duration-300 sm:p-8",
                    plan.featured
                      ? "border-primary/50 bg-card shadow-glow ring-1 ring-primary/20"
                      : "border-border bg-card hover:border-primary/30"
                  )}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-6">
                      <span className="rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase text-bg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-headline">{plan.name}</h2>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black tracking-tighter text-headline">
                        {price}
                      </span>
                      <span className="text-sm font-medium text-muted">{subtitle}</span>
                    </div>
                  </div>
                  <ul className="mb-8 flex-1 space-y-4 border-t border-border pt-6">
                    {plan.included.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-body">
                        <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {plan.excluded.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted/50 line-through">
                        <X className="mt-[2px] h-4 w-4 flex-shrink-0 text-muted/30" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold transition-all active:scale-95",
                      plan.featured
                        ? "bg-primary text-bg hover:bg-primary-dark shadow-glow"
                        : "border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                    )}
                  >
                    {plan.key === "agency" ? "Contact Sales" : "Start Free Trial"} <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
               );
            })}
          </div>
          
          {/* Trust Line */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-y border-border py-8 opacity-70">
             <div className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="h-5 w-5 text-primary" /> 30-Day Money Back</div>
             <div className="flex items-center gap-2 text-sm font-medium"><Zap className="h-5 w-5 text-primary" /> Instant setup</div>
             <div className="flex items-center gap-2 text-sm font-medium"><MessageSquare className="h-5 w-5 text-primary" /> WhatsApp Support</div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 sm:py-24 bg-surface/30">
        <div className="section-shell overflow-hidden">
          <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl mb-12">Detailed Plan Comparison</h2>
          <div className="overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface/50">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-muted text-left">Feature</th>
                  <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-primary">Starter</th>
                  <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-primary">Growth</th>
                  <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-primary">Pro</th>
                  <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-primary">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Core Features */}
                <tr className="bg-surface/30"><td colSpan={5} className="px-6 py-3 text-xs font-bold uppercase text-muted/60 bg-surface/40">Core Intelligence</td></tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">Competitor accounts</td>
                  <td className="px-6 py-4 text-center text-sm">5</td><td className="px-6 py-4 text-center text-sm">25</td><td className="px-6 py-4 text-center text-sm">Unlimited</td><td className="px-6 py-4 text-center text-sm">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">Strategy briefs</td>
                  <td className="px-6 py-4 text-center text-sm">Weekly</td><td className="px-6 py-4 text-center text-sm">Weekly (Visual)</td><td className="px-6 py-4 text-center text-sm">Daily</td><td className="px-6 py-4 text-center text-sm">Daily + On-demand</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">Hook & Format Extraction</td>
                  <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-primary mx-auto" aria-hidden /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-primary mx-auto" aria-hidden /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-primary mx-auto" aria-hidden /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-primary mx-auto" aria-hidden /></td>
                </tr>

                {/* Analytics */}
                <tr className="bg-surface/30"><td colSpan={5} className="px-6 py-3 text-xs font-bold uppercase text-muted/60 bg-surface/40">Advanced Analytics</td></tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">Engagement Benchmarking</td>
                  <td className="px-6 py-4 text-center text-sm">Basic</td><td className="px-6 py-4 text-center text-sm">Full</td><td className="px-6 py-4 text-center text-sm">Custom Niche</td><td className="px-6 py-4 text-center text-sm">Market-wide</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">Sound Trend Predictions</td>
                  <td className="px-6 py-4 text-center"><Minus className="h-4 w-4 text-muted/20 mx-auto" aria-hidden /></td>
                  <td className="px-6 py-4 text-center text-sm">14 days early</td>
                  <td className="px-6 py-4 text-center text-sm">Real-time</td>
                  <td className="px-6 py-4 text-center text-sm">Enterprise Data</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">Historical Data</td>
                  <td className="px-6 py-4 text-center text-sm">30 Days</td><td className="px-6 py-4 text-center text-sm">1 Year</td><td className="px-6 py-4 text-center text-sm">Unlimited</td><td className="px-6 py-4 text-center text-sm">Full Archive</td>
                </tr>

                {/* Support */}
                <tr className="bg-surface/30"><td colSpan={5} className="px-6 py-3 text-xs font-bold uppercase text-muted/60 bg-surface/40">Support & Team</td></tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">Team Seats</td>
                  <td className="px-6 py-4 text-center text-sm">1</td><td className="px-6 py-4 text-center text-sm">2</td><td className="px-6 py-4 text-center text-sm">5</td><td className="px-6 py-4 text-center text-sm">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">Response SLA</td>
                  <td className="px-6 py-4 text-center text-sm">24h</td><td className="px-6 py-4 text-center text-sm">12h</td><td className="px-6 py-4 text-center text-sm">4h (Priority)</td><td className="px-6 py-4 text-center text-sm">1h (Dedicated)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-body">White-label Reports</td>
                  <td className="px-6 py-4 text-center"><Minus className="h-4 w-4 text-muted/20 mx-auto" aria-hidden /></td>
                  <td className="px-6 py-4 text-center"><Minus className="h-4 w-4 text-muted/20 mx-auto" aria-hidden /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-primary mx-auto" aria-hidden /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-4 w-4 text-primary mx-auto" aria-hidden /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24">
        <div className="section-shell">
          <div className="grid gap-12 md:grid-cols-[1fr,1.5fr] lg:grid-cols-[1fr,2fr]">
            <h2 className="text-3xl font-bold tracking-tight text-headline sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              Pricing <br className="hidden lg:block" /> FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article
                    key={item.question}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 px-5 py-5 text-left text-base font-semibold text-headline sm:px-6"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="flex-1">{item.question}</span>
                      <div
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-transform duration-300",
                          isOpen ? "rotate-45" : ""
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </div>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
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

      {/* Final CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="bg-hero-gradient absolute inset-0 opacity-40" />
        <div className="section-shell relative z-10 text-center">
          <div className="rounded-3xl border border-primary/30 bg-card p-8 shadow-glow sm:p-16">
            <h2 className="text-3xl font-bold text-headline sm:text-5xl">
              Stop Guessing. Start Growing.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-body">
              Join 500+ creators, brands, and agencies already using data to win on social media. No credit card required.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-10 py-4 text-base font-bold text-bg transition-all hover:bg-primary-dark shadow-glow"
              >
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted">
               7-day free trial · 30-day money-back guarantee · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* India Presence */}
      <section className="pb-16 pt-8 contrast-low">
         <div className="section-shell text-center">
            <p className="text-xs uppercase tracking-[0.3em] font-bold">Built for India&apos;s Digital Economy</p>
            <div className="mt-4 flex justify-center gap-6 saturate-0 grayscale opacity-80">
               {/* Placeholders for logos or regional signals */}
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
