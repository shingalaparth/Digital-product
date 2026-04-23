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
  href?: string;
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

export type UseCaseItem = {
  title: string;
  description: string;
  perfectFor: string;
  link: string;
  linkLabel: string;
};

export type PricingTier = {
  key: "free" | "pro" | "enterprise";
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  subtitleMonthly: string;
  subtitleAnnual: string;
  featured?: boolean;
  upcoming?: boolean;
  included: string[];
  excluded: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CaseStudyItem = {
  label: string;
  title: string;
  metric: string;
  metricLabel: string;
  description: string;
  href: string;
};

export type FreeToolItem = {
  title: string;
  description: string;
  cta: string;
  href: string;
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
  painSubheadline: string;
  painSteps: string[];
  singleReelCta: {
    headline: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
  };
  howItWorksHeadline: string;
  steps: StepItem[];
  features: FeatureItem[];

  insightsHeadline: string;
  insightsSubheadline?: string;
  insights: InsightItem[];
  caseStudies: {
    headline: string;
    subheadline: string;
    items: CaseStudyItem[];
  };
  testimonialsHeadline: string;
  testimonials: TestimonialItem[];
  freeTools: {
    headline: string;
    subheadline: string;
    items: FreeToolItem[];
  };
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
  useCases: {
    headline: string;
    items: UseCaseItem[];
  };
};

export const landingContent: LandingContent = {
  brand: {
    name: "TheHookLab",
    shortTagline: "AI-Powered Competitor Intelligence for Social Media.",
    primaryTagline: "See Exactly Why Your Competitor's Content Goes Viral — In 10 Seconds.",
    finalCtaLine: "Stop guessing what to post. Start winning with data.",
  },
  nav: [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Compare", href: "#compare" },
    { label: "Pricing", href: "#pricing" },
  ],
  hero: {
    eyebrow: "Unlock Your Next Viral Hit with TheHookLab AI",
    animatedPrefix: "The Content Engine",
    animatedPhrases: ["viral blueprints", "hidden patterns", "creator secrets", "winning hooks"],
    headline: "Stop Guessing. Start Winning with Data-Driven Content.",
    subheadline:
      "TheHookLab helps you reverse-engineer your competitors' highest-performing Reels and Ads so you can replicate their success—with AI.",
    profilesAnalyzedLabel: "BRANDS & CREATORS TRUST US",
    profilesAnalyzedCount: "100+",
    searchPlaceholder: "Enter a competitor's @handle to analyze...",
    searchButtonLabel: "Analyze Competitor",
    searchHelperText: "It's free — no credit card required!",
    primaryCta: "Start Free 7-Day Trial",
    secondaryCta: "Watch 60-sec Demo",
    trustLine: "Trusted by early-stage brands, agencies, and creators across India",
  },
  stats: [
    { value: "10+", label: "AI Analysis Modes" },
    { value: "3", label: "Platforms & Features Supported (IG/FB/Reels)" },
    { value: "10x", label: "Faster Content Planning" },
    { value: "1,500+", label: "Viral Reels Deconstructed" },
  ],
  painHeadline:
    "You're Doing Competitor Research the Hard Way. It's Costing You Hours, Money, and Relevance.",
  painSubheadline:
    "Every brand, creator, and agency does competitor research. But here is how most people do it today:",
  painSteps: [
    "Open your competitor's profile. Scroll through their Reels. Manually. For 30 minutes.",
    "Screenshot the ones that 'look good.' Dump them in a Google Drive folder you will never organize.",
    "Try to figure out why one Reel got 100K views and another got 800. Fail. Because the answer is buried in the hook, the pacing, and the concept structure.",
    "Post something based on gut feeling. Hope it works. It does not.",
    "Repeat tomorrow. And the day after. And the day after that.",
  ],
  singleReelCta: {
    headline: "The modern way to analyze and engineer viral reels.",
    primaryCta: {
      label: "Analyze a Reel →",
      href: "https://hookx.vercel.app/analyze",
    },
    secondaryCta: {
      label: "Explore AI Studio →",
      href: "/features/deep-reel-analyzer",
    },
  },
  howItWorksHeadline: "How TheHookLab Works — 3 Steps to Better Content",
  steps: [
    {
      step: 1,
      title: "Add Competitors & Track Ads",
      description: "Enter competitor Instagram profiles or Facebook Ads Pages. We automatically scrape their latest content and performance stats.",
    },
    {
      step: 2,
      title: "Deep Analyze Viral Reels",
      description:
        "Paste any viral Reel URL to get a 5-mode breakdown: concept analysis, director's shot list, editor's cuts, and a recreation blueprint.",
    },
    {
      step: 3,
      title: "Generate New Hybrid Concepts",
      description:
        "Use our Content Mix tool to merge the best elements from multiple viral videos into a brand new, unique hybrid concept tailored to your brand.",
    },
  ],
  features: [
    {
      key: "finder",
      icon: "search",
      heading: "Stop Guessing Why a Video Went Viral",
      title: "Deep Reel Analyzer (5-Mode Breakdown)",
      description:
        "Get a comprehensive 5-mode breakdown of any Instagram Reel. Paste a URL and our AI reverse-engineers the success formula.",
      bullets: [
        "Concept Analysis: Extract hooks and retention mechanisms",
        "Director Mode: Shot types, camera angles, and lighting",
        "Editor Mode: Pacing, cuts, effects, and text animation",
        "Recreation Blueprint: Step-by-step shooting guides",
      ],
      href: "/features/deep-reel-analyzer",
    },
    {
      key: "analysis",
      icon: "dna",
      heading: "Create the Perfect Hybrid Concept",
      title: "Content Mix Engine",
      description:
        "Don't just copy one competitor. Merge winning elements from 2-3 viral videos into a completely new, unique hybrid concept for your brand.",
      bullets: [
        "Select multiple top-performing videos",
        "AI fuses hooks, structures, and strategies",
        "Generates a unique, original script",
        "Tailored specifically to your niche",
      ],
      href: "/features/content-mix",
    },
    {
      key: "comparison",
      icon: "scale",
      heading: "See Where They Spend Their Money",
      title: "Facebook Ads Library Tracker",
      description:
        "Track your competitors' Facebook ad strategies. Auto-scrape and analyze their active ad library to see what creatives are driving their sales.",
      bullets: [
        "Track unlimited Facebook competitor pages",
        "Auto-scrape their active Ads Library",
        "Analyze ad copy and creative formats",
        "Never miss a competitor's new campaign",
      ],
      href: "/features/ads-library",
    },
    {
      key: "blueprint",
      icon: "file-text",
      heading: "Tailored to Your Exact Niche",
      title: "AI Template Generation",
      description:
        "Describe your brand once, and let Gemini AI create custom analysis and concept generation instructions for your specific niche.",
      bullets: [
        "Custom analysis focus parameters",
        "Tailored concept generation guidelines",
        "Automatically generated by AI",
        "Ensure outputs perfectly match your brand voice",
      ],
      href: "/features/ai-templates",
    },
  ],

  insightsHeadline: "What You Get With TheHookLab",
  insightsSubheadline: "Everything you need to stop guessing and start growing — powered by deep AI competitor intelligence.",
  insights: [
    {
      icon: "gauge",
      title: "Reel Deep Analyzer",
      description: "5-tab breakdown of any reel: concept, script, and hooks.",
    },
    {
      icon: "clock",
      title: "Competitor Tracking",
      description: "Auto-scrape and track follower growth and avg views.",
    },
    {
      icon: "captions",
      title: "Facebook Ads Library",
      description: "Monitor competitor ad strategies and active creatives.",
    },
    {
      icon: "sparkles",
      title: "Content Mix Generation",
      description: "Fuse multiple viral videos into new hybrid concepts.",
    },
    {
      icon: "music",
      title: "Director's Blueprint",
      description: "Get exact shot lists, camera angles, and lighting guides.",
    },
    {
      icon: "timer",
      title: "Editor's Breakdown",
      description: "Discover pacing, cuts, and text animation strategies.",
    },
    {
      icon: "activity",
      title: "Recreation Guides",
      description: "Step-by-step guides for both beginners and pro editors.",
    },
    {
      icon: "megaphone",
      title: "Prompt Templates",
      description: "Configure how AI analyzes videos for your specific niche.",
    },
  ],
  caseStudies: {
    headline: "Real Results. Real Businesses. Real Data.",
    subheadline: "See how brands, agencies, and creators are growing with TheHookLab's AI-powered competitor intelligence.",
    items: [],
  },
  testimonialsHeadline: "Results From Real Users",
  testimonials: [],
  freeTools: {
    headline: "Free Tools & Resources to Get Started",
    subheadline: "No login. No credit card. Start analyzing competitors and improving your content strategy right now.",
    items: [],
  },
  pricingHeadline: "Simple, Transparent Pricing",
  pricingSubtext: "Start for free, upgrade when you need to unlock save and download features.",
  pricing: [
    {
      key: "free",
      name: "Free",
      priceMonthly: "₹0",
      priceAnnual: "₹0",
      subtitleMonthly: "forever",
      subtitleAnnual: "forever",
      featured: true,
      included: [
        "Deep Reel Analyzer (5 modes)",
        "Content Mix Engine",
        "Facebook Ads Tracking",
        "AI Template Generation",
      ],
      excluded: [
        "Save & Star favorite content",
        "Download Facebook Ad reports",
      ],
    },
    {
      key: "pro",
      name: "Pro",
      priceMonthly: "TBA",
      priceAnnual: "TBA",
      subtitleMonthly: "per month",
      subtitleAnnual: "/mo billed annually",
      upcoming: true,
      included: [
        "Everything in Free, plus:",
        "Save & Star favorite content",
        "Download Facebook Ad reports",
        "Unlimited API usage",
      ],
      excluded: [
        "Dedicated Account Manager",
        "White-label reporting",
      ],
    },
    {
      key: "enterprise",
      name: "Enterprise",
      priceMonthly: "TBA",
      priceAnnual: "TBA",
      subtitleMonthly: "Contact Us",
      subtitleAnnual: "Contact Us",
      upcoming: true,
      included: [
        "Everything in Pro, plus:",
        "Custom API Integrations",
        "Dedicated Account Manager",
        "White-label reporting",
        "Priority Support",
      ],
      excluded: [],
    },
  ],
  guarantee:
    "Lock in 50% off lifetime with annual plans (Founding Member Deal) · 7-day free trial · 30-day money-back guarantee.",
  faq: [
    {
      question: "How does the AI analysis work?",
      answer:
        "TheHookLab's Deep Analyzer uses Gemini AI to reverse-engineer any Instagram Reel URL. It breaks down the video into 5 modes: core analysis, new concepts, director's shot list, editor's pacing, and a recreation blueprint. You simply paste the URL and our AI does the heavy lifting in under 2 minutes.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. Cancel with one click from your dashboard. No contracts, no lock-in, no questions asked. We also offer a 30-day money-back guarantee on all paid plans.",
    },
    {
      question: "Can I upgrade or downgrade mid-month?",
      answer:
        "Yes. Upgrades take effect immediately (we prorate the difference). Downgrades take effect at the start of your next billing cycle.",
    },
    {
      question: "What is the Content Mix feature?",
      answer:
        "Content Mix allows you to select 2 to 3 previously analyzed competitor videos. Our AI then merges the winning elements (hooks, structures, pacing) from all of them to generate a brand new, unique hybrid concept tailored specifically to your brand.",
    },
    {
      question: "What is the Founding Member Deal?",
      answer:
        "If you sign up for any annual plan before June 30, 2026, you lock in a 50% discount for the lifetime of your subscription. Even when we raise prices, your rate stays the same.",
    },
    {
      question: "How does the manual vs AI analysis compare in price?",
      answer:
        "TheHookLab Starter (₹999) costs roughly 90% less than hiring a freelancer for manual tracking and provides deep AI breakdowns that manual research simply can't match.",
    },
    {
      question: "What happens after my 7-day trial ends?",
      answer:
        "If you've added a payment method, your subscription starts. If not, your access ends and you won't be charged. No hidden fees.",
    },
  ],
  finalCta: {
    headline: "Never fall short of performance targets",
    subtext: "TheHookLab does the heavy-lifting to bring you insights that keep you ahead.",
    cta: "Start Free Trial",
    trust: "Join creators and brands who stopped guessing and started winning · 7-day free trial · 30-day money-back guarantee",
  },
  useCases: {
    headline: "Built for Everyone Who Takes Social Media Seriously",
    items: [
      {
        title: "For Brands",
        description: "You sell through social media. So do your competitors. TheHookLab shows you their exact content strategy and Facebook Ads. Use their data to grow faster, spend less on trial-and-error, and outperform brands with 10x your budget.",
        perfectFor: "D2C brands, e-commerce stores, restaurants, real estate, startups",
        link: "/pricing",
        linkLabel: "Get Started Now",
      },
      {
        title: "For Creators",
        description: "You post Reels every day. But are you posting the right Reels? TheHookLab lets you deep-analyze the top creators in your niche. Get director and editor blueprints so you know exactly how to shoot and edit before you press record.",
        perfectFor: "Content creators, influencers, coaches, personal brand builders",
        link: "/pricing",
        linkLabel: "Get Started Now",
      },
      {
        title: "For Agencies",
        description: "You manage multiple clients and competitors. Manual research takes your team 20 hours per week. TheHookLab speeds up the entire process. Use the Content Mix tool to instantly generate hybrid concepts for your clients.",
        perfectFor: "Digital marketing agencies, social media agencies",
        link: "/pricing",
        linkLabel: "Get Started Now",
      },
      {
        title: "For Freelancers",
        description: "Your clients ask 'why did our competitor get better engagement?' and you need a data-backed answer. TheHookLab's 5-mode Deep Analyzer gives you that answer in 2 minutes. Offer premium strategy alongside execution.",
        perfectFor: "Freelance social media managers, marketing consultants, video editors",
        link: "/pricing",
        linkLabel: "Get Started Now",
      },
    ],
  },
};
