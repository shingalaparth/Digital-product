import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { landingContent } from "../lib/landing-content";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Platforms", href: "/platforms/instagram-analytics" },
      { label: "What's New", href: "/#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For D2C Brands", href: "/solutions/d2c-brands" },
      { label: "For Social Media Managers", href: "/solutions/social-media-managers" },
      { label: "For Marketing Agencies", href: "/solutions/marketing-agencies" },
      { label: "For Content Creators", href: "/solutions/content-creators" },
      { label: "For Video Editors", href: "/solutions/video-editors" },
      { label: "For Coaches", href: "/#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Free Tools", href: "/resources/free-tools" },
      { label: "Help Center", href: "/resources/help-center" },
      { label: "Competitor Analysis Guide", href: "/blog/competitor-analysis" },
      { label: "Content Strategy Guide", href: "/blog/social-media-strategy" },
      { label: "Industry Guides", href: "/blog/industry-guides" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs Socialinsider", href: "/compare/vs-socialinsider" },
      { label: "vs Sprout Social", href: "/compare/vs-sprout-social" },
      { label: "vs Not Just Analytics", href: "/compare/vs-not-just-analytics" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/#" },
      { label: "Terms of Service", href: "/#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
      } else if (id === "") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (pathname === "/" && href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0A0E14] border-t border-white/5 overflow-hidden">
      {/* ── Refined Grid Background with Runners ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle static grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #FF5F26 1px, transparent 1px),
              linear-gradient(to bottom, #FF5F26 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />

        {/* ── Runners (Scanning glows - Aligned to 120px grid) ── */}
        {/* Horizontal Runners */}
        <motion.div
          className="absolute left-0 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_15px_rgba(255,95,38,0.6)]"
          style={{ top: '120px' }}
          animate={{ left: ["-20%", "120%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        <motion.div
          className="absolute left-0 w-60 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-30 shadow-[0_0_10px_rgba(255,95,38,0.4)]"
          style={{ top: '360px' }}
          animate={{ left: ["-20%", "120%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 4 }}
        />

        {/* Vertical Runners */}
        <motion.div
          className="absolute top-0 w-[1px] h-40 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50 shadow-[0_0_15px_rgba(255,95,38,0.6)]"
          style={{ left: '240px' }}
          animate={{ top: ["-20%", "120%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0 }}
        />
        <motion.div
          className="absolute top-0 w-[1px] h-60 bg-gradient-to-b from-transparent via-primary/80 to-transparent opacity-30 shadow-[0_0_10px_rgba(255,95,38,0.4)]"
          style={{ left: '720px' }}
          animate={{ top: ["-20%", "120%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 3 }}
        />

        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0E14_95%)]" />
      </div>

      <div className="section-shell relative z-10 pt-20 pb-12">
        {/* ── Tagline Section (Quotes/Tagline Style) ── */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.2rem] sm:text-5xl lg:text-[4.5rem] font-extralight tracking-tight text-white leading-tight opacity-90"
          >
            "{landingContent.finalCta.headline}"
          </motion.h2>
          <p className="mt-4 text-xs sm:text-sm text-white/40 font-medium tracking-wide uppercase">
            {landingContent.finalCta.subtext}
          </p>
        </div>

        {/* ── Footer Link Grid ── */}
        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-7 border-t border-white/5 pt-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="mb-6 flex items-center gap-2 text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-80"
            >
              <span>
                The<span className="text-primary">Hook</span>Lab
              </span>
            </Link>
            <p className="max-w-xs text-[13px] leading-relaxed text-white/40 font-medium">
              AI-powered competitor intelligence for social media. Stop guessing
              what to post — let data tell you exactly what works.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                {col.title}
              </h4>
              <ul className="space-y-3 text-[13px] font-medium text-white/50">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-[12px] font-medium text-white/30 md:flex-row">
          <p>© {year} TheHookLab. Built in India 🇮🇳 with AI for creators.</p>
          <div className="flex gap-8 items-center">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
