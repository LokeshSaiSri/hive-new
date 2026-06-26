import { ProgramPlacements } from "@/components/program/ProgramPlacements";
import { ProgramFaq } from "@/components/program/ProgramFaq";
import { PlacementsCareerPathways } from "@/components/program/ui/PlacementsCareerPathways";
import { PlacementsDistributionCharts } from "@/components/program/ui/PlacementsDistributionCharts";
import { PlacementsHiringBand } from "@/components/program/ui/PlacementsHiringBand";
import { PlacementsNewsGrid } from "@/components/program/ui/PlacementsNewsGrid";
import { PlacementsSystemDeck } from "@/components/program/ui/PlacementsSystemDeck";
import { WhyRevenue } from "@/components/sections/WhyRevenue";
import { ProgramCohortVoices } from "@/components/program/ui/ProgramCohortVoices";
import { ProofOfWorkStrip } from "@/components/program/ui/ProofOfWorkStrip";
import { StartupsBuiltGallery } from "@/components/program/ui/StartupsBuiltGallery";
import { buildCohortStories } from "@/data/coursePages/cohortStories";
import {
  pgpAlumniQuotes,
  pgpCareerPathways,
  pgpPlacementNews,
  pgpPlacementSystem,
  pgpPlacementSystemIntro,
  pgpPortfolioDeliverables,
} from "@/data/coursePages/pgp-tabs";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import { testimonials } from "@/data/testimonials";

export function PgpPlacementsTab() {
  const config = getCoursePageConfig("pgp");

  return (
    <>
      <PlacementsHiringBand />
      <WhyRevenue sections={{ contrast: false, ladder: false }} />
      <ProgramCohortVoices stories={buildCohortStories(pgpAlumniQuotes, testimonials)} />
      <ProgramPlacements
        cohortLabel="Placement Report 2025–26 · PGP Cohort Year 2"
        applyHref="/pgp-revenue-tech-entrepreneurship/admissions"
      />
      <PlacementsSystemDeck pillars={pgpPlacementSystem} intro={pgpPlacementSystemIntro} />
      <PlacementsDistributionCharts />
      <StartupsBuiltGallery className="pt-0 pb-0 border-t-0" />
      <ProofOfWorkStrip items={pgpPortfolioDeliverables} />
      <PlacementsCareerPathways groups={pgpCareerPathways} className="pt-0 border-t-0" />
      <PlacementsNewsGrid articles={pgpPlacementNews} className="pt-0 border-t-0" />
      <ProgramFaq faqs={config.faqs} variant="theatre" />
    </>
  );
}
