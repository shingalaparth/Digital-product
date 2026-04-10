"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type BlogSection = {
  title: string;
  content: string;
  items?: string[];
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogRelatedArticle = {
  label: string;
  href: string;
  description?: string;
};

export type BlogPageData = {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  description: string;
  readTime: string;
  sections: BlogSection[];
  keyTakeaways?: string[];
  faq: BlogFaqItem[];
  relatedArticles?: BlogRelatedArticle[];
  ctaHeadline: string;
  ctaDescription: string;
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BlogPageTemplate({ data }: { data: BlogPageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-x-hidden bg-bg text-body">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 sm:pt-32 sm:pb-20">
        <div className="bg-hero-gradient absolute inset-0 opacity-60" />
        <div className="relative z-10 px-4">
          <Breadcrumbs items={data.breadcrumbs} />
        </div>
        <div className="section-shell relative z-10 mt-8 text-center sm:mt-12">
          <div className="flex items-center justify-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90 sm:text-xs">
              {data.eyebrow}
            </p>
            <span className="rounded-full bg-surface px-3 py-1 text-[10px] font-semibold text-muted border border-border">
              {data.readTime}
            </span>
          </div>
          <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-headline sm:text-4xl lg:text-5xl">
            {data.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-body sm:text-lg">
            {data.description}
          </p>
        </div>
      </section>

      {/* Key Takeaways */}
      {data.keyTakeaways && data.keyTakeaways.length > 0 && (
        <section className="border-b border-border py-10 sm:py-14">
          <div className="section-shell">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-8">
              <h2 className="text-lg font-bold text-primary sm:text-xl">Key Takeaways</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {data.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-2 text-sm text-body">
                    <ArrowRight className="mt-[2px] h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className="py-16 sm:py-24">
        <div className="section-shell max-w-4xl space-y-10 sm:space-y-16">
          {data.sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-xl font-bold text-headline sm:text-2xl lg:text-3xl">
                {section.title}
              </h2>
              <div className="mt-3 text-sm leading-relaxed text-body sm:mt-4 sm:text-base">
                {section.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.items && section.items.length > 0 && (
                <ul className="mt-4 space-y-2 sm:mt-5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {data.relatedArticles && data.relatedArticles.length > 0 && (
        <section className="border-y border-border py-16 sm:py-24">
          <div className="section-shell">
            <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl">
              Continue Reading
            </h2>
            <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.relatedArticles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow sm:p-6"
                >
                  <h3 className="text-base font-bold text-headline transition-colors group-hover:text-primary sm:text-lg">
                    {article.label}
                  </h3>
                  {article.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {article.description}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faq.length > 0 && (
        <section className="py-16 sm:py-24">
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

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="bg-hero-gradient absolute inset-0 opacity-40" />
        <div className="section-shell relative z-10">
          <div className="rounded-3xl border border-primary/30 bg-card p-5 text-center shadow-glow sm:p-10">
            <h2 className="text-3xl font-bold text-headline sm:text-4xl">
              {data.ctaHeadline}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body">
              {data.ctaDescription}
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
    </div>
  );
}
