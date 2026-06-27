import type { ProgramSlug } from "@/data/programPages/types";

/**
 * HubSpot forms for the new HiveSchool website.
 *
 * Create three NEW forms in HubSpot (Marketing → Lead Capture → Forms).
 * Do not reuse legacy form GUIDs from the old site.
 *
 * Suggested form names:
 * - Website — PGP Application
 * - Website — AI Marketing Fellowship Application
 * - Website — UG Application
 * - Website — Placement Report Download (optional; falls back to PGP form)
 *
 * Required contact properties on each form:
 * - firstname (Full name — we send first + last when available)
 * - lastname (optional)
 * - email
 * - phone
 * - linkedin (create a single-line text contact property if needed)
 *
 * Home / programme picker form submissions also send:
 * - city
 * - programme_of_interest (single-line text contact property)
 */
export const HUBSPOT_CONTACT_FIELDS = {
  firstName: "firstname",
  lastName: "lastname",
  email: "email",
  phone: "phone",
  linkedin: "linkedin",
  city: "city",
  programmeOfInterest: "programme_of_interest",
} as const;

const FORM_GUID_ENV: Record<ProgramSlug, string | undefined> = {
  pgp: process.env.NEXT_PUBLIC_HUBSPOT_FORM_PGP,
  "ai-marketing": process.env.NEXT_PUBLIC_HUBSPOT_FORM_AI_MARKETING,
  ug: process.env.NEXT_PUBLIC_HUBSPOT_FORM_UG,
};

export function getHubSpotPortalId(): string | undefined {
  return process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
}

/** HubSpot data region, e.g. "na2" — must match your account (see form embed code). */
export function getHubSpotRegion(): string {
  return process.env.NEXT_PUBLIC_HUBSPOT_REGION?.trim() || "na1";
}

export function getHubSpotTrackingScriptUrl(portalId: string): string {
  const region = getHubSpotRegion();
  if (region === "na1") {
    return `https://js.hs-scripts.com/${portalId}.js`;
  }
  return `https://js-${region}.hs-scripts.com/${portalId}.js`;
}

export function getHubSpotFormGuid(slug: ProgramSlug): string | undefined {
  return FORM_GUID_ENV[slug];
}

export function getPlacementReportFormGuid(): string | undefined {
  const dedicated = process.env.NEXT_PUBLIC_HUBSPOT_FORM_PLACEMENT_REPORT?.trim();
  if (dedicated) return dedicated;
  return FORM_GUID_ENV.pgp;
}

/** HubSpot form for general gated document downloads (e.g., handbook). Falls back to Placement Report form if unset. */
export function getGatedDocumentFormGuid(): string | undefined {
  const dedicated = process.env.NEXT_PUBLIC_HUBSPOT_FORM_GENERAL_ENQUIRY?.trim();
  if (dedicated) return dedicated;
  return getPlacementReportFormGuid();
}

export function isHubSpotConfigured(slug: ProgramSlug): boolean {
  return Boolean(getHubSpotPortalId() && getHubSpotFormGuid(slug));
}
