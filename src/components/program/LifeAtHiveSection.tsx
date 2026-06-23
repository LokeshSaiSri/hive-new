"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import type { LifeAtHiveContent } from "@/data/coursePages/lifeAtHive";

type LifeAtHiveSectionProps = {
  content: LifeAtHiveContent;
  className?: string;
};

function LifeAtHiveColumn({ day }: { day: LifeAtHiveContent["days"][0] }) {
  return (
    <article className="life-at-hive__column h-full">
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
  );
}

export function LifeAtHiveSection({ content, className }: LifeAtHiveSectionProps) {
  const columnCount = content.days.length;

  return (
    <section className={`life-at-hive program-tab-section section-band-light overflow-hidden section-py ${className ?? ""}`}>
      <div className="section-container">
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

        <div className="md:hidden mt-10">
          <ScrollReveal>
            <HorizontalScroller
              autoplay
              autoplayDelay={3000}
              slideClassName="w-[75vw] flex-shrink-0"
            >
              {content.days.map((day) => (
                <LifeAtHiveColumn key={day.day} day={day} />
              ))}
            </HorizontalScroller>
          </ScrollReveal>
        </div>

        <div className="hidden md:block">
          <ScrollReveal className="mt-10 lg:mt-14">
            <div
              className="life-at-hive__grid"
              style={{ "--life-at-hive-columns": columnCount } as CSSProperties}
            >
              {content.days.map((day) => (
                <LifeAtHiveColumn key={day.day} day={day} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
