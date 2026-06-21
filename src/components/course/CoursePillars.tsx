import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CoursePillarsProps = {
  pillars: NonNullable<CoursePageConfig["pillars"]>;
  variant?: "default" | "bento";
};

export function CoursePillars({ pillars, variant = "default" }: CoursePillarsProps) {
  const isBento = variant === "bento";
  const isQuadBento = isBento && pillars.items.length >= 4;

  return (
    <section className="section-band-light section-py">
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

        <div
          className={
            isBento
              ? `course-pillars-bento mt-12${isQuadBento ? " course-pillars-bento--quad" : ""}`
              : `mt-12 grid gap-5 ${
                  pillars.items.length >= 4
                    ? "sm:grid-cols-2 xl:grid-cols-4"
                    : "md:grid-cols-3"
                }`
          }
        >
          {pillars.items.map((pillar, index) => (
            <ScrollReveal key={pillar.index} delay={index * 0.06}>
              <article
                className={
                  isBento
                    ? `course-pillars-bento__card hover-lift-card ${
                        index === 0 && !isQuadBento ? "course-pillars-bento__card--lead" : ""
                      }`
                    : "course-pillar-card h-full"
                }
              >
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
