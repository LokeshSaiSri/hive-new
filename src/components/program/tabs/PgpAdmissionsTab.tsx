import { ProgramAdmissions } from "@/components/program/ProgramAdmissions";
import { ProgramFaq } from "@/components/program/ProgramFaq";
import { AdmissionsDecisionBoard } from "@/components/program/ui/AdmissionsDecisionBoard";
import { AdmissionsFeesDeadlines } from "@/components/program/ui/AdmissionsFeesDeadlines";
import { AdmissionsIntroPanel } from "@/components/program/ui/AdmissionsIntroPanel";
import { AdmissionsProcessDeck } from "@/components/program/ui/AdmissionsProcessDeck";
import { AdmissionsScholarships } from "@/components/program/ui/AdmissionsScholarships";
import { PlacementsHiringBand } from "@/components/program/ui/PlacementsHiringBand";
import { ProgramCohortVoices } from "@/components/program/ui/ProgramCohortVoices";
import { ProgramVisualCtaBand } from "@/components/program/ui/ProgramVisualCtaBand";
import type { CoursePageConfig } from "@/data/coursePages/types";
import { buildCohortStories } from "@/data/coursePages/cohortStories";
import {
  pgpAdmissionDeadlines,
  pgpAdmissionDecisionIntro,
  pgpAdmissionEvaluators,
  pgpAdmissionRounds,
  pgpAdmissionsIntro,
  pgpAlumniQuotes,
  pgpScholarships,
} from "@/data/coursePages/pgp-tabs";
import { testimonials } from "@/data/testimonials";

type PgpAdmissionsTabProps = {
  config: CoursePageConfig;
};

export function PgpAdmissionsTab({ config }: PgpAdmissionsTabProps) {
  const [fitCheckCta, curriculumCta, , placementsCta] = config.inlineCtas;

  return (
    <>
      <AdmissionsIntroPanel content={pgpAdmissionsIntro} />
      <ProgramCohortVoices stories={buildCohortStories(pgpAlumniQuotes, testimonials)} />
      <AdmissionsDecisionBoard
        evaluators={pgpAdmissionEvaluators}
        intro={pgpAdmissionDecisionIntro}
      />
      <AdmissionsProcessDeck rounds={pgpAdmissionRounds} />
      {fitCheckCta && <ProgramVisualCtaBand cta={fitCheckCta} chip="Admissions support" />}
      {config.fees && (
        <AdmissionsFeesDeadlines fees={config.fees} deadlines={pgpAdmissionDeadlines} />
      )}
      <AdmissionsScholarships scholarships={pgpScholarships} />
      <PlacementsHiringBand description="See the hiring network you'll join after admission — from global technology leaders to India's fastest-growing startups." />
      {placementsCta && <ProgramVisualCtaBand cta={placementsCta} chip="Proof-of-work" />}
      {curriculumCta && <ProgramVisualCtaBand cta={curriculumCta} chip="Curriculum" />}
      <ProgramAdmissions slug="pgp" />
      <ProgramFaq faqs={config.faqs} variant="theatre" />
    </>
  );
}
