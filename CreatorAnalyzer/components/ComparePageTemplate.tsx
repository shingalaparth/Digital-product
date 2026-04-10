"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Plus, X } from "lucide-react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type CompareRow = {
  feature: string;
  reeldna: string;
  competitor: string;
};

export type CompareAdvantage = {
  title: string;
  description: string;
};

export type CompareFaqItem = {
  question: string;
  answer: string;
};

export type ComparePageData = {
  breadcrumbs: Crumb[];
  competitor: string;
  title: string;
  description: string;
  comparisonTable: CompareRow[];
  advantages: CompareAdvantage[];
  whoChooseUs: string[];
  whoChooseThem: string[];
  faq: CompareFaqItem[];
  relatedComparisons?: { label: string; href: string }[];
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ComparePageTemplate({ data }: { data: ComparePageData }) {
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
            COMPARISON
          </p>
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
            {data.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-body sm:text-lg">
            {data.description}
          </p>
        </div>
      </section>

      {/* ---- Comparison Table ---- */}
      <section className="py-16 sm:py-24">
        <div className="section-shell">
          <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
            Feature-by-Feature Comparison
          </h2>
          <div className="mt-8 overflow-x-auto sm:mt-10">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-muted">
                    Feature
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-primary">
                    ReelDNA
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-muted">
                    {data.competitor}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.comparisonTable.map((row) => (
                  <tr key={row.feature} className="border-b border-border/50">
                    <td className="px-4 py-4 text-sm font-medium text-headline">
                      {row.feature}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-body">
                      {row.reeldna === "✅" ? (
                        <Check className="mx-auto h-5 w-5 text-primary" />
                      ) : row.reeldna === "❌" ? (
                        <X className="mx-auto h-5 w-5 text-muted/50" />
                      ) : (
                        row.reeldna
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-body">
                      {row.competitor === "✅" ? (
                        <Check className="mx-auto h-5 w-5 text-green-600/60" />
                      ) : row.competitor === "❌" ? (
                        <X className="mx-auto h-5 w-5 text-muted/50" />
                      ) : (
                        row.competitor
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- Why ReelDNA Wins ---- */}
      <section className="border-y border-border py-16 sm:py-24">
        <div className="section-shell">
          <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
            Why ReelDNA Wins
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
            {data.advantages.map((adv) => (
              <article
                key={adv.title}
                className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 sm:p-6"
              >
                <h3 className="text-lg font-bold text-headline transition-colors group-hover:text-primary">
                  {adv.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{adv.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Who Should Choose ---- */}
      <section className="py-16 sm:py-24">
        <div className="section-shell">
          <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
            Which Tool Is Right for You?
          </h2>
          <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2">
            {/* Choose ReelDNA */}
            <div className="rounded-2xl border border-primary/40 bg-card p-5 sm:p-6">
              <h3 className="text-lg font-bold text-primary">Choose ReelDNA If You…</h3>
              <ul className="mt-4 space-y-3">
                {data.whoChooseUs.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-body">
                    <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Choose Competitor */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h3 className="text-lg font-bold text-muted">
                Choose {data.competitor} If You…
              </h3>
              <ul className="mt-4 space-y-3">
                {data.whoChooseThem.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-muted/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      {data.faq.length > 0 && (
        <section className="border-y border-border py-16 sm:py-24">
          <div className="section-shell">
            <div className="grid gap-12 md:grid-cols-[1fr,1.5fr] lg:grid-cols-[1fr,2fr]">
              <h2 className="text-3xl font-bold tracking-tight text-headline sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                Frequently Asked <br className="hidden lg:block" /> Questions
              </h2>
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
              Ready to Switch?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body">
              Get better competitor intelligence at a fraction of the cost.
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
              No credit card required · 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      {/* ---- Related Comparisons ---- */}
      {data.relatedComparisons && data.relatedComparisons.length > 0 && (
        <section className="border-t border-border py-10">
          <div className="section-shell">
            <h3 className="text-sm font-semibold text-muted">Related Comparisons</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {data.relatedComparisons.map((rc) => (
                <Link
                  key={rc.href}
                  href={rc.href}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-body transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {rc.label} <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
