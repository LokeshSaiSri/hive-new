"use client";

import Link from "next/link";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";
import { asset } from "@/lib/assets";
import { youtubeThumbnail } from "@/lib/youtube";

type FellowshipHeroProps = {
  hero: FellowshipOverview["hero"];
};

export function FellowshipHero({ hero }: FellowshipHeroProps) {
  const posterSrc = youtubeThumbnail(hero.videoId);
  const videoSrc = asset(hero.backgroundVideo);

  return (
    <section className="fellowship-hero" aria-label="AI Marketing Fellowship">
      <div className="fellowship-hero__media" aria-hidden>
        <HeroBackgroundVideo videoSrc={videoSrc} posterSrc={posterSrc} variant="full" />
      </div>
      <div className="fellowship-hero__veil" aria-hidden />
      <div className="fellowship-hero__grain" aria-hidden />

      <div className="fellowship-hero__body">
        <div className="section-container">
          <ScrollReveal className="fellowship-hero__inner">
            <p className="fellowship-eyebrow fellowship-eyebrow--light">
              {hero.badge} · {hero.tagline}
            </p>

            <h1 className="fellowship-hero__title">
              <span>{hero.title}</span>
              <em>{hero.emphasis}</em>
            </h1>

            <p className="fellowship-hero__line">{hero.description}</p>

            <div className="fellowship-hero__cta">
              <Link href={hero.primaryCta.href} className="fellowship-btn fellowship-btn--gold">
                {hero.primaryCta.label}
              </Link>
            </div>
          </ScrollReveal>

          <ul className="fellowship-hero__stats" aria-label="Programme highlights">
            {hero.stats.map((stat) => (
              <li key={stat.label}>
                <span className="fellowship-hero__stat-num">{stat.value}</span>
                <span className="fellowship-hero__stat-lbl">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
