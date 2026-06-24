import type { HubSpotSubmissionContext } from "@/lib/hubspot/submit";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

function isValidHubspotUtk(hutk?: string): hutk is string {
  if (!hutk) return false;
  const trimmed = hutk.trim();
  // HubSpot rejects empty/placeholder values with INVALID_HUTK.
  return trimmed.length >= 16 && !/^hutk$/i.test(trimmed);
}

/**
 * HubSpot marks submissions as spam when pageUri is from an unregistered domain
 * (e.g. localhost). When NEXT_PUBLIC_SITE_URL is set, local submits use the
 * production path on the registered domain while keeping the real page title.
 */
export function resolveHubSpotPageUri(pageUri?: string): string | undefined {
  if (!pageUri) return undefined;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return pageUri;

  try {
    const url = new URL(pageUri);
    if (!LOCAL_HOSTS.has(url.hostname)) return pageUri;
    return `${siteUrl}${url.pathname}${url.search}${url.hash}`;
  } catch {
    return pageUri;
  }
}

export function buildHubSpotSubmissionContext(
  input: HubSpotSubmissionContext,
): HubSpotSubmissionContext | undefined {
  const context: HubSpotSubmissionContext = {};

  const pageUri = resolveHubSpotPageUri(input.pageUri);
  if (pageUri) context.pageUri = pageUri;
  if (input.pageName) context.pageName = input.pageName;
  if (input.ipAddress) context.ipAddress = input.ipAddress;
  if (isValidHubspotUtk(input.hutk)) context.hutk = input.hutk.trim();

  return Object.keys(context).length > 0 ? context : undefined;
}
