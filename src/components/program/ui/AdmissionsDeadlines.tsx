import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";
import type { AdmissionDeadline } from "@/data/coursePages/pgp-tabs";

type AdmissionsDeadlinesProps = {
  deadlines: AdmissionDeadline[];
};

export function AdmissionsDeadlines({ deadlines }: AdmissionsDeadlinesProps) {
  return (
    <section className="program-tab-section hive-dark-band overflow-hidden">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Application rounds"
            statement="Round deadlines"
            emphasis="for October 2026."
            description="Banking partners and financial assistance available for admitted students."
            light={false}
            align="left"
          />
        </ScrollReveal>

        <div className="admissions-deadlines mt-10 lg:mt-14">
          {deadlines.map((item, index) => (
            <ScrollReveal key={item.round} delay={index * 0.05}>
              <article
                className={`admissions-deadlines__card ${
                  item.status === "active" ? "is-active" : ""
                }`}
              >
                <div className="admissions-deadlines__head">
                  <span className="admissions-deadlines__round">{item.round}</span>
                  <span
                    className={`admissions-deadlines__status ${
                      item.status === "active" ? "is-active" : ""
                    }`}
                  >
                    {item.status === "active" ? "Currently active" : "Upcoming"}
                  </span>
                </div>
                <h3 className="admissions-deadlines__label">{item.label}</h3>
                <p className="admissions-deadlines__date">{item.date}</p>
                {item.status === "active" && (
                  <PillButton variant="highlight" tone="dark" href="#apply" className="mt-4">
                    Apply now
                  </PillButton>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
