import type { Metadata } from "next";
import { FeaturePageTemplate, type FeaturePageData } from "../../../../components/FeaturePageTemplate";

export const metadata: Metadata = {
 title: "Deep Reel Analyzer – 5-Mode AI Breakdown | TheHookLab",
 description: "Stop guessing why a video went viral. Reverse-engineer any Reel with our 5-mode breakdown including hooks, pacing, and director shot lists.",
};

const data: FeaturePageData = {
 breadcrumbs: [
 { label: "Features", href: "#" },
 { label: "Deep Reel Analyzer", href: "/features/deep-reel-analyzer" },
 ],
 eyebrow: "FEATURE",
 title: "Stop Guessing Why a Video Went Viral.",
 description: "Get a comprehensive 5-mode breakdown of any Instagram Reel. Paste a URL and our AI reverse-engineers the success formula—from the initial hook to the editor's pacing.",
 features: [
 {
 title: "Concept & Hook Analysis",
 description: "Extract the exact retention mechanisms that kept viewers watching.",
 items: [
 "Identify the core hook and why it stops the scroll",
 "Break down the narrative structure of the script",
 "Analyze the target audience appeal",
 "Determine the emotional trigger of the video",
 ],
 },
 {
 title: "Director & Editor Breakdown",
 description: "See exactly how the video was shot and edited to maintain pacing.",
 items: [
 "Get a complete shot list with camera angles and lighting setups",
 "Analyze the pacing, cut frequency, and transition styles",
 "Extract text animation strategies and sound design cues",
 ],
 },
 {
 title: "Recreation Blueprint",
 description: "Don't just admire the video—learn exactly how to make it yourself.",
 items: [
 "Step-by-step shooting guide tailored to the specific format",
 "Custom script template based on the viral video's structure",
 "Editing instructions to replicate the viral pacing",
 ],
 },
 ],
 useCases: [
 {
 title: "Reverse Engineer the Competition",
 description: "Paste a competitor's viral Reel and instantly know exactly how to shoot a better version tailored to your brand.",
 },
 {
 title: "Train Your Editing Team",
 description: "Send the Editor Breakdown to your video team so they understand exactly what pacing and effects to use.",
 },
 ],
 audiences: [
 {
 title: "Content Creators",
 description: "Learn the specific structures and hooks top creators use to go viral, and apply them to your own content.",
 },
 {
 title: "Video Editors",
 description: "Get deep insights into the pacing and cut strategies that retain viewer attention.",
 },
 ],
 faq: [
 {
 question: "How long does a deep analysis take?",
 answer: "Our AI processes the video, transcript, and visual frames in under 2 minutes.",
 },
 {
 question: "Do I need to upload the video file?",
 answer: "No! Just paste the public Instagram Reel URL and we handle the rest.",
 },
 ],
 relatedPages: [
 { label: "Content Mix Engine", href: "/features/content-mix" },
 { label: "AI Templates", href: "/features/ai-templates" },
 ],
};

export default function DeepReelAnalyzerPage() {
 return <FeaturePageTemplate data={data} />;
}
