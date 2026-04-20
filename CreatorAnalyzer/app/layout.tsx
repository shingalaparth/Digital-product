import type { Metadata } from "next";

import { AnalyticsScripts } from "../components/AnalyticsScripts";

import"./globals.css";

export const metadata: Metadata = {
 title:"labhook — AI-Powered Competitor Intelligence for Social Media",
 description:
"Stop guessing what to post. labhook uses AI to analyze competitor Reels, hooks, and content strategy — so you know exactly what works. Start free.",
 metadataBase: new URL("https://labhook.com"),
 openGraph: {
 title:"labhook | The viral formula decoded",
 description:
"Decode why any creator's reels go viral. In seconds. Compare creators and extract shared winning patterns.",
 type:"website",
 images: [
 {
 url:"/og-labhook.png",
 width: 1200,
 height: 630,
 alt:"labhook landing page preview",
 },
 ],
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en"className="bg-bg"suppressHydrationWarning>
 <body className="font-sans"suppressHydrationWarning>
 <AnalyticsScripts />
 <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
 <div className="hidden sm:block pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.35]">
   <div className="meteor meteor-1" />
   <div className="meteor meteor-2" />
   <div className="meteor meteor-3" />
   <div className="meteor meteor-4" />
   <div className="meteor meteor-5" />
   <div className="meteor meteor-6" />
   <div className="meteor meteor-7" />
   <div className="meteor meteor-8" />
 </div>
 <div className="relative z-10">
 {children}
 </div>
 </body>
 </html>
 );
}

