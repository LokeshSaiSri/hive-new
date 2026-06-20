import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { CourseInlineCta } from "@/data/coursePages/types";

type ProgramVisualCtaBandProps = {
  cta: CourseInlineCta;
  chip?: string;
};

export function ProgramVisualCtaBand({ cta, chip }: ProgramVisualCtaBandProps) {
  const isDark = cta.variant === "dark";
  const isAccent = cta.variant === "accent";
  const tone = isDark || isAccent ? "dark" : "light";

  const sectionClass = isDark
    ? "program-visual-cta program-visual-cta--dark"
    : isAccent
      ? "program-visual-cta program-visual-cta--accent"
      : "program-visual-cta program-visual-cta--light";

  return (
    <section className={sectionClass} aria-label={cta.title}>
      <div className="program-visual-cta__bg" aria-hidden>
        <div className="program-visual-cta__mesh" />
        <div className="program-visual-cta__glow program-visual-cta__glow--a" />
        <div className="program-visual-cta__glow program-visual-cta__glow--b" />
      </div>

      <div className="section-container relative z-10 section-py-tight">
        <ScrollReveal>
          <div className="program-visual-cta__inner">
            {(chip || cta.eyebrow) && (
              <span className="program-visual-cta__chip">
                <span className="program-visual-cta__chip-dot" aria-hidden />
                {chip ?? cta.eyebrow}
              </span>
            )}

            <div className="program-visual-cta__copy">
              {!chip && cta.eyebrow && (
                <p className="program-visual-cta__eyebrow">{cta.eyebrow}</p>
              )}
              <h3 className="program-visual-cta__title">{cta.title}</h3>
              <p className="program-visual-cta__description">{cta.description}</p>
            </div>

            <div className="program-visual-cta__actions">
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
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
