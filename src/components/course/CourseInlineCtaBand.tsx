import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { CourseInlineCta } from "@/data/coursePages/types";

type CourseInlineCtaBandProps = {
  cta: CourseInlineCta;
};

export function CourseInlineCtaBand({ cta }: CourseInlineCtaBandProps) {
  const isDark = cta.variant === "dark";
  const isAccent = cta.variant === "accent";

  const sectionClass = isDark
    ? "hive-dark-band"
    : isAccent
      ? "course-cta-band--accent"
      : "section-band-light";

  const titleClass = isDark || isAccent ? "text-white" : "text-ink";
  const descClass = isDark || isAccent ? "text-white/65" : "text-mid-gray";
  const tone = isDark || isAccent ? "dark" : "light";

  return (
    <section className={`${sectionClass} section-py-tight`}>
      <div className="section-container">
        <ScrollReveal>
          <div className="course-cta-band-inner">
            <div className="max-w-2xl">
              {cta.eyebrow && (
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                  {cta.eyebrow}
                </p>
              )}
              <h3 className={`mt-3 text-2xl font-bold leading-tight sm:text-3xl ${titleClass}`}>
                {cta.title}
              </h3>
              <p className={`mt-3 text-base leading-relaxed sm:text-lg ${descClass}`}>
                {cta.description}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <PillButton
                variant={isAccent ? "highlight" : "primary"}
                tone={tone}
                href={cta.primary.href}
              >
                {cta.primary.label}
              </PillButton>
              {cta.secondary && (
                <PillButton variant="secondary" tone={tone} href={cta.secondary.href}>
                  {cta.secondary.label}
                </PillButton>
              )}
              {cta.additionalLinks?.map((link) => (
                <PillButton key={link.href} variant="secondary" tone={tone} href={link.href}>
                  {link.label}
                </PillButton>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
