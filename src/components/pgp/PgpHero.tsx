"use client";


import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CountUp } from "@/components/pgp/CountUp";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import type { CoursePageConfig } from "@/data/coursePages/types";
import { videoAsset } from "@/lib/assets";
import { youtubeThumbnail } from "@/lib/youtube";

/** "Get placed in [word]": the word cycles. Holds still for reduced motion. */
function HeroRotator({ lead, words }: { lead: string; words: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce, words.length]);

  return (
    <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-lg font-medium text-white sm:mt-5 sm:justify-start sm:text-2xl">
      <span>{lead}</span>
      <motion.span
        key={i}
        aria-live="polite"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-lg bg-accent px-3 py-0.5 font-bold text-ink"
      >
        {words[i]}
      </motion.span>
    </p>
  );
}

/** The headline: every word rises out of its own mask, one after another. */
function HeroTitle({ title, emphasis }: { title: string; emphasis: string }) {
  const reduce = useReducedMotion();
  const parts = [
    ...title.split(" ").map((w) => ({ w, em: false })),
    ...emphasis.split(" ").map((w) => ({ w, em: true })),
  ];

  return (
    <h1 className="mt-0 sm:mt-6 text-[clamp(2.5rem,8vw,4.75rem)] font-bold leading-[0.95] tracking-tight text-white">
      <span className="sr-only">
        {title} {emphasis}
      </span>
      <span aria-hidden>
        {parts.map(({ w, em }, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${em ? "font-serif font-medium not-italic text-accent" : ""}`}
              initial={reduce ? false : { y: "115%", rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.09 }}
            >
              {w}
            </motion.span>
            {i < parts.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </h1>
  );
}

/** A small "scroll" prompt at the bottom of the hero. Fades out as soon as you move. */
function ScrollCue() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 160], [1, 0]);
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex"
    >
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.35em] text-white/60">Scroll</span>
      <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 pt-1.5">
        <span className="pgp-cue h-1.5 w-1 rounded-full bg-accent" />
      </span>
    </motion.div>
  );
}

type PgpHeroProps = {
  hero: CoursePageConfig["hero"] & { rotator?: { lead: string; words: string[] } };
};

export function PgpHero({ hero }: PgpHeroProps) {
  const posterVideoId = hero.posterVideoId ?? hero.videoId;
  const posterSrc = youtubeThumbnail(posterVideoId);
  const videoSrc = videoAsset(hero.backgroundVideo);

  return (
    <section className="relative hive-dark-band overflow-hidden">
      <div className="relative min-h-[85svh] sm:min-h-[min(100dvh,920px)]">
        <div>
          <HeroBackgroundVideo videoSrc={videoSrc} posterSrc={posterSrc} variant="full" />
        </div>

        <div className="program-hero-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        <div className="program-hero-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        <div className="hero-slash pointer-events-none absolute inset-0 z-[1] opacity-20" />
        <div className="hero-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.1] mix-blend-overlay" />

        <div className="relative z-10 flex min-h-[85svh] sm:min-h-[min(100dvh,920px)] flex-col justify-end sm:justify-end px-4 pb-12 pt-20 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="section-container w-full">
            <ScrollReveal>
              <div className="max-w-3xl text-center sm:text-left mx-auto sm:mx-0">
                <div className="hidden sm:flex flex-wrap items-center gap-1.5 sm:gap-2.5 justify-center sm:justify-start">
                  <span className="course-hero-chip course-hero-chip--accent text-[10px] sm:text-xs">{hero.badge}</span>
                  <span className="course-hero-chip text-[10px] sm:text-xs">{hero.location}</span>
                  <span className="course-hero-chip text-[10px] sm:text-xs">{hero.intake}</span>
                </div>

                <HeroTitle title={hero.title} emphasis={hero.emphasis} />

                {hero.rotator && <HeroRotator lead={hero.rotator.lead} words={hero.rotator.words} />}

                <p className="mt-4 sm:mt-5 max-w-2xl text-[13px] sm:text-lg leading-relaxed text-white/75 mx-auto sm:mx-0 line-clamp-3 sm:line-clamp-none">
                  {hero.description}
                </p>

                <div className="mt-6 sm:mt-8 flex flex-row flex-wrap justify-center sm:justify-start gap-3">
                  <PillButton variant="highlight" tone="dark" href={hero.primaryCta.href} className="!w-auto">
                    {hero.primaryCta.label}
                  </PillButton>
                  {hero.secondaryCta && (
                    <PillButton variant="secondary" tone="dark" href={hero.secondaryCta.href} className="!w-auto">
                      {hero.secondaryCta.label}
                    </PillButton>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-6 sm:mt-12 hidden sm:block">
              <div className="program-hero-stats-dock !pt-3 sm:!pt-5">
                <ul className="program-hero-stats-grid !gap-2 sm:!gap-4">
                  {hero.stats.map((stat) => (
                    <li key={stat.label} data-glow className="program-hero-stat-cell !p-2.5 sm:!p-4 !rounded-lg sm:!rounded-2xl">
                      <p className="program-hero-stat-value !text-xl sm:!text-3xl">
                        <CountUp value={stat.value} />
                      </p>
                      <p className="program-hero-stat-label !text-[9px] sm:!text-xs !mt-0.5 sm:!mt-2">{stat.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 sm:mt-8">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                {hero.meta.map((item) => (
                  <div key={item.label} data-glow className="course-meta-card program-hero-meta-card">
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                      {item.label}
                    </p>
                    <p className="mt-1 sm:mt-1.5 text-xs sm:text-base font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ScrollCue />
      </div>
    </section>
  );
}
