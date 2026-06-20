import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { CoursePageConfig } from "@/data/coursePages/types";

type CourseFeesProps = {
  fees: NonNullable<CoursePageConfig["fees"]>;
};

export function CourseFees({ fees }: CourseFeesProps) {
  return (
    <section className="hive-dark-band section-py">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
          <ScrollReveal>
            <SectionIntro
              eyebrow={fees.eyebrow}
              statement={fees.statement}
              emphasis={fees.emphasis}
              light={false}
              align="left"
              size="display"
            />
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="course-hero-chip course-hero-chip--accent">{fees.badge}</span>
              <span className="course-hero-chip">{fees.intake}</span>
            </div>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">{fees.description}</p>
            {fees.note && (
              <p className="mt-4 text-sm text-white/45">{fees.note}</p>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="course-fees-card">
              <div className="space-y-3">
                {fees.lines.map((line) => (
                  <div
                    key={line.label}
                    className={`flex items-center justify-between gap-4 border-b border-white/10 pb-3 ${
                      line.highlight ? "border-accent/30" : ""
                    }`}
                  >
                    <span className="text-sm text-white/70">{line.label}</span>
                    <span
                      className={`font-semibold ${
                        line.highlight ? "text-2xl text-accent" : "text-white"
                      }`}
                    >
                      {line.amount}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  Scholarships available
                </p>
                {fees.scholarships.map((scholarship) => (
                  <div key={scholarship.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-semibold text-white">{scholarship.title}</p>
                    <p className="mt-1 text-sm text-white/55">{scholarship.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <PillButton variant="highlight" tone="dark" href="#apply">
                  Apply now
                </PillButton>
                <PillButton variant="secondary" tone="dark" href="#apply">
                  Speak to us
                </PillButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
