"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/data/nav";
import { PillButton } from "@/components/ui/PillButton";
import { hiveLogo } from "@/data/partners";

const desktopNavLink =
  "group relative px-1 py-2 text-sm font-medium text-white/75 transition-colors duration-300 hover:text-white after:pointer-events-none after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";

const desktopNavLinkActive = "text-white after:scale-x-100";

const mobileNavLink =
  "block rounded-lg border-l-2 border-transparent py-3 pl-3 pr-2 text-sm text-white/80 transition-all duration-300 hover:border-white hover:bg-white/5 hover:text-white";

const dropdownNavLink =
  "group relative block px-4 py-3 text-sm text-white/80 transition-colors duration-300 hover:text-white after:pointer-events-none after:absolute after:bottom-2 after:left-4 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-[#060f32]/80 shadow-lg backdrop-blur-xl"
          : "bg-gradient-to-b from-ink/85 to-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between py-3 sm:py-4">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center rounded-lg p-1 transition-opacity duration-200 hover:opacity-80"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={hiveLogo}
            alt="HiveSchool"
            width={112}
            height={30}
            className="h-7 w-auto brightness-0 invert sm:h-8"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) =>
            item.type === "dropdown" ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  suppressHydrationWarning
                  className={`flex items-center gap-1.5 ${desktopNavLink} ${
                    openDropdown === item.label ? desktopNavLinkActive : ""
                  }`}
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                >
                  {item.label}
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`h-3 w-3 transition-transform duration-200 ${
                      openDropdown === item.label ? "rotate-180 text-white" : "text-white/45"
                    }`}
                    aria-hidden
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 w-72 pt-2">
                    <div className="rounded-2xl border border-white/10 chart-panel-metallic p-2 shadow-2xl">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={dropdownNavLink}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={desktopNavLink}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <PillButton variant="highlight" tone="dark" href="#apply">
            Join Hiveschool
          </PillButton>
        </div>

        <button
          type="button"
          suppressHydrationWarning
          className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-40 bg-ink/55 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 max-h-[calc(100svh-3.5rem)] overflow-y-auto overscroll-contain border-t border-white/10 chart-panel-metallic px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
            {navItems.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label} className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/55">
                    {item.label}
                  </p>
                  {item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={mobileNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-4 border-t border-white/10 pt-4">
              <PillButton
                variant="highlight"
                tone="dark"
                href="#apply"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Join Hiveschool
              </PillButton>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
