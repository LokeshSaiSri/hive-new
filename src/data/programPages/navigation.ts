import type { ProgramNavConfig, ProgramSlug, ProgramTab } from "@/data/programPages/types";
import { ONLINE_PGP_PROGRAMME_TITLE } from "@/data/coursePages/online-pgp";

type TabDef = { id: ProgramTab; label: string; segment: string };

const BASE_TABS: TabDef[] = [
  { id: "overview", label: "Overview", segment: "" },
  { id: "curriculum", label: "Curriculum", segment: "curriculum" },
  { id: "placements", label: "Placements", segment: "placements" },
  { id: "admissions", label: "Admissions", segment: "admissions" },
];

const PROGRAM_TITLES: Record<ProgramSlug, string> = {
  pgp: "PGP in Revenue & Marketing",
  "ai-marketing": "AI Marketing Fellowship",
  ug: "UG Program",
  "online-pgp": ONLINE_PGP_PROGRAMME_TITLE,
};

const DEFAULT_PROGRAMME_LABELS: Record<ProgramSlug, string> = {
  pgp: "PGP in Revenue, AI & Entrepreneurship",
  "ai-marketing": "AI Marketing & Entrepreneurship Fellowship",
  ug: "Undergraduate Programme",
  "online-pgp": ONLINE_PGP_PROGRAMME_TITLE,
};

function tabsForSlug(slug: ProgramSlug): TabDef[] {
  if (slug === "ug" || slug === "online-pgp") {
    return BASE_TABS.filter((tab) => tab.id === "overview");
  }
  if (slug === "ai-marketing") {
    return BASE_TABS.filter((tab) => tab.id !== "placements");
  }
  return BASE_TABS;
}

function buildNav(slug: ProgramSlug): ProgramNavConfig {
  const base = slug === "pgp" ? "/pgp-revenue-tech-entrepreneurship" : `/${slug}`;

  return {
    slug,
    title: PROGRAM_TITLES[slug],
    applyHref: `${base}/admissions`,
    tabs: tabsForSlug(slug).map((tab) => ({
      id: tab.id,
      label: tab.label,
      path: tab.segment ? `${base}/${tab.segment}` : base,
    })),
  };
}

export const programNavigation: Record<ProgramSlug, ProgramNavConfig> = {
  pgp: buildNav("pgp"),
  "ai-marketing": buildNav("ai-marketing"),
  ug: buildNav("ug"),
  "online-pgp": buildNav("online-pgp"),
};

export function getProgramNav(slug: ProgramSlug): ProgramNavConfig {
  return programNavigation[slug];
}

export function getDefaultProgrammeLabel(slug: ProgramSlug): string {
  return DEFAULT_PROGRAMME_LABELS[slug];
}

export const PROGRAM_SLUGS: ProgramSlug[] = ["pgp", "ai-marketing", "ug", "online-pgp"];
