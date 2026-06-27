import { PillButton } from "@/components/ui/PillButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { AdmissionDeadline } from "@/data/coursePages/pgp-tabs";
import type { CoursePageConfig } from "@/data/coursePages/types";

type AdmissionsFeesDeadlinesProps = {
  fees: NonNullable<CoursePageConfig["fees"]>;
  deadlines: AdmissionDeadline[];
  className?: string;
  applyHref?: string;
};

export function AdmissionsFeesDeadlines({ fees, deadlines, className, applyHref = "#apply" }: AdmissionsFeesDeadlinesProps) {
  return (
    <section className={`program-tab-section hive-dark-band overflow-hidden border-white/10 section-py ${className ?? "border-y"}`}>
      <div className="section-container">
        <div className="admissions-fees-deadlines">
          <div className="admissions-fees-deadlines__fees">
            <ScrollReveal>
              <SectionIntro
                eyebrow={fees.eyebrow}
                statement="Fee"
                emphasis="structure."
                description={fees.description}
                light={false}
                align="left"
                size="display"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <div className="admissions-fees-deadlines__price-card">
                <div className="admissions-fees-deadlines__price-rows">
                  {fees.lines
                    .filter((line) => !line.highlight)
                    .map((line) => (
                      <div key={line.label} className="admissions-fees-deadlines__price-row">
                        <span className="admissions-fees-deadlines__price-label">{line.label}</span>
                        <span className="admissions-fees-deadlines__price-amount">{line.amount}</span>
                      </div>
                    ))}
                </div>

                <div className="admissions-fees-deadlines__total">
                  <span className="admissions-fees-deadlines__price-label">Total program fee</span>
                  <span className="admissions-fees-deadlines__total-amount">
                    {fees.lines.find((line) => line.highlight)?.amount ?? "₹4,50,000"}
                  </span>
                </div>

                <div className="admissions-fees-deadlines__actions">
                  <PillButton variant="highlight" tone="dark" href={applyHref}>
                    Apply now
                  </PillButton>
                  <PillButton variant="secondary" tone="dark" href={applyHref}>
                    Speak to us
                  </PillButton>
                </div>

                {fees.note && (
                  <p className="admissions-fees-deadlines__note">{fees.note}</p>
                )}
              </div>
            </ScrollReveal>
          </div>

          <div className="admissions-fees-deadlines__deadlines">
            <ScrollReveal>
              <p className="admissions-fees-deadlines__deadlines-kicker">
                Banking partners and financial assistance available
              </p>
            </ScrollReveal>

            <div className="admissions-fees-deadlines__deadline-stack">
              {deadlines.map((item, index) => (
                <ScrollReveal key={item.round} delay={index * 0.05}>
                  <article
                    className={`admissions-fees-deadlines__deadline-card ${
                      item.status === "active" ? "is-active" : ""
                    }`}
                  >
                    {item.status === "active" && (
                      <span className="admissions-fees-deadlines__active-badge">Currently active</span>
                    )}
                    <div className="admissions-fees-deadlines__deadline-head">
                      <span className="admissions-fees-deadlines__deadline-round">{item.round}</span>
                      <div>
                        <h3 className="admissions-fees-deadlines__deadline-label">{item.label}</h3>
                        <p className="admissions-fees-deadlines__deadline-date">{item.date}</p>
                      </div>
                    </div>
                    {item.status === "active" && (
                      <PillButton variant="highlight" tone="dark" href={applyHref} className="mt-4">
                        Apply now
                      </PillButton>
                    )}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
