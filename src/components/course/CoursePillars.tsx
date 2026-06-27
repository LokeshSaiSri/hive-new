import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CoursePillarsProps = {
  pillars: NonNullable<CoursePageConfig["pillars"]>;
  variant?: "default" | "bento";
  className?: string;
};

type PillarCardProps = {
  pillar: NonNullable<CoursePageConfig["pillars"]>["items"][0];
  index: number;
  isBento: boolean;
  isQuadBento: boolean;
};

function PillarCard({ pillar, index, isBento, isQuadBento }: PillarCardProps) {
  return (
    <article
      className={
        isBento
          ? `course-pillars-bento__card hover-lift-card ${index === 0 && !isQuadBento ? "course-pillars-bento__card--lead" : ""
          }`
          : "course-pillar-card h-full flex flex-col"
      }
    >
      {pillar.image && (
        <div className="relative mb-5 w-full shrink-0 overflow-hidden rounded-xl bg-ink/5" style={{ aspectRatio: "4/3" }}>
          <Image src={pillar.image} alt={pillar.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      )}
      <p
        className={
          isBento
            ? "course-pillars-bento__index"
            : "text-[11px] font-bold uppercase tracking-[0.22em] text-electric-blue"
        }
      >
        {isBento ? pillar.index : `Pillar ${pillar.index}`}
      </p>
      <h3
        className={
          isBento
            ? "course-pillars-bento__title"
            : "mt-4 text-xl font-bold leading-snug text-ink"
        }
      >
        {pillar.title}
      </h3>
      <p
        className={
          isBento
            ? "course-pillars-bento__copy"
            : "mt-3 text-sm leading-relaxed text-mid-gray sm:text-base"
        }
      >
        {pillar.description}
      </p>
    </article>
  );
}

export function CoursePillars({ pillars, variant = "default", className }: CoursePillarsProps) {
  const isBento = variant === "bento";
  const isQuadBento = isBento && pillars.items.length >= 4;

  return (
    <section className={`section-band-light section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow={pillars.eyebrow}
            statement={pillars.statement}
            emphasis={pillars.emphasis}
            description={pillars.description}
            light
            align="center"
          />
        </ScrollReveal>

        <div className="md:hidden mt-10">
          <ScrollReveal>
            <HorizontalScroller
              autoplay
              autoplayDelay={3000}
              slideClassName="w-[85vw] flex-shrink-0"
            >
              {pillars.items.map((pillar, index) => (
                <PillarCard
                  key={pillar.index}
                  pillar={pillar}
                  index={index}
                  isBento={isBento}
                  isQuadBento={isQuadBento}
                />
              ))}
            </HorizontalScroller>
          </ScrollReveal>
        </div>

        <div className="hidden md:block">
          <div
            className={
              isBento
                ? `course-pillars-bento mt-12${isQuadBento ? " course-pillars-bento--quad" : ""}`
                : `mt-12 grid gap-5 ${pillars.items.length >= 4
                  ? "sm:grid-cols-2 xl:grid-cols-4"
                  : "md:grid-cols-3"
                }`
            }
          >
            {pillars.items.map((pillar, index) => (
              <ScrollReveal key={pillar.index} delay={index * 0.06} className="h-full">
                <PillarCard
                  pillar={pillar}
                  index={index}
                  isBento={isBento}
                  isQuadBento={isQuadBento}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
