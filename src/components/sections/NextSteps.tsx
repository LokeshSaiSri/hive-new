import Link from "next/link";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import { nextStepCards } from "@/data/programmes";

export function NextSteps() {
  return (
    <section className="section-band-dark">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Next Steps"
            statement="Explore a programme."
            emphasis="Download the report."
          />
        </ScrollReveal>

        <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-3">
          {nextStepCards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="premium-frame-light h-full hover-lift-card">
                <div className="card-premium-elevated flex h-full flex-col p-7">
                  <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mid-gray">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="link-highlight mt-5 inline-block text-sm text-electric-blue"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal className="mt-10 flex flex-wrap justify-center gap-4">
          <PillButton variant="highlight" tone="dark" href="#apply">
            Apply to HiveSchool
          </PillButton>
          <PillButton variant="secondary" tone="dark" href="#placement-report">
            Download Placement Report
          </PillButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
