import { SectionIntro } from "@/components/ui/SectionIntro";
import { FeatureShowcase } from "@/components/ui/FeatureShowcase";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { pedagogyPanels } from "@/data/features";

export function Pedagogy() {
  return (
    <section className="section-band-dark">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="The Pedagogy"
            statement="How learning"
            emphasis="actually works."
          />
        </ScrollReveal>

        <div className="mt-16 space-y-24 sm:space-y-28">
          {pedagogyPanels.map((panel, i) => (
            <ScrollReveal key={panel.id} delay={i * 0.05}>
              <FeatureShowcase panel={panel} reversed={i % 2 === 1} dark />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
