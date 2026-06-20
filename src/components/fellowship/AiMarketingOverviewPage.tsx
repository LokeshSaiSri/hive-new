import { ProgramPageLayout } from "@/components/program/ProgramPageLayout";
import { FellowshipApplyDock } from "@/components/fellowship/FellowshipApplyDock";
import { FellowshipCapstoneBento } from "@/components/fellowship/FellowshipCapstoneBento";
import { FellowshipClosingCta } from "@/components/fellowship/FellowshipClosingCta";
import { FellowshipEditorialSpreads } from "@/components/fellowship/FellowshipEditorialSpreads";
import { FellowshipFaq } from "@/components/fellowship/FellowshipFaq";
import { FellowshipFees } from "@/components/fellowship/FellowshipFees";
import { FellowshipGalleryStrip } from "@/components/fellowship/FellowshipGalleryStrip";
import { FellowshipHero } from "@/components/fellowship/FellowshipHero";
import { FellowshipMentorsRail } from "@/components/fellowship/FellowshipMentorsRail";
import { FellowshipPathFork } from "@/components/fellowship/FellowshipPathFork";
import { FellowshipStatsWall } from "@/components/fellowship/FellowshipStatsWall";
import { FellowshipTimeline } from "@/components/fellowship/FellowshipTimeline";
import { FellowshipTracksRail } from "@/components/fellowship/FellowshipTracksRail";
import { fellowshipOverview } from "@/data/fellowship/ai-marketing-overview";

export function AiMarketingOverviewPage() {
  const data = fellowshipOverview;

  return (
    <ProgramPageLayout
      slug="ai-marketing"
      activeTab="overview"
      lead={<FellowshipHero hero={data.hero} />}
    >
      <div className="fellowship-page">
        <FellowshipEditorialSpreads spreads={data.spreads} />
        <FellowshipGalleryStrip images={data.galleryStrip} />
        <FellowshipStatsWall stats={data.stats} />
        <FellowshipPathFork pathPanels={data.pathPanels} paths={data.paths} />
        <FellowshipTracksRail tracks={data.tracks} />
        <FellowshipCapstoneBento capstones={data.capstones} />
        <FellowshipTimeline timeline={data.timeline} />
        <FellowshipMentorsRail mentors={data.mentors} />
        <FellowshipApplyDock
          applicationForm={data.applicationForm}
          metrics={data.hero.meta}
        />
        <FellowshipFees fees={data.fees} />
        <FellowshipFaq faqs={data.faqs} portrait={data.faqPortrait} />
        <FellowshipClosingCta />
      </div>
    </ProgramPageLayout>
  );
}
