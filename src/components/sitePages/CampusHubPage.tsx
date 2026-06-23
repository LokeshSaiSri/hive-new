import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { SiteHubHero } from "@/components/layout/SiteHubHero";
import {
  CampusLifeGallery,
  CampusSpacesBento,
  CampusTourPanel,
  CampusVisitPanel,
} from "@/components/sitePages/CampusHubSections";
import { campusHubHero } from "@/data/sitePages";

export function CampusHubPage() {
  return (
    <SitePageLayout>
      <SiteHubHero content={campusHubHero} />
      <CampusSpacesBento className="pt-0 border-t-0" />
      <CampusTourPanel />
      <CampusLifeGallery />
      <CampusVisitPanel />
    </SitePageLayout>
  );
}
