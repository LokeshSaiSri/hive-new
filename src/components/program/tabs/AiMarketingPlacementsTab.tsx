import { ProgramFaq } from "@/components/program/ProgramFaq";
import { ProgramPlacements } from "@/components/program/ProgramPlacements";
import { PlacementsCareerPathways } from "@/components/program/ui/PlacementsCareerPathways";
import { PlacementsHiringBand } from "@/components/program/ui/PlacementsHiringBand";
import { PlacementsNewsGrid } from "@/components/program/ui/PlacementsNewsGrid";
import { PlacementsSystemDeck } from "@/components/program/ui/PlacementsSystemDeck";
import { ProgramCohortVoices } from "@/components/program/ui/ProgramCohortVoices";
import { ProgramVisualCtaBand } from "@/components/program/ui/ProgramVisualCtaBand";
import { ProofOfWorkStrip } from "@/components/program/ui/ProofOfWorkStrip";
import { WhyRevenue } from "@/components/sections/WhyRevenue";
import { buildCohortStories } from "@/data/coursePages/cohortStories";
import {
  aiMarketingAlumniQuotes,
  aiMarketingCareerPathways,
  aiMarketingPlacementNews,
  aiMarketingPlacementSystem,
  aiMarketingPlacementSystemIntro,
  aiMarketingPortfolioDeliverables,
} from "@/data/coursePages/ai-marketing-tabs";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import { testimonials } from "@/data/testimonials";

export function AiMarketingPlacementsTab() {
  const config = getCoursePageConfig("ai-marketing");
  const intakeCta = config.inlineCtas[2];

  return (
    <>
      <PlacementsHiringBand description="From D2C disruptors to global technology leaders — fellows join teams shaping the future of brand, growth, and marketing in India." />
      <WhyRevenue sections={{ contrast: false, ladder: false }} />
      <ProgramCohortVoices stories={buildCohortStories(aiMarketingAlumniQuotes, testimonials)} />
      <ProgramPlacements cohortLabel="AI Marketing Fellowship · Placement outcomes & hiring network" />
      <PlacementsSystemDeck
        pillars={aiMarketingPlacementSystem}
        intro={aiMarketingPlacementSystemIntro}
      />
      <ProofOfWorkStrip items={aiMarketingPortfolioDeliverables} />
      <PlacementsCareerPathways groups={aiMarketingCareerPathways} className="pt-0 border-t-0" />
      <PlacementsNewsGrid articles={aiMarketingPlacementNews} className="pt-0 border-t-0" />
      {intakeCta && <ProgramVisualCtaBand cta={intakeCta} chip="Next cohort" className="pt-0 border-t-0" />}
      <ProgramFaq faqs={config.faqs} variant="theatre" />
    </>
  );
}
