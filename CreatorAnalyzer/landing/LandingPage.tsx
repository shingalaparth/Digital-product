"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Plus,
    X,
    Check
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const MotionLink = motion(Link);

function HeroCTA({ label, href }: { label: string; href: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <MotionLink
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-9 py-3.5 text-[15px] font-semibold text-white select-none cursor-pointer hover:bg-primary-dark transition-colors"
        >
            {/* Shimmer sweep overlay */}
            <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full block"
                style={{
                    background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
                }}
                animate={hovered ? { translateX: "200%" } : { translateX: "-120%" }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
            />
            <span className="relative z-10">{label}</span>
        </MotionLink>
    );
}

import { iconFor } from "../lib/icon-map";
import { trackEvent } from "../lib/analytics";
import { landingContent } from "../lib/landing-content";

const yearlyDiscountLabel = "2 months free";
const typewriterTypingMs = 95;
const typewriterDeletingMs = 60;
const typewriterHoldFullMs = 1400;
const typewriterHoldEmptyMs = 320;

type BillingCycle = "annual" | "monthly";

function classNames(...values: Array<string | false | null | undefined>): string {
    return values.filter(Boolean).join(" ");
}

export function LandingPage() {
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

    // Use Case State
    const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);
    const [isUseCaseAutoRotating, setIsUseCaseAutoRotating] = useState(true);
    const heroPhrases = landingContent.hero.animatedPhrases;
    const profileTarget = Number(landingContent.hero.profilesAnalyzedCount.replace(/[^\d]/g, "")) || 1000;
    const profileHasPlus = landingContent.hero.profilesAnalyzedCount.includes("+");
    const tallyFormId = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

    const howItWorksRef = useRef<HTMLElement | null>(null);
    const heroSearchInputRef = useRef<HTMLInputElement | null>(null);
    const waitlistRef = useRef<HTMLElement | null>(null);
    const waitlistFocusRef = useRef<HTMLHeadingElement | null>(null);

    // Tally form message handling
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

    // Use Case Auto-Rotation Logic
    useEffect(() => {
        if (!isUseCaseAutoRotating || prefersReducedMotion) return;

        const interval = setInterval(() => {
            setActiveUseCaseIndex((prev) => (prev + 1) % landingContent.useCases.items.length);
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, [isUseCaseAutoRotating, prefersReducedMotion]);


    const tallyUrl = tallyFormId
        ? `https://tally.so/embed/${tallyFormId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
        : null;

    const scrollToWaitlist = (source: string): void => {
        trackEvent("primary_cta_click", { source });
        waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        waitlistFocusRef.current?.focus();
    };

    const scrollToHowItWorks = (): void => {
        howItWorksRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <div className="relative overflow-x-hidden text-body">


            <section data-testid="section-2" className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center border-b border-border py-20">


                {/* Premium Floating Background Elements — hidden on mobile for perf */}
                <div
                    className="absolute -left-4 top-20 hidden h-56 w-56 animate-subtle-float-slow bg-contain bg-no-repeat bg-center opacity-40 pointer-events-none rotate-[12deg] blur-[1px] sm:block"
                    style={{ "--base-rotate": "10deg", backgroundImage: 'url("/8.png")' } as React.CSSProperties}
                />
                <div
                    className="absolute left-4 bottom-20 hidden h-60 w-80 animate-subtle-float bg-contain bg-no-repeat bg-center opacity-40 pointer-events-none -rotate-[10deg] sm:block"
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
                    className="absolute bottom-4 right-4 hidden h-80 w-80 animate-subtle-float bg-contain bg-no-repeat bg-center opacity-50 pointer-events-none rotate-[8deg] sm:block"
                    style={{ "--base-rotate": "20deg", backgroundImage: 'url("/4.png")' } as React.CSSProperties}
                />
                <div
                    className="absolute top-[40%] right-[12%] hidden h-36 w-36 animate-subtle-float-slow bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none rotate-[20deg] blur-[3px] md:block"
                    style={{ "--base-rotate": "20deg", backgroundImage: 'url("/5.png")' } as React.CSSProperties}
                />

                <div className="section-shell relative z-10 flex flex-col items-center justify-center px-4 text-center">
                    {/* Refined eyebrow badge — exactly like GetCrux announcement style */}
                    <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 text-[13px] font-medium shadow-sm transition-all sm:mb-2">
                        <span className="text-headline/80">{landingContent.hero.eyebrow}</span>
                    </div>

                    {/* Two-line headline — matches reference image exactly */}
                    <h1 className="max-w-3xl tracking-tight text-headline">
                        {/* Line 1: static, normal weight — small, like a label */}
                        <span className="block text-[1.6rem] font-normal leading-snug text-headline/70 sm:text-3xl md:text-4xl">
                            {landingContent.hero.animatedPrefix}
                        </span>
                        {/* Line 2: bold, BIGGER — the punchline with typewriter word */}
                        <span className="block text-[2.4rem] font-bold leading-tight sm:text-5xl md:text-[3.6rem] mt-1">
                            To decode{" "}
                            <span className="relative inline-block">
                                <span
                                    data-testid="hero-rotating-word"
                                    className="text-primary"
                                >
                                    {heroPhrase}
                                </span>
                                {/* Blinking cursor */}
                                <span
                                    aria-hidden
                                    className="ml-0.5 inline-block h-[0.85em] w-[3px] md:w-[4px] align-middle rounded-full bg-primary animate-smooth-blink"
                                />
                            </span>
                        </span>
                    </h1>   

                    {/* Subheadline */}
                    <p className="mt-5 max-w-lg text-[15px] font-normal leading-relaxed text-muted sm:mt-6 sm:text-lg">
                        {landingContent.hero.subheadline}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-8 sm:mt-10 flex flex-col items-center gap-6">
                        <HeroCTA label={landingContent.hero.primaryCta} href="/pricing" />
                    </div>
                </div>
            </section>


            <section data-testid="section-3" className="relative overflow-hidden border-y border-border py-10 sm:py-14 bg-surface/50">

                <div className="section-shell relative z-10 grid gap-10 text-center md:grid-cols-4">
                    {landingContent.stats.map((item) => (
                        <div key={item.label} className="group transition-transform duration-300 hover:scale-[1.02]">
                            <p className="text-5xl font-black italic tracking-tighter text-primary sm:text-4xl lg:text-5xl">
                                {item.value}
                            </p>
                            <p className="mt-4 text-sm font-medium text-muted sm:text-base lg:text-md">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section data-testid="section-4" className="py-16 sm:py-24 lg:py-32">
                <div className="section-shell">
                    <div className="text-center">
                        <h2 className="mx-auto max-w-4xl text-2xl font-bold leading-tight text-headline sm:text-3xl lg:text-4xl">
                            {landingContent.painHeadline}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:mt-6 sm:text-lg">
                            {landingContent.painSubheadline}
                        </p>
                    </div>

                    <div className="mt-10 max-w-3xl mx-auto space-y-4 sm:mt-16">
                        {landingContent.painSteps.map((step, idx) => (
                            <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] items-start">
                                <span className="flex-shrink-0 flex h-6 w-12 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary uppercase tracking-wider">
                                    Step {idx + 1}
                                </span>
                                <p className="text-sm sm:text-base text-body leading-relaxed">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center text-sm text-muted italic sm:mt-16 sm:text-base max-w-3xl mx-auto">
                        This cycle costs you 8-10 hours every single week and produces zero actionable insights. By the time you copy a trend, your competitor has already moved on to the next one.
                    </div>

                    <div className="mt-12 grid gap-4 sm:mt-20 sm:gap-6 md:grid-cols-3">
                        {landingContent.pains.map((pain) => {
                            const Icon = iconFor(pain.icon);
                            return (
                                <article
                                    key={pain.title}
                                    className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft sm:p-8"
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
                className="relative overflow-hidden border-y border-border py-16 sm:py-24 lg:py-32 bg-surface/30"
            >

                <div className="section-shell relative z-10">
                    <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                        <span className="text-primary">
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
                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-card transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:shadow-primary/10 sm:h-16 sm:w-16">
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
                                    "grid gap-6 rounded-2xl border border-border bg-card p-5 sm:gap-8 sm:rounded-3xl sm:p-8 md:grid-cols-2 md:items-center transition-all duration-300",
                                    feature.href ? "hover:border-primary/40 hover:shadow-soft" : "",
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
                                    {feature.href && (
                                        <div className="mt-6">
                                            <Link
                                                href={feature.href}
                                                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                                            >
                                                Learn more about {feature.title} <ArrowRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-card transition-colors sm:aspect-video sm:rounded-2xl">
                                    {feature.href ? (
                                        <Link href={feature.href} className="absolute inset-0 z-10" aria-label={`View ${feature.title}`} />
                                    ) : null}
                                    <div
                                        className="absolute inset-2 bg-cover bg-center rounded-lg opacity-80 transition-opacity border border-border/50 sm:inset-4 sm:rounded-xl"
                                        style={{ backgroundImage: `url("/${[5, 2, 8, 7][index]}.png")` }}
                                    />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.1),transparent)]" />
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section id="compare" data-testid="section-7" className="relative overflow-hidden border-y border-border py-16 sm:py-24 lg:py-32 bg-surface/20">

                {/* Premium Floating Background Elements — hidden on mobile */}
                <div
                    className="absolute -right-16 top-10 hidden h-80 w-80 animate-subtle-float bg-contain bg-no-repeat bg-center opacity-30 pointer-events-none -rotate-[10deg] md:block"
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
                            <article key={creator.name} className="rounded-xl border border-primary/30 bg-surface p-4 sm:rounded-2xl sm:p-5">
                                <p className="text-sm font-semibold text-headline">{creator.name}</p>
                                <p className="mt-1 text-xs text-muted sm:mt-2">Top pattern: {creator.pattern}</p>
                                <p className="mt-2 inline-flex rounded-full bg-primary/20 px-2 py-1 text-xs font-bold text-primary sm:mt-3">
                                    Score {creator.score}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-4 rounded-xl border border-primary/40 bg-primary/10 p-4 sm:mt-6 sm:rounded-2xl sm:p-5">
                        <p className="text-sm font-semibold text-primary">Shared Patterns Found</p>
                        <p className="mt-1 text-sm text-body sm:mt-2">High-retention hooks, 18-24 second duration, and comment-led CTAs.</p>
                    </div>

                    <Link
                        href={landingContent.comparison.href || "/compare"}
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-bg transition hover:bg-primary-dark sm:mt-8 sm:w-auto"
                    >
                        {landingContent.comparison.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
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
                                    className="group relative rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-soft sm:rounded-2xl sm:p-6"
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

            <section data-testid="section-use-cases" className="relative overflow-hidden border-y border-border py-16 sm:py-24 lg:py-32 bg-surface/40">

                <div className="section-shell relative z-10">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-headline sm:text-3xl lg:text-4xl">
                            {landingContent.useCases.headline}
                        </h2>
                    </div>

                    <div className="mt-8 sm:mt-12">
                        {/* Desktop Tabs */}
                        <div className="hidden justify-center gap-1 sm:flex">
                            {landingContent.useCases.items.map((item, index) => (
                                <button
                                    key={item.title}
                                    type="button"
                                    onClick={() => {
                                        setActiveUseCaseIndex(index);
                                        setIsUseCaseAutoRotating(false); // Stop auto-rotate on user click
                                    }}
                                    className={classNames(
                                        "relative rounded-t-xl px-6 py-3 text-sm font-bold transition-all duration-300",
                                        activeUseCaseIndex === index
                                            ? "bg-card text-primary border-t border-x border-border"
                                            : "text-muted hover:text-body"
                                    )}
                                >
                                    {item.title}
                                    {activeUseCaseIndex === index && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            initial={false}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="rounded-2xl border border-border bg-card p-6 sm:rounded-t-none sm:p-10 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeUseCaseIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="grid gap-8 lg:grid-cols-[1.5fr,1fr]"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-headline sm:text-2xl">
                                            {landingContent.useCases.items[activeUseCaseIndex]?.title}
                                        </h3>
                                        <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">
                                            {landingContent.useCases.items[activeUseCaseIndex]?.description}
                                        </p>
                                        <div className="mt-6 flex flex-col gap-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Perfect for:</span>
                                            <p className="text-sm text-muted">{landingContent.useCases.items[activeUseCaseIndex]?.perfectFor}</p>
                                        </div>
                                        <div className="mt-8">
                                            <Link
                                                href={landingContent.useCases.items[activeUseCaseIndex]?.link || "#"}
                                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-bg transition hover:bg-primary-dark"
                                            >
                                                {landingContent.useCases.items[activeUseCaseIndex]?.linkLabel} <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="hidden lg:block">
                                        <motion.div
                                            key={`img-${activeUseCaseIndex}`}
                                            initial={{ scale: 0.95, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-card"
                                        >
                                            <div
                                                className="absolute inset-4 bg-cover bg-center rounded-xl opacity-80 border border-border/50"
                                                style={{ backgroundImage: `url("/${[1, 2, 4, 8][activeUseCaseIndex % 4]}.png")` }}
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Mobile Tabs (Simple selection) */}
                            <div className="mt-8 flex flex-wrap gap-2 pt-8 border-t border-border sm:hidden">
                                {landingContent.useCases.items.map((item, index) => (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => {
                                            setActiveUseCaseIndex(index);
                                            setIsUseCaseAutoRotating(false);
                                        }}
                                        className={classNames(
                                            "rounded-lg px-4 py-2 text-xs font-bold transition-all",
                                            activeUseCaseIndex === index
                                                ? "bg-primary text-bg"
                                                : "bg-surface text-muted border border-border"
                                        )}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Case Studies Section ── */}
            <section data-testid="section-case-studies" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
                <div className="hero-section absolute inset-0 opacity-[0.06]" />

                <div className="section-shell relative z-10">
                    <div className="text-center">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                            Case Studies
                        </span>
                        <h2 className="mt-4 text-2xl font-bold text-headline sm:text-3xl lg:text-4xl">
                            {landingContent.caseStudies.headline}
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:text-base">
                            {landingContent.caseStudies.subheadline}
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
                        {landingContent.caseStudies.items.map((study) => (
                            <article
                                key={study.title}
                                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft sm:p-6"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <div className="relative z-10">
                                    <span className="inline-flex rounded-full bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-border">
                                        {study.label}
                                    </span>
                                    <h3 className="mt-3 text-base font-bold text-headline sm:text-lg">{study.title}</h3>
                                    <div className="mt-4 flex items-baseline gap-2">
                                        <span className="text-3xl font-black text-primary sm:text-4xl">{study.metric}</span>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted">{study.metricLabel}</span>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-muted">{study.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials Section ── */}
            <section data-testid="section-9" className="border-y border-border py-16 sm:py-24 lg:py-32">
                <div className="section-shell">
                    <h2 className="text-center text-2xl font-bold text-headline sm:text-3xl lg:text-4xl">
                        {landingContent.testimonialsHeadline}
                    </h2>
                    <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
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

            {/* ── Free Tools & Resources Section ── */}
            <section data-testid="section-free-tools" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
                <div className="hero-section absolute inset-0 opacity-[0.04]" />

                <div className="section-shell relative z-10">
                    <div className="text-center">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                            Free Resources
                        </span>
                        <h2 className="mt-4 text-2xl font-bold text-headline sm:text-3xl lg:text-4xl">
                            {landingContent.freeTools.headline}
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:text-base">
                            {landingContent.freeTools.subheadline}
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {landingContent.freeTools.items.map((tool) => (
                            <article
                                key={tool.title}
                                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft sm:p-6"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-headline transition-colors group-hover:text-primary sm:text-lg">{tool.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">{tool.description}</p>
                                    <div className="mt-4">
                                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors group-hover:text-primary-dark">
                                            {tool.cta} <ArrowRight className="h-3.5 w-3.5" />
                                        </span>
                                    </div>
                                </div>
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
                        <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                            {yearlyDiscountLabel}
                        </span>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-bold text-primary animate-pulse">
                            <span className="flex h-2 w-2 rounded-full bg-primary" />
                            Founding Member Deal: 50% Off Lifetime until June 30, 2026
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {landingContent.pricing.map((tier) => {
                            const price = billingCycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
                            const subtitle = billingCycle === "annual" ? tier.subtitleAnnual : tier.subtitleMonthly;

                            return (
                                <article
                                    key={tier.key}
                                    className={classNames(
                                        "relative rounded-2xl border bg-card p-5 sm:p-6 flex flex-col",
                                        tier.featured ? "border-primary ring-1 ring-primary/20" : "border-border",
                                    )}
                                >
                                    {tier.featured ? (
                                        <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-bg">
                                            Most Popular
                                        </span>
                                    ) : null}
                                    <h3 className="text-lg font-bold text-headline sm:text-xl">{tier.name}</h3>
                                    <div className="mt-2 flex items-baseline gap-1 sm:mt-3">
                                        <p className="text-3xl font-extrabold text-headline sm:text-4xl">{price}</p>
                                        <p className="text-sm font-semibold text-muted">{subtitle}</p>
                                    </div>

                                    <ul className="mt-6 space-y-3 flex-grow">
                                        {tier.included.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-body">
                                                <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                        {tier.excluded.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-muted/60 line-through">
                                                <X className="mt-[2px] h-4 w-4 flex-shrink-0 text-muted/40" aria-hidden />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8">
                                        <Link
                                            href="/pricing"// Link to full pricing or checkout
                                            className={classNames(
                                                "inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition",
                                                tier.featured
                                                    ? "bg-primary text-bg hover:bg-primary-dark"
                                                    : "border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                                            )}
                                        >
                                            {tier.key === "agency" ? "Contact Sales" : "Start Free Trial"}
                                        </Link>
                                    </div>
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
                                        <article key={item.question} className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-soft">
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
                                    Browse Help Center (120+ articles) <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}
