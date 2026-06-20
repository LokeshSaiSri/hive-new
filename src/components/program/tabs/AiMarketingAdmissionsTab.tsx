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
  aiMarketingAdmissionDeadlines,
  aiMarketingAdmissionDecisionIntro,
  aiMarketingAdmissionEvaluators,
  aiMarketingAdmissionRounds,
  aiMarketingAdmissionsIntro,
  aiMarketingAlumniQuotes,
  aiMarketingScholarships,
} from "@/data/coursePages/ai-marketing-tabs";
import { testimonials } from "@/data/testimonials";

type AiMarketingAdmissionsTabProps = {
  config: CoursePageConfig;
};

export function AiMarketingAdmissionsTab({ config }: AiMarketingAdmissionsTabProps) {
  const [fitCheckCta, portfolioCta, intakeCta] = config.inlineCtas;

  return (
    <>
      <AdmissionsIntroPanel content={aiMarketingAdmissionsIntro} />
      <ProgramCohortVoices stories={buildCohortStories(aiMarketingAlumniQuotes, testimonials)} />
      <AdmissionsDecisionBoard
        evaluators={aiMarketingAdmissionEvaluators}
        intro={aiMarketingAdmissionDecisionIntro}
      />
      <AdmissionsProcessDeck rounds={aiMarketingAdmissionRounds} />
      {fitCheckCta && <ProgramVisualCtaBand cta={fitCheckCta} chip="Admissions support" />}
      {config.fees && (
        <AdmissionsFeesDeadlines fees={config.fees} deadlines={aiMarketingAdmissionDeadlines} />
      )}
      <AdmissionsScholarships scholarships={aiMarketingScholarships} />
      <PlacementsHiringBand description="See the hiring network you'll join after admission — from D2C brands to India's fastest-growing startups." />
      {intakeCta && <ProgramVisualCtaBand cta={intakeCta} chip="October 2026 intake" />}
      {portfolioCta && <ProgramVisualCtaBand cta={portfolioCta} chip="Curriculum" />}
      <ProgramAdmissions slug="ai-marketing" />
      <ProgramFaq faqs={config.faqs} variant="theatre" />
    </>
  );
}
