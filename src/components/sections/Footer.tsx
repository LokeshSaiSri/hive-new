"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PillButton } from "@/components/ui/PillButton";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Contact Us", href: "/contact" },
];

const courses = [
  { label: "PGP in Revenue & Marketing", href: "/pgp" },
  { label: "AI Marketing Fellowship", href: "/ai-marketing" },
  { label: "PGP Admissions", href: "/pgp#apply" },
  { label: "AI Marketing Admissions", href: "/ai-marketing#apply" },
];

const policies = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <footer className="hive-dark-band">
      {/* Cinematic closing band */}
      <div className="border-t border-white/10 px-4 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-display font-bold text-white">
            H<span className="text-accent">I</span>VE
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/50">
            India&apos;s only revenue-focused business school. Built for people
            who intend to run what drives every business.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PillButton variant="primary" href="#apply">
              Apply to HiveSchool
            </PillButton>
            <PillButton variant="secondary" href="#placement-report">
              Download Placement Report
            </PillButton>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
                Stay in the loop
              </p>
              <form onSubmit={handleSubmit} className="mt-4 flex max-w-md gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-11 flex-1 rounded-full border border-white/20 bg-white/5 px-5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white"
                  required
                />
                <PillButton variant="primary" type="submit">
                  {submitted ? "Done" : "Submit"}
                </PillButton>
              </form>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                  Quick Links
                </p>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                  Courses
                </p>
                <ul className="space-y-2">
                  {courses.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                  Policies
                </p>
                <ul className="space-y-2">
                  {policies.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} HiveSchool. All rights reserved.
            </p>
            <a
              href="https://x.com/hiveschool"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition hover:text-white"
              aria-label="HiveSchool on X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
