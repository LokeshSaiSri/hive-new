import type { Metadata } from "next";
import { aiMarketingTabHero } from "@/data/coursePages/ai-marketing-tabs";
import { pgpTabHero } from "@/data/coursePages/pgp-tabs";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import { getProgramNav } from "@/data/programPages/navigation";
import type { ProgramSlug } from "@/data/programPages/types";
import { buildPageMetadata } from "@/lib/seo/metadata";

function programBasePath(slug: ProgramSlug): string {
  return slug === "pgp" ? "/pgp-revenue-tech-entrepreneurship" : `/${slug}`;
}

export function buildCourseOverviewMetadata(slug: ProgramSlug): Metadata {
  const config = getCoursePageConfig(slug);

  return buildPageMetadata({
    title: config.meta.title,
    description: config.meta.description,
    path: programBasePath(slug),
  });
}

export function buildProgramTabMetadata(
  slug: ProgramSlug,
  tab: "curriculum" | "placements" | "admissions",
): Metadata {
  const config = getCoursePageConfig(slug);
  const nav = getProgramNav(slug);
  const tabLabel = nav.tabs.find((item) => item.id === tab)?.label ?? tab;
  const hero =
    slug === "pgp" ? pgpTabHero[tab] : aiMarketingTabHero[tab as keyof typeof aiMarketingTabHero];
  const path = `${programBasePath(slug)}/${tab}`;

  return buildPageMetadata({
    title: `${config.programmeTitle} · ${tabLabel} | HiveSchool`,
    description: hero.description,
    path,
  });
}
