import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";
import type { ScholarshipCard } from "@/data/coursePages/pgp-tabs";
import { asset } from "@/lib/assets";

type AdmissionsScholarshipsProps = {
  scholarships: ScholarshipCard[];
  note?: string;
  className?: string;
};

export function AdmissionsScholarships({
  scholarships,
  note = "Every applicant is automatically considered for scholarships based on their application and interview performance. No separate forms needed.",
  className,
}: AdmissionsScholarshipsProps) {
  return (
    <section className={`program-tab-section section-band-light overflow-hidden section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Scholarships"
            statement="We help you get"
            emphasis="scholarships."
            description={note}
            light
            align="left"
          />
        </ScrollReveal>

        <div className="admissions-scholarships-grid mt-10 lg:mt-14">
          {scholarships.map((scholarship, index) => (
            <ScrollReveal key={scholarship.title} delay={index * 0.05}>
              <article
                className={`admissions-scholarship-card admissions-scholarship-card--tier-${
                  index + 1
                }`}
              >
                <Image
                  src={asset(scholarship.icon)}
                  alt=""
                  width={48}
                  height={48}
                  className="admissions-scholarship-card__icon"
                  aria-hidden
                />
                <h3 className="admissions-scholarship-card__title">{scholarship.title}</h3>
                <p className="admissions-scholarship-card__copy">{scholarship.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 flex justify-center lg:mt-14">
          <PillButton variant="highlight" tone="light" href="#apply">
            Apply and get considered
          </PillButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
