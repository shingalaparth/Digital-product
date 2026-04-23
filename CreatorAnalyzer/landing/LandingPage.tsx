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
    const [activeStep, setActiveStep] = useState(0);
    const [isStepAutoPlaying, setIsStepAutoPlaying] = useState(true);
    const [activeFeature, setActiveFeature] = useState(0);
    const [isFeatureAutoPlaying, setIsFeatureAutoPlaying] = useState(true);
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

    // Auto-rotate steps every 7 seconds
    useEffect(() => {
        if (!isStepAutoPlaying) return;
        const totalSteps = landingContent.steps.length;
        if (totalSteps <= 1) return;
        const interval = window.setInterval(() => {
            setActiveStep((prev) => (prev + 1) % totalSteps);
        }, 7000);
        return () => window.clearInterval(interval);
    }, [isStepAutoPlaying]);

    // Auto-rotate features every 6 seconds
    useEffect(() => {
        if (!isFeatureAutoPlaying) return;
        const totalFeatures = landingContent.features.length;
        if (totalFeatures <= 1) return;
        const interval = window.setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % totalFeatures);
        }, 6000);
        return () => window.clearInterval(interval);
    }, [isFeatureAutoPlaying]);

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
                        <span className="block text-2xl font-normal leading-snug text-headline/70 sm:text-3xl md:text-4xl">
                            {landingContent.hero.animatedPrefix}
                        </span>
                        {/* Line 2: bold, BIGGER — the punchline with typewriter word */}
                        <span className="block text-3xl font-bold leading-tight sm:text-5xl md:text-[3.6rem] mt-1">
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


            <section data-testid="section-3" className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
                <div className="section-shell relative">
                    <h2 className="text-center text-xl font-bold text-headline mb-10 sm:mb-14 sm:text-3xl lg:text-4xl">
                        What creators see after using TheHookLab
                    </h2>
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {landingContent.stats.map((item) => (
                            <div 
                                key={item.label} 
                                className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 shadow-sm border border-primary/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
                            >
                                <p className="text-5xl font-black tracking-tight text-primary sm:text-6xl">
                                    {item.value}
                                </p>
                                <p className="mt-4 text-center text-sm font-medium text-muted sm:text-base">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section data-testid="section-4" className="py-16 sm:py-24 lg:py-32">
                <div className="section-shell">
                    <div className="text-center">
                        <h2 className="mx-auto max-w-4xl text-2xl font-bold leading-tight text-headline sm:text-3xl lg:text-4xl">
                            {landingContent.painHeadline}
                        </h2>
                        <p className="mx-auto mt-2 max-w-2xl text-base text-muted sm:mt-6 sm:text-lg">
                            {landingContent.painSubheadline}
                        </p>
                    </div>

                    {/* Interactive Timeline (Desktop & Mobile) */}
                    <div className="hidden md:block relative mt-24 mb-16 max-w-6xl mx-auto h-[350px]">
                        {/* Horizontal Line */}
                        <div className="absolute top-1/2 left-[2%] right-[2%] h-[1px] bg-zinc-300 z-0" />

                        <div className="flex w-full h-full justify-between relative z-10 items-center">
                            {landingContent.painSteps.map((step, idx) => {
                                const isTop = idx % 2 === 0;
                                return (
                                    <div key={idx} className="relative flex-1 flex justify-center group cursor-default">

                                        {/* Step Node */}
                                        <div className="bg-card border border-border px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-bold text-headline uppercase tracking-widest transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(255,95,38,0.15)] relative z-20">
                                            Step {idx + 1}
                                        </div>

                                        {/* Vertical Connector */}
                                        <div
                                            className={`absolute left-1/2 w-[1px] bg-zinc-300 -translate-x-1/2 transition-colors duration-300 group-hover:bg-primary/40 z-10 ${isTop ? 'bottom-1/2 h-8 lg:h-10' : 'top-1/2 h-8 lg:h-10'
                                                }`}
                                        />

                                        {/* Content Box */}
                                        <div
                                            className={`absolute left-1/2 w-[150px] lg:w-[220px] -translate-x-1/2 text-center p-2 transition-all duration-300 ${isTop ? 'bottom-[calc(50%+2rem)] lg:bottom-[calc(50%+2.5rem)]' : 'top-[calc(50%+2rem)] lg:top-[calc(50%+2.5rem)]'
                                                }`}
                                        >
                                            <p className="text-[13px] sm:text-sm text-body font-medium leading-relaxed group-hover:text-headline transition-colors duration-300">
                                                {step}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Interactive Timeline (Mobile) */}
                    <div className="md:hidden mt-16 mb-20 space-y-8 relative max-w-sm mx-auto px-4">
                        {/* Vertical Line */}
                        <div className="absolute left-[35px] top-4 bottom-4 w-[1px] bg-zinc-300" />

                        {landingContent.painSteps.map((step, idx) => (
                            <div key={idx} className="relative flex items-start gap-6 group">
                                <div className="relative z-10 flex-shrink-0 bg-card border border-border h-10 w-10 rounded-full flex items-center justify-center text-[10px] font-bold text-headline transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:text-primary">
                                    {idx + 1}
                                </div>
                                <div className="pt-2 pb-2">
                                    <span className="block text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">Step {idx + 1}</span>
                                    <p className="text-[13px] sm:text-sm font-medium leading-relaxed text-body transition-colors duration-300 group-hover:text-headline">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center text-sm text-muted italic sm:mt-16 sm:text-base max-w-3xl mx-auto">
                        This cycle costs you 8-10 hours every single week and produces zero actionable insights. By the time you copy a trend, your competitor has already moved on to the next one.
                    </div>

                </div>
            </section>

            <section className="relative w-full overflow-hidden">
                {/* Background Image & Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: "url('/bg.png')" }}
                />
                <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-[2px]" />
                
                <div className="relative z-5 px-6 py-20 sm:py-32 text-center flex flex-col items-center">
                    <h2 className="max-w-4xl text-2xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-12">
                        {landingContent.singleReelCta.headline}
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto">
                        <Link
                            href={landingContent.singleReelCta.primaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-[15px] font-bold text-bg transition-all hover:brightness-90 hover:scale-[1.02] shadow-soft active:scale-95"
                        >
                            {landingContent.singleReelCta.primaryCta.label}
                        </Link>
                        <Link
                            href={landingContent.singleReelCta.secondaryCta.href}
                            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-[15px] font-bold text-white transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-95"
                        >
                            {landingContent.singleReelCta.secondaryCta.label}
                        </Link>
                    </div>
                </div>
            </section>

            <section
                id="how-it-works"
                data-testid="section-5"
                ref={howItWorksRef}
                className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-surface/30 border-y border-border"
            >
                <div className="section-shell relative z-10">
                    <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl mb-12 lg:mb-16">
                        <span className="text-primary">
                            {landingContent.howItWorksHeadline}
                        </span>
                    </h2>

                    <div className="grid gap-0 lg:grid-cols-[1fr_2fr] items-center bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                        {/* Left Side: Steps Navigation */}
                        <div className="flex flex-col border-r border-border h-full bg-surface/50">
                            {landingContent.steps.map((step, index) => {
                                const isActive = activeStep === index;
                                return (
                                    <button
                                        key={step.step}
                                        onClick={() => { setActiveStep(index); setIsStepAutoPlaying(false); }}
                                        className={classNames(
                                            "relative flex flex-col items-start p-6 sm:p-8 text-left transition-all duration-300 overflow-hidden",
                                            isActive 
                                                ? "bg-card" 
                                                : "border-transparent hover:bg-card/50",
                                            index !== landingContent.steps.length - 1 ? "border-b border-border" : ""
                                        )}
                                    >
                                        {/* Static left border base */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-border" />
                                        {/* Animated progress line */}
                                        {isActive && (
                                            <div
                                                key={`step-progress-${index}-${isStepAutoPlaying}`}
                                                className="absolute left-0 top-0 w-[3px] bg-primary"
                                                style={{
                                                    height: "0%",
                                                    animation: isStepAutoPlaying ? "progressFill 7s linear forwards" : "none",
                                                }}
                                            />
                                        )}
                                        {/* Always-visible active highlight when auto-play is off */}
                                        {isActive && !isStepAutoPlaying && (
                                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
                                        )}
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className={classNames(
                                                "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors",
                                                isActive ? "border-primary text-primary" : "border-muted text-muted"
                                            )}>
                                                <span className="text-sm font-bold">{step.step}</span>
                                            </div>
                                            <h3 className={classNames(
                                                "text-lg font-bold transition-colors",
                                                isActive ? "text-headline" : "text-muted"
                                            )}>
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className={classNames(
                                            "pl-12 text-sm leading-relaxed transition-colors",
                                            isActive ? "text-body" : "text-muted"
                                        )}>
                                            {step.description}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Side: Visual Display */}
                        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-950 to-zinc-900 lg:aspect-auto lg:h-full min-h-[400px]">
                            {/* Subtle grid overlay */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                            {/* Step 0: Add Competitors */}
                            <div className={classNames(
                                "absolute inset-0 transition-all duration-700 flex items-center justify-center p-6 sm:p-10",
                                activeStep === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                            )}>
                                <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl shadow-2xl overflow-hidden">
                                    <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                                        </div>
                                        <span className="text-[11px] text-white/40 font-mono">Add Competitor</span>
                                    </div>
                                    <div className="p-5 flex flex-col gap-4">
                                        <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                                            <div className="h-4 w-4 rounded-full bg-primary/60 flex-shrink-0 animate-pulse" />
                                            <span className="text-sm text-white/70 font-mono">@instagram/competitor_handle</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {["@viralcreator", "@contentlab", "@reelmaster"].map(h => (
                                                <div key={h} className="rounded-lg bg-white/5 border border-white/8 p-2 text-center">
                                                    <div className="h-7 w-7 rounded-full bg-primary/30 mx-auto mb-2" />
                                                    <span className="text-[10px] text-white/50">{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="rounded-xl bg-primary/20 border border-primary/30 px-4 py-3 flex items-center justify-between">
                                            <span className="text-xs text-white font-semibold">Scraping latest 30 reels…</span>
                                            <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-center">
                                            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                                                <p className="text-primary text-lg font-black">142K</p>
                                                <p className="text-[10px] text-white/40">Avg Views</p>
                                            </div>
                                            <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                                                <p className="text-primary text-lg font-black">8.4%</p>
                                                <p className="text-[10px] text-white/40">Eng. Rate</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 1: Deep Analyze Reel */}
                            <div className={classNames(
                                "absolute inset-0 transition-all duration-700 flex items-center justify-center p-6 sm:p-10",
                                activeStep === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                            )}>
                                <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl shadow-2xl overflow-hidden">
                                    <div className="px-5 py-4 border-b border-white/10">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Deep Reel Analyzer</span>
                                        <p className="text-[11px] text-white/40 mt-0.5 font-mono">reel_id: CX9f2kL</p>
                                    </div>
                                    <div className="p-5 flex flex-col gap-3">
                                        {[
                                            { label: "Hook Analysis", value: "Strong curiosity gap in first 1.2s", score: 94, color: "bg-green-400" },
                                            { label: "Script Structure", value: "AIDA framework with hard cut loop", score: 88, color: "bg-primary" },
                                            { label: "Director's Pacing", value: "7 cuts in 15s — peak retention pattern", score: 91, color: "bg-blue-400" },
                                            { label: "Recreation Blueprint", value: "3-step script template generated", score: 100, color: "bg-green-400" },
                                        ].map((item) => (
                                            <div key={item.label} className="rounded-lg bg-white/5 border border-white/8 p-3">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-[11px] font-semibold text-white/70">{item.label}</span>
                                                    <span className="text-[11px] font-black text-primary">{item.score}</span>
                                                </div>
                                                <div className="h-1 w-full rounded-full bg-white/10">
                                                    <div className={`h-1 rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
                                                </div>
                                                <p className="text-[10px] text-white/40 mt-1.5">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Content Blueprint */}
                            <div className={classNames(
                                "absolute inset-0 transition-all duration-700 flex items-center justify-center p-6 sm:p-10",
                                activeStep === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                            )}>
                                <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl shadow-2xl overflow-hidden">
                                    <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                                        <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Content Blueprint</span>
                                        <span className="text-[10px] rounded-full bg-green-500/20 border border-green-500/40 text-green-400 px-2 py-0.5 font-bold">Ready</span>
                                    </div>
                                    <div className="p-5 flex flex-col gap-3">
                                        <div className="rounded-lg bg-primary/15 border border-primary/25 p-3">
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">Hook (0-2s)</p>
                                            <p className="text-xs text-white/80">&quot;Nobody talks about why your Reel flops — until now.&quot;</p>
                                        </div>
                                        <div className="rounded-lg bg-white/5 border border-white/8 p-3">
                                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1">Problem (2-8s)</p>
                                            <p className="text-xs text-white/70">Creators waste 10hrs/week on guesswork. Reveal the pain point fast.</p>
                                        </div>
                                        <div className="rounded-lg bg-white/5 border border-white/8 p-3">
                                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1">Solution (8-20s)</p>
                                            <p className="text-xs text-white/70">TheHookLab deconstructs viral reels into a step-by-step recreation guide.</p>
                                        </div>
                                        <div className="rounded-xl bg-primary text-white text-center py-2.5 text-sm font-bold shadow-lg shadow-primary/30 cursor-pointer hover:brightness-110 transition-all">
                                            Copy Script Template
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" data-testid="section-6" className="py-16 sm:py-24 lg:py-32">
                <div className="section-shell">
                    <h2 className="text-center text-2xl font-bold tracking-tight text-headline sm:text-3xl lg:text-4xl mb-12 lg:mb-16">
                        Unlock the power of <span className="text-primary">AI Engineering</span>
                    </h2>
                    
                    <div className="grid gap-0 lg:grid-cols-[1fr_2fr] items-start bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                        {/* Left Side: Features Navigation */}
                        <div className="flex flex-col border-r border-border h-full bg-surface/50">
                            {landingContent.features.map((feature, index) => {
                                const isActive = activeFeature === index;
                                const Icon = iconFor(feature.icon);
                                return (
                                    <button
                                        key={feature.key}
                                        onClick={() => { setActiveFeature(index); setIsFeatureAutoPlaying(false); }}
                                        className={classNames(
                                            "relative flex flex-col items-start p-6 sm:p-8 text-left transition-all duration-300 overflow-hidden",
                                            isActive 
                                                ? "bg-card" 
                                                : "border-transparent hover:bg-card/50",
                                            index !== landingContent.features.length - 1 ? "border-b border-border" : ""
                                        )}
                                    >
                                        {/* Static left border base */}
                                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-border" />
                                        {/* Animated progress line */}
                                        {isActive && (
                                            <div
                                                key={`feat-progress-${index}-${isFeatureAutoPlaying}`}
                                                className="absolute left-0 top-0 w-[3px] bg-primary"
                                                style={{
                                                    height: "0%",
                                                    animation: isFeatureAutoPlaying ? "progressFill 6s linear forwards" : "none",
                                                }}
                                            />
                                        )}
                                        {/* Always-visible active highlight when auto-play is off */}
                                        {isActive && !isFeatureAutoPlaying && (
                                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
                                        )}
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className={classNames(
                                                "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-colors",
                                                isActive ? "border-primary text-primary" : "border-muted text-muted"
                                            )}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <h3 className={classNames(
                                                "text-lg font-bold transition-colors",
                                                isActive ? "text-headline" : "text-muted"
                                            )}>
                                                {feature.title}
                                            </h3>
                                        </div>
                                        {isActive && (
                                            <div className="pl-12 mt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                                                <p className="text-sm leading-relaxed text-body">
                                                    {feature.description}
                                                </p>
                                                {feature.href && (
                                                    <Link
                                                        href={feature.href}
                                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
                                                    >
                                                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Side: Visual Display */}
                        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-zinc-900 to-black lg:aspect-auto lg:h-full min-h-[500px]">
                            {landingContent.features.map((feature, index) => {
                                const isActive = activeFeature === index;
                                return (
                                    <div 
                                        key={feature.key}
                                        className={classNames(
                                            "absolute inset-0 transition-all duration-700 transform",
                                            isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                        )}
                                    >
                                        {/* Background Image */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity transition-transform duration-1000"
                                            style={{ 
                                                backgroundImage: `url("/${[5, 2, 8, 7][index % 4]}.png")`,
                                                transform: isActive ? "scale(1.05)" : "scale(1)"
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
                                        
                                        {/* Overlay UI elements */}
                                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 p-6 sm:p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">
                                            <h4 className="text-xl font-bold text-white mb-4">{feature.heading}</h4>
                                            <ul className="space-y-3">
                                                {feature.bullets.slice(0, 3).map((bullet) => (
                                                    <li key={bullet} className="flex items-start gap-3 text-sm text-zinc-300">
                                                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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

                    <div className="mx-auto max-w-6xl mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3 lg:grid-cols-3">
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
                                            href={tier.upcoming ? "/pricing" : "https://app.thehooklab.in/login"}
                                            target={tier.upcoming ? undefined : "_blank"}
                                            rel={tier.upcoming ? undefined : "noopener noreferrer"}
                                            className={classNames(
                                                "inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition",
                                                tier.featured
                                                    ? "bg-primary text-bg hover:bg-primary-dark"
                                                    : "border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                                            )}
                                        >
                                            {tier.upcoming ? "Join Waitlist" : "Start Free Now"}
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


                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}
