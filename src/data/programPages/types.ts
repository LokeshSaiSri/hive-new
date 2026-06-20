export type ProgramSlug = "pgp" | "ai-marketing" | "ug";

export type ProgramTab = "overview" | "curriculum" | "placements" | "admissions";

export type ProgramTabLink = {
  id: ProgramTab;
  label: string;
  path: string;
};

export type ProgramNavConfig = {
  slug: ProgramSlug;
  title: string;
  applyHref: string;
  tabs: ProgramTabLink[];
};

export type ProgramSectionIntro = {
  eyebrow: string;
  statement: string;
  emphasis: string;
  description?: string;
};
