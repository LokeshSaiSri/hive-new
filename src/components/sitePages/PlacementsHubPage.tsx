import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { SiteHubHero } from "@/components/layout/SiteHubHero";
import { PlacementsCohortGallery } from "@/components/program/ui/PlacementsCohortGallery";
import { PlacementsDistributionCharts } from "@/components/program/ui/PlacementsDistributionCharts";
import { PlacementsHiringBand } from "@/components/program/ui/PlacementsHiringBand";
import { PlacementsNewsGrid } from "@/components/program/ui/PlacementsNewsGrid";
import { PlacementsSystemDeck } from "@/components/program/ui/PlacementsSystemDeck";
import { ProgramCohortVoices } from "@/components/program/ui/ProgramCohortVoices";
import { buildCohortStories } from "@/data/coursePages/cohortStories";
import { testimonials } from "@/data/testimonials";
import {
  PlacementReportEditions,
  ProgrammePlacementSummaries,
} from "@/components/sitePages/PlacementHubSections";
import { placementsHubHero } from "@/data/sitePages";
import {
  pgpPlacementNews,
  pgpPlacementSystem,
  pgpPlacementSystemIntro,
  pgpAlumniQuotes,
} from "@/data/coursePages/pgp-tabs";

export function PlacementsHubPage() {
  return (
    <SitePageLayout>
      <SiteHubHero content={placementsHubHero} />
      <PlacementReportEditions className="pt-0 border-t-0" />
      <div id="placement-archive">
        <PlacementsCohortGallery className="pt-0 border-t-0" />
      </div>
      <PlacementsSystemDeck pillars={pgpPlacementSystem} intro={pgpPlacementSystemIntro} />
      <PlacementsDistributionCharts />
      <PlacementsHiringBand className="pt-0" />
      <PlacementsNewsGrid articles={pgpPlacementNews} className="pt-0" />
      <ProgramCohortVoices stories={buildCohortStories(pgpAlumniQuotes, testimonials)} className="pt-0" />
      <ProgrammePlacementSummaries className="pt-0" />
    </SitePageLayout>
  );
}
