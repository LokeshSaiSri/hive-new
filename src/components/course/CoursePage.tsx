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

  let currentDark = false;
  const seqClasses = {
    fees: "",
    reels: "",
    studentStories: "",
    campus: "",
    admissions: "",
  };

  if (config.fees) {
    seqClasses.fees = currentDark ? "pt-0" : "";
    currentDark = true;
  }
  if (config.sections.reels) {
    seqClasses.reels = currentDark ? "pt-0" : "";
    currentDark = true;
  }
  if (config.sections.studentStories) {
    seqClasses.studentStories = currentDark ? "pt-0" : "";
    currentDark = true;
  }
  if (config.sections.campus) {
    if (config.sections.campusStyle === "fullscreen") {
      currentDark = false;
    } else {
      seqClasses.campus = currentDark ? "pt-0" : "";
      currentDark = true;
    }
  }
  if (cta4) {
    currentDark = cta4.variant === "dark";
  }
  if (config.sections.admissions) {
    seqClasses.admissions = currentDark ? "pt-0" : "";
    currentDark = true;
  }

  return (
    <ProgramPageLayout
      slug={slug}
      activeTab="overview"
      lead={<CourseHero hero={config.hero} />}
    >
      {config.sections.applicationForm && config.applicationForm && (
        <CourseApplicationForm
          courseSlug={slug}
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

      {slug === "pgp" && <PlacementsCohortGallery className="pt-0 border-t-0" />}

      {config.sections.mentors && <ProgramMentors />}

      {config.sections.challenges && <ProgramChallenges />}

      {config.capstones && <CourseCapstones capstones={config.capstones} />}

      {cta3 && <CourseInlineCtaBand cta={cta3} />}

      {config.timeline && <CourseTimeline timeline={config.timeline} className="pt-0 border-t-0" />}

      {config.fees && <CourseFees fees={config.fees} className={seqClasses.fees} />}

      {config.sections.reels && <ProgramReels className={seqClasses.reels} />}

      {config.sections.studentStories && <ProgramStudentStories className={seqClasses.studentStories} />}

      {config.sections.campus &&
        (config.sections.campusStyle === "fullscreen" ? (
          <Campus />
        ) : (
          <ProgramCampus className={seqClasses.campus} />
        ))}

      {cta4 && <CourseInlineCtaBand cta={cta4} />}

      {config.sections.admissions && <ProgramAdmissions slug={slug} className={seqClasses.admissions} />}

      <ProgramFaq faqs={config.faqs} />
    </ProgramPageLayout>
  );
}
