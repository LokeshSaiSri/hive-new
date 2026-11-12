import { CourseApplicationForm } from "@/components/course/CourseApplicationForm";
import { CourseFees } from "@/components/course/CourseFees";
import { PgpAnchorNav } from "@/components/pgp/PgpAnchorNav";
import { PgpHero } from "@/components/pgp/PgpHero";
import { PgpHeroMotion } from "@/components/pgp/PgpHeroMotion";
import { PgpMotionLayer } from "@/components/pgp/PgpMotionLayer";
import { PgpCurriculum } from "@/components/pgp/PgpCurriculum";
import { PgpFlagships } from "@/components/pgp/PgpFlagships";
import { PgpRoles } from "@/components/pgp/PgpRoles";
import { PgpStudentJourney } from "@/components/pgp/PgpStudentJourney";
import { PgpTimeline } from "@/components/pgp/PgpTimeline";
import { PgpWhy } from "@/components/pgp/PgpWhy";
import {
  ProgramAdmissions,
  ProgramChallenges,
  ProgramFaq,
  ProgramMentors,
  ProgramPlacements,
  ProgramReels,
  ProgramStudentStories,
} from "@/components/program";
import { ProgramCampus } from "@/components/program/ProgramCampus";
import { PlacementsCohortGallery } from "@/components/program/ui/PlacementsCohortGallery";
import { ProofOfWorkStrip } from "@/components/program/ui/ProofOfWorkStrip";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { SalespreneurReportStrip } from "@/components/sections/SalespreneurReportStrip";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import { pgpHeroRotator, pgpRevampFaqs } from "@/data/coursePages/pgp-revamp";
import { pgpPortfolioDeliverables } from "@/data/coursePages/pgp-tabs";

/**
 * Revamped PGP overview: one scrolling page with an in-page menu.
 *
 * Built from its own pieces (hero, shell) so it shares no changed code with the live PGP page.
 * It carries no course structured data: when this replaces the live page, add the schemas then.
 */
export function PgpRevampPage() {
  const config = getCoursePageConfig("pgp");
  // Every "apply" on this page goes to the form on this page.
  const hero = {
    ...config.hero,
    rotator: pgpHeroRotator,
    primaryCta: { ...config.hero.primaryCta, href: "#apply" },
  };

  return (
    <>
      <Nav />
      <main className="program-page pgp-motion">
        <div id="overview">
          <PgpHeroMotion>
            <PgpHero hero={hero} />
          </PgpHeroMotion>
        </div>

        <PgpMotionLayer />
        <PgpAnchorNav />

        {config.applicationForm && (
          <CourseApplicationForm
            courseSlug="pgp"
            title={config.applicationForm.title}
            headline={config.applicationForm.headline}
            metrics={config.hero.meta}
            showPlacementCharts
          />
        )}

        <PgpWhy />

        <PgpCurriculum />
        <PgpRoles />

        <ProgramPlacements />
        <SalespreneurReportStrip />
        <PlacementsCohortGallery className="pt-0 border-t-0" />

        <PgpFlagships />

        <div id="mentors" className="scroll-mt-24">
          <ProgramMentors />
        </div>
        <ProgramChallenges />

        <PgpTimeline />

        <PgpStudentJourney />
        <ProgramStudentStories />
        <ProgramReels />

        {config.fees && <CourseFees fees={config.fees} />}
        <ProgramAdmissions slug="pgp" />

        <ProgramCampus />
        <ProofOfWorkStrip items={pgpPortfolioDeliverables} />

        <ProgramFaq faqs={{ ...config.faqs, items: pgpRevampFaqs }} applyHref="#apply" />
      </main>
      <Footer />
    </>
  );
}
