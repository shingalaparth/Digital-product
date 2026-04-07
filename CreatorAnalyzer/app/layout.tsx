import type { Metadata } from "next";

import { AnalyticsScripts } from "../landing/AnalyticsScripts";

import "./globals.css";

export const metadata: Metadata = {
  title: "ReelDNA | Decode why reels go viral in seconds",
  description:
    "Analyze any public creator, decode viral reel patterns, and build your own winning content blueprint.",
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

