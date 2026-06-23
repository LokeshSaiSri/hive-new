import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { SiteHubHero } from "@/components/layout/SiteHubHero";
import { MentorDirectory, MentorSessionModel } from "@/components/sitePages/MentorHubSections";
import { mentorsHubHero } from "@/data/sitePages";

export function MentorsHubPage() {
  return (
    <SitePageLayout>
      <SiteHubHero content={mentorsHubHero} />
      <MentorSessionModel className="pt-0 border-t-0" />
      <MentorDirectory />
    </SitePageLayout>
  );
}
