import { CoursePillars } from "@/components/course/CoursePillars";
import { CourseTimeline } from "@/components/course/CourseTimeline";
import { ProgramChallenges } from "@/components/program/ProgramChallenges";
import { ProgramFaq } from "@/components/program/ProgramFaq";
import { ProgramMentors } from "@/components/program/ProgramMentors";
import { ProgramReels } from "@/components/program/ProgramReels";
import { CurriculumToolWall } from "@/components/program/ui/CurriculumToolWall";
import { CurriculumTracksArena } from "@/components/program/ui/CurriculumTracksArena";
import { LifeAtHiveSection } from "@/components/program/LifeAtHiveSection";
import { ProgramCohortVoices } from "@/components/program/ui/ProgramCohortVoices";
import { ProgramVisualCtaBand } from "@/components/program/ui/ProgramVisualCtaBand";
import { ProofOfWorkStrip } from "@/components/program/ui/ProofOfWorkStrip";
import type { CoursePageConfig } from "@/data/coursePages/types";
import { buildCohortStories } from "@/data/coursePages/cohortStories";
import {
  pgpAlumniQuotes,
  pgpCurriculumTracks,
  pgpMentorsIntro,
  pgpPortfolioDeliverables,
  pgpToolStack,
  pgpToolStackIntro,
  pgpTracksIntro,
} from "@/data/coursePages/pgp-tabs";
import { pgpLifeAtHive } from "@/data/coursePages/lifeAtHive";
import { testimonials } from "@/data/testimonials";

type PgpCurriculumTabProps = {
  config: CoursePageConfig;
};

export function PgpCurriculumTab({ config }: PgpCurriculumTabProps) {
  const [, , challengesCta, placementsCta] = config.inlineCtas;

  return (
    <>
      <CurriculumTracksArena tracks={pgpCurriculumTracks} intro={pgpTracksIntro} />
      {config.pillars && <CoursePillars pillars={config.pillars} variant="bento" className="pt-0 border-t-0" />}
      <ProgramMentors
        eyebrow="Faculty & mentors"
        statement="Taught by the people building"
        emphasis="modern Indian business."
        description={pgpMentorsIntro}
      />
      {challengesCta && <ProgramVisualCtaBand cta={challengesCta} chip="Challenge-first learning" className="pt-0 border-t-0" />}
      <ProgramChallenges variant="scroll" />
      {config.timeline && <CourseTimeline timeline={config.timeline} className="pb-0 border-b-0 -mb-24 lg:-mb-40 relative z-0" />}
      <CurriculumToolWall categories={pgpToolStack} intro={pgpToolStackIntro} variant="showcase" className="pt-0 border-t-0 relative z-10" />
      <ProofOfWorkStrip items={pgpPortfolioDeliverables} className="pt-0 border-t-0" />
      <LifeAtHiveSection content={pgpLifeAtHive} className="pt-0 border-t-0" />
      {placementsCta && <ProgramVisualCtaBand cta={placementsCta} chip="100+ hiring partners" className="pt-0 border-t-0" />}
      <ProgramCohortVoices stories={buildCohortStories(pgpAlumniQuotes, testimonials)} />
      <ProgramReels eyebrow="Reels" statement="Student" emphasis="shorts." className="pt-0 border-t-0" />
      <ProgramFaq faqs={config.faqs} variant="theatre" applyHref="/pgp-revenue-tech-entrepreneurship/admissions" />
    </>
  );
}
