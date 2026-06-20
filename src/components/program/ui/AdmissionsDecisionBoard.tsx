import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { AdmissionEvaluator } from "@/data/coursePages/pgp-tabs";
import { asset } from "@/lib/assets";

type AdmissionsDecisionBoardProps = {
  evaluators: AdmissionEvaluator[];
  intro: string;
};

export function AdmissionsDecisionBoard({ evaluators, intro }: AdmissionsDecisionBoardProps) {
  return (
    <section className="program-tab-section hive-dark-band overflow-hidden">
      <div className="section-container section-py">
        <div className="admissions-decision-board">
          <ScrollReveal className="admissions-decision-board__visual">
            <div className="admissions-decision-board__image-wrap">
              <Image
                src={asset("images/misc/admitted.png")}
                alt="HiveSchool admitted students"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </ScrollReveal>

          <div className="admissions-decision-board__content">
            <ScrollReveal>
              <SectionIntro
                eyebrow="If you're admitted"
                statement="How do we"
                emphasis="make a decision?"
                description={intro}
                light={false}
                align="left"
              />
            </ScrollReveal>

            <div className="admissions-decision-board__grid">
              {evaluators.map((evaluator, index) => (
                <ScrollReveal key={evaluator.title} delay={index * 0.05}>
                  <article className="admissions-decision-board__block">
                    <div className="admissions-decision-board__block-head">
                      <Image
                        src={asset(evaluator.icon)}
                        alt=""
                        width={36}
                        height={36}
                        className="admissions-decision-board__icon"
                        aria-hidden
                      />
                      <span className="admissions-decision-board__block-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="admissions-decision-board__block-title">{evaluator.title}</h3>
                    <p className="admissions-decision-board__block-copy">{evaluator.description}</p>
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
