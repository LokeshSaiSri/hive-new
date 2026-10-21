/**
 * Event page addresses carry the programme up front (Simar, 16 Oct), so a UG event lives at
 * /events/ug-<name> and an AI Marketing one at /events/ai-marketing-<name>. Scales to any
 * new event: pick the programme, optionally type the rest.
 */

export const EVENT_PROGRAMS = [
  { id: "", label: "No programme", prefix: "" },
  { id: "ug", label: "UG", prefix: "ug" },
  { id: "pgp", label: "PGP", prefix: "pgp" },
  { id: "ai-marketing", label: "AI Marketing", prefix: "ai-marketing" },
] as const;

export type EventProgramId = (typeof EVENT_PROGRAMS)[number]["id"];

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The programme an existing slug starts with (for the edit form). */
export function programFromSlug(slug: string): EventProgramId {
  const hit = EVENT_PROGRAMS.filter((p) => p.prefix).find((p) => slug === p.prefix || slug.startsWith(`${p.prefix}-`));
  return hit?.id ?? "";
}

/** The slug without its programme prefix. */
export function slugWithoutProgram(slug: string) {
  const p = EVENT_PROGRAMS.find((x) => x.prefix && slug.startsWith(`${x.prefix}-`));
  return p ? slug.slice(p.prefix.length + 1) : slug;
}

/** programme prefix + (custom text, else the title), e.g. "ug" + "Founders Meetup" → "ug-founders-meetup". */
export function buildEventSlug(program: string | null | undefined, custom: string | null | undefined, title: string) {
  const prefix = EVENT_PROGRAMS.find((p) => p.id === (program ?? ""))?.prefix ?? "";
  let base = slugify(custom?.trim() ? custom : title);
  // Don't double the prefix if it was typed too
  if (prefix && (base === prefix || base.startsWith(`${prefix}-`))) base = base.slice(prefix.length).replace(/^-/, "");
  return [prefix, base].filter(Boolean).join("-") || slugify(title);
}
