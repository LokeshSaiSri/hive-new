"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollHorizontal } from "@/components/ui/ScrollHorizontal";
import type { CourseCapstone, CoursePageConfig } from "@/data/coursePages/types";

type CourseCapstonesShowcaseProps = {
  capstones: NonNullable<CoursePageConfig["capstones"]>;
};

function CapstoneDeckCard({ capstone }: { capstone: CourseCapstone }) {
  return (
    <article
      className={`capstone-deck-card shrink-0 ${
        capstone.featured ? "capstone-deck-card--finale" : ""
      }`}
    >
      <div className="capstone-deck-card__glow" aria-hidden />
      <div className="capstone-deck-card__grain" aria-hidden />

      <div className="capstone-deck-card__top">
        <span className="capstone-deck-card__index">{capstone.index}</span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {capstone.badge && (
            <span className="capstone-deck-card__pill capstone-deck-card__pill--accent">
              {capstone.badge}
            </span>
          )}
          {capstone.featured && (
            <span className="capstone-deck-card__pill capstone-deck-card__pill--gold">
              Finale
            </span>
          )}
        </div>
      </div>

      <div className="capstone-deck-card__body">
        {capstone.category && (
          <p className="capstone-deck-card__track">{capstone.category}</p>
        )}
        <h3 className="capstone-deck-card__title">{capstone.title}</h3>
        <p className="capstone-deck-card__copy">{capstone.description}</p>
      </div>

      <div className="capstone-deck-card__foot">
        <span>Live deliverable</span>
        <span aria-hidden>·</span>
        <span>Portfolio piece</span>
      </div>
    </article>
  );
}

export function CourseCapstonesShowcase({ capstones }: CourseCapstonesShowcaseProps) {
  const items = capstones.items;

  return (
    <section className="capstone-deck-section overflow-x-clip">
      <div className="section-container section-py pb-6 sm:pb-8">
        <ScrollReveal>
          <SectionIntro
            eyebrow={capstones.eyebrow}
            statement={capstones.statement}
            emphasis={capstones.emphasis}
            description={capstones.description}
            light
            align="center"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-mid-gray sm:text-base">
            Scroll through all {items.length} builds — each one ships into your interview portfolio.
          </p>
        </ScrollReveal>
      </div>

      <div className="hidden lg:block">
        <ScrollHorizontal durationScale={0.88}>
          {items.map((item) => (
            <CapstoneDeckCard key={item.index} capstone={item} />
          ))}
        </ScrollHorizontal>
      </div>

      <div className="section-container pb-14 pt-2 lg:hidden">
        <HorizontalScroller slideClassName="basis-[88%] sm:basis-[74%]" bleed={false}>
          {items.map((item) => (
            <CapstoneDeckCard key={item.index} capstone={item} />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
