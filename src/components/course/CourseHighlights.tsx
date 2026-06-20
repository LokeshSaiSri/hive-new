import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CourseHighlightsProps = {
  highlights: NonNullable<CoursePageConfig["highlights"]>;
};

export function CourseHighlights({ highlights }: CourseHighlightsProps) {
  return (
    <section className="section-band-light">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow={highlights.eyebrow}
            statement={highlights.statement}
            emphasis={highlights.emphasis}
            light
            align="center"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {highlights.items.map((item, index) => (
            <ScrollReveal key={item.index} delay={index * 0.06}>
              <Link href={item.href} className="course-highlight-card group block h-full">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-electric-blue">
                  {item.index}
                </p>
                <h3 className="mt-4 text-2xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-base text-mid-gray">{item.subtitle}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-electric-blue transition group-hover:gap-3">
                  Explore
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
