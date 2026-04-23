import type { Metadata } from "next";
import { FeaturePageTemplate, type FeaturePageData } from "../../../../components/FeaturePageTemplate";

export const metadata: Metadata = {
 title: "Facebook Ads Library Tracker | TheHookLab",
 description: "Track competitor Facebook ad strategies. Auto-scrape and analyze their active ad library to see what drives their sales.",
};

const data: FeaturePageData = {
 breadcrumbs: [
 { label: "Features", href: "#" },
 { label: "Facebook Ads Library", href: "/features/ads-library" },
 ],
 eyebrow: "FEATURE",
 title: "See Where They Spend Their Money.",
 description: "Don't guess what's working—look at what your competitors are paying to promote. Track unlimited competitor Facebook pages and auto-scrape their active Ads Library.",
 features: [
 {
 title: "Active Ad Tracking",
 description: "See exactly which ads your competitors are currently running.",
 items: [
 "Track unlimited Facebook competitor pages",
 "Auto-scrape their active Ads Library",
 "Never miss a competitor's new campaign launch",
 ],
 },
 {
 title: "Creative & Copy Analysis",
 description: "Analyze the actual creatives and copy driving their sales.",
 items: [
 "View the ad formats (video, carousel, single image) they rely on most",
 "Analyze the exact ad copy and calls-to-action",
 "Identify which value propositions they are testing",
 ],
 },
 {
 title: "Historical Ad Archiving",
 description: "Keep a record of their ads even after they turn them off.",
 items: [
 "Build an internal swipe file of your competitors' best ads",
 "See seasonal campaigns from previous years",
 "Identify long-running ads (which usually indicate high profitability)",
 ],
 },
 ],
 useCases: [
 {
 title: "Campaign Research",
 description: "Before launching your Black Friday campaign, review exactly what offers and ad creatives your top 5 competitors ran last year.",
 },
 {
 title: "Creative Inspiration",
 description: "When your ad ROAS drops, browse the active ads of the biggest players in your industry to find new creative formats to test.",
 },
 ],
 audiences: [
 {
 title: "Performance Marketers",
 description: "See exactly what copy, hooks, and formats your competitors are spending budget on.",
 },
 {
 title: "D2C Founders",
 description: "Keep a pulse on your competitors' offers and positioning without spending hours doing manual research.",
 },
 ],
 faq: [
 {
 question: "How often do you scrape the Ads Library?",
 answer: "We check tracked competitor pages daily for new active advertisements.",
 },
 {
 question: "Can I see how much they are spending?",
 answer: "No, Facebook does not provide spend data for standard commercial ads, but you can see how long an ad has been running. Ads running for months are typically highly profitable.",
 },
 ],
 relatedPages: [
 { label: "Deep Reel Analyzer", href: "/features/deep-reel-analyzer" },
 { label: "Content Mix Engine", href: "/features/content-mix" },
 ],
};

export default function AdsLibraryPage() {
 return <FeaturePageTemplate data={data} />;
}
