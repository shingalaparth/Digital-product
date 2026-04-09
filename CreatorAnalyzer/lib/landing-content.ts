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
    name: "Reel!DNA",
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
    animatedPhrases: ["competitors", "profitable hooks", "viral patterns", "growth loops"],
    headline: "Scale Your Growth & Revenue by Decoding the Viral DNA of Top Creators",
    subheadline:
      "Stop wasting time on content that flops. Use AI to extract high-profit hooks, winning structures, intresting scripts and the exact formulas that drive millions of views. Grow faster, monetize better.",
    profilesAnalyzedLabel: "PROFILES ANALYZED",
    profilesAnalyzedCount: "14,200+",
    searchPlaceholder: "Enter an Instagram username to decode...",
    searchButtonLabel: "Analyze for Profit",
    searchHelperText: "It's free!",
    primaryCta: "Analyze a Creator Free",
    secondaryCta: "Watch 60-sec Demo",
    trustLine: "No credit card required | Proven growth patterns | Works on any public creator",
  },
  stats: [
    { value: "14,000+", label: "Creators Analyzed" },
    { value: "380,000+", label: "Viral Reels Decoded" },
    { value: "9,200+", label: "Creators Growing Faster" },
  ],
  painHeadline:
    "You're working hard, but your reach is flat. Stop guessing and start using the data that drives million-dollar creators.",
  pains: [
    {
      icon: "search-x",
      title: "Stop Burning Cash on Content That Flops",
      description:
        "Every reel that doesn't go viral is wasted time and money. Use proven data to ensure every post has the highest chance of exploding.",
    },
    {
      icon: "clock",
      title: "Gain an Unfair Advantage Over Your Competition",
      description:
        "Your competitors are scaling while you're still testing. ReelDNA gives you the exact formula they use, so you can beat them at their own game.",
    },
    {
      icon: "layers",
      title: "Eliminate the 'Guesswork' from Your Strategy",
      description:
        "No more staring at a blank screen. Identify shared winning patterns across your entire niche in seconds and replicate what works.",
    },
  ],
  howItWorksHeadline: "Your Viral Growth Roadmap in Under 60 Seconds",
  steps: [
    {
      step: 1,
      title: "Target Any Top Creator",
      description: "Enter any public Instagram username that's currently winning in your niche.",
    },
    {
      step: 2,
      title: "AI Extracts the Viral DNA",
      description:
        "ReelDNA automatically identifies and ranks their most profitable and viral content pieces.",
    },
    {
      step: 3,
      title: "Implement the Winning Formula",
      description:
        "Get the exact hooks, structure, and emotional triggers to apply to your own content for instant results.",
    },
  ],
  features: [
    {
      key: "finder",
      icon: "search",
      heading: "Identify High-Growth Content Ideas Instantly",
      title: "Viral Reel Finder",
      description:
        "Surface the content that's actually driving reach in your niche. No more guessing what's trending.",
      bullets: [
        "Works on any public Instagram account",
        "Ranks by Virality & Profit Potential Score",
        "Deep engagement metrics (views/likes/comments ratio)",
        "Filter by recent winners to stay ahead of trends",
      ],
    },
    {
      key: "analysis",
      icon: "dna",
      heading: "The Blueprint for Consistent 100K+ View Reels",
      title: "Deep AI Analysis",
      description:
        "We break down the 'why' behind the views so you can replicate the success with your own unique voice.",
      bullets: [
        "Hook strength analysis (find what stops the scroll)",
        "Emotion mapping to trigger shares and saves",
        "Pacing and duration sweet spots for maximum retention",
        "The 'Viral Delta': why this reel outperformed everything else",
      ],
    },
    {
      key: "comparison",
      icon: "scale",
      heading: "Outperform Your Niche with Competitor Intelligence",
      title: "Multi-Creator Comparison",
      description:
        "Add your top 5 competitors and surface the 'Secret Sauce' that all industry leaders are using.",
      bullets: [
        "Side-by-side pattern recognition workspace",
        "Highlight shared winning formulas across creators",
        "Spot content gaps your competitors are missing",
        "Automatically generated niche growth strategy",
      ],
    },
    {
      key: "blueprint",
      icon: "file-text",
      heading: "Close High-Ticket Clients with Data-Backed Reports",
      title: "Viral Blueprint Reports",
      description:
        "Generate professional PDF reports to prove your content strategy works. Perfect for creators and agencies.",
      bullets: [
        "One-click professional PDF generation",
        "Full data breakdowns to justify content decisions",
        "Client-ready white-label exports (Agency Plan)",
        "Actionable checklists for every content piece",
      ],
    },
  ],
  comparison: {
    headline: "Spy. Analyze. Outperform.",
    subtext:
      "Select up to 5 creators and ReelDNA will surface the exact patterns every leader in your niche is currently using to dominate the algorithm.",
    cta: "Start Competitor Analysis",
  },
  insightsHeadline: "We Solve the Problem of 'Flat' Reach.",
  insightsSubheadline: "Stop guessing why your favorites win. ReelDNA decodes the hidden ROI patterns in every viral reel so you can scale your personal brand or agency.",
  insights: [
    {
      icon: "gauge",
      title: "High-Profit Hook Analysis",
      description: "Identify hooks that convert viewers into loyal fans.",
    },
    {
      icon: "clock",
      title: "Retention Patterns",
      description: "Know exactly when and why viewers drop off.",
    },
    {
      icon: "captions",
      title: "Conversion-Led Captions",
      description: "Copy-writing formulas that drive comments & sales.",
    },
    {
      icon: "sparkles",
      title: "Psychological Triggers",
      description: "Leverage emotion to force massive shares & saves.",
    },
    {
      icon: "music",
      title: "Trending vs. Evergreen Audio",
      description: "Strategic audio choices for stability & viral spikes.",
    },
    {
      icon: "timer",
      title: "The Profit Sweet Spot",
      description: "Find the ideal duration for maximum algorithm reach.",
    },
    {
      icon: "activity",
      title: "Virality Score indexing",
      description: "Measure your potential against the top 1% of creators.",
    },
    {
      icon: "megaphone",
      title: "CTA ROI Optimization",
      description: "Turn your attention into actionable business results.",
    },
  ],
  testimonialsHeadline: "Trusted by Top Creators & High-Growth Agencies",
  testimonials: [
    {
      quote:
        "My agency's content ROI tripled after using ReelDNA. We stopped guessing and started pitching data-backed strategies to our clients. Six-figure deals are now easier to close.",
      name: "Marcus T.",
      detail: "Scale Social Agency Owner",
    },
    {
      quote:
        "I was stuck at 50k followers for a year. After decoding the top 3 creators in my niche, I found a hook pattern I was missing. Gained another 100k in 3 months.",
      name: "Sarah K.",
      detail: "Fitness Creator",
    },
    {
      quote:
        "The white-label reports saved us 10+ hours a week in client reporting. We look like geniuses and our clients are seeing 2x engagement growth.",
      name: "Alex R.",
      detail: "Agency Content Lead",
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
        "Basic growth patterns",
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
        "5 team seats for your staff",
        "Unlimited creator comparisons",
        "White-label PDF reports for clients",
        "Client-facing workspace management",
        "Priority ROI consultation",
        "API access (coming soon)",
        "Premium Agency onboarding",
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
    headline: "Stop Wasting Time. Start Scaling.",
    subtext: "Join 14,000+ creators and agencies who use data to win.",
    cta: "Analyze a Creator Free",
    trust: "No credit card required | Instant profitability insights",
  },
};

