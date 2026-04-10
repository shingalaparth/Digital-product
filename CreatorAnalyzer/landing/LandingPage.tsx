"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Plus,
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
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annual");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = (): void => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY <= 0) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        className={classNames(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out",
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        )}
        aria-label="Primary Navigation Wrapper"
      >
        <nav
          aria-label="Primary"
          className={classNames(
            "border-b transition-colors duration-300",
            isScrolled ? "bg-black/50 backdrop-blur-md border-white/5" : "bg-transparent border-transparent"
          )}
        >
          <div className="flex h-14 w-full items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-12">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-black font-bold">R</div>
              <a href="#" className="text-xl font-bold tracking-tight text-white">
                ReelDNA
              </a>
            </div>

            <div className="hidden items-center gap-10 md:flex">
              <div className="flex items-center gap-8">
                {landingContent.nav.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-1 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                    {index === 0 && <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-y-0.5" />}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => focusHeroSearch("navbar_login")}
                  className="rounded-lg border border-primary/30 px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-primary/10"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => focusHeroSearch("navbar_demo")}
                  className="rounded-md bg-white px-5 py-1.5 text-[13px] font-bold text-black transition hover:bg-white/90"
                >
                  Get Demo
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer backdrop */}
        {isMenuOpen && (
          <div
            className="drawer-backdrop md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden
          />
        )}

        <div
          data-testid="mobile-drawer"
          className={classNames(
            "fixed right-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-[min(20rem,calc(100vw-1rem))] border-l border-border bg-card/95 p-5 backdrop-blur-lg transition-transform duration-300 sm:top-20 sm:h-[calc(100vh-5rem)] sm:p-6 md:hidden",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
          aria-hidden={!isMenuOpen}
        >
          <div className="flex flex-col gap-6">
            {landingContent.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => focusHeroSearch("mobile_login")}
                className="w-full rounded-lg border border-primary/30 py-3 text-sm font-semibold text-white transition hover:bg-primary/10"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => focusHeroSearch("mobile_demo")}
                className="w-full rounded-md bg-white py-3 text-sm font-bold text-black"
              >
                Get Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      <section data-testid="section-2" className="relative overflow-hidden pt-16 pb-8 sm:pt-24 sm:pb-12">
        <div className="bg-hero-gradient absolute inset-0" />

        {/* Premium Floating Background Elements — hidden on mobile for perf */}
        <div
          className="absolute -left-4 top-20 hidden h-56 w-56 animate-subtle-float-slow bg-contain bg-no-repeat bg-center opacity-40 pointer-events-none rotate-[12deg] blur-[1px] sm:block"
          style={{ "--base-rotate": "10deg", backgroundImage: 'url("/8.png")' } as React.CSSProperties}
        />
        <div
          className="absolute left-4 bottom-20 hidden h-60 w-80 animate-subtle-float bg-contain bg-no-repeat bg-center opacity-40 pointer-events-none -rotate-[10deg] drop-shadow-[0_0_45px_rgba(34,197,94,0.35)] sm:block"
          style={{ "--base-rotate": "4deg", backgroundImage: 'url("/1.png")' } as React.CSSProperties}
        />
        <div
          className="absolute left-[10%] top-[35%] hidden h-36 w-36 animate-subtle-float-slow bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none rotate-[-20deg] blur-[3.5px] md:block"
          style={{ "--base-rotate": "-2deg", backgroundImage: 'url("/7.png")' } as React.CSSProperties}
        />
        <div
          className="absolute right-0 top-16 hidden h-56 w-56 animate-subtle-float-slow bg-contain bg-no-repeat bg-center opacity-50 pointer-events-none -rotate-[15deg] blur-[2px] sm:block"
          style={{ "--base-rotate": "-5deg", backgroundImage: 'url("/2.png")' } as React.CSSProperties}
        />
        <div
          className="absolute bottom-4 right-4 hidden h-80 w-80 animate-subtle-float bg-contain bg-no-repeat bg-center opacity-50 pointer-events-none rotate-[8deg] drop-shadow-[0_0_45px_rgba(34,197,94,0.35)] sm:block"
          style={{ "--base-rotate": "20deg", backgroundImage: 'url("/4.png")' } as React.CSSProperties}
        />
        <div
          className="absolute top-[40%] right-[12%] hidden h-36 w-36 animate-subtle-float-slow bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none rotate-[20deg] blur-[3px] md:block"
          style={{ "--base-rotate": "20deg", backgroundImage: 'url("/5.png")' } as React.CSSProperties}
        />

        <div className="section-shell relative z-10 flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center px-4 pt-3 text-center sm:min-h-[calc(100svh-5rem)] sm:pt-5">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90 sm:text-xs">
            {landingContent.hero.eyebrow}
          </p>

          <h1 className="max-w-5xl text-[clamp(1.4rem,5vw,5.2rem)] font-extrabold leading-[1.1] tracking-tight text-headline">
            <span>{landingContent.hero.animatedPrefix} </span>
            <span className="inline-flex items-baseline align-baseline">
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

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body sm:max-w-3xl sm:text-lg md:text-xl">{landingContent.hero.subheadline}</p>

          <div className="mt-5 sm:mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90 sm:text-sm">
              {landingContent.hero.profilesAnalyzedLabel}
            </p>
            <p className="mt-1 text-4xl font-extrabold text-hot sm:mt-2 sm:text-5xl md:text-6xl">
              {new Intl.NumberFormat("en-US").format(animatedProfiles)}
              {profileHasPlus ? "+" : ""}
            </p>
          </div>

          <form
            className="mt-5 w-full max-w-3xl rounded-2xl border border-primary/40 bg-card/95 p-1 shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:mt-6 sm:rounded-full"
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
                <Search className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                <input
                  id="hero-username"
                  ref={heroSearchInputRef}
                  value={heroSearchInput}
                  onChange={(event) => setHeroSearchInput(event.target.value)}
                  type="text"
                  placeholder={landingContent.hero.searchPlaceholder}
                  className="w-full bg-transparent text-sm text-headline outline-none placeholder:text-muted sm:text-base"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition hover:bg-primary-dark sm:mr-1 sm:min-w-[200px] sm:rounded-full sm:px-8 sm:text-base"
              >
                {landingContent.hero.searchButtonLabel}
              </button>
            </div>
          </form>

          <p className="mt-3 text-lg font-medium italic text-primary/90 sm:text-2xl">{landingContent.hero.searchHelperText}</p>
          <p className="mt-1 text-xs text-muted sm:text-sm">{landingContent.hero.trustLine}</p>
        </div>
      </section>

      <section data-testid="section-3" className="relative overflow-hidden border-y border-border py-10 sm:py-14">
        <div className="bg-hero-gradient absolute inset-0 opacity-[0.2]" />
        
        <div className="section-shell relative z-10 grid gap-12 text-center md:grid-cols-3">
          {landingContent.stats.map((item) => (
            <div key={item.label} className="group transition-transform duration-300 hover:scale-[1.02]">
              <p className="text-5xl font-black italic tracking-tighter text-hot sm:text-5xl lg:text-6xl">
                {item.value}
              </p>
              <p className="mt-4 text-sm font-medium text-muted sm:text-base lg:text-lg">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section data-testid="section-4" className="py-16 sm:py-24 lg:py-32">
        <div className="section-shell">
          <h2 className="mx-auto max-w-4xl text-center text-2xl font-bold leading-tight text-headline sm:text-3xl lg:text-4xl">
            {landingContent.painHeadline}
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {landingContent.pains.map((pain) => {
              const Icon = iconFor(pain.icon);
              return (
                <article
                  key={pain.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-primary/70 transition-all duration-300 group-hover:w-[5px] group-hover:bg-primary" />

                  <div className="relative z-10">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/10 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-headline transition-colors duration-300 group-hover:text-primary sm:mt-6 sm:text-xl">
                      {pain.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-body/90 sm:mt-3">
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
        className="relative overflow-hidden border-y border-border py-16 sm:py-24 lg:py-32"
      >
        <div className="bg-hero-gradient absolute inset-0 opacity-[0.12]" />

        <div className="section-shell relative z-10">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-primary via-[#6EE7B7] to-primary bg-clip-text text-transparent">
              {landingContent.howItWorksHeadline}
            </span>
          </h2>

          <div className="relative mt-10 grid gap-8 sm:mt-16 lg:grid-cols-3">
            {/* Vertical connector line for mobile */}
            <div className="absolute left-8 top-8 bottom-8 w-px border-l border-dashed border-border lg:hidden" />

            {landingContent.steps.map((step, index) => (
              <article key={step.step} className="group relative">
                {index < landingContent.steps.length - 1 && (
                  <div className="absolute left-[50%] top-8 hidden h-px w-full border-t border-dashed border-border lg:block" />
                )}

                <div className="relative flex flex-row items-start gap-4 text-left lg:flex-col lg:items-center lg:text-center">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:shadow-primary/10 sm:h-16 sm:w-16">
                    <span className="text-2xl font-black text-primary transition-transform duration-300 group-hover:scale-110 sm:text-3xl">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-headline sm:text-xl lg:mt-6">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-2 lg:px-4">{step.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-primary/20 bg-card/50 p-1 backdrop-blur-sm sm:mt-16">
            <div className="rounded-[calc(1.5rem-4px)] border border-border bg-surface/50 p-5 text-center sm:p-8 lg:p-10">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Instant Processing
              </span>
              <p className="mt-4 text-base font-medium text-headline sm:mt-6 sm:text-lg md:text-xl">
                Search creator <span className="mx-1 text-primary sm:mx-2">→</span>
                ranked viral reels <span className="mx-1 text-primary sm:mx-2">→</span>
                AI blueprint screen.
              </p>
              <div className="mt-6 flex justify-center gap-2 sm:mt-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary/20" />
                ))}
                <div className="h-1.5 w-12 rounded-full bg-primary/40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" data-testid="section-6" className="py-16 sm:py-24 lg:py-32">
        <div className="section-shell space-y-8 sm:space-y-16">
          {landingContent.features.map((feature, index) => {
            const Icon = iconFor(feature.icon);
            const isReverse = index % 2 === 1;

            return (
              <article
                key={feature.key}
                className={classNames(
                  "grid gap-6 rounded-2xl border border-border bg-card p-5 sm:gap-8 sm:rounded-3xl sm:p-8 md:grid-cols-2 md:items-center",
                  isReverse ? "md:[&>*:first-child]:order-2" : "",
                )}
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="text-sm font-semibold">{feature.title}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-headline sm:text-2xl">{feature.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body sm:mt-3">{feature.description}</p>
                  <ul className="mt-3 space-y-2 sm:mt-4">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-card shadow-inner transition-colors sm:aspect-video sm:rounded-2xl">
                  <div
                    className="absolute inset-2 bg-cover bg-center rounded-lg opacity-80 transition-opacity border border-border/50 shadow-2xl sm:inset-4 sm:rounded-xl"
                    style={{ backgroundImage: `url("/${[5, 2, 8, 7][index]}.png")` }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)]" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="compare" data-testid="section-7" className="relative overflow-hidden border-y border-hot/30 py-16 sm:py-24 lg:py-32">
        <div className="bg-hero-gradient absolute inset-0" />

        {/* Premium Floating Background Elements — hidden on mobile */}
        <div
          className="absolute -right-16 top-10 hidden h-80 w-80 animate-subtle-float bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none -rotate-[10deg] drop-shadow-[0_0_35px_rgba(34,197,94,0.3)] md:block"
          style={{ "--base-rotate": "-10deg", backgroundImage: 'url("/6.png")' } as React.CSSProperties}
        />
        <div
          className="absolute left-4 top-24 hidden h-64 w-64 animate-subtle-float-slow bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none rotate-[15deg] blur-[2px] md:block"
          style={{ "--base-rotate": "15deg", backgroundImage: 'url("/7.png")' } as React.CSSProperties}
        />
        <div
          className="absolute bottom-10 left-[45%] hidden h-40 w-40 animate-subtle-float-slower bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none -rotate-[5deg] blur-[4px] lg:block"
          style={{ "--base-rotate": "-5deg", backgroundImage: 'url("/8.png")' } as React.CSSProperties}
        />

        <div className="section-shell relative z-10">
          <h2 className="text-2xl font-bold text-headline sm:text-3xl lg:text-4xl">{landingContent.comparison.headline}</h2>
          <p className="mt-2 max-w-3xl text-sm text-body sm:mt-3 sm:text-base">{landingContent.comparison.subtext}</p>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
            {[
              { name: "Creator A", pattern: "Question hook", score: "91" },
              { name: "Creator B", pattern: "Face-first opener", score: "89" },
              { name: "Creator C", pattern: "Curiosity headline", score: "93" },
            ].map((creator) => (
              <article key={creator.name} className="rounded-xl border border-hot/30 bg-surface p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm font-semibold text-headline">{creator.name}</p>
                <p className="mt-1 text-xs text-muted sm:mt-2">Top pattern: {creator.pattern}</p>
                <p className="mt-2 inline-flex rounded-full bg-hot/20 px-2 py-1 text-xs font-bold text-hot sm:mt-3">
                  Score {creator.score}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-primary/40 bg-primary/10 p-4 sm:mt-6 sm:rounded-2xl sm:p-5">
            <p className="text-sm font-semibold text-primary">Shared Patterns Found</p>
            <p className="mt-1 text-sm text-body sm:mt-2">High-retention hooks, 18-24 second duration, and comment-led CTAs.</p>
          </div>

          <button
            type="button"
            onClick={onComparisonCta}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-bg transition hover:bg-primary-dark sm:mt-8 sm:w-auto"
          >
            {landingContent.comparison.cta} <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </section>

      <section data-testid="section-8" className="py-16 sm:py-24 lg:py-32">
        <div className="section-shell">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-headline sm:text-4xl lg:text-5xl xl:text-6xl">
              {landingContent.insightsHeadline}
            </h2>
            {landingContent.insightsSubheadline && (
              <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:mt-6 sm:max-w-2xl sm:text-lg md:text-xl">
                {landingContent.insightsSubheadline}
              </p>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:mt-16 sm:gap-6 lg:grid-cols-4">
            {landingContent.insights.map((insight, index) => {
              const Icon = iconFor(insight.icon);
              return (
                <article
                  key={insight.title}
                  className="group relative rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow sm:rounded-2xl sm:p-6"
                  style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface border border-border transition-colors duration-300 group-hover:bg-primary/10 group-hover:border-primary/30 sm:h-12 sm:w-12 sm:rounded-xl">
                    <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" aria-hidden />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-headline transition-colors duration-300 group-hover:text-primary sm:mt-5 sm:text-lg">
                    {insight.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">
                    {insight.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section data-testid="section-9" className="border-y border-border py-16 sm:py-24 lg:py-32">
        <div className="section-shell">
          <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl lg:text-4xl">
            {landingContent.testimonialsHeadline}
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {landingContent.testimonials.map((testimonial) => (
              <article key={testimonial.name} className="card p-5 sm:p-6">
                <div className="mb-3 h-9 w-9 rounded-full bg-surface sm:mb-4 sm:h-10 sm:w-10" aria-hidden />
                <p className="text-sm leading-relaxed text-body">{testimonial.quote}</p>
                <p className="mt-3 text-sm font-semibold text-headline sm:mt-4">{testimonial.name}</p>
                <p className="text-xs text-muted">{testimonial.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" data-testid="section-10" className="py-16 sm:py-24 lg:py-32">
        <div className="section-shell">
          <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl lg:text-4xl">{landingContent.pricingHeadline}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted sm:mt-3 sm:text-base">{landingContent.pricingSubtext}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
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
            <span className="inline-flex items-center rounded-full bg-hot/20 px-3 py-1 text-xs font-semibold text-hot">
              {yearlyDiscountLabel}
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {landingContent.pricing.map((tier) => {
              const price = billingCycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
              const subtitle = billingCycle === "annual" ? tier.subtitleAnnual : tier.subtitleMonthly;

              return (
                <article
                  key={tier.key}
                  className={classNames(
                    "relative rounded-2xl border bg-card p-5 sm:p-6",
                    tier.featured ? "border-primary shadow-glow" : "border-border",
                  )}
                >
                  {tier.featured ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-bg">
                      Most Popular
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold text-headline sm:text-xl">{tier.name}</h3>
                  <p className="mt-2 text-3xl font-bold text-hot sm:mt-3 sm:text-4xl">{price}</p>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{subtitle}</p>

                  <ul className="mt-4 space-y-2 sm:mt-5">
                    {tier.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-body">
                        <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                    {tier.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted">
                        <X className="mt-[2px] h-4 w-4 flex-shrink-0 text-muted" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-primary/40 bg-primary/10 p-3 text-center text-sm text-body sm:mt-8 sm:rounded-2xl sm:p-4">
            {landingContent.guarantee}
          </div>
          <p className="mt-2 text-center text-xs text-muted sm:mt-3 sm:text-sm">No surprise charges. Cancel anytime. Data stays yours.</p>

        </div>
      </section>

      <section data-testid="section-11" className="border-y border-border py-16 sm:py-24 lg:py-32">
        <div className="section-shell">
          <div className="grid gap-12 md:grid-cols-[1fr,1.5fr] lg:grid-cols-[1fr,2fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-headline sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                Frequently Asked <br className="hidden lg:block" /> Questions
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                {landingContent.faq.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <article key={item.question} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-3 px-5 py-5 text-left text-base font-semibold text-headline sm:px-6 sm:py-6"
                        onClick={() => onFaqToggle(index)}
                        aria-expanded={isOpen}
                      >
                        <span className="flex-1">{item.question}</span>
                        <div className={classNames(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/20 text-primary transition-transform duration-300",
                          isOpen ? "rotate-45" : "rotate-0"
                        )}>
                          <Plus className="h-4 w-4" />
                        </div>
                      </button>
                      <div className={classNames(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}>
                        <div className="overflow-hidden">
                          <p className="px-5 pb-6 text-sm leading-relaxed text-muted sm:px-6 sm:pb-8 sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark sm:text-base"
                >
                  See more FAQs <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
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
          className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"
          style={{ backgroundImage: 'url("/bg.png")' }}
        />

        {/* Premium Floating Background Elements - Bottom Section */}
        <div
          className="absolute -left-16 top-10 hidden h-72 w-72 animate-subtle-float bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none rotate-[15deg] blur-[2px] sm:block"
          style={{ "--base-rotate": "15deg", backgroundImage: 'url("/1.png")' } as React.CSSProperties}
        />
        <div
          className="absolute -right-20 bottom-10 hidden h-80 w-80 animate-subtle-float-slow bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none -rotate-[12deg] blur-[3px] sm:block"
          style={{ "--base-rotate": "-12deg", backgroundImage: 'url("/4.png")' } as React.CSSProperties}
        />

        <div className="section-shell relative z-10">
          <div className="rounded-3xl border border-primary/30 bg-card p-5 shadow-glow sm:p-10">
            <h2
              tabIndex={-1}
              ref={waitlistFocusRef}
              className="text-center text-3xl font-bold text-headline sm:text-5xl"
            >
              {landingContent.finalCta.headline}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-base text-body">{landingContent.finalCta.subtext}</p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => scrollToWaitlist("final_cta")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-dark sm:w-auto"
              >
                {landingContent.finalCta.cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <p className="mt-3 text-center text-sm text-muted">{landingContent.finalCta.trust}</p>

            <div className="mt-8 rounded-2xl border border-border bg-surface p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-headline">Waitlist</h3>
              {tallyUrl ? (
                <iframe
                  title="Waitlist Form"
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white sm:w-auto"
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
                <span>Creator<span className="text-primary">Analyzer</span></span>
              </a>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                Unlock the DNA of viral content with AI-powered insights. Build your Instagram audience faster than ever.
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
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="mailto:hello@creatoranalyzer.com" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
            <p>© {currentYear} CreatorAnalyzer. Built with AI for modern creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
