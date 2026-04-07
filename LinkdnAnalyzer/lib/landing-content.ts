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
  image: string;
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
  icon: "gauge" | "clock" | "captions" | "sparkles" | "layers" | "timer" | "activity" | "megaphone";
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
    avatarsText: string;
    stats: { value: string; label: string; unitColor: string }[];
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
    name: "ContentAnalyzer",
    shortTagline: "The LinkedIn formula. Decoded.",
    primaryTagline: "Decode why any LinkedIn post goes viral. Generate endless ideas.",
    finalCtaLine: "Stop guessing. Start writing.",
  },
  nav: [
    { label: "Features", href: "#features" },
    { label: "Works ?", href: "#how-it-works" },
    { label: "Compare", href: "#compare" },
    { label: "Pricing", href: "#pricing" },
  ],
  hero: {
    eyebrow: "AI-Powered LinkedIn Post Intelligence",
    animatedPrefix: "with ",
    animatedPhrases: ["viral hooks", "better copy", "proven formulas", "AI insights", "viral posts"],
    headline: "Grow faster on ",
    subheadline:
      "Understand your audience, refine your content, and accelerate your LinkedIn growth, all in one place.",
    profilesAnalyzedLabel: "PROFILES ANALYZED",
    profilesAnalyzedCount: "2,500+",
    searchPlaceholder: "Write any LinkedIn profile URL or name",
    searchButtonLabel: "Analyze now",
    searchHelperText: "It's free!",
    primaryCta: "Get started for free",
    secondaryCta: "Watch 60-sec Demo",
    trustLine: "No credit card required.",
    avatarsText: "Loved by +44,160 top LinkedIn creators worldwide",
    stats: [
      { value: "2.3x", label: "more impressions", unitColor: "text-hot" },
      { value: "1.5x", label: "followers", unitColor: "text-hot" },
      { value: "2.7x", label: "more business opportunities", unitColor: "text-hot" },
    ],
  },
  stats: [
    { value: "18,000+", label: "Creators Analyzed" },
    { value: "500,000+", label: "Viral Posts Decoded" },
    { value: "1.2B+", label: "Impressions Tracked" },
  ],
  painHeadline:
    "You stare at a blank screen while your competitors scale their audience effortlessly.",
  pains: [
    {
      icon: "search-x",
      title: "No clear reason for virality",
      image: "/p1.png",
      description:
        "You read a simple text post with 10k likes and have no idea why it went viral while your perfectly crafted post stayed flat.",
    },
    {
      icon: "clock",
      title: "Hours lost guessing hooks",
      image: "/p2.png",
      description:
        "You waste time trying to guess the right first line and formatting structure instead of knowing exactly what makes people click 'see more'.",
    },
    {
      icon: "layers",
      title: "No inspiration engine",
      image: "/p3.png",
      description:
        "There is no easy way to turn the best performing content in your industry into actionable templates and fresh ideas for your own feed.",
    },
  ],
  howItWorksHeadline: "From a creator's name to a customized viral blueprint in seconds",
  steps: [
    {
      step: 1,
      title: "Drop a LinkedIn link",
      description: "Paste the URL of any public LinkedIn profile into the search bar.",
    },
    {
      step: 2,
      title: "AI finds top posts",
      description:
        "ContentAnalyzer pulls their best-performing posts ranked by impressions, likes, and comments.",
    },
    {
      step: 3,
      title: "Get content ideas instantly",
      description:
        "See the hooks, formatting tricks, and generate 10 new content ideas adapted to your niche.",
    },
  ],
  features: [
    {
      key: "finder",
      icon: "search",
      heading: "Find their best posts without endlessly scrolling.",
      title: "Viral Post Finder",
      description:
        "Enter any public creator and ContentAnalyzer ranks their top text, image, and carousel posts instantly.",
      bullets: [
        "Works on any public LinkedIn profile",
        "Ranks by calculated impressions and engagement",
        "Filters by post type (Text, Carousel, Video, Image)",
        "Shows exact 'see more' hook break points",
      ],
    },
    {
      key: "analysis",
      icon: "dna",
      heading: "Deconstruct the anatomy of a 10M impression post.",
      title: "Deep AI Hook & Formatting Analysis",
      description:
        "Click any post to get a breakdown of its structure, word count, readability, and emotional triggers.",
      bullets: [
        "Hook strength grading and 'See More' clickability",
        "Formatting insights (line breaks, bullet use)",
        "Carousel slide drop-off estimates",
        "Call to Action (CTA) effectiveness scoring",
      ],
    },
    {
      key: "comparison",
      icon: "scale",
      heading: "Compare thought leaders. Extract their shared strategies.",
      title: "Multi-Creator Comparison",
      description:
        "Add up to 5 creators and surface the exact content frameworks that all top players in your niche share.",
      bullets: [
        "Side-by-side writing style comparison",
        "Shared hook patterns highlighted",
        "Topic density mapping across creators",
        "Combined Content Blueprint generated automatically",
      ],
    },
    {
      key: "blueprint",
      icon: "file-text",
      heading: "Turn other people's success into your content calendar.",
      title: "AI Content Ideation Engine",
      description:
        "We don't just show you what worked—we use AI to frame those winning patterns into prompt ideas for your own brand.",
      bullets: [
        "Generate 30 days of ideas based on competitor data",
        "Fill-in-the-blank hook templates",
        "Shareable PDF and Notion export integrations",
        "Agency plan supports unlimited client pipelines",
      ],
    },
  ],
  comparison: {
    headline: "Compare the best. Copy the framework. Make it yours.",
    subtext:
      "Add up to 5 thought leaders in your industry. ContentAnalyzer decodes their writing style and shows the exact patterns that command authority.",
    cta: "Try the Comparison Tool Free",
  },
  insightsHeadline: "You have 2 lines before 'see more'. Make them count.",
  insightsSubheadline: "Stop guessing why other creators win over the algorithm. ContentAnalyzer decodes the exact formatting and psychology behind top posts.",
  insights: [
    {
      icon: "gauge",
      title: "Hook Analysis",
      description: "The psychology behind the crucial first two lines.",
    },
    {
      icon: "captions",
      title: "Formatting & Spacing",
      description: "How line breaks affect readability and dwell time.",
    },
    {
      icon: "sparkles",
      title: "Idea Generation",
      description: "Turn one viral post into ten unique angles.",
    },
    {
      icon: "layers",
      title: "Carousel Flow",
      description: "Structure slides to prevent mid-swipe drop-off.",
    },
    {
      icon: "timer",
      title: "Post Length",
      description: "Find the word count sweet spot for your audience.",
    },
    {
      icon: "activity",
      title: "Algorithm Friendliness",
      description: "Analyze hashtag use and external link penalties.",
    },
    {
      icon: "megaphone",
      title: "Comment Baiting",
      description: "What actually drives high-quality conversations.",
    },
  ],
  testimonialsHeadline: "What founders and creators are saying",
  testimonials: [
    {
      quote:
        "I was tired of scraping LinkedIn manually. ContentAnalyzer showed me the exact hook formula the top 3 creators in my space were using. I hit 1M impressions the next month.",
      name: "David R.",
      detail: "B2B SaaS Founder",
    },
    {
      quote:
        "The AI ideation engine alone is worth the price. I click on my competitor's viral post, and it gives me 5 unique ways to write about the same topic with my own voice.",
      name: "Elena M.",
      detail: "Ghostwriter & Agency Owner",
    },
    {
      quote:
        "Finally a tool that actually analyzes formatting! Realizing my paragraphs were too dense literally changed my entire engagement overnight.",
      name: "James L.",
      detail: "Solopreneur",
    },
  ],
  pricingHeadline: "Pricing that scales with your ambition.",
  pricingSubtext: "Start for free. Upgrade when you are ready to dominate the feed.",
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
        "Top 10 viral posts per creator",
        "Basic Hook & Formatting analysis",
        "Limited content idea generation",
      ],
      excluded: [
        "Multi-creator comparison",
        "30-day Content Calendar Export",
        "Saved workspaces",
        "Priority support",
      ],
    },
    {
      key: "pro",
      name: "Pro",
      priceMonthly: "$39",
      priceAnnual: "$29",
      subtitleMonthly: "per month",
      subtitleAnnual: "/mo billed annually",
      featured: true,
      included: [
        "Unlimited creator analyses",
        "Top 50 posts per creator",
        "Full AI Hook & Sentiment Analysis",
        "Unlimited AI content idea generation",
        "Multi-creator comparison (up to 5)",
        "Notion & CSV exports",
      ],
      excluded: ["Team seats", "White-label reports"],
    },
    {
      key: "agency",
      name: "Agency",
      priceMonthly: "$99",
      priceAnnual: "$89",
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
    "14-day money-back guarantee on all paid plans. If you do not save hours on content creation this week, you get a full refund.",
  faq: [
    {
      question: "Does this work on any LinkedIn creator?",
      answer:
        "Yes. ContentAnalyzer works on any public LinkedIn profile. You do not need permission and you do not need to connect your own account.",
    },
    {
      question: "How does it generate content ideas?",
      answer:
        "Our AI analyzes the core topic, hook structure, and formatting of a viral post, then uses that framework to prompt you with fresh angles tailored to your own expertise.",
    },
    {
      question: "Is this safe to use with my LinkedIn account?",
      answer:
        "Absolutely. You do not authenticate with your LinkedIn account. The tool analyzes public data independently, so your account is entirely safe from restrictions.",
    },
    {
      question: "Does it work for carousels and images?",
      answer:
        "Yes! ContentAnalyzer classifies posts by media type and can analyze text overlays, carousel slide counts, and image effectiveness.",
    },
    {
      question: "Can I use this to ghostwrite for clients?",
      answer:
        "Yes. The Agency plan is specifically designed for ghostwriters and social media managers, allowing you to manage multiple client workspaces and export white-labeled reports.",
    },
  ],
  finalCta: {
    headline: "Stop guessing. Start writing.",
    subtext: "Join 15,000+ thought leaders who know the exact formula.",
    cta: "Start Analyzing for Free",
    trust: "No credit card required",
  },
};
