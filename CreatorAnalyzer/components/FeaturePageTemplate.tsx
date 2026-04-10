"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type FeatureSection = {
  title: string;
  description: string;
  items: string[];
};

export type FeatureUseCase = {
  title: string;
  description: string;
};

export type FeatureAudience = {
  title: string;
  description: string;
};

export type FeatureFaqItem = {
  question: string;
  answer: string;
};

export type FeaturePageData = {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  description: string;
  features: FeatureSection[];
  audiences?: FeatureAudience[];
  useCases?: FeatureUseCase[];
  faq: FeatureFaqItem[];
  relatedPages?: { label: string; href: string }[];
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function FeaturePageTemplate({ data }: { data: FeaturePageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-x-hidden bg-bg text-body">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]" />

      {/* Hero Section containing Breadcrumbs for unified background */}
      <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-20">
        <div className="bg-hero-gradient absolute inset-0 opacity-60" />
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
            {data.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition hover:bg-primary-dark sm:text-base"
            >
              Start Free 7-Day Trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/10 sm:text-base"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Key Features ---- */}
      <section className="py-16 sm:py-24">
        <div className="section-shell space-y-8 sm:space-y-12">
          {data.features.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-border bg-card p-5 sm:p-8"
            >
              <h2 className="text-xl font-bold text-headline sm:text-2xl">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body sm:mt-3">
                {section.description}
              </p>
              <ul className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ---- Use Cases ---- */}
      {data.useCases && data.useCases.length > 0 && (
        <section className="border-y border-border py-16 sm:py-24">
          <div className="section-shell">
            <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
              Real-World Use Cases
            </h2>
            <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
              {data.useCases.map((uc) => (
                <article
                  key={uc.title}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 sm:p-6"
                >
                  <h3 className="text-lg font-bold text-headline transition-colors group-hover:text-primary">
                    {uc.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{uc.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Who Benefits ---- */}
      {data.audiences && data.audiences.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="section-shell">
            <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
              Who Benefits Most
            </h2>
            <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.audiences.map((a) => (
                <article
                  key={a.title}
                  className="rounded-2xl border border-border bg-card p-5 sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-headline">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
                </article>
              ))}
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
                  Frequently Asked <br className="hidden lg:block" /> Questions
                </h2>
              </div>
              <div className="space-y-3">
                {data.faq.map((item, index) => {
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
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        >
                          <Plus className="h-4 w-4" />
                        </div>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
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
        <div className="bg-hero-gradient absolute inset-0 opacity-40" />
        <div className="section-shell relative z-10">
          <div className="rounded-3xl border border-primary/30 bg-card p-5 text-center shadow-glow sm:p-10">
            <h2 className="text-3xl font-bold text-headline sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body">
              Start analyzing competitors in 30 seconds. No credit card required.
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
              7-day free trial · 30-day money-back guarantee · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ---- Related Pages ---- */}
      {data.relatedPages && data.relatedPages.length > 0 && (
        <section className="border-t border-border py-10">
          <div className="section-shell">
            <h3 className="text-sm font-semibold text-muted">Related Pages</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {data.relatedPages.map((rp) => (
                <Link
                  key={rp.href}
                  href={rp.href}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-body transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {rp.label} <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
