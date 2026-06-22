"use client";

import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import type { CoursePageConfig } from "@/data/coursePages/types";
import { asset } from "@/lib/assets";
import { youtubeThumbnail } from "@/lib/youtube";

type CourseHeroProps = {
  hero: CoursePageConfig["hero"];
};

export function CourseHero({ hero }: CourseHeroProps) {
  const posterVideoId = hero.posterVideoId ?? hero.videoId;
  const posterSrc = youtubeThumbnail(posterVideoId);
  const videoSrc = asset(hero.backgroundVideo);

  return (
    <section className="relative hive-dark-band overflow-hidden">
      <div className="relative min-h-[min(100dvh,920px)]">
        <HeroBackgroundVideo videoSrc={videoSrc} posterSrc={posterSrc} variant="full" />

        <div className="program-hero-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        <div className="program-hero-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        <div className="hero-slash pointer-events-none absolute inset-0 z-[1] opacity-20" />
        <div className="hero-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.1] mix-blend-overlay" />

        <div className="relative z-10 flex min-h-[min(100dvh,920px)] flex-col justify-end px-4 pb-8 pt-28 sm:px-6 sm:pb-10 lg:px-8 lg:pt-32">
          <div className="section-container w-full">
            <ScrollReveal>
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="course-hero-chip course-hero-chip--accent">{hero.badge}</span>
                  <span className="course-hero-chip">{hero.location}</span>
                  <span className="course-hero-chip">{hero.intake}</span>
                </div>

                <h1 className="mt-6 text-[clamp(2.75rem,7vw,4.75rem)] font-bold leading-[0.95] tracking-tight text-white">
                  {hero.title}{" "}
                  <em className="font-serif font-medium not-italic text-accent">{hero.emphasis}</em>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
                  {hero.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <PillButton variant="highlight" tone="dark" href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                  </PillButton>
                  {hero.secondaryCta && (
                    <PillButton variant="secondary" tone="dark" href={hero.secondaryCta.href}>
                      {hero.secondaryCta.label}
                    </PillButton>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-10 lg:mt-12">
              <div className="program-hero-stats-dock">
                <ul className="program-hero-stats-grid">
                  {hero.stats.map((stat) => (
                    <li key={stat.label} className="program-hero-stat-cell">
                      <p className="program-hero-stat-value">{stat.value}</p>
                      <p className="program-hero-stat-label">{stat.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {hero.meta.map((item) => (
                  <div key={item.label} className="course-meta-card program-hero-meta-card">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-white sm:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
