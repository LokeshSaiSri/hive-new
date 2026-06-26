import Image from "next/image";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CourseAudienceProps = {
  audience: NonNullable<CoursePageConfig["audience"]>;
  className?: string;
};

export function CourseAudience({ audience, className }: CourseAudienceProps) {
  return (
    <section className={`hive-dark-band section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow={audience.eyebrow}
            statement={audience.statement}
            emphasis={audience.emphasis}
            description={audience.description}
            light={false}
            align="center"
          />
        </ScrollReveal>

        <div
          className={`mt-12 grid gap-4 ${audience.items.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
            }`}
        >
          {audience.items.map((item, index) => (
            <ScrollReveal key={item.index} delay={index * 0.05} className="h-full">
              <article className="course-audience-card h-full flex flex-col">
                {item.image && (
                  <div className="relative mb-5 w-full shrink-0 overflow-hidden rounded-xl bg-white/5" style={{ aspectRatio: "4/3" }}>
                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                  </div>
                )}
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                  {item.index}
                </p>
                <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">
                  {item.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {audience.footnote && (
          <ScrollReveal className="mt-8 text-center">
            <p className="text-sm text-white/45">{audience.footnote}</p>
          </ScrollReveal>
        )}

        <ScrollReveal className="mt-10 flex justify-center">
          <PillButton variant="highlight" tone="dark" href="#apply">
            Start application
          </PillButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
