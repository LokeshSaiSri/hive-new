"use client";

import Link from "next/link";
import { ReelPhoneShowcase } from "@/components/ui/ReelPhoneShowcase";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { hiveInstagramUrl } from "@/data/reels";

export function ProgramReels({
  eyebrow = "Life at Hive",
  statement = "Cohort",
  emphasis = "shorts.",
  description,
  className,
}: {
  eyebrow?: string;
  statement?: string;
  emphasis?: string;
  description?: string;
  className?: string;
} = {}) {
  return (
    <section id="reels" className={`program-section hive-dark-band section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-glow">
                {eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {statement} <span className="font-serif italic text-accent">{emphasis}</span>
              </h2>
              {description && (
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                  {description}
                </p>
              )}
            </div>

            <Link
              href={hiveInstagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              @hiveschool.co
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-10">
          <ReelPhoneShowcase />
        </div>
      </div>
    </section>
  );
}
