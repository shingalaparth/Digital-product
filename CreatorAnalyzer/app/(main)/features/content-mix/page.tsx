import type { Metadata } from "next";
import { FeaturePageTemplate, type FeaturePageData } from "../../../../components/FeaturePageTemplate";

export const metadata: Metadata = {
 title: "Content Mix Engine – Create Hybrid Viral Concepts | TheHookLab",
 description: "Merge winning elements from 2-3 viral videos into a completely new, unique hybrid concept tailored to your brand.",
};

const data: FeaturePageData = {
 breadcrumbs: [
 { label: "Features", href: "#" },
 { label: "Content Mix Engine", href: "/features/content-mix" },
 ],
 eyebrow: "FEATURE",
 title: "Create the Perfect Hybrid Concept.",
 description: "Don't just copy one competitor. The Content Mix Engine allows you to select multiple top-performing videos and fuse their best hooks, structures, and strategies into an entirely new, original script.",
 features: [
 {
 title: "Multi-Video Synthesis",
 description: "Select up to 3 previously analyzed videos to act as the foundation for your new concept.",
 items: [
 "Combine a great hook from Video A with the storytelling of Video B",
 "Merge visual formats seamlessly using AI",
 "Avoid direct copying by synthesizing completely new ideas",
 ],
 },
 {
 title: "Tailored to Your Brand",
 description: "The AI takes the viral elements and maps them directly onto your specific niche and brand voice.",
 items: [
 "Input your product or service description",
 "Select your target audience",
 "The AI generates a script that fits your brand while using viral mechanics",
 ],
 },
 {
 title: "Complete Production Ready Scripts",
 description: "You don't just get an idea; you get a script ready for the teleprompter.",
 items: [
 "Includes visual cues and B-roll suggestions",
 "Provides the exact spoken dialogue",
 "Includes caption recommendations",
 ],
 },
 ],
 useCases: [
 {
 title: "Break Out of a Creative Rut",
 description: "When you don't know what to post, select 3 trending videos in your niche and let the Mix Engine generate a fresh hybrid concept.",
 },
 {
 title: "Outperform the Original",
 description: "Take a competitor's viral video, combine it with a completely different format (like a trending meme), and create something nobody has seen before.",
 },
 ],
 audiences: [
 {
 title: "Social Media Agencies",
 description: "Generate endless fresh concepts for your clients without spending hours brainstorming.",
 },
 {
 title: "D2C Brands",
 description: "Adapt viral trends from completely different industries to fit your specific product.",
 },
 ],
 faq: [
 {
 question: "How many videos can I mix together?",
 answer: "You can currently mix up to 3 analyzed videos to create a single cohesive hybrid concept. Any more and the concept becomes too muddy.",
 },
 {
 question: "Is the generated script actually unique?",
 answer: "Yes! The AI extracts the psychological triggers and structural pacing, not the exact words. It then writes a 100% original script for your specific product.",
 },
 ],
 relatedPages: [
 { label: "Deep Reel Analyzer", href: "/features/deep-reel-analyzer" },
 { label: "AI Templates", href: "/features/ai-templates" },
 ],
};

export default function ContentMixPage() {
 return <FeaturePageTemplate data={data} />;
}
