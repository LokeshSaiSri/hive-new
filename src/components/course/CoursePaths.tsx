import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CoursePathsProps = {
  paths: NonNullable<CoursePageConfig["paths"]>;
  className?: string;
};

export function CoursePaths({ paths, className }: CoursePathsProps) {
  return (
    <section className={`hive-dark-band section-py ${className ?? ""}`}>
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
            <ScrollReveal key={path.index} delay={index * 0.08} className="h-full">
              <article className="course-path-card h-full flex flex-col">
                {path.image && (
                  <div className="relative mb-5 w-full shrink-0 overflow-hidden rounded-xl bg-white/5" style={{ aspectRatio: "4/3" }}>
                    <Image src={path.image} alt={path.title} fill className="object-contain" />
                  </div>
                )}
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
