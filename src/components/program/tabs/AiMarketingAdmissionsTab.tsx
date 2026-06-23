import { CourseApplicationForm } from "@/components/course/CourseApplicationForm";
import { CourseAudience } from "@/components/course/CourseAudience";
import { ProgramFaq } from "@/components/program/ProgramFaq";
import { AdmissionsDecisionBoard } from "@/components/program/ui/AdmissionsDecisionBoard";
import { AdmissionsFeesDeadlines } from "@/components/program/ui/AdmissionsFeesDeadlines";
import { AdmissionsIntroPanel } from "@/components/program/ui/AdmissionsIntroPanel";
import { AdmissionsProcessDeck } from "@/components/program/ui/AdmissionsProcessDeck";
import { AdmissionsScholarships } from "@/components/program/ui/AdmissionsScholarships";
import { PlacementsCareerPathways } from "@/components/program/ui/PlacementsCareerPathways";
import { PlacementsHiringBand } from "@/components/program/ui/PlacementsHiringBand";
import { PlacementsSystemDeck } from "@/components/program/ui/PlacementsSystemDeck";
import { ProgramCohortVoices } from "@/components/program/ui/ProgramCohortVoices";
import { ProofOfWorkStrip } from "@/components/program/ui/ProofOfWorkStrip";
import type { CoursePageConfig } from "@/data/coursePages/types";
import { buildCohortStories } from "@/data/coursePages/cohortStories";
import {
  aiMarketingAdmissionDeadlines,
  aiMarketingAdmissionDecisionIntro,
  aiMarketingAdmissionEvaluators,
  aiMarketingAdmissionRounds,
  aiMarketingAdmissionsIntro,
  aiMarketingAlumniQuotes,
  aiMarketingCareerPathways,
  aiMarketingPlacementSystem,
  aiMarketingPlacementSystemIntro,
  aiMarketingPortfolioDeliverables,
  aiMarketingScholarships,
} from "@/data/coursePages/ai-marketing-tabs";
import { testimonials } from "@/data/testimonials";

type AiMarketingAdmissionsTabProps = {
  config: CoursePageConfig;
};

export function AiMarketingAdmissionsTab({ config }: AiMarketingAdmissionsTabProps) {
  const admissionsFaqItems = config.faqs.items.filter((faq) =>
    /admission|fee|scholarship|apply|who is this/i.test(faq.question),
  );

  const admissionsFaqs =
    admissionsFaqItems.length > 0
      ? { ...config.faqs, items: admissionsFaqItems }
      : config.faqs;

  return (
    <>
      <AdmissionsIntroPanel content={aiMarketingAdmissionsIntro} />

      {config.sections.applicationForm && config.applicationForm && (
        <CourseApplicationForm
          title={config.applicationForm.title}
          headline={config.applicationForm.headline}
          metrics={config.hero.meta}
        />
      )}

      <AdmissionsProcessDeck rounds={aiMarketingAdmissionRounds} className="pt-0 border-t-0" />

      <AdmissionsDecisionBoard
        evaluators={aiMarketingAdmissionEvaluators}
        intro={aiMarketingAdmissionDecisionIntro}
        className="pt-0 border-t-0"
      />

      {config.audience && <CourseAudience audience={config.audience} />}

      {config.fees && (
        <AdmissionsFeesDeadlines fees={config.fees} deadlines={aiMarketingAdmissionDeadlines} className="pt-0 border-t-0" />
      )}

      <AdmissionsScholarships scholarships={aiMarketingScholarships} className="pt-0 border-t-0" />

      <PlacementsSystemDeck
        pillars={aiMarketingPlacementSystem}
        intro={aiMarketingPlacementSystemIntro}
      />

      <PlacementsCareerPathways groups={aiMarketingCareerPathways} />

      <ProofOfWorkStrip items={aiMarketingPortfolioDeliverables} className="pt-0 border-t-0" />

      <PlacementsHiringBand description="From D2C disruptors to global technology leaders — fellows join teams shaping brand, growth, and marketing in India." className="pt-0 border-t-0" />

      <ProgramCohortVoices stories={buildCohortStories(aiMarketingAlumniQuotes, testimonials)} />

      <ProgramFaq faqs={admissionsFaqs} variant="theatre" className="pt-0 border-t-0" />
    </>
  );
}
