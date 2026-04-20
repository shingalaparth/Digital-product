import type { Metadata } from "next";
import { ComparePageTemplate, type ComparePageData } from "../../../../components/ComparePageTemplate";

export const metadata: Metadata = {
 title:"labhook vs Not Just Analytics – AI Strategy vs Basic Metrics",
 description:
"Compare labhook vs Not Just Analytics. Get AI-powered strategy briefs, hook analysis, and competitor intelligence — not just follower counts and engagement rates.",
};

const data: ComparePageData = {
 breadcrumbs: [
 { label:"Compare", href:"#"},
 { label:"vs Not Just Analytics", href:"/compare/vs-not-just-analytics"},
 ],
 competitor:"Not Just Analytics",
 title:"labhook vs Not Just Analytics: AI Strategy vs Basic Instagram Metrics",
 description:
"Not Just Analytics provides basic Instagram metrics. labhook provides AI-powered competitor strategy. See why serious brands upgrade from surface metrics to deep intelligence.",
 comparisonTable: [
 { feature:"Pricing", labhook:"₹999–₹4,999/mo", competitor:"Free + Premium €4.99/mo"},
 { feature:"AI Concept Extraction", labhook:"✅", competitor:"❌"},
 { feature:"Competitor Strategy Analysis", labhook:"Deep AI analysis", competitor:"Basic follower/engagement"},
 { feature:"Hook & Format Analysis", labhook:"✅", competitor:"❌"},
 { feature:"Weekly Strategy Briefs", labhook:"✅", competitor:"❌"},
 { feature:"Content Calendar AI", labhook:"✅", competitor:"❌"},
 { feature:"WhatsApp Delivery", labhook:"✅", competitor:"❌"},
 { feature:"Follower Analytics", labhook:"✅", competitor:"✅"},
 { feature:"Best For", labhook:"Competitor strategy & content intelligence", competitor:"Quick follower/engagement checks"},
 ],
 advantages: [
 {
 title:"Strategy, Not Just Numbers",
 description:
"Not Just Analytics tells you follower count and engagement rate. labhook tells you WHY engagement is high — the exact hooks, formats, CTAs, and timing that drive it. Strategy > statistics.",
 },
 {
 title:"AI That Watches Competitors 24/7",
 description:
"Not Just Analytics gives you a snapshot. labhook monitors competitors continuously and alerts you when they change strategy, post viral content, or shift their approach.",
 },
 {
 title:"Weekly Action Plans, Not Dashboards",
 description:
"Every Monday, labhook delivers a complete content strategy brief via WhatsApp — what to post, when, what hooks to use, what trends are emerging. Not Just Analytics gives you... a dashboard.",
 },
 {
 title:"Built for Indian Creators",
 description:
"Festival calendar, INR pricing, WhatsApp delivery, Razorpay/UPI payments. Not Just Analytics is built for European markets. labhook is built for India.",
 },
 ],
 whoChooseUs: [
"Need deep competitor strategy (not just follower counts)",
"Want AI-powered content recommendations",
"Are willing to invest ₹999/month for serious intelligence",
"Want weekly action plans delivered to WhatsApp",
"Are an Indian brand, creator, or agency",
 ],
 whoChooseThem: [
"Just need a quick follower/engagement rate check",
"Want a free tool for basic Instagram metrics",
"Don't need competitor strategy or content planning",
"Are checking a single profile occasionally (not ongoing monitoring)",
 ],
 faq: [
 { question:"Is Not Just Analytics free? Why would I pay for labhook? ", answer:"Not Just Analytics has a free tier for basic metrics. But it doesn't provide competitor strategy, AI content recommendations, or weekly briefs. You get what you pay for — surface metrics vs. deep intelligence."},
 { question:"Can I use both? ", answer:"Sure. Many creators use Not Just Analytics for quick profile checks and labhook for ongoing competitor strategy. They serve different needs."},
 { question:"Is labhook overkill if I'm a small creator? ", answer:"If you're serious about growth, no. Our Starter plan at ₹999/month gives you the same competitive intelligence large brands use. One viral reel pays for the tool for a year."},
 ],
 relatedComparisons: [
 { label:"vs Socialinsider", href:"/compare/vs-socialinsider"},
 { label:"vs Sprout Social", href:"/compare/vs-sprout-social"},
 ],
};

export default function VsNotJustAnalyticsPage() {
 return <ComparePageTemplate data={data} />;
}
