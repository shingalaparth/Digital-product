import type { Metadata } from "next";

import { AnalyticsScripts } from "../landing/AnalyticsScripts";

import "./globals.css";

export const metadata: Metadata = {
  title: "ContentAnalyzer | Decode why LinkedIn posts go viral",
  description:
    "Analyze any LinkedIn creator, decode viral post patterns, and build your own winning content blueprint.",
  metadataBase: new URL("https://contentanalyzer.com"),
  openGraph: {
    title: "ContentAnalyzer | The viral LinkedIn formula decoded",
    description:
      "Decode why any creator's LinkedIn posts go viral. Compare creators and extract shared winning patterns.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ContentAnalyzer landing page preview",
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
      <body className="font-sans min-h-screen bg-bg overflow-y-scroll overflow-x-hidden" suppressHydrationWarning>

        {/* Stationary OS Bezel Mask */}
        <div className="fixed inset-0 z-[200] pointer-events-none p-2 sm:p-4 lg:p-6" aria-hidden>
          <div className="w-full h-full rounded-[16px] sm:rounded-[24px] shadow-[0_0_0_100vw_#FFFFFF] border border-[#E5E7EB]" />
        </div>

        {/* Scrollable Container (Body level means outer scrollbar) */}
        <div className="relative mx-auto w-full max-w-[1800px] min-h-screen px-0 sm:px-2 lg:px-4 pt-2 sm:pt-4 lg:pt-6 pb-2 sm:pb-4 lg:pb-6">
          <AnalyticsScripts />
          {children}
        </div>

      </body>
    </html>
  );
}

