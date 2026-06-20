"use client";

import Link from "next/link";
import { ReelPhoneShowcase } from "@/components/ui/ReelPhoneShowcase";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { hiveInstagramUrl, pgpReels } from "@/data/reels";

export function PgpReels() {
  return (
    <section id="reels" className="hive-dark-band reels-stage relative overflow-hidden">
      <div className="reels-stage-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="section-container relative section-py">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Reels
          </p>

          <h2 className="mt-5 text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[0.95] tracking-tight text-white">
            Student{" "}
            <em className="font-serif font-medium not-italic text-accent">Shorts</em>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Highlights from the HiveSchool cohort — orientation, challenges, and campus
            life. Follow @hiveschool.co.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={hiveInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.12]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.4-1.1-.5-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.4 2.3-.5 1.3-.1 1.7-.1 4.9-.1zm0-2.2C8.7 0 8.3 0 7 0 5.7.1 4.8.3 4 .6c-.9.3-1.6.7-2.3 1.4-.7.7-1.1 1.4-1.4 2.3-.3.8-.5 1.7-.6 3-.1 1.3-.1 1.7-.1 5s0 3.7.1 5c.1 1.3.3 2.2.6 3 .3.9.7 1.6 1.4 2.3.7.7 1.4 1.1 2.3 1.4.8.3 1.7.5 3 .6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.9-.3 1.6-.7 2.3-1.4.7-.7 1.1-1.4 1.4-2.3.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.9-.7-1.6-1.4-2.3-.7-.7-1.4-1.1-2.3-1.4-.8-.3-1.7-.5-3-.6C15.7 0 15.3 0 12 0z" />
                <path d="M12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z" />
              </svg>
              @hiveschool.co
            </Link>
            <p className="text-sm text-white/45">{pgpReels.length} reels · updated weekly</p>
          </div>
        </ScrollReveal>

        <div className="mt-12 sm:mt-16">
          <ReelPhoneShowcase />
        </div>
      </div>
    </section>
  );
}
