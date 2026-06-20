import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";

type AdmissionsIntroPanelProps = {
  content: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    description: string;
    videoId?: string;
    stats: { value: string; label: string; highlight?: boolean }[];
  };
};

export function AdmissionsIntroPanel({ content }: AdmissionsIntroPanelProps) {
  return (
    <section id="selection" className="program-tab-section section-band-light overflow-hidden">
      <div className="section-container section-py">
        <div className="admissions-intro-panel">
          <div className="admissions-intro-panel__copy">
            <ScrollReveal>
              <SectionIntro
                eyebrow={content.eyebrow}
                statement={content.statement}
                emphasis={content.emphasis}
                description={content.description}
                light
                align="left"
              />
              <div className="mt-8">
                <PillButton variant="highlight" tone="light" href="#apply">
                  Book a profile review
                </PillButton>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <ul className="admissions-intro-panel__stats">
                {content.stats.map((stat) => (
                  <li
                    key={stat.label}
                    className={`admissions-intro-panel__stat ${
                      stat.highlight ? "is-highlighted" : ""
                    }`}
                  >
                    <p className="admissions-intro-panel__stat-value">{stat.value}</p>
                    <p className="admissions-intro-panel__stat-label">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {content.videoId && (
            <ScrollReveal delay={0.08} className="admissions-intro-panel__video">
              <div className="admissions-intro-panel__video-card">
                <iframe
                  src={`https://www.youtube.com/embed/${content.videoId}`}
                  title="Admissions process"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="admissions-intro-panel__video-iframe"
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
