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
      {config.pillars && <CoursePillars pillars={config.pillars} variant="bento" />}
      <ProgramMentors
        eyebrow="Faculty & mentors"
        statement="Taught by the people building"
        emphasis="modern Indian business."
        description={pgpMentorsIntro}
      />
      {challengesCta && <ProgramVisualCtaBand cta={challengesCta} chip="Challenge-first learning" />}
      <ProgramChallenges variant="scroll" />
      {config.timeline && <CourseTimeline timeline={config.timeline} />}
      <CurriculumToolWall categories={pgpToolStack} intro={pgpToolStackIntro} variant="showcase" />
      <ProofOfWorkStrip items={pgpPortfolioDeliverables} />
      <LifeAtHiveSection content={pgpLifeAtHive} />
      {placementsCta && <ProgramVisualCtaBand cta={placementsCta} chip="100+ hiring partners" />}
      <ProgramCohortVoices stories={buildCohortStories(pgpAlumniQuotes, testimonials)} />
      <ProgramReels eyebrow="Reels" statement="Student" emphasis="shorts." />
      <ProgramFaq faqs={config.faqs} variant="theatre" />
    </>
  );
}
