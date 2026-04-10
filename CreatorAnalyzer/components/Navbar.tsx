"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Navigation data — matches the sitemap structure                    */
/* ------------------------------------------------------------------ */

type NavChild = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Features",
    children: [
      { label: "AI Competitor Analysis", href: "/features/ai-competitor-analysis", description: "24/7 automated competitor tracking" },
      { label: "Video Content Intelligence", href: "/features/video-content-intelligence", description: "Deep analysis of reel performance" },
      { label: "Weekly Strategy Briefs", href: "/features/weekly-strategy-briefs", description: "AI-generated action plans every Monday" },
      { label: "Hook & Format Analysis", href: "/features/hook-format-analysis", description: "Decode what stops the scroll" },
      { label: "Content Calendar AI", href: "/features/content-calendar-ai", description: "AI-powered content planning" },
      { label: "Hashtag Strategy", href: "/features/hashtag-strategy", description: "Data-driven hashtag research" },
      { label: "Industry Benchmarks", href: "/features/industry-benchmarks", description: "Compare against your niche" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "For D2C Brands", href: "/solutions/d2c-brands" },
      { label: "For Social Media Managers", href: "/solutions/social-media-managers" },
      { label: "For Marketing Agencies", href: "/solutions/marketing-agencies" },
      { label: "For Content Creators", href: "/solutions/content-creators" },
      { label: "For Video Editors", href: "/solutions/video-editors" },
    ],
  },
  {
    label: "Platforms",
    children: [
      { label: "Instagram Analytics", href: "/platforms/instagram-analytics" },
      { label: "YouTube Analytics", href: "/platforms/youtube-analytics", badge: "Coming Soon" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Compare",
    children: [
      { label: "vs Socialinsider", href: "/compare/vs-socialinsider" },
      { label: "vs Sprout Social", href: "/compare/vs-sprout-social" },
      { label: "vs Not Just Analytics", href: "/compare/vs-not-just-analytics" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", description: "Guides, frameworks & growth strategies" },
      { label: "Case Studies", href: "/resources/case-studies", description: "Real results from D2C brands, agencies & creators" },
      { label: "Free Tools", href: "/resources/free-tools", description: "Free competitor snapshot & templates" },
      { label: "Help Center", href: "/resources/help-center", description: "120+ articles, guides & API docs" },
    ],
  },
];

/* ------------------------------------------------------------------ */

function cn(...v: Array<string | false | null | undefined>): string {
  return v.filter(Boolean).join(" ");
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const dropdownTimeout = useRef<number | null>(null);
  const pathname = usePathname();

  /* Lock body scroll when mobile drawer is open */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [isMenuOpen]);

  /* Scroll-aware show / hide */
  useEffect(() => {
    const onScroll = (): void => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      if (y <= 0) setIsNavVisible(true);
      else if (y > lastScrollY.current) setIsNavVisible(false);
      else setIsNavVisible(true);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close everything on route change */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMenuOpen(false);
      setOpenDropdown(null);
      setMobileExpanded(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const enterDropdown = (label: string) => {
    if (dropdownTimeout.current) window.clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const leaveDropdown = () => {
    dropdownTimeout.current = window.setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out",
        isNavVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "border-b transition-colors duration-300",
          isScrolled
            ? "bg-black/50 backdrop-blur-md border-white/5"
            : "bg-transparent border-transparent",
        )}
      >
        <div className="flex h-14 w-full items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-12">
          {/* ---- Logo ---- */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-black font-bold">
              R
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ReelDNA</span>
          </Link>

          {/* ---- Desktop nav ---- */}
          <div className="hidden items-center gap-10 lg:flex">
            <div className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && enterDropdown(item.label)}
                  onMouseLeave={() => item.children && leaveDropdown()}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 py-2 text-[13px] font-medium transition-colors",
                        pathname === item.href ? "text-white" : "text-white/70 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={cn(
                        "group flex items-center gap-1 py-2 text-[13px] font-medium transition-colors",
                        openDropdown === item.label || (item.children && pathname.startsWith(`/${item.label.toLowerCase()}`))
                          ? "text-white"
                          : "text-white/70 hover:text-white",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 opacity-50 transition-transform duration-200 group-hover:translate-y-0.5",
                          openDropdown === item.label && "rotate-180",
                        )}
                      />
                    </button>
                  )}

                  {/* Dropdown panel */}
                  {item.children && (
                    <div
                      className={cn(
                        "absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all duration-200",
                        openDropdown === item.label
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-2 opacity-0",
                      )}
                    >
                      <div className="min-w-[280px] rounded-xl border border-border bg-card/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface",
                              pathname === child.href && "bg-surface",
                            )}
                          >
                            <span className="flex items-center gap-2 text-sm font-medium text-headline">
                              {child.label}
                              {child.badge && (
                                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  {child.badge}
                                </span>
                              )}
                            </span>
                            {child.description && (
                              <span className="text-xs text-muted">{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right-side buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="rounded-lg border border-primary/30 px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-primary/10"
              >
                Log in
              </Link>
              <Link
                href="/pricing"
                className="rounded-md bg-white px-5 py-1.5 text-[13px] font-bold text-black transition hover:bg-white/90"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* ---- Mobile hamburger ---- */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ---- Mobile backdrop ---- */}
      {isMenuOpen && (
        <div
          className="drawer-backdrop lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden
        />
      )}

      {/* ---- Mobile drawer ---- */}
      <div
        className={cn(
          "fixed right-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-[min(20rem,calc(100vw-1rem))] overflow-y-auto border-l border-border bg-card/95 p-5 backdrop-blur-lg transition-transform duration-300 sm:top-20 sm:h-[calc(100vh-5rem)] sm:p-6 lg:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-lg font-medium text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded((prev) => (prev === item.label ? null : item.label))
                    }
                    className="flex w-full items-center justify-between py-3 text-lg font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 opacity-50 transition-transform duration-200",
                        mobileExpanded === item.label && "rotate-180",
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      mobileExpanded === item.label
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="space-y-0.5 pb-2 pl-3">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-surface hover:text-white"
                        >
                          {child.label}
                          {child.badge && (
                            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Mobile CTA buttons */}
          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full rounded-lg border border-primary/30 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary/10"
            >
              Log in
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="w-full rounded-md bg-white py-3 text-center text-sm font-bold text-black"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
