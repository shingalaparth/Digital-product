"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";

import { iconFor } from "../landing/icon-map";
import { trackEvent } from "../lib/analytics";
import { landingContent } from "../lib/landing-content";

const yearlyDiscountLabel = "2 months free";
const typewriterTypingMs = 95;
const typewriterDeletingMs = 60;
const typewriterHoldFullMs = 1400;
const typewriterHoldEmptyMs = 320;

type BillingCycle = "annual" | "monthly";
type LandingPageProps = {
  currentYear: number;
};

function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export function LandingPage({ currentYear }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const [heroTypedText, setHeroTypedText] = useState("");
  const [heroIsDeleting, setHeroIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [heroSearchInput, setHeroSearchInput] = useState("");
  const [animatedProfiles, setAnimatedProfiles] = useState(0);
  const heroPhrases = landingContent.hero.animatedPhrases;
  const profileTarget = Number(landingContent.hero.profilesAnalyzedCount.replace(/[^\d]/g, "")) || 1000;
  const profileHasPlus = landingContent.hero.profilesAnalyzedCount.includes("+");
  const tallyFormId = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

  const howItWorksRef = useRef<HTMLElement | null>(null);
  const heroSearchInputRef = useRef<HTMLInputElement | null>(null);
  const waitlistRef = useRef<HTMLElement | null>(null);
  const waitlistFocusRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const onScroll = (): void => {
      setIsScrolled(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent): void => {
      const payload = event.data as { eventType?: string } | undefined;
      const eventType = payload?.eventType;

      if (eventType === "Tally.FormSubmitted" || eventType === "tally-form-submitted") {
        trackEvent("waitlist_submit", { source: "tally_embed" });
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onPreferenceChange = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onPreferenceChange);
    } else {
      mediaQuery.addListener(onPreferenceChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", onPreferenceChange);
      } else {
        mediaQuery.removeListener(onPreferenceChange);
      }
    };
  }, []);

  useEffect(() => {
    if (heroPhrases.length <= 1 || prefersReducedMotion) {
      return;
    }

    const activePhrase = heroPhrases[heroPhraseIndex] ?? "";
    let timeoutId: number;

    if (!heroIsDeleting && heroTypedText === activePhrase) {
      timeoutId = window.setTimeout(() => {
        setHeroIsDeleting(true);
      }, typewriterHoldFullMs);
    } else if (heroIsDeleting && heroTypedText.length === 0) {
      timeoutId = window.setTimeout(() => {
        setHeroIsDeleting(false);
        setHeroPhraseIndex((current) => (current + 1) % heroPhrases.length);
      }, typewriterHoldEmptyMs);
    } else {
      timeoutId = window.setTimeout(() => {
        setHeroTypedText((current) => {
          if (heroIsDeleting) {
            return current.slice(0, -1);
          }
          return activePhrase.slice(0, current.length + 1);
        });
      }, heroIsDeleting ? typewriterDeletingMs : typewriterTypingMs);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [heroIsDeleting, heroPhraseIndex, heroPhrases, heroTypedText, prefersReducedMotion]);

  useEffect(() => {
    let frameId = 0;
    let startTime = 0;
    const durationMs = 2400;

    const tick = (time: number): void => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 4;
      setAnimatedProfiles(Math.floor(profileTarget * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [profileTarget]);


  const tallyUrl = tallyFormId
    ? `https://tally.so/embed/${tallyFormId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
    : null;

  const scrollToWaitlist = (source: string): void => {
    trackEvent("primary_cta_click", { source });
    setIsMenuOpen(false);
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    waitlistFocusRef.current?.focus();
  };

  const focusHeroSearch = (source: string): void => {
    trackEvent("primary_cta_click", { source });
    setIsMenuOpen(false);
    heroSearchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    heroSearchInputRef.current?.focus();
  };

  const scrollToHowItWorks = (): void => {
    setIsMenuOpen(false);
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onComparisonCta = (): void => {
    trackEvent("comparison_cta_click", { source: "comparison_section" });
    scrollToWaitlist("comparison_section");
  };

  const onPricingToggle = (next: BillingCycle): void => {
    if (next === billingCycle) {
      return;
    }

    setBillingCycle(next);
    trackEvent("pricing_toggle_change", { billing_cycle: next });
  };

  const onFaqToggle = (index: number): void => {
    const nextOpen = openFaqIndex === index ? null : index;
    setOpenFaqIndex(nextOpen);

    if (nextOpen !== null) {
      trackEvent("faq_expand", { question: landingContent.faq[index]?.question ?? "unknown" });
    }
  };

  const heroPhrase = prefersReducedMotion ? (heroPhrases[0] ?? "") : heroTypedText;

  return (
    <div className="relative overflow-x-hidden bg-bg text-body">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid bg-[size:24px_24px] opacity-[0.045]" />

      <section
        data-testid="section-1"
        className="fixed inset-x-0 top-0 z-50"
        aria-label="Primary Navigation Wrapper"
      >
        <nav
          aria-label="Primary"
          data-scrolled={isScrolled ? "true" : "false"}
          className={classNames(
            "border-b transition-colors duration-300",
            isScrolled ? "border-border bg-card/95 backdrop-blur" : "border-transparent bg-transparent",
          )}
        >
          <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
            <a href="#" className="text-xl font-bold tracking-tight text-headline">
              Reel<span className="text-primary">DNA</span>
            </a>

            <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
              {landingContent.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-body hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <button
                type="button"
                onClick={() => focusHeroSearch("navbar")}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-bg transition hover:bg-primary-dark"
              >
                Start Free <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-headline md:hidden"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <div
          data-testid="mobile-drawer"
          className={classNames(
            "fixed right-0 top-20 z-40 h-[calc(100vh-5rem)] w-72 border-l border-border bg-card p-6 transition-transform duration-300 md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col gap-5">
            {landingContent.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-body hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => focusHeroSearch("mobile_menu")}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-bg"
            >
              Start Free <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </section>
      <section data-testid="section-2" className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12">
        <div className="bg-hero-gradient absolute inset-0" />
        <div
          className="absolute -left-24 top-28 h-60 w-60 animate-subtle-float rounded-3xl border border-primary/25 bg-primary/10 rotate-12"
          style={{ "--base-rotate": "12deg" } as React.CSSProperties}
        />
        <div
          className="absolute right-8 top-24 h-48 w-48 animate-subtle-float-slow rounded-3xl border border-primary/20 bg-primary/10 -rotate-12"
          style={{ "--base-rotate": "-12deg" } as React.CSSProperties}
        />
        <div
          className="absolute bottom-16 right-20 h-56 w-56 animate-subtle-float-slower rounded-3xl border border-primary/15 bg-primary/10 rotate-12"
          style={{ "--base-rotate": "12deg" } as React.CSSProperties}
        />

        <div className="section-shell relative z-10 flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center pt-3 text-center sm:pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
            {landingContent.hero.eyebrow}
          </p>

          <h1 className="text-[clamp(1.5rem,6.2vw,5.2rem)] font-extrabold leading-[1.05] tracking-tight text-headline whitespace-nowrap">
            <span>{landingContent.hero.animatedPrefix} </span>
            <span className="inline-flex items-baseline whitespace-nowrap align-baseline">
              <span
                data-testid="hero-rotating-word"
                className="inline-block text-left align-baseline whitespace-pre bg-gradient-to-r from-primary via-[#6EE7B7] to-[#D1FAE5] bg-clip-text text-transparent"
              >
                {heroPhrase}
              </span>
              <span
                aria-hidden
                className="ml-1 inline-block h-[0.95em] w-[3px] animate-smooth-blink rounded-sm bg-primary/90 align-middle shadow-[0_0_8px_rgba(34,197,94,0.5)]"
              />
            </span>
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-body sm:text-xl">{landingContent.hero.subheadline}</p>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">
              {landingContent.hero.profilesAnalyzedLabel}
            </p>
            <p className="mt-2 text-5xl font-extrabold text-hot sm:text-6xl">
              {new Intl.NumberFormat("en-US").format(animatedProfiles)}
              {profileHasPlus ? "+" : ""}
            </p>
          </div>

          <form
            className="mt-6 w-full max-w-3xl rounded-full border border-primary/40 bg-card/95 p-1 shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
            onSubmit={(event) => {
              event.preventDefault();
              trackEvent("primary_cta_click", { source: "hero_search" });
              scrollToHowItWorks();
            }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="hero-username" className="sr-only">
                Instagram username
              </label>
              <div className="flex flex-1 items-center gap-3 px-4 py-3">
                <Search className="h-5 w-5 text-primary" aria-hidden />
                <input
                  id="hero-username"
                  ref={heroSearchInputRef}
                  value={heroSearchInput}
                  onChange={(event) => setHeroSearchInput(event.target.value)}
                  type="text"
                  placeholder={landingContent.hero.searchPlaceholder}
                  className="w-full bg-transparent text-base text-headline outline-none placeholder:text-muted"
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-primary px-8 py-3 text-base font-bold text-bg transition hover:bg-primary-dark sm:mr-1 sm:min-w-[200px]"
              >
                {landingContent.hero.searchButtonLabel}
              </button>
            </div>
          </form>

          <p className="mt-3 text-2xl font-medium italic text-primary/90">{landingContent.hero.searchHelperText}</p>
          <p className="mt-1 text-sm text-muted">{landingContent.hero.trustLine}</p>
        </div>
      </section>

      <section data-testid="section-3" className="border-y border-border bg-card/70 py-10">
        <div className="section-shell grid gap-8 md:grid-cols-3">
          {landingContent.stats.map((item, index) => (
            <div
              key={item.label}
              className={classNames(
                "text-center",
                index > 0 ? "md:border-l md:border-border" : "",
              )}
            >
              <p className="text-4xl font-bold text-hot">{item.value}</p>
              <p className="mt-2 text-sm text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-testid="section-4" className="py-24 sm:py-32">
        <div className="section-shell">
          <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight text-headline sm:text-4xl">
            {landingContent.painHeadline}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {landingContent.pains.map((pain) => {
              const Icon = iconFor(pain.icon);
              return (
                <article
                  key={pain.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-primary/70 transition-all duration-300 group-hover:w-[5px] group-hover:bg-primary" />

                  <div className="relative z-10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10">
                      <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" aria-hidden />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-headline transition-colors duration-300 group-hover:text-primary">
                      {pain.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-body/90">
                      {pain.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        data-testid="section-5"
        ref={howItWorksRef}
        className="relative overflow-hidden border-y border-border py-24 sm:py-32"
      >
        <div className="bg-hero-gradient absolute inset-0 opacity-[0.12]" />

        <div className="section-shell relative z-10">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-primary via-[#6EE7B7] to-primary bg-clip-text text-transparent">
              {landingContent.howItWorksHeadline}
            </span>
          </h2>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {landingContent.steps.map((step, index) => (
              <article key={step.step} className="group relative">
                {index < landingContent.steps.length - 1 && (
                  <div className="absolute left-[50%] top-8 hidden h-px w-full border-t border-dashed border-border lg:block" />
                )}

                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:shadow-primary/10">
                    <span className="text-3xl font-black text-primary transition-transform duration-300 group-hover:scale-110">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-headline">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted px-4">{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-primary/20 bg-card/50 p-1 backdrop-blur-sm">
            <div className="rounded-[calc(1.5rem-4px)] border border-border bg-surface/50 p-8 text-center sm:p-10">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Instant Processing
              </span>
              <p className="mt-6 text-lg font-medium text-headline sm:text-xl">
                Search creator <span className="mx-2 text-primary">→</span>
                ranked viral reels <span className="mx-2 text-primary">→</span>
                AI blueprint screen.
              </p>
              <div className="mt-8 flex justify-center gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary/20" />
                ))}
                <div className="h-1.5 w-12 rounded-full bg-primary/40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" data-testid="section-6" className="py-24 sm:py-32">
        <div className="section-shell space-y-16">
          {landingContent.features.map((feature, index) => {
            const Icon = iconFor(feature.icon);
            const isReverse = index % 2 === 1;

            return (
              <article
                key={feature.key}
                className={classNames(
                  "grid gap-8 rounded-3xl border border-border bg-card p-8 lg:grid-cols-2 lg:items-center",
                  isReverse ? "lg:[&>*:first-child]:order-2" : "",
                )}
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="text-sm font-semibold">{feature.title}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-headline">{feature.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{feature.description}</p>
                  <ul className="mt-4 space-y-2">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="mt-[2px] h-4 w-4 text-primary" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-card shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.15),transparent)]" />
                  <div className="flex h-full items-center justify-center">
                    <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="compare" data-testid="section-7" className="relative overflow-hidden border-y border-hot/30 py-24 sm:py-32">
        <div className="bg-hero-gradient absolute inset-0" />
        <div
          className="absolute -right-24 top-28 h-60 w-60 animate-subtle-float rounded-3xl border border-primary/25 bg-primary/10 rotate-12"
          style={{ "--base-rotate": "12deg" } as React.CSSProperties}
        />
        <div
          className="absolute left-8 top-24 h-48 w-48 animate-subtle-float-slow rounded-3xl border border-primary/20 bg-primary/10 -rotate-12"
          style={{ "--base-rotate": "-12deg" } as React.CSSProperties}
        />

        <div className="section-shell relative z-10">
          <h2 className="text-3xl font-bold text-headline sm:text-4xl">{landingContent.comparison.headline}</h2>
          <p className="mt-3 max-w-3xl text-base text-body">{landingContent.comparison.subtext}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { name: "Creator A", pattern: "Question hook", score: "91" },
              { name: "Creator B", pattern: "Face-first opener", score: "89" },
              { name: "Creator C", pattern: "Curiosity headline", score: "93" },
            ].map((creator) => (
              <article key={creator.name} className="rounded-2xl border border-hot/30 bg-surface p-5">
                <p className="text-sm font-semibold text-headline">{creator.name}</p>
                <p className="mt-2 text-xs text-muted">Top pattern: {creator.pattern}</p>
                <p className="mt-3 inline-flex rounded-full bg-hot/20 px-2 py-1 text-xs font-bold text-hot">
                  Score {creator.score}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/40 bg-primary/10 p-5">
            <p className="text-sm font-semibold text-primary">Shared Patterns Found</p>
            <p className="mt-2 text-sm text-body">High-retention hooks, 18-24 second duration, and comment-led CTAs.</p>
          </div>

          <button
            type="button"
            onClick={onComparisonCta}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-bg transition hover:bg-primary-dark"
          >
            {landingContent.comparison.cta} <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </section>

      <section data-testid="section-8" className="py-24 sm:py-32">
        <div className="section-shell">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-headline sm:text-5xl lg:text-6xl">
              {landingContent.insightsHeadline}
            </h2>
            {landingContent.insightsSubheadline && (
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
                {landingContent.insightsSubheadline}
              </p>
            )}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {landingContent.insights.map((insight, index) => {
              const Icon = iconFor(insight.icon);
              return (
                <article
                  key={insight.title}
                  className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow"
                  style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border transition-colors duration-300 group-hover:bg-primary/10 group-hover:border-primary/30">
                    <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-headline transition-colors duration-300 group-hover:text-primary">
                    {insight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {insight.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section data-testid="section-9" className="border-y border-border py-24 sm:py-32">
        <div className="section-shell">
          <h2 className="text-center text-3xl font-bold text-headline sm:text-4xl">
            {landingContent.testimonialsHeadline}
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {landingContent.testimonials.map((testimonial) => (
              <article key={testimonial.name} className="card p-6">
                <div className="mb-4 h-10 w-10 rounded-full bg-surface" aria-hidden />
                <p className="text-sm leading-relaxed text-body">{testimonial.quote}</p>
                <p className="mt-4 text-sm font-semibold text-headline">{testimonial.name}</p>
                <p className="text-xs text-muted">{testimonial.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" data-testid="section-10" className="py-24 sm:py-32">
        <div className="section-shell">
          <h2 className="text-center text-3xl font-bold text-headline sm:text-4xl">{landingContent.pricingHeadline}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted">{landingContent.pricingSubtext}</p>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-border bg-card p-1">
              <button
                type="button"
                className={classNames(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  billingCycle === "annual" ? "bg-primary text-bg" : "text-body",
                )}
                onClick={() => onPricingToggle("annual")}
              >
                Annual
              </button>
              <button
                type="button"
                className={classNames(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  billingCycle === "monthly" ? "bg-primary text-bg" : "text-body",
                )}
                onClick={() => onPricingToggle("monthly")}
              >
                Monthly
              </button>
            </div>
            <span className="ml-3 inline-flex items-center rounded-full bg-hot/20 px-3 text-xs font-semibold text-hot">
              {yearlyDiscountLabel}
            </span>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {landingContent.pricing.map((tier) => {
              const price = billingCycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
              const subtitle = billingCycle === "annual" ? tier.subtitleAnnual : tier.subtitleMonthly;

              return (
                <article
                  key={tier.key}
                  className={classNames(
                    "relative rounded-2xl border bg-card p-6",
                    tier.featured ? "border-primary shadow-glow" : "border-border",
                  )}
                >
                  {tier.featured ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-bg">
                      Most Popular
                    </span>
                  ) : null}
                  <h3 className="text-xl font-semibold text-headline">{tier.name}</h3>
                  <p className="mt-3 text-4xl font-bold text-hot">{price}</p>
                  <p className="mt-1 text-sm text-muted">{subtitle}</p>

                  <ul className="mt-5 space-y-2">
                    {tier.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-body">
                        <Check className="mt-[2px] h-4 w-4 text-primary" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                    {tier.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <X className="mt-[2px] h-4 w-4 text-muted" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/40 bg-primary/10 p-4 text-center text-sm text-body">
            {landingContent.guarantee}
          </div>
          <p className="mt-3 text-center text-sm text-muted">No surprise charges. Cancel anytime. Data stays yours.</p>


        </div>
      </section>

      <section data-testid="section-11" className="border-y border-border py-24 sm:py-32">
        <div className="section-shell max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-headline sm:text-4xl">FAQ</h2>
          <div className="mt-8 space-y-3">
            {landingContent.faq.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <article key={item.question} className="rounded-xl border border-border bg-card">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-headline"
                    onClick={() => onFaqToggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown className={classNames("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")}
                    />
                  </button>
                  {isOpen ? <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{item.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={waitlistRef} data-testid="section-12" className="relative overflow-hidden py-24 sm:py-32">
        <div className="bg-hero-gradient absolute inset-0 opacity-80" />
        <div
          className="absolute -left-20 -top-20 h-64 w-64 animate-subtle-float-slow rounded-3xl border border-primary/10 bg-primary/5 rotate-[30deg]"
          style={{ "--base-rotate": "30deg" } as React.CSSProperties}
        />
        <div className="section-shell relative z-10">
          <div className="rounded-3xl border border-primary/30 bg-card p-8 shadow-glow sm:p-10">
            <h2
              tabIndex={-1}
              ref={waitlistFocusRef}
              className="text-center text-4xl font-bold text-headline sm:text-5xl"
            >
              {landingContent.finalCta.headline}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-base text-body">{landingContent.finalCta.subtext}</p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => scrollToWaitlist("final_cta")}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-bg transition hover:bg-primary-dark"
              >
                {landingContent.finalCta.cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <p className="mt-3 text-center text-sm text-muted">{landingContent.finalCta.trust}</p>

            <div className="mt-8 rounded-2xl border border-border bg-surface p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-headline">Waitlist</h3>
              {tallyUrl ? (
                <iframe
                  title="ReelDNA Waitlist Form"
                  src={tallyUrl}
                  className="mt-4 min-h-[420px] w-full rounded-xl border border-border bg-card"
                  loading="lazy"
                />
              ) : (
                <form
                  className="mt-4 space-y-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    trackEvent("waitlist_submit", { source: "fallback_form" });
                  }}
                >
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-headline placeholder:text-muted"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-bg"
                  >
                    Join Waitlist <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="section-shell flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {currentYear} ReelDNA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="mailto:hello@reeldna.com" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
