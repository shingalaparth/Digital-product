import type { Metadata } from "next";
import { FeaturePageTemplate, type FeaturePageData } from "../../../../components/FeaturePageTemplate";

export const metadata: Metadata = {
 title: "LinkedIn Analytics Tool | TheHookLab",
 description: "Track competitor B2B content strategies, engagement, and growth on LinkedIn. Analyze what posts drive the most leads and profile views.",
};

const data: FeaturePageData = {
 breadcrumbs: [
 { label: "Platforms", href: "#" },
 { label: "LinkedIn Analytics", href: "/platforms/linkedin-analytics" },
 ],
 eyebrow: "PLATFORM",
 title: "Deep AI Analysis, Built for LinkedIn.",
 description: "Apply our powerful AI-driven competitor intelligence to LinkedIn. Reverse-engineer top B2B creators, founders, and companies to discover the text formats, carousels, and video hooks that drive real engagement and leads.",
 features: [
 {
 title: "B2B Format Extraction",
 description: "LinkedIn has unique formats. Our AI breaks them all down.",
 items: [
 "Analyze text-only posts: Readability, hook structures, and spacing",
 "Break down document carousels: Slide pacing and visual hierarchy",
 "Deconstruct native video hooks and pacing",
 ],
 },
 {
 title: "Competitor Growth Tracking",
 description: "See how fast your industry peers are growing their networks.",
 items: [
 "Track follower growth and engagement rate over time",
 "Identify spikes in profile views linked to specific posts",
 "Monitor their posting frequency and active hours",
 ],
 },
 {
 title: "Lead Generation Reverse-Engineering",
 description: "Find out how competitors are driving traffic off-platform.",
 items: [
 "Analyze CTA (Call to Action) placements in comments vs posts",
 "Track outbound link click strategies",
 "Identify lead-magnet formats that work in your specific B2B niche",
 ],
 },
 ],
 useCases: [
 {
 title: "Founder Personal Branding",
 description: "Track the top 5 founders in your industry. Learn exactly how they balance personal storytelling with company updates to build a massive following.",
 },
 {
 title: "B2B Marketing Agencies",
 description: "Provide clients with deep analysis of their competitors' LinkedIn strategies, complete with auto-generated hybrid concepts for their executive team.",
 },
 ],
 audiences: [
 {
 title: "B2B Founders & Execs",
 description: "Grow your personal brand efficiently by modeling the proven structures of top industry voices.",
 },
 {
 title: "Social Media Managers",
 description: "Stop guessing what B2B content works. Get data-driven insights into the exact formats driving engagement right now.",
 },
 ],
 faq: [
 {
 question: "Does this work exactly like the Instagram tool?",
 answer: "Yes! It uses the same Deep Analyzer engine, but the AI is custom-trained to understand LinkedIn's unique text, carousel, and professional video formats.",
 },
 {
 question: "Can I track company pages and personal profiles?",
 answer: "Yes, you can track both company pages and individual creator/founder profiles.",
 },
 ],
 relatedPages: [
 { label: "Instagram Analytics", href: "/platforms/instagram-analytics" },
 { label: "Deep Reel Analyzer", href: "/features/deep-reel-analyzer" },
 ],
};

export default function LinkedInAnalyticsPage() {
 return <FeaturePageTemplate data={data} />;
}
