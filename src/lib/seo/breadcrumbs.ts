import { getProgramNav } from "@/data/programPages/navigation";
import type { ProgramSlug } from "@/data/programPages/types";

function programBasePath(slug: ProgramSlug): string {
  return slug === "pgp" ? "/pgp-revenue-tech-entrepreneurship" : `/${slug}`;
}

export function buildProgramOverviewBreadcrumbs(slug: ProgramSlug) {
  const nav = getProgramNav(slug);
  const base = programBasePath(slug);

  return [
    { name: "Home", path: "/" },
    { name: nav.title, path: base },
  ];
}

export function buildProgramTabBreadcrumbs(
  slug: ProgramSlug,
  tab: "curriculum" | "placements" | "admissions",
) {
  const nav = getProgramNav(slug);
  const base = programBasePath(slug);
  const tabLabel = nav.tabs.find((item) => item.id === tab)?.label ?? tab;

  return [
    { name: "Home", path: "/" },
    { name: nav.title, path: base },
    { name: tabLabel, path: `${base}/${tab}` },
  ];
}

export function buildHubBreadcrumbs(label: string, path: string) {
  return [
    { name: "Home", path: "/" },
    { name: label, path },
  ];
}
