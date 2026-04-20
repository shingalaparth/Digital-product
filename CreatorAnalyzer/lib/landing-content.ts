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
  key: "starter" | "growth" | "pro" | "agency";
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
  pains: PainItem[];
  howItWorksHeadline: string;
  steps: StepItem[];
  features: FeatureItem[];
  comparison: {
    headline: string;
    subtext: string;
    cta: string;
    href?: string;
  };
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
      "TheHookLab decodes your competitors' highest-performing content so you can replicate their success—instantly and predictably.",
    profilesAnalyzedLabel: "BRANDS & CREATORS TRUST US",
    profilesAnalyzedCount: "100+",
    searchPlaceholder: "Enter a competitor's @handle to analyze...",
    searchButtonLabel: "Analyze Competitor",
    searchHelperText: "It's free — no credit card required!",
    primaryCta: "Start Free 7-Day Trial",
    secondaryCta: "Watch 60-sec Demo",
    trustLine: "Trusted by 50+ early-stage brands, agencies, and creators across India",
  },
  stats: [
    { value: "50+", label: "Founding Brands & Creators" },
    { value: "45%", label: "Avg. Engagement Lift with AI Hooks" },
    { value: "15+ Hrs", label: "Saved Weekly on Competitor Research" },
    { value: "1,500+", label: "Viral Reels Deconstructed by AI" },
  ],
  painHeadline:
    "You're Doing Competitor Research the Hard Way. It's Costing You Hours, Money, and Relevance.",
  painSubheadline:
    "Every brand, creator, and agency does competitor research. But here is how most people do it today:",
  painSteps: [
    "Open your competitor's profile. Scroll through their Reels. Manually. For 30 minutes.",
    "Screenshot the ones that 'look good.' Dump them in a Google Drive folder you will never organize.",
    "Try to figure out why one Reel got 100K views and another got 800. Fail. Because the answer is not visible to the naked eye — it is buried in the hook, the pacing, the concept structure, and the posting timing.",
    "Post something based on gut feeling. Hope it works. It does not.",
    "Repeat tomorrow. And the day after. And the day after that.",
  ],
  pains: [
    {
      icon: "clock",
      title: "10+ Hours/Week Wasted",
      description:
        "Manual competitor research is a full-time job disguised as a 'quick check.' Your time is worth more than screenshotting Reels.",
    },
    {
      icon: "search-x",
      title: "₹15,000–30,000/Month Burned",
      description:
        "That is what you pay a freelancer or junior team member to do this manually. And they still miss the patterns that matter.",
    },
    {
      icon: "layers",
      title: "3 Weeks Behind Every Trend",
      description:
        "By the time you notice a trend, execute it, edit it, and post it — the algorithm has already moved on. You are always late.",
    },
  ],
  howItWorksHeadline: "How TheHookLab Works — 3 Steps, 30 Seconds",
  steps: [
    {
      step: 1,
      title: "Add Your Competitors",
      description: "Enter up to 5–25 competitor profiles (depending on your plan) across Instagram or YouTube. Takes 30 seconds.",
    },
    {
      step: 2,
      title: "AI Analyzes Every Piece of Content",
      description:
        "Our AI watches their Reels and Shorts, reads transcripts, detects hook types, identifies content formats, maps posting patterns, and categorizes CTAs. Automatically. Every single day.",
    },
    {
      step: 3,
      title: "Get Your Weekly Strategy Brief",
      description:
        "Every Monday, you receive a clear, AI-generated brief: what your competitors posted, which 3 concepts performed best, and exactly what you should try this week. Delivered via email or WhatsApp.",
    },
  ],
  features: [
    {
      key: "finder",
      icon: "search",
      heading: "Stop Guessing Which Opening Hooks Get Views",
      title: "Benefit 1: Know Which Hooks Actually Work",
      description:
        "See exactly which hooks — question hooks, shock stats, before/after reveals, trending audio intros — are driving the most views in your specific niche. Not generic advice. Your niche. Your competitors. Real data.",
      bullets: [
        "Detects question, shock stat, and curiosity hook formats",
        "Ranks hooks by engagement and view conversion rate",
        "Niche-specific analysis — not generic tips",
        "Updated daily with fresh competitor data",
      ],
      href: "/features/hook-format-analysis",
    },
    {
      key: "analysis",
      icon: "dna",
      heading: "See Trends 2 Weeks Before Everyone Else",
      title: "Benefit 2: Spot Trends Before They Peak",
      description:
        "Your competitors test content formats for you. TheHookLab detects which new formats are gaining traction before they go mainstream. You post the trend — you don't copy it three weeks too late.",
      bullets: [
        "Identifies rising content formats before they peak",
        "Tracks format adoption across your competitor set",
        "Alerts you to new hooks and concepts gaining traction",
        "Weekly trend summary in your strategy brief",
      ],
      href: "/features/ai-competitor-analysis",
    },
    {
      key: "comparison",
      icon: "scale",
      heading: "A Data-Backed Content Plan — Every Monday",
      title: "Benefit 3: Get a Ready-to-Execute Content Plan",
      description:
        "Every week you receive: 'Post a product showcase Reel on Tuesday using the question hook format. Here's the evidence — Competitor A got 3.2x engagement with this exact approach last week.' No more staring at a blank screen wondering what to post.",
      bullets: [
        "AI-generated action plan delivered every Monday",
        "Specific format, hook, and posting time recommendations",
        "Evidence-backed with real competitor performance data",
        "Delivered via email or WhatsApp — zero effort required",
      ],
      href: "/features/weekly-strategy-briefs",
    },
    {
      key: "blueprint",
      icon: "file-text",
      heading: "Replace Manual Research With AI That Never Sleeps",
      title: "Benefit 4: Save 10+ Hours Every Week",
      description:
        "No more manual screenshotting, folder organizing, or 'let me check what competitors are doing.' TheHookLab monitors everything automatically. Updated daily. Analyzed continuously. Delivered weekly.",
      bullets: [
        "24/7 automated monitoring of competitor content",
        "Daily data refresh — never miss a viral post",
        "Content categorization: product showcase, BTS, tutorial, UGC, trending challenge",
        "CTA detection and performance analysis",
      ],
      href: "/features/video-content-intelligence",
    },
  ],
  comparison: {
    headline: "See What Your Competitors Don't Want You to Know",
    subtext:
      "Select up to 5 competitors and TheHookLab surfaces the shared patterns every leader in your niche is using — the hooks that stop the scroll, the posting times that maximize reach, and the content formats that drive real sales.",
    cta: "Start Free Competitor Analysis",
    href: "/compare",
  },
  insightsHeadline: "What You Get With TheHookLab",
  insightsSubheadline: "Everything you need to stop guessing and start growing — powered by AI competitor intelligence that works 24/7 so you don't have to.",
  insights: [
    {
      icon: "gauge",
      title: "Hook Performance Breakdown",
      description: "See which opening hooks drive the most views in your specific niche.",
    },
    {
      icon: "clock",
      title: "Posting Pattern Analysis",
      description: "Know exactly when and how often your competitors post for maximum reach.",
    },
    {
      icon: "captions",
      title: "Content Format Detection",
      description: "Product showcase, BTS, tutorial, UGC — know what format wins.",
    },
    {
      icon: "sparkles",
      title: "AI Concept Categorization",
      description: "Automatically categorize every reel by concept type and strategy.",
    },
    {
      icon: "music",
      title: "Audio & Trend Tracking",
      description: "Spot trending audio choices before they peak across your niche.",
    },
    {
      icon: "timer",
      title: "Engagement Prediction",
      description: "Get data-backed predictions on which concepts will outperform.",
    },
    {
      icon: "activity",
      title: "CTA Performance Mapping",
      description: "See which calls-to-action drive the most saves, comments, and shares.",
    },
    {
      icon: "megaphone",
      title: "Weekly Strategy Brief",
      description: "Actionable plan delivered to your inbox every Monday morning.",
    },
  ],
  caseStudies: {
    headline: "Real Results. Real Businesses. Real Data.",
    subheadline: "See how brands, agencies, and creators are growing with TheHookLab's AI-powered competitor intelligence.",
    items: [
      {
        label: "D2C Brand",
        title: "Diorin — Premium Jewelry Brand",
        metric: "134%",
        metricLabel: "Engagement Increase",
        description: "Engagement went from 4.2% to 9.8%. Viral Reels jumped from 2 to 5 per month. Time spent on competitor research dropped by 91%.",
        href: "#",
      },
      {
        label: "Freelance SMM",
        title: "Priya — Managing 6 D2C Brands",
        metric: "94%",
        metricLabel: "Client Retention Rate",
        description: "Client retention improved from 60% to 94%. Retainer fees increased from ₹15K to ₹24K per client. Proposal close rate nearly doubled.",
        href: "#",
      },
      {
        label: "Agency",
        title: "NaviAgency — 25+ DTC Clients",
        metric: "₹8.5L",
        metricLabel: "New Monthly Retainers Won",
        description: "Won 8 new clients citing competitor intelligence capability. NPS jumped from 42 to 71. Creative throughput increased 40%.",
        href: "#",
      },
    ],
  },
  testimonialsHeadline: "Results From Real Users",
  testimonials: [
    {
      quote:
        "Engagement went from 4.2% to 9.8% in 3 months. We now get 5 viral Reels per month instead of 2. TheHookLab showed us exactly what our competitors were doing differently.",
      name: "Mehul K.",
      detail: "Founder, Diorin (D2C Jewelry Brand)",
    },
    {
      quote:
        "Client retention improved from 60% to 94%. I raised retainers from ₹15K to ₹24K per client because I now deliver data-backed competitive intelligence, not opinions.",
      name: "Priya S.",
      detail: "Freelance SMM | Managing 6 D2C Brands",
    },
    {
      quote:
        "We won 8 new clients specifically because we could offer competitor intelligence. Our NPS jumped from 42 to 71. Creative throughput increased 40%.",
      name: "NaviAgency",
      detail: "Performance Marketing Agency | 25+ Clients",
    },
    {
      quote:
        "I now offer competitor analysis as a ₹15,000 add-on service to my clients. The tool costs me ₹2,499. Best ROI of any tool I use.",
      name: "Arjun M.",
      detail: "Freelance Social Media Manager",
    },
  ],
  freeTools: {
    headline: "Free Tools & Resources to Get Started",
    subheadline: "No login. No credit card. Start analyzing competitors and improving your content strategy right now.",
    items: [
      {
        title: "Free Competitor Snapshot",
        description: "Analyze any Instagram profile instantly — growth rate, engagement breakdown, top content type, posting frequency, and audience demographics.",
        cta: "Get Free Snapshot",
        href: "#",
      },
      {
        title: "Top 50 Viral Hook Formulas (PDF)",
        description: "50 proven scroll-stopping hooks used by top D2C brands and creators — narrative, question, contrast, and curiosity gap formulas.",
        cta: "Download Free PDF",
        href: "#",
      },
      {
        title: "90-Day Content Calendar Template",
        description: "Pre-populated planning template used by Indian D2C brands. Includes content themes, hashtag research columns, and performance tracking.",
        cta: "Download Template",
        href: "#",
      },
      {
        title: "Competitor Analysis Worksheet",
        description: "Structured DIY framework to deep-dive into any competitor — content strategy, engagement metrics, audience analysis, and gap identification.",
        cta: "Download Worksheet",
        href: "#",
      },
    ],
  },
  pricingHeadline: "Pricing That Scales With Your Growth",
  pricingSubtext: "India-first pricing. Simple, transparent, and built for results. All plans include 7-day free trial (no credit card required) and 30-day money-back guarantee.",
  pricing: [
    {
      key: "starter",
      name: "Starter",
      priceMonthly: "₹999",
      priceAnnual: "₹833",
      subtitleMonthly: "per month",
      subtitleAnnual: "/mo billed annually",
      included: [
        "Up to 5 competitor accounts",
        "Weekly Strategy Brief (Basic)",
        "Reel analysis + hook extraction",
        "Hashtag strategy mapping",
        "Engagement benchmarking",
        "1 team member seat",
      ],
      excluded: [
        "Visual analytics dashboard",
        "Daily alerts",
        "Team collaboration",
        "API access",
      ],
    },
    {
      key: "growth",
      name: "Growth",
      priceMonthly: "₹2,499",
      priceAnnual: "₹2,083",
      subtitleMonthly: "per month",
      subtitleAnnual: "/mo billed annually",
      featured: true,
      included: [
        "Up to 25 competitor accounts",
        "Weekly Strategy Brief (Visual)",
        "Advanced engagement analysis",
        "Sound trend predictions (14 days early)",
        "Caption tone analysis",
        "2 team member seats",
      ],
      excluded: ["Unlimited tracking", "Daily briefs", "White-label reports"],
    },
    {
      key: "pro",
      name: "Pro",
      priceMonthly: "₹4,999",
      priceAnnual: "₹4,166",
      subtitleMonthly: "per month",
      subtitleAnnual: "/mo billed annually",
      included: [
        "Unlimited competitor accounts",
        "Daily Strategy Briefs",
        "Real-time hook alerts",
        "Format performance analysis",
        "Custom niche segmentation",
        "5 team member seats",
        "Priority support (Slack + WhatsApp)",
      ],
      excluded: ["Custom integrations", "Dedicated manager"],
    },
    {
      key: "agency",
      name: "Agency",
      priceMonthly: "₹9,999",
      priceAnnual: "₹8,333",
      subtitleMonthly: "per month",
      subtitleAnnual: "/mo billed annually",
      included: [
        "Everything in Pro, plus:",
        "Unlimited everything (seats/calls)",
        "Dedicated Account Manager",
        "Custom integrations (CRM/Slack)",
        "White-label reporting",
        "SSO + SAML security",
        "On-demand custom analysis",
      ],
      excluded: [],
    },
  ],
  guarantee:
    "Lock in 50% off lifetime with annual plans (Founding Member Deal) · 7-day free trial · 30-day money-back guarantee · UPI, Cards, Net Banking & Razorpay accepted.",
  faq: [
    {
      question: "How does the AI analysis work?",
      answer:
        "TheHookLab's AI watches your competitors' videos, analyzes visual content, reads transcripts, detects hook formats, identifies content types (product showcase, BTS, tutorial, UGC, trending challenge), and categorizes CTAs. You receive a clean summary — no manual work required. The AI updates its analysis daily.",
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
      question: "What payment methods do you accept for Indian users?",
      answer:
        "We support UPI (Google Pay, PhonePe, Paytm, BHIM), all major credit/debit cards, Razorpay, and direct bank transfers for annual plans.",
    },
    {
      question: "What is the Founding Member Deal?",
      answer:
        "If you sign up for any annual plan before June 30, 2026, you lock in a 50% discount for the lifetime of your subscription. Even when we raise prices, your rate stays the same.",
    },
    {
      question: "How does the manual vs AI analysis compare in price?",
      answer:
        "TheHookLab Starter (₹999) costs roughly 90% less than hiring a freelancer for manual tracking and provides 24/7 automated analysis that manual research simply can't match.",
    },
    {
      question: "What happens after my 7-day trial ends?",
      answer:
        "If you've added a payment method, your subscription starts. If not, your access ends and you won't be charged. No dark patterns, no hidden fees.",
    },
  ],
  finalCta: {
    headline: "Never fall short of performance targets",
    subtext: "TheHookLab does the heavy-lifting to bring you insights that keep you ahead.",
    cta: "Talk to Founders",
    trust: "Join 50+ creators and brands who stopped guessing and started winning · 7-day free trial · 30-day money-back guarantee · Cancel anytime",
  },
  useCases: {
    headline: "Built for Everyone Who Takes Social Media Seriously",
    items: [
      {
        title: "For Brands",
        description: "You sell through social media. So do your competitors. TheHookLab shows you their exact content strategy — which Reels drive sales, which hooks stop the scroll, which posting times maximize reach. Use their data to grow faster, spend less on trial-and-error, and outperform brands with 10x your budget.",
        perfectFor: "D2C brands, e-commerce stores, restaurants, real estate, startups",
        link: "/solutions/d2c-brands",
        linkLabel: "See How Brands Use TheHookLab",
      },
      {
        title: "For Creators",
        description: "You post Reels every day. But are you posting the right Reels? TheHookLab tracks the top creators in your niche and shows you which hooks, formats, and CTAs get them 10x your views. Create smarter, not harder. Know what works before you press record.",
        perfectFor: "Content creators, influencers, coaches, personal brand builders",
        link: "/solutions/content-creators",
        linkLabel: "See How Creators Use TheHookLab",
      },
      {
        title: "For Agencies",
        description: "You manage 10 clients. That's 50+ competitors to track. Manual research takes your team 20 hours per week. TheHookLab automates the entire process. White-label the reports. Sell competitor analysis as a ₹50,000 service. Your cost: ₹2,499 per month.",
        perfectFor: "Digital marketing agencies, social media agencies",
        link: "/solutions/marketing-agencies",
        linkLabel: "See How Agencies Use TheHookLab",
      },
      {
        title: "For Freelancers",
        description: "Your clients ask 'why did our competitor get better engagement?' and you have no data-backed answer. TheHookLab gives you that answer in 10 seconds. Offer strategy alongside execution. Charge ₹10,000 more per client. Look like the smartest person in the room.",
        perfectFor: "Freelance social media managers, marketing consultants, video editors",
        link: "/solutions/social-media-managers",
        linkLabel: "See How Freelancers Use TheHookLab",
      },
    ],
  },
};
