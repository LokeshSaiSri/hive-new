import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { SiteHubHero } from "@/components/layout/SiteHubHero";
import { PlacementsCohortGallery } from "@/components/program/ui/PlacementsCohortGallery";
import { PlacementsDistributionCharts } from "@/components/program/ui/PlacementsDistributionCharts";
import { PlacementsHiringBand } from "@/components/program/ui/PlacementsHiringBand";
import { PlacementsNewsGrid } from "@/components/program/ui/PlacementsNewsGrid";
import { PlacementsSystemDeck } from "@/components/program/ui/PlacementsSystemDeck";
import {
  PlacementReportEditions,
  ProgrammePlacementSummaries,
} from "@/components/sitePages/PlacementHubSections";
import { placementsHubHero } from "@/data/sitePages";
import {
  pgpPlacementNews,
  pgpPlacementSystem,
  pgpPlacementSystemIntro,
} from "@/data/coursePages/pgp-tabs";

export function PlacementsHubPage() {
  return (
    <SitePageLayout>
      <SiteHubHero content={placementsHubHero} />
      <PlacementReportEditions />
      <div id="placement-archive">
        <PlacementsCohortGallery />
      </div>
      <PlacementsSystemDeck pillars={pgpPlacementSystem} intro={pgpPlacementSystemIntro} />
      <PlacementsDistributionCharts />
      <PlacementsHiringBand />
      <PlacementsNewsGrid articles={pgpPlacementNews} />
      <ProgrammePlacementSummaries />
    </SitePageLayout>
  );
}
