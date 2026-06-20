"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { LifeAtHiveContent } from "@/data/coursePages/lifeAtHive";

type LifeAtHiveSectionProps = {
  content: LifeAtHiveContent;
};

export function LifeAtHiveSection({ content }: LifeAtHiveSectionProps) {
  const columnCount = content.days.length;

  return (
    <section className="life-at-hive program-tab-section section-band-light overflow-hidden">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            eyebrow={content.eyebrow}
            statement={content.statement}
            emphasis={content.emphasis}
            description={content.description}
            light
            align="center"
          />
        </ScrollReveal>

        <ScrollReveal className="mt-10 lg:mt-14">
          <div
            className="life-at-hive__grid"
            style={{ "--life-at-hive-columns": columnCount } as CSSProperties}
          >
            {content.days.map((day) => (
              <article key={day.day} className="life-at-hive__column">
                <p className="life-at-hive__day">{day.day}</p>
                <div className="life-at-hive__image-frame">
                  <Image
                    src={day.image}
                    alt={`${day.day} schedule at HiveSchool`}
                    width={972}
                    height={3020}
                    className="life-at-hive__image"
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 16vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
