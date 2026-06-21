import { Campus } from "@/components/sections/Campus";
import {
  ProgramAdmissions,
  ProgramChallenges,
  ProgramFaq,
  ProgramMentors,
  ProgramPageLayout,
  ProgramPlacements,
  ProgramReels,
  ProgramStudentStories,
} from "@/components/program";
import { CourseApplicationForm } from "@/components/course/CourseApplicationForm";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseInlineCtaBand } from "@/components/course/CourseInlineCtaBand";
import { CoursePillars } from "@/components/course/CoursePillars";
import { CourseTimeline } from "@/components/course/CourseTimeline";
import { CourseFees } from "@/components/course/CourseFees";
import { CoursePaths } from "@/components/course/CoursePaths";
import { CourseCapstones } from "@/components/course/CourseCapstones";
import { CourseHighlights } from "@/components/course/CourseHighlights";
import { CourseAudience } from "@/components/course/CourseAudience";
import { CourseVisualStory } from "@/components/course/CourseVisualStory";
import { ProgramCampus } from "@/components/program/ProgramCampus";
import { PlacementsCohortGallery } from "@/components/program/ui/PlacementsCohortGallery";
import type { CoursePageConfig } from "@/data/coursePages/types";
import type { ProgramSlug } from "@/data/programPages/types";

type CoursePageProps = {
  config: CoursePageConfig;
  slug: ProgramSlug;
};

export function CoursePage({ config, slug }: CoursePageProps) {
  const [cta1, cta2, cta3, cta4] = config.inlineCtas;

  return (
    <ProgramPageLayout
      slug={slug}
      activeTab="overview"
      lead={<CourseHero hero={config.hero} />}
    >
      {config.sections.applicationForm && config.applicationForm && (
        <CourseApplicationForm
          title={config.applicationForm.title}
          headline={config.applicationForm.headline}
          metrics={config.hero.meta}
          showPlacementCharts={slug === "pgp"}
        />
      )}

      {cta1 && <CourseInlineCtaBand cta={cta1} />}

      {config.sections.visualStory &&
      config.pillars &&
      config.audience &&
      config.highlights &&
      config.paths ? (
        <CourseVisualStory
          pillars={config.pillars}
          audience={config.audience}
          highlights={config.highlights}
          paths={config.paths}
        />
      ) : (
        <>
          {config.pillars && <CoursePillars pillars={config.pillars} />}
          {config.audience && <CourseAudience audience={config.audience} />}
          {config.highlights && <CourseHighlights highlights={config.highlights} />}
          {config.paths && <CoursePaths paths={config.paths} />}
        </>
      )}

      {cta2 && <CourseInlineCtaBand cta={cta2} />}

      {config.sections.placement && <ProgramPlacements />}

      {slug === "pgp" && <PlacementsCohortGallery />}

      {config.sections.mentors && <ProgramMentors />}

      {config.sections.challenges && <ProgramChallenges />}

      {config.capstones && <CourseCapstones capstones={config.capstones} />}

      {cta3 && <CourseInlineCtaBand cta={cta3} />}

      {config.timeline && <CourseTimeline timeline={config.timeline} />}

      {config.fees && <CourseFees fees={config.fees} />}

      {config.sections.reels && <ProgramReels />}

      {config.sections.studentStories && <ProgramStudentStories />}

      {config.sections.campus &&
        (config.sections.campusStyle === "fullscreen" ? (
          <Campus />
        ) : (
          <ProgramCampus />
        ))}

      {cta4 && <CourseInlineCtaBand cta={cta4} />}

      {config.sections.admissions && <ProgramAdmissions slug={slug} />}

      <ProgramFaq faqs={config.faqs} />
    </ProgramPageLayout>
  );
}
