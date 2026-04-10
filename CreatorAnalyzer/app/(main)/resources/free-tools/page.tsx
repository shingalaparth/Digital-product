import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Free Instagram Analyzer & Social Media Tools | ReelDNA",
  description:
    "Free Instagram analysis tool, competitor snapshot analyzer, viral hook guide, content calendar template, and more. Start analyzing competitors free today.",
};

const freeTools = [
  {
    id: "snapshot",
    title: "Free Competitor Snapshot",
    eyebrow: "REELDNA AI ANALYZER",
    description: "Analyze 1 competitor profile completely free. Get instant insights into growth, engagement, and content strategy.",
    features: [
      "Profile growth rate (30, 60, 90 days)",
      "Engagement rate breakdown (likes, comments, shares)",
      "Top-performing content type (Reels, Carousels)",
      "Audience demographics (estimated)",
      "Optimal posting times & frequency",
    ],
    cta: "Get Free Snapshot",
    href: "/pricing", // In a real app this would be a tool page
  },
  {
    id: "hooks",
    title: "Top 50 Reel Hooks That Go Viral",
    eyebrow: "DOWNLOADABLE PDF",
    description: "The ultimate guide to scroll-stopping content. 50 proven hook formulas used by top creators and brands.",
    features: [
      "15 Narrative hooks",
      "12 Question-based hooks",
      "10 Contrast hooks",
      "8 Curiosity gap hooks",
      "Real examples from top niches",
    ],
    cta: "Download PDF Guide",
    href: "#",
    icon: <Download className="h-5 w-5" />,
  },
  {
    id: "calendar",
    title: "90-Day Content Calendar Template",
    eyebrow: "GOOGLE SHEETS / EXCEL",
    description: "Plan your content months ahead. Used by top Indian D2C brands to organize their social strategy.",
    features: [
      "90-day planning grid",
      "Content type breakdown (Reels, Stories, etc.)",
      "Hashtag research column",
      "Engagement target tracking",
      "Pre-populated niche examples",
    ],
    cta: "Get Spreadsheet",
    href: "#",
    icon: <Download className="h-5 w-5" />,
  },
  {
    id: "worksheet",
    title: "Competitor Analysis Worksheet",
    eyebrow: "DIY FRAMEWORK PDF",
    description: "Structured deep-dive framework to help you manually analyze competitors systematically.",
    features: [
      "Brand positioning & SWOT",
      "Content & Engagement audit",
      "Top content reverse-engineering",
      "Gap & Opportunity identification",
      "3-5 strategic action items",
    ],
    cta: "Download Worksheet",
    href: "#",
    icon: <Download className="h-5 w-5" />,
  },
];

const faqs = [
  {
    question: "Do I need to provide a credit card for the free tools?",
    answer: "No. Zero credit card is required for any free tool. We only ask for your email so we can send results and occasional tips."
  },
  {
    question: "How long does the free competitor analysis take?",
    answer: "2-3 minutes. Our AI processes the Instagram profile and generates your full snapshot within that time."
  },
  {
    question: "Can I analyze more than one competitor for free?",
    answer: "Yes! You get one deep analysis per week on the free plan. Upgrade to Pro for unlimited tracking of 50+ competitors."
  },
  {
    question: "What happens to my data after I download the free tools?",
    answer: "Your data is yours. We send it via email and don't store it on our servers unless you create a ReelDNA account."
  }
];

export default function FreeToolsPage() {
  return (
    <div className="relative overflow-x-hidden bg-bg text-body">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-20">
        <div className="bg-hero-gradient absolute inset-0 opacity-60" />
        <div className="relative z-10 px-4">
          <Breadcrumbs items={[{ label: "Resources", href: "#" }, { label: "Free Tools", href: "/resources/free-tools" }]} />
        </div>
        <div className="section-shell relative z-10 mt-8 text-center sm:mt-12">
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
            Free Social Media Tools & Analyzers
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-body sm:text-lg">
            Get started with ReelDNA&apos;s free tools — no credit card, no limits on the first analysis. Understand your competitors in minutes.
          </p>
        </div>
      </section>

      {/* Main Analysis Tool Card */}
      <section className="py-10">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-8 shadow-glow sm:p-12">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            
            <div className="relative z-10 grid gap-10 md:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  {freeTools[0].eyebrow}
                </span>
                <h2 className="mt-4 text-2xl font-bold text-headline sm:text-3xl">
                  {freeTools[0].title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {freeTools[0].description}
                </p>
                
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex-1 rounded-xl border border-border bg-card-dark px-4 py-3 text-sm text-muted">
                    @competitor_handle
                  </div>
                  <Link
                    href={freeTools[0].href}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition hover:bg-primary-dark"
                  >
                    Analyze <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <p className="mt-3 text-xs text-muted/60 text-center">
                   *Results delivered via email in 2-3 minutes
                </p>
              </div>
              
              <div className="rounded-2xl bg-surface/50 p-6 border border-border">
                <h3 className="text-sm font-bold uppercase text-muted tracking-wide mb-4">What you&apos;ll get</h3>
                <ul className="space-y-3">
                  {freeTools[0].features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnets Grid */}
      <section className="py-16 sm:py-24">
        <div className="section-shell">
          <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
            More Resources to Fuel Your Growth
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {freeTools.slice(1).map((tool) => (
              <div key={tool.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {tool.eyebrow}
                  </span>
                  <div className="rounded-lg bg-surface p-2 text-primary">
                    {tool.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-headline">{tool.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted flex-grow">
                  {tool.description}
                </p>
                <div className="mt-6 border-t border-border pt-6">
                   <ul className="mb-6 space-y-2">
                    {tool.features.map(f => (
                       <li key={f} className="text-xs text-muted flex items-center gap-2">
                         <span className="h-1 w-1 rounded-full bg-primary" /> {f}
                       </li>
                    ))}
                   </ul>
                   <Link
                      href={tool.href}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/5"
                    >
                      {tool.cta}
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="section-shell max-w-4xl">
           <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl mb-12">
             Frequently Asked Questions
           </h2>
           <div className="space-y-4">
              {faqs.map(faq => (
                <div key={faq.question} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold text-headline">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="bg-hero-gradient absolute inset-0 opacity-40" />
        <div className="section-shell relative z-10">
          <div className="rounded-3xl border border-primary/30 bg-card p-5 text-center shadow-glow sm:p-10">
            <h2 className="text-3xl font-bold text-headline sm:text-4xl">
              Ready to Upgrade?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body">
              Outgrow the free tools and get unlimited tracking, daily alerts, and 2 years of historical data.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-bold text-bg transition hover:bg-primary-dark"
              >
                Start Free 7-Day Trial <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted">
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
