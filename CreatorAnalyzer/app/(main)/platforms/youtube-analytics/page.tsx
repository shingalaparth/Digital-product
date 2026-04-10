import type { Metadata } from "next";
import { FeaturePageTemplate, type FeaturePageData } from "../../../../components/FeaturePageTemplate";

export const metadata: Metadata = {
  title: "YouTube Analytics & Shorts Intelligence | ReelDNA",
  description:
    "YouTube Shorts competitor analysis powered by AI. Track competitor channels, analyze Shorts performance, and get data-driven strategy recommendations. Coming Soon.",
};

const data: FeaturePageData = {
  breadcrumbs: [
    { label: "Platforms", href: "#" },
    { label: "YouTube Analytics", href: "/platforms/youtube-analytics" },
  ],
  eyebrow: "COMING SOON — Q2 2026",
  title: "YouTube Shorts Competitor Analysis (Early Access)",
  description:
    "ReelDNA is expanding beyond Instagram. Our AI-powered competitive intelligence is coming to YouTube Shorts — with the same hook extraction, format analysis, and strategy briefs you love.",
  features: [
    {
      title: "YouTube Shorts Roadmap",
      description:
        "YouTube Shorts is growing 3x faster than TikTok in India. We are building the engine to decode the algorithm before it's too late.",
      items: [
        "Thumbnail & Title Hook Analysis: What drives the click?",
        "Shorts Content Format Mapping: Talking-head vs. Text-heavy",
        "Hashtag & Description Strategy: Discovery-focused tag clusters",
        "Posting Cadence & Timing: Optimal upload windows for YouTube",
        "Engagement Metrics & Benchmarking: Real CTR vs. Niche averages",
        "Music & Audio Trend Tracking: 14-day lead time on sounds",
      ],
    },
    {
      title: "Founding Member Beta Program",
      description:
        "Join our early access group and help shape how ReelDNA analyzes YouTube Shorts. Lock in founding member pricing for life.",
      items: [
        "Get YouTube analytics 2 weeks before public launch",
        " Founding member price lock (₹999/mo Starter Plan forever)",
        "Vote on feature priorities and roadmap goals",
        "Direct feedback loop with the product engineering team",
      ],
    },
  ],
  useCases: [
    {
      title: "D2C Brands Expanding to YouTube",
      description:
        "Instagram Reels drive awareness. YouTube Shorts drive discovery. Use the same AI patterns to conquer both platforms seamlessly.",
    },
    {
      title: "Multi-Platform Creators",
      description:
        "Understand why the same video performs differently on Shorts vs. Reels. Optimize your hooks for YouTube's unique search-and-discovery algorithm.",
    },
  ],
  audiences: [
    {
      title: "YouTube Creators",
      description: "Shorts-first creators looking for a competitive edge in their niche.",
    },
    {
      title: "Creator Agencies",
      description: "Manage multi-platform creator programs with unified competitive data.",
    },
    {
      title: "Brands",
      description: "Scale your discovery reach by mastering YouTube's shifting algorithm.",
    },
  ],
  faq: [
    {
      question: "When exactly does YouTube analytics launch?",
      answer:
        "Public launch is May 2026. Current ReelDNA users get early access Beta in April 2026 at no additional cost.",
    },
    {
      question: "Will YouTube analytics cost extra?",
      answer:
        "No. All active ReelDNA subscribers (on any plan) will get YouTube Shorts analysis included automatically at no additional cost when it launches.",
    },
    {
      question: "Can I analyze Instagram and YouTube in the same dashboard?",
      answer:
        "Yes. You'll be able to add Reels accounts and Shorts channels to the same workspace and compare competitive patterns side-by-side.",
    },
    {
      question: "How will you get YouTube Shorts data?",
      answer:
        "The same way we get Instagram Reels data — from public YouTube data. We do not violate platform terms or require private account access.",
    },
  ],
  relatedPages: [
    { label: "Instagram Analytics", href: "/platforms/instagram-analytics" },
    { label: "Pricing Plans", href: "/pricing" },
    { label: "Features Overview", href: "/features" },
  ],
};

export default function YouTubeAnalyticsPage() {
  return <FeaturePageTemplate data={data} />;
}
