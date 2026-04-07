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
const phraseChangeMs = 3000;

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

    const intervalId = window.setInterval(() => {
      setHeroPhraseIndex((current) => (current + 1) % heroPhrases.length);
    }, phraseChangeMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [heroPhrases.length, prefersReducedMotion]);

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

  const heroPhrase = heroPhrases[heroPhraseIndex] ?? "";

  return (
    <div className="relative bg-bg text-body">

      {/* Global Sticky 'Tab' Navbar */}
      <div className="sticky top-2 sm:top-4 lg:top-6 z-[100] h-0 w-full">
        <div className="w-full max-w-[1200px] mx-auto px-0 sm:px-6">
          <div className="mx-auto flex w-full max-w-5xl justify-center pt-0">
            <nav
              aria-label="Primary"
              className="relative grid grid-cols-3 items-center px-6 py-3 w-full bg-card text-headline shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 rounded-b-[24px]"
            >
              {/* Left Inverted Corner (Gooey effect) */}
              <div
                className="absolute top-0 -left-6 w-6 h-6 hidden sm:block pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 0 100%, transparent 24px, #ffffff 24px)' }}
                aria-hidden
              />
              {/* Right Inverted Corner */}
              <div
                className="absolute top-0 -right-6 w-6 h-6 hidden sm:block pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, transparent 24px, #ffffff 24px)' }}
                aria-hidden
              />

              {/* Left side: Links (Desktop) / Menu Toggle (Mobile) */}
              <div className="flex items-center justify-start gap-8">
                <div className="hidden md:flex items-center gap-8">
                  {landingContent.nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                {/* Mobile Menu Button */}
                <button
                  type="button"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-headline md:hidden"
                  onClick={() => setIsMenuOpen((current) => !current)}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

              {/* Center: Logo */}
              <div className="flex items-center justify-center">
                <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight text-headline">
                  <span className="inline">Content<span className="text-primary-dark">Analyzer</span></span>
                </a>
              </div>

              {/* Right side: Actions */}
              <div className="flex items-center justify-end gap-6">
                <button
                  type="button"
                  onClick={() => focusHeroSearch("navbar")}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-primary-dark shadow-sm"
                >
                  See a demo <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Global Mobile Drawer */}
      <div
        data-testid="mobile-drawer"
        className={classNames(
          "fixed right-0 top-0 z-[110] h-full w-72 border-l border-border bg-card p-6 pt-24 transition-transform duration-300 md:hidden shadow-2xl",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isMenuOpen}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-surface"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col gap-6 mt-4">
          {landingContent.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-headline hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => focusHeroSearch("mobile_menu")}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-semibold text-white"
          >
            Start Free <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <section
        data-testid="hero-section"
        className="relative overflow-hidden min-h-[100svh] pb-32"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.09]"
          style={{ backgroundImage: 'url("/BG.png")' }}
        />
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10" />
        {/* Unified Main Container */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-0 sm:px-6">

          {/* Centered Hero Content -> Margin Top builds spacing! */}
          <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto mt-28 sm:mt-40">
            <h1 className="text-[clamp(1.8rem,3vw,2.8rem)] font-[900] leading-[1.15] tracking-tight text-headline w-full">
              <span className="block mb-2">
                {landingContent.hero.headline}
                <span className="text-primary">LinkedIn</span>
              </span>
              <span className="block mt-2">
                <span>{landingContent.hero.animatedPrefix}</span>
                <span className="inline-block text-left w-[4.5em]">
                  <span
                    key={heroPhraseIndex}
                    data-testid="hero-rotating-word"
                    className="inline-block text-primary animate-apple-fade-blur pb-2 whitespace-nowrap"
                  >
                    {heroPhrase}
                  </span>
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm text-body sm:text-base leading-relaxed mx-auto font-medium">
              {landingContent.hero.subheadline}
            </p>

            {/* Central Input Pill */}
            <div className="mt-8 w-full max-w-lg bg-white/70 backdrop-blur-xl border border-black/10 p-1.5 rounded-full flex flex-col sm:flex-row shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]">
              <input
                type="text"
                placeholder="Paste your LinkedIn URL..."
                className="flex-1 bg-transparent border-none text-headline px-5 py-3 outline-none placeholder:text-muted/70 text-base w-full"
              />
              <button
                type="button"
                onClick={() => scrollToWaitlist("hero")}
                className="mt-2 sm:mt-0 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white transition hover:bg-primary-dark shadow-[0_0_15px_rgba(0,0,0,0.1)] w-full sm:w-auto shrink-0"
              >
                Start Trial
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 sm:gap-8 justify-center text-sm font-semibold">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> No credit card required</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Free 7-day trial</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Cancel anytime</span>
            </div>
          </div>

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
          <h2 className="mx-auto max-w-5xl text-center text-3xl font-bold leading-tight text-headline sm:text-5xl">
            {landingContent.painHeadline}
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {landingContent.pains.map((pain, index) => {
              const cardColors = [
                "bg-[#FEF9C3]/50 border-yellow-100", // Soft Yellow
                "bg-[#E0F2FE]/50 border-blue-100",   // Soft Blue
                "bg-[#DCFCE7]/50 border-green-100"   // Soft Green
              ];
              
              return (
                <article
                  key={pain.title}
                  className={classNames(
                    "group relative overflow-hidden rounded-[24px] border transition-all duration-500 hover:-translate-y-2 flex flex-col h-full",
                    cardColors[index % cardColors.length]
                  )}
                >
                  {/* Image Container (Top) */}
                  <div className="relative pt-6 px-6 overflow-hidden flex-1 min-h-[220px]">
                    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-black/5 bg-white">
                      <img 
                        src={pain.image} 
                        alt={pain.title} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Text Content (Bottom) */}
                  <div className="p-8 pt-6">
                    <h3 className="text-xl font-bold tracking-tight text-headline mb-3 leading-tight transition-colors">
                      {pain.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-body opacity-80">
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
        className="relative overflow-hidden border-y border-border py-24 sm:py-32 animate-soft-bg"
      >
        <div className="section-shell relative z-10">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-5xl text-headline">
            {landingContent.howItWorksHeadline}
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

      <section id="compare" data-testid="section-7" className="relative overflow-hidden border-y border-border py-24 sm:py-32">
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
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            {landingContent.comparison.cta} <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </section>

      <section data-testid="section-8" className="py-24 sm:py-32">
        <div className="section-shell">
          <div className="text-center">
          <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight text-headline sm:text-5xl">
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
                  billingCycle === "annual" ? "bg-primary text-white" : "text-body",
                )}
                onClick={() => onPricingToggle("annual")}
              >
                Annual
              </button>
              <button
                type="button"
                className={classNames(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  billingCycle === "monthly" ? "bg-primary text-white" : "text-body",
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
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
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

      <section
        ref={waitlistRef}
        data-testid="section-12"
        className="relative overflow-hidden py-24 sm:py-32"
      >
        {/* Background Image for Footer 'Tab' Contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-50 pointer-events-none"
          style={{ backgroundImage: 'url("/BG.png")' }}
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
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-dark"
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
                  src={tallyUrl || undefined}
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
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
                  >
                    Join Waitlist <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Branded Dark Footer with Inverted Corners */}
      <footer className="relative bg-[#111827] pt-24 pb-12 text-white">
        {/* Inverted Corner Overlays (matching Section Above Background) */}
        <div className="absolute top-0 left-0 w-full h-12 flex justify-between pointer-events-none">
           {/* Left Inverted Corner */}
           <div 
             className="w-12 h-12"
             style={{ backgroundImage: 'radial-gradient(circle at 0 100%, transparent 48px, #111827 48px)' }}
           />
           {/* Right Inverted Corner */}
           <div 
             className="w-12 h-12"
             style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, transparent 48px, #111827 48px)' }}
           />
        </div>

        <div className="section-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 items-start">
            
            {/* Brand Logo & Info */}
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-6">
                <span>Content<span className="text-primary">Analyzer</span></span>
              </a>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Unlock the DNA of viral content with AI-powered insights. Build your LinkedIn audience faster than ever.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Menu</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-300">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
                <li><a href="#compare" className="hover:text-primary transition-colors">Compare</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-300">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Social</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-300">
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="mailto:hello@contentanalyzer.com" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
            <p>© {currentYear} ContentAnalyzer. Built with AI for modern creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
