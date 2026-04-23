"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

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
      { label: "Deep Reel Analyzer", href: "/features/deep-reel-analyzer", description: "5-mode breakdown of any reel" },
      { label: "Content Mix Engine", href: "/features/content-mix", description: "Merge viral elements into new concepts" },
      { label: "Facebook Ads Library", href: "/features/ads-library", description: "Track competitor ad creatives" },
      { label: "AI Template Generation", href: "/features/ai-templates", description: "Custom analysis for your niche" },
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
      { label: "LinkedIn Analytics", href: "/platforms/linkedin-analytics" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const dropdownTimeout = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [isMenuOpen]);

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      if (!href.includes("#") || href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${isNavVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-bg border-b border-border shadow-sm" : "bg-transparent border-transparent"
        }`}
    >
      <nav aria-label="Primary">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={(e) => handleLinkClick(e, "/")}
          >
            <span className="text-xl font-bold tracking-tight text-headline">
              The<span className="text-primary">Hook</span>Lab
            </span>
          </Link>

          {/* ---- Desktop nav ---- */}
          <div className="hidden items-center gap-10 lg:flex">
            <div className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative group h-16 flex items-center"
                  onMouseEnter={() => item.children && enterDropdown(item.label)}
                  onMouseLeave={() => item.children && leaveDropdown()}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href!)}
                      className={`text-[14px] font-semibold transition-colors ${pathname === item.href ? "text-headline" : "text-body hover:text-headline"
                        }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={`flex items-center gap-1 text-[14px] font-semibold transition-colors ${openDropdown === item.label || (item.children && pathname.startsWith(`/${item.label.toLowerCase()}`))
                          ? "text-headline"
                          : "text-body hover:text-headline"
                        }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 opacity-50 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  )}

                  {/* Dropdown panel */}
                  {item.children && (
                    <div
                      className={`absolute left-1/2 top-full -translate-x-1/2 pt-1 transition-all duration-200 w-max ${openDropdown === item.label
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-2 opacity-0"
                        }`}
                    >
                      <div className="min-w-[280px] rounded-xl border border-border bg-card p-3 shadow-soft backdrop-blur-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={(e) => handleLinkClick(e, child.href)}
                            className={`flex flex-col gap-1 rounded-lg px-4 py-3 transition-colors hover:bg-surface ${pathname === child.href ? "bg-surface" : ""
                              }`}
                          >
                            <span className="flex items-center gap-2 text-[14px] font-semibold text-headline tracking-tight">
                              {child.label}
                              {child.badge && (
                                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase font-bold text-primary">
                                  {child.badge}
                                </span>
                              )}
                            </span>
                            {child.description && (
                              <span className="text-[12px] leading-relaxed text-muted">{child.description}</span>
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
                href="https://app.thehooklab.in/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(e, "https://app.thehooklab.in/login")}
                className="rounded-lg bg-headline px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-headline/90 shadow-soft"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* ---- Mobile hamburger ---- */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-body hover:bg-surface lg:hidden"
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* ---- Mobile backdrop ---- */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-headline/20 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ---- Mobile drawer ---- */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-40 w-full max-w-sm overflow-y-auto bg-card border-l border-border px-6 py-8 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex justify-end mb-8">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-headline"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href!)}
                  className="block py-3 text-[17px] font-bold text-headline transition-colors"
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
                    className="flex w-full items-center justify-between py-3 text-[17px] font-bold text-headline transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-5 w-5 opacity-50 transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${mobileExpanded === item.label
                        ? "max-h-[800px] opacity-100 mb-2"
                        : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="flex flex-col gap-1 border-l-2 border-borderbg ml-3 pl-4 pt-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={(e) => handleLinkClick(e, child.href)}
                          className="py-2.5 text-[15px] font-semibold text-body hover:text-headline"
                        >
                          {child.label}
                          {child.badge && (
                            <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
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
          <div className="mt-8 flex flex-col pt-6 border-t border-border">
            <Link
              href="https://app.thehooklab.in/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleLinkClick(e, "https://app.thehooklab.in/login")}
              className="w-full rounded-lg bg-headline py-4 text-center text-[15px] font-bold text-white shadow-soft transition-colors hover:bg-headline/90"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
