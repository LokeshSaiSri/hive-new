"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { ScrollHorizontal } from "@/components/ui/ScrollHorizontal";
import type { CourseCapstone, CoursePageConfig } from "@/data/coursePages/types";
import Image from "next/image";

type CourseCapstonesShowcaseProps = {
  capstones: NonNullable<CoursePageConfig["capstones"]>;
  className?: string;
};

function CapstoneDeckCard({ capstone }: { capstone: CourseCapstone }) {
  return (
    <article
      className={`group capstone-deck-card shrink-0 ${capstone.featured ? "capstone-deck-card--finale" : ""
        } relative overflow-hidden`}
    >
      <div className="capstone-deck-card__glow" aria-hidden />
      <div className="capstone-deck-card__grain" aria-hidden />
      
      {capstone.image && (
        <Image
          src={capstone.image}
          alt={capstone.title}
          fill
          className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060f32]/95 via-[#060f32]/40 to-transparent z-0" aria-hidden />

      <div className="capstone-deck-card__top relative z-10">
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

      <div className="capstone-deck-card__body relative z-10">
        {capstone.category && (
          <p className="capstone-deck-card__track">{capstone.category}</p>
        )}
        <h3 className="capstone-deck-card__title">{capstone.title}</h3>
        <p className="capstone-deck-card__copy">{capstone.description}</p>
      </div>

      <div className="capstone-deck-card__foot relative z-10">
        <span>Live deliverable</span>
        <span aria-hidden>·</span>
        <span>Portfolio piece</span>
      </div>
    </article>
  );
}

export function CourseCapstonesShowcase({ capstones, className }: CourseCapstonesShowcaseProps) {
  const items = capstones.items;

  return (
    <section className={`capstone-deck-section overflow-x-clip ${className ?? ""}`}>
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

      <div className="section-container pb-14 pt-2">
        <HorizontalScroller slideClassName="w-auto" bleed={false} autoplay={true} autoplayDelay={3500}>
          {items.map((item) => (
            <CapstoneDeckCard key={item.index} capstone={item} />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
