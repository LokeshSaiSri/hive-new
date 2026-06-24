import type { ProgramSlug } from "@/data/programPages/types";

/** Legacy thank-you URLs on hiveschool.co — used for post-submit redirects and GTM triggers. */
export const FORM_THANK_YOU_PATHS: Record<ProgramSlug, string> = {
  pgp: "/pgp-revenue-tech-entrepreneurship-form-submitted",
  "ai-marketing": "/ai-marketing-fellowship-form-submitted",
  ug: "/ug-programme-form-submitted",
};

export function buildThankYouUrl(
  course: ProgramSlug,
  submissionGuid: string,
  hubspotRedirectUri?: string,
): string {
  if (hubspotRedirectUri) {
    try {
      const url = new URL(hubspotRedirectUri);
      if (!url.searchParams.has("submissionGuid")) {
        url.searchParams.set("submissionGuid", submissionGuid);
      }
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      // Fall through to legacy path.
    }
  }

  const path = FORM_THANK_YOU_PATHS[course];
  return `${path}?submissionGuid=${encodeURIComponent(submissionGuid)}`;
}
