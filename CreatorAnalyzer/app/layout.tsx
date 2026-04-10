import type { Metadata } from "next";

import { AnalyticsScripts } from "../components/AnalyticsScripts";

import "./globals.css";

export const metadata: Metadata = {
  title: "ReelDNA — AI-Powered Competitor Intelligence for Social Media",
  description:
    "Stop guessing what to post. ReelDNA uses AI to analyze competitor Reels, hooks, and content strategy — so you know exactly what works. Start free.",
  metadataBase: new URL("https://reeldna.com"),
  openGraph: {
    title: "ReelDNA | The viral formula decoded",
    description:
      "Decode why any creator's reels go viral. In seconds. Compare creators and extract shared winning patterns.",
    type: "website",
    images: [
      {
        url: "/og-reeldna.png",
        width: 1200,
        height: 630,
        alt: "ReelDNA landing page preview",
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
    <html lang="en" className="bg-bg" suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}

