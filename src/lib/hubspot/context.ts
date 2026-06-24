import type { HubSpotSubmissionContext } from "@/lib/hubspot/submit";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);
const PREVIEW_HOST_PATTERN = /\.(vercel\.app|netlify\.app)$/i;

function isValidHubspotUtk(hutk?: string): hutk is string {
  if (!hutk) return false;
  const trimmed = hutk.trim();
  return trimmed.length >= 16 && !/^hutk$/i.test(trimmed);
}

function shouldCanonicalizeHost(hostname: string, productionHost: string): boolean {
  if (LOCAL_HOSTS.has(hostname)) return true;
  if (PREVIEW_HOST_PATTERN.test(hostname)) return true;
  return hostname !== productionHost;
}

/**
 * HubSpot marks submissions as spam when pageUri is from an unregistered domain
 * (localhost, vercel.app previews, etc.). Rewrites to NEXT_PUBLIC_SITE_URL path.
 */
export function resolveHubSpotPageUri(pageUri?: string): string | undefined {
  if (!pageUri) return undefined;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return pageUri;

  try {
    const url = new URL(pageUri);
    const productionHost = new URL(siteUrl).hostname;

    if (shouldCanonicalizeHost(url.hostname, productionHost)) {
      return `${siteUrl}${url.pathname}${url.search}${url.hash}`;
    }

    return pageUri;
  } catch {
    return siteUrl;
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
