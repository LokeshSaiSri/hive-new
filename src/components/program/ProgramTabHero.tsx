"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import type { ProgramTabHeroContent } from "@/data/coursePages/pgp-tabs";
import { easeHive } from "@/lib/motion";

type ProgramTabHeroProps = {
  content: ProgramTabHeroContent;
  tabLabel: string;
};

export function ProgramTabHero({ content, tabLabel }: ProgramTabHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="program-tab-hero hive-dark-band relative overflow-hidden">
      <div className="program-tab-hero__mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="program-tab-hero__stripe pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" />

      <div className="section-container relative z-10 pb-12 pt-28 sm:pb-14 sm:pt-32">
        <div className="program-tab-hero__layout">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: easeHive }}
            className="program-tab-hero__copy"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="program-tab-hero__tab-pill">{tabLabel}</span>
              <span className="course-hero-chip">{content.eyebrow}</span>
            </div>

            <h1 className="program-tab-hero__title">
              {content.statement}{" "}
              <em className="font-serif font-medium not-italic text-accent">{content.emphasis}</em>
            </h1>

            <p className="program-tab-hero__lead">{content.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton variant="highlight" tone="dark" href={content.primaryCta?.href ?? "#apply"}>
                {content.primaryCta?.label ?? "Apply now"}
              </PillButton>
              {content.secondaryCta && (
                <PillButton variant="secondary" tone="dark" href={content.secondaryCta.href}>
                  {content.secondaryCta.label}
                </PillButton>
              )}
            </div>
          </motion.div>

          {content.stats && content.stats.length > 0 && (
            <motion.ul
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: easeHive }}
              className="program-tab-hero__stats"
              aria-label="Programme highlights"
            >
              {content.stats.map((stat) => (
                <li key={stat.label} className="program-tab-hero__stat">
                  <p className="program-tab-hero__stat-value">{stat.value}</p>
                  <p className="program-tab-hero__stat-label">{stat.label}</p>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </section>
  );
}
