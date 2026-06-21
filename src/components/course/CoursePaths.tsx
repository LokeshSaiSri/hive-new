import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CoursePathsProps = {
  paths: NonNullable<CoursePageConfig["paths"]>;
};

export function CoursePaths({ paths }: CoursePathsProps) {
  return (
    <section className="hive-dark-band section-py">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow={paths.eyebrow}
            statement={paths.statement}
            emphasis={paths.emphasis}
            description={paths.description}
            light={false}
            align="center"
          />
        </ScrollReveal>

        <div
          className={`mt-12 grid gap-6 ${
            paths.items.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {paths.items.map((path, index) => (
            <ScrollReveal key={path.index} delay={index * 0.08}>
              <article className="course-path-card h-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                  {path.index}
                </p>
                <h3 className="mt-4 text-2xl font-bold leading-snug text-white">{path.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/65">{path.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {path.tags.map((tag) => (
                    <span key={tag} className="course-tag course-tag--dark">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-6 border-t border-white/10 pt-5 text-sm font-semibold text-accent">
                  {path.outcome}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
