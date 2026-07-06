import { ProgramPlacements } from "@/components/program/ProgramPlacements";
import { ProgramFaq } from "@/components/program/ProgramFaq";
import { PlacementsCareerPathways } from "@/components/program/ui/PlacementsCareerPathways";
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

export function OnlinePgpPlacementsTab() {
  const config = getCoursePageConfig("fellowship-gtm-revenue-ai");

  return (
    <>
      <PlacementsHiringBand />
      <WhyRevenue sections={{ contrast: false, ladder: false }} />
      <ProgramCohortVoices stories={buildCohortStories(pgpAlumniQuotes, testimonials)} />
      
      <ProgramPlacements
        slug="fellowship-gtm-revenue-ai"
        cohortLabel="Placement Report 2025–26 · Fellowship Cohort Year 2"
        applyHref="/fellowship-gtm-revenue-ai#apply"
      />
      
      <PlacementsSystemDeck pillars={pgpPlacementSystem} intro={pgpPlacementSystemIntro} />
      
      {/* StartupsBuiltGallery normally is placed right after Distribution Charts */}
      <StartupsBuiltGallery className="pt-0 pb-0 border-t-0" />
      <ProofOfWorkStrip items={pgpPortfolioDeliverables} />
      <PlacementsCareerPathways groups={pgpCareerPathways} className="pt-0 border-t-0" />
      <PlacementsNewsGrid articles={pgpPlacementNews} className="pt-0 border-t-0" />
      
      {/* We reuse the generic config FAQ structure from fellowship-gtm-revenue-ai.ts */}
      <ProgramFaq faqs={config.faqs} variant="theatre" applyHref="/fellowship-gtm-revenue-ai#apply" />
    </>
  );
}
