import {
  ProgramAdmissions,
  ProgramFaq,
  ProgramPageLayout,
  ProgramPlacements,
} from "@/components/program";
import { ProgramTabHero } from "@/components/program/ProgramTabHero";
import { AiMarketingAdmissionsTab } from "@/components/program/tabs/AiMarketingAdmissionsTab";
import { AiMarketingCurriculumTab } from "@/components/program/tabs/AiMarketingCurriculumTab";
import { PgpAdmissionsTab } from "@/components/program/tabs/PgpAdmissionsTab";
import { PgpCurriculumTab } from "@/components/program/tabs/PgpCurriculumTab";
import { PgpPlacementsTab } from "@/components/program/tabs/PgpPlacementsTab";
import { ProgramTabHeader } from "@/components/program/ProgramTabHeader";
import { CourseTimeline } from "@/components/course/CourseTimeline";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import { aiMarketingTabHero } from "@/data/coursePages/ai-marketing-tabs";
import { pgpTabHero } from "@/data/coursePages/pgp-tabs";
import { getProgramNav } from "@/data/programPages/navigation";
import type { ProgramSlug } from "@/data/programPages/types";

type ProgramTabPageProps = {
  slug: ProgramSlug;
  tab: "curriculum" | "placements" | "admissions";
};

export function ProgramTabPage({ slug, tab }: ProgramTabPageProps) {
  const config = getCoursePageConfig(slug);
  const nav = getProgramNav(slug);
  const tabLabel = nav.tabs.find((item) => item.id === tab)?.label ?? tab;

  if (slug === "pgp" || slug === "ai-marketing") {
    const hero = slug === "pgp" ? pgpTabHero[tab] : aiMarketingTabHero[tab];

    return (
      <ProgramPageLayout
        slug={slug}
        activeTab={tab}
        lead={<ProgramTabHero content={hero} tabLabel={tabLabel} />}
      >
        {slug === "pgp" && tab === "curriculum" && <PgpCurriculumTab config={config} />}
        {slug === "pgp" && tab === "placements" && <PgpPlacementsTab />}
        {slug === "pgp" && tab === "admissions" && <PgpAdmissionsTab config={config} />}
        {slug === "ai-marketing" && tab === "curriculum" && (
          <AiMarketingCurriculumTab config={config} />
        )}
        {slug === "ai-marketing" && tab === "admissions" && (
          <AiMarketingAdmissionsTab config={config} />
        )}
      </ProgramPageLayout>
    );
  }

  return (
    <ProgramPageLayout
      slug={slug}
      activeTab={tab}
      lead={<ProgramTabHeader slug={slug} tab={tab} />}
    >
      {tab === "curriculum" && config.timeline && (
        <CourseTimeline timeline={config.timeline} />
      )}

      {tab === "admissions" && (
        <>
          <ProgramAdmissions slug={slug} />
          <ProgramFaq faqs={config.faqs} />
        </>
      )}
    </ProgramPageLayout>
  );
}
