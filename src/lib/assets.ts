export function asset(path: string): string {
  if (path.startsWith("http") || path.startsWith("/assets/")) {
    return path;
  }
  return `/assets/${path.replace(/^\//, "")}`;
}

/** Public Cloudflare R2 (or any media CDN) base URL — no trailing slash. */
export function getMediaCdnUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_MEDIA_CDN_URL?.trim();
  return url ? url.replace(/\/$/, "") : undefined;
}

/** Video URLs — always served from R2/CDN (local .mp4 files are not bundled). */
export function videoAsset(path: string): string {
  const normalized = path.replace(/^\//, "");
  const cdn = getMediaCdnUrl();

  if (cdn) {
    return `${cdn}/${normalized}`;
  }

  // Dev fallback when CDN env is missing — run with NEXT_PUBLIC_MEDIA_CDN_URL in .env
  return asset(normalized);
}

export function videosHostedOnCdn(): boolean {
  return Boolean(getMediaCdnUrl());
}

export function cdnAsset(path: string): string {
  const normalized = path.replace(/^\//, "");
  const cdn = getMediaCdnUrl();

  if (cdn) {
    return `${cdn}/${encodeURI(normalized).replace(/%2520/g, "%20")}`;
  }

  // Fallback to local
  return asset(normalized);
}
