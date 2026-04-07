export type NavItem = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type PainItem = {
  title: string;
  description: string;
  icon: "search-x" | "clock" | "layers";
};

export type StepItem = {
  step: number;
  title: string;
  description: string;
};

export type FeatureItem = {
  key: "finder" | "analysis" | "comparison" | "blueprint";
  icon: "search" | "dna" | "scale" | "file-text";
  heading: string;
  title: string;
  description: string;
  bullets: string[];
};

export type InsightItem = {
  title: string;
  description: string;
  icon: "gauge" | "clock" | "captions" | "sparkles" | "music" | "timer" | "activity" | "megaphone";
};

export type TestimonialItem = {
  quote: string;
  name: string;
  detail: string;
};

export type PricingTier = {
  key: "free" | "pro" | "agency";
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  subtitleMonthly: string;
  subtitleAnnual: string;
  featured?: boolean;
  included: string[];
  excluded: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LandingContent = {
  brand: {
    name: string;
    shortTagline: string;
    primaryTagline: string;
    finalCtaLine: string;
  };
  nav: NavItem[];
  hero: {
    eyebrow: string;
    animatedPrefix: string;
    animatedPhrases: string[];
    headline: string;
    subheadline: string;
    profilesAnalyzedLabel: string;
    profilesAnalyzedCount: string;
    searchPlaceholder: string;
    searchButtonLabel: string;
    searchHelperText: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
  };
  stats: StatItem[];
  painHeadline: string;
  pains: PainItem[];
  howItWorksHeadline: string;
  steps: StepItem[];
  features: FeatureItem[];
  comparison: {
    headline: string;
    subtext: string;
    cta: string;
  };
  insightsHeadline: string;
  insightsSubheadline?: string;
  insights: InsightItem[];
  testimonialsHeadline: string;
  testimonials: TestimonialItem[];
  pricingHeadline: string;
  pricingSubtext: string;
  pricing: PricingTier[];
  guarantee: string;
  faq: FaqItem[];
  finalCta: {
    headline: string;
    subtext: string;
    cta: string;
    trust: string;
  };
};

export const landingContent: LandingContent = {
  brand: {
    name: "ReelDNA",
    shortTagline: "The viral formula. Decoded.",
    primaryTagline: "Decode why any creator's reels go viral. In seconds.",
    finalCtaLine: "Stop guessing. Start decoding.",
  },
  nav: [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Compare", href: "#compare" },
    { label: "Pricing", href: "#pricing" },
  ],
  hero: {
    eyebrow: "AI-Powered Viral Reel Intelligence",
    animatedPrefix: "Analyze",
    animatedPhrases: ["creators", "comments", "captions", "competitors"],
    headline: "Finally Understand Why Your Favorite Creators' Reels Go Viral",
    subheadline:
      "Type any creator's name. Get instant AI analysis of their top viral reels: hooks, structure, emotion triggers, and the exact formula that made each one blow up.",
    profilesAnalyzedLabel: "PROFILES ANALYZED",
    profilesAnalyzedCount: "1,000+",
    searchPlaceholder: "Write any Instagram username",
    searchButtonLabel: "Analyze now",
    searchHelperText: "It's free!",
    primaryCta: "Analyze a Creator Free",
    secondaryCta: "Watch 60-sec Demo",
    trustLine: "No credit card required | Free forever plan | Works on any public creator",
  },
  stats: [
    { value: "14,000+", label: "Creators Analyzed" },
    { value: "380,000+", label: "Viral Reels Decoded" },
    { value: "9,200+", label: "Creators Growing Faster" },
  ],
  painHeadline:
    "You study the same creators every day. But you still cannot figure out what made that reel go viral.",
  pains: [
    {
      icon: "search-x",
      title: "No clear reason for one viral reel",
      description:
        "You watch the same reel over and over and still do not know what made it explode while other posts stayed flat.",
    },
    {
      icon: "clock",
      title: "Weeks lost to guessing",
      description:
        "You are guessing hooks, pacing, and captions, then burning time testing ideas without knowing what works.",
    },
    {
      icon: "layers",
      title: "No true multi-creator view",
      description:
        "There is no simple way to compare top creators in your niche side by side and spot shared winning patterns.",
    },
  ],
  howItWorksHeadline: "From creator name to viral blueprint in under 60 seconds",
  steps: [
    {
      step: 1,
      title: "Enter any creator's name",
      description: "Type any public Instagram creator username into the search bar.",
    },
    {
      step: 2,
      title: "AI finds top viral reels",
      description:
        "ReelDNA automatically pulls their top 10-20 best-performing reels ranked by virality score.",
    },
    {
      step: 3,
      title: "Get the full viral formula",
      description:
        "See exactly why each reel blew up: hooks, emotion, audio, pacing, captions, and more.",
    },
  ],
  features: [
    {
      key: "finder",
      icon: "search",
      heading: "Type a name. See what actually went viral.",
      title: "Viral Reel Finder",
      description:
        "Enter any public creator username and ReelDNA finds and ranks top reels without account linking.",
      bullets: [
        "Works on any public Instagram account",
        "Ranks by virality score (views + engagement)",
        "Shows thumbnail, views, likes, and comments",
        "Sort by views, engagement, recent, or virality",
      ],
    },
    {
      key: "analysis",
      icon: "dna",
      heading: "8 reasons why that reel blew up. All in one screen.",
      title: "Deep AI Analysis Per Reel",
      description:
        "Click any reel and get an eight-dimension breakdown in plain English so you know what made it win.",
      bullets: [
        "Hook strength score (0-100)",
        "Emotion trigger, pacing, caption, and audio analysis",
        "Video duration sweet spot detection",
        "Why this reel beat their non-viral reels",
      ],
    },
    {
      key: "comparison",
      icon: "scale",
      heading: "Compare the best. Copy the pattern. Make it yours.",
      title: "Multi-Creator Comparison",
      description:
        "Add 2 to 5 creators and surface the exact patterns all top creators in your niche share.",
      bullets: [
        "Side-by-side creator comparison workspace",
        "Shared patterns highlighted in green",
        "Unique patterns per creator surfaced clearly",
        "Combined Viral Blueprint generated automatically",
      ],
    },
    {
      key: "blueprint",
      icon: "file-text",
      heading: "Your viral strategy. One click to download.",
      title: "Viral Blueprint Report",
      description:
        "Generate a clean PDF report after any analysis so you can save, share, and apply every insight.",
      bullets: [
        "One-click PDF generation",
        "Includes reels, patterns, scores, and recommendations",
        "Share via link or download",
        "Agency plan supports white-label exports",
      ],
    },
  ],
  comparison: {
    headline: "Compare the best. Copy the pattern. Make it yours.",
    subtext:
      "Add up to 5 creators. ReelDNA analyzes all of them and shows the patterns every top creator in your niche shares.",
    cta: "Try the Comparison Tool Free",
  },
  insightsHeadline: "Most reels fail in 3 seconds. We fix that.",
  insightsSubheadline: "Stop guessing why your favorites win. ReelDNA decodes the exact patterns hidden in every viral reel so you can start growing.",
  insights: [
    {
      icon: "gauge",
      title: "Hook Analysis",
      description: "Know why people scroll or stop.",
    },
    {
      icon: "clock",
      title: "Watch Time Pattern",
      description: "Identify drop-off moments.",
    },
    {
      icon: "captions",
      title: "Caption Intelligence",
      description: "What actually makes people comment.",
    },
    {
      icon: "sparkles",
      title: "Emotion Mapping",
      description: "What triggers shares & saves.",
    },
    {
      icon: "music",
      title: "Audio Choice",
      description: "Understand trending audio versus original sound.",
    },
    {
      icon: "timer",
      title: "Video Duration",
      description: "Find the duration sweet spot for this audience.",
    },
    {
      icon: "activity",
      title: "AI Virality Score",
      description: "Compare against niche averages.",
    },
    {
      icon: "megaphone",
      title: "CTA Optimization",
      description: "Where you lose conversions.",
    },
  ],
  testimonialsHeadline: "What creators are saying",
  testimonials: [
    {
      quote:
        "I finally understand why one creator blows up every time. I found three patterns I now use in every reel. My average views doubled in two weeks.",
      name: "Sarah K.",
      detail: "Fitness Creator, 180K followers",
    },
    {
      quote:
        "The comparison feature is insane. I added four top creators in my niche and ReelDNA showed me the one hook format they all use.",
      name: "Marcus T.",
      detail: "Agency Owner",
    },
    {
      quote:
        "I went from 2,000 views to 38,000 on my next reel after applying the viral blueprint ReelDNA gave me.",
      name: "Priya M.",
      detail: "Lifestyle Creator, 90K followers",
    },
  ],
  pricingHeadline: "Simple pricing. Powerful insights.",
  pricingSubtext: "Start free. Upgrade when you are ready. No surprise charges. Cancel anytime.",
  pricing: [
    {
      key: "free",
      name: "Free",
      priceMonthly: "$0",
      priceAnnual: "$0",
      subtitleMonthly: "forever",
      subtitleAnnual: "forever",
      included: [
        "3 creator analyses per month",
        "Top 10 viral reels per creator",
        "5-dimension AI analysis",
        "Basic virality score",
      ],
      excluded: [
        "Multi-creator comparison",
        "Viral Blueprint PDF",
        "Saved workspaces",
        "Priority support",
      ],
    },
    {
      key: "pro",
      name: "Pro",
      priceMonthly: "$29",
      priceAnnual: "$24",
      subtitleMonthly: "per month",
      subtitleAnnual: "/mo billed annually",
      featured: true,
      included: [
        "Unlimited creator analyses",
        "Top 20 viral reels per creator",
        "Full 8-dimension AI analysis",
        "Multi-creator comparison (up to 5)",
        "Viral Blueprint PDF export",
        "Saved workspaces and creator lists",
      ],
      excluded: ["Team seats", "White-label reports"],
    },
    {
      key: "agency",
      name: "Agency",
      priceMonthly: "$79",
      priceAnnual: "$66",
      subtitleMonthly: "per month",
      subtitleAnnual: "/mo billed annually",
      included: [
        "Everything in Pro",
        "5 team seats included",
        "Unlimited creator comparisons",
        "White-label PDF reports",
        "Client workspace management",
        "Priority email and chat support",
        "API access (coming soon)",
        "Custom onboarding call",
      ],
      excluded: [],
    },
  ],
  guarantee:
    "14-day money-back guarantee on all paid plans. If you do not find a single useful insight in 14 days, you get a full refund.",
  faq: [
    {
      question: "Does this work on any Instagram creator?",
      answer:
        "Yes. ReelDNA works on any public Instagram account. You do not need permission and you do not need to connect your own account.",
    },
    {
      question: "How is this different from Instagram's own analytics?",
      answer:
        "Instagram analytics only show your own content after posting. ReelDNA helps you analyze any creator before you create your next reel.",
    },
    {
      question: "How is this different from tools like ViralScope or Virlo?",
      answer:
        "Those tools focus on tracking your own performance. ReelDNA is built for competitor research and viral pattern decoding across creators.",
    },
    {
      question: "How accurate is the AI analysis?",
      answer:
        "ReelDNA analyzes patterns correlated with high performance, including hook type, pacing, caption, audio, and duration. It is not a guarantee of virality.",
    },
    {
      question: "Can I compare multiple creators at the same time?",
      answer:
        "Yes. Pro and Agency plans support up to five creators in one comparison workspace with shared and unique pattern output.",
    },
    {
      question: "What do I get on the Free plan?",
      answer:
        "The Free plan includes three creator analyses per month, top 10 reels per creator, and a 5-dimension AI breakdown.",
    },
    {
      question: "Do I need a Creator or Business Instagram account?",
      answer:
        "No. You do not connect your own account at all. ReelDNA works by analyzing public creator usernames.",
    },
    {
      question: "Is my data safe?",
      answer:
        "ReelDNA stores only analysis results you choose to save in your workspace. Your research is not sold or shared with other users.",
    },
  ],
  finalCta: {
    headline: "Stop guessing. Start decoding.",
    subtext: "Join 9,000+ creators who know the exact viral formula.",
    cta: "Analyze a Creator Free",
    trust: "No credit card required",
  },
};

