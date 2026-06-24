"use client";

import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/assets";

const pgpLinks = [
  { label: "Overview", href: "/pgp" },
  { label: "Curriculum", href: "/pgp/curriculum" },
  { label: "Placements", href: "/pgp/placements" },
  { label: "Admissions", href: "/pgp/admissions" },
  { label: "Application Form", href: "/pgp#apply" },
];

const fellowshipLinks = [
  { label: "Overview", href: "/ai-marketing" },
  { label: "Curriculum", href: "/ai-marketing/curriculum" },
  { label: "Admissions", href: "/ai-marketing/admissions" },
  { label: "Application Form", href: "/ai-marketing#apply" },
];

const ugLinks = [
  { label: "Overview", href: "/ug" },
  { label: "Curriculum", href: "/ug/curriculum" },
  { label: "Admissions", href: "/ug/admissions" },
  { label: "Application Form", href: "/ug#apply" },
];

const exploreLinks = [
  { label: "Life at Hive", href: "/campus" },
  { label: "Placement Report", href: "/HiveSchool Placement Report 2025-26.pdf" },
  { label: "Career Outcomes", href: "/placements" },
  { label: "FAQs", href: "/#faq" },
];

const otherLinks = [
  { label: "Terms & Conditions", href: "/tnc-2" },
  { label: "Privacy Policy", href: "/privacy-poliicy-2" },
  { label: "Refund Policy", href: "/refund-policy-2" },
];

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/40 hover:text-white"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#060f32] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url(${asset("images/misc/life-at-hive.webp")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060f32]/90 via-[#060f32]/95 to-[#04070d]" />

      <div className="section-container relative z-10 py-10 sm:py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={asset("images/misc/hiveschool-logo.png")}
                alt="HiveSchool"
                width={160}
                height={48}
                className="h-10 w-auto brightness-0 invert sm:h-11"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
              Building 9A, DLF Cyber City,
              <br />
              Gurugram, Haryana — 122022
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon href="https://www.instagram.com/hiveschool" label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@hiveschool" label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/school/hiveschool" label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-white">PGP in Revenue & Marketing</p>
              <ul className="mt-4 space-y-2.5">
                {pgpLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Marketing Fellowship</p>
              <ul className="mt-4 space-y-2.5">
                {fellowshipLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Explore HiveSchool</p>
              <ul className="mt-4 space-y-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {ugLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition hover:text-white">
                      UG · {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Other Links</p>
              <ul className="mt-4 space-y-2.5">
                {otherLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} HiveSchool. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
