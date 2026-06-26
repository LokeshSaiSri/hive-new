import { CourseCapstones } from "@/components/course/CourseCapstones";
import { CoursePillars } from "@/components/course/CoursePillars";
import { CoursePaths } from "@/components/course/CoursePaths";
import { CourseTimeline } from "@/components/course/CourseTimeline";
import { ProgramChallenges } from "@/components/program/ProgramChallenges";
import { ProgramFaq } from "@/components/program/ProgramFaq";
import { ProgramMentors } from "@/components/program/ProgramMentors";
import { CurriculumToolWall } from "@/components/program/ui/CurriculumToolWall";
import { CurriculumTracksArena } from "@/components/program/ui/CurriculumTracksArena";
import { LifeAtHiveSection } from "@/components/program/LifeAtHiveSection";
import { ProgramCohortVoices } from "@/components/program/ui/ProgramCohortVoices";
import { ProgramVisualCtaBand } from "@/components/program/ui/ProgramVisualCtaBand";
import { ProofOfWorkStrip } from "@/components/program/ui/ProofOfWorkStrip";
import type { CoursePageConfig } from "@/data/coursePages/types";
import { buildCohortStories } from "@/data/coursePages/cohortStories";
import {
  aiMarketingAlumniQuotes,
  aiMarketingCurriculumTracks,
  aiMarketingMentorsIntro,
  aiMarketingPortfolioDeliverables,
  aiMarketingToolStack,
  aiMarketingToolStackIntro,
  aiMarketingTracksIntro,
} from "@/data/coursePages/ai-marketing-tabs";
import { aiMarketingLifeAtHive } from "@/data/coursePages/lifeAtHive";
import { testimonials } from "@/data/testimonials";

type AiMarketingCurriculumTabProps = {
  config: CoursePageConfig;
};

export function AiMarketingCurriculumTab({ config }: AiMarketingCurriculumTabProps) {
  const [, portfolioCta, intakeCta] = config.inlineCtas;

  return (
    <>
      <CurriculumTracksArena tracks={aiMarketingCurriculumTracks} intro={aiMarketingTracksIntro} />
      {config.pillars && <CoursePillars pillars={config.pillars} variant="bento" className="pt-0 border-t-0" />}
      {config.paths && <CoursePaths paths={config.paths} className="pt-0 border-t-0" />}
      <ProgramMentors
        eyebrow="Practitioners, not professors"
        statement="Industry mentors."
        emphasis="Not professors."
        description={aiMarketingMentorsIntro}
      />
      {portfolioCta && (
        <ProgramVisualCtaBand cta={portfolioCta} chip="Portfolio-first learning" className="pt-0 border-t-0" />
      )}
      <ProgramChallenges variant="scroll" />
      {config.timeline && <CourseTimeline timeline={config.timeline} className="pt-0 border-t-0" />}
      {config.capstones && <CourseCapstones capstones={config.capstones} className="pt-0 border-t-0" />}
      <CurriculumToolWall
        categories={aiMarketingToolStack}
        intro={aiMarketingToolStackIntro}
        variant="showcase"
        className="pt-0 border-t-0"
      />
      <ProofOfWorkStrip items={aiMarketingPortfolioDeliverables} className="pt-0 border-t-0" />
      <LifeAtHiveSection content={aiMarketingLifeAtHive} className="pt-0 border-t-0" />
      {intakeCta && <ProgramVisualCtaBand cta={intakeCta} chip="October 2026 intake" className="pt-0 border-t-0" />}
      <ProgramCohortVoices stories={buildCohortStories(aiMarketingAlumniQuotes, testimonials)} />
      <ProgramFaq faqs={config.faqs} variant="theatre" className="pt-0 border-t-0" />
    </>
  );
}
