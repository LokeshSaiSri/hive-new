import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CourseCapstonesShowcase } from "@/components/course/CourseCapstonesShowcase";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CourseCapstonesProps = {
  capstones: NonNullable<CoursePageConfig["capstones"]>;
  className?: string;
};

export function CourseCapstones({ capstones, className }: CourseCapstonesProps) {
  if (capstones.variant === "showcase") {
    return <CourseCapstonesShowcase capstones={capstones} className={className} />;
  }

  return (
    <section className={`section-band-light ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow={capstones.eyebrow}
            statement={capstones.statement}
            emphasis={capstones.emphasis}
            description={capstones.description}
            light
            align="center"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capstones.items.map((item, index) => (
            <ScrollReveal key={item.index} delay={index * 0.04}>
              <article
                className={`course-capstone-card h-full ${
                  item.featured ? "course-capstone-card--featured sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-electric-blue">
                  {item.index}
                  {item.featured ? " · Final capstone" : ""}
                </p>
                <h3 className="mt-3 text-lg font-bold leading-snug text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mid-gray">{item.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
