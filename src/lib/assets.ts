/** Local static asset paths served from /public/assets */
export function asset(path: string): string {
  return `/assets/${path.replace(/^\//, "")}`;
}

/** Public Cloudflare R2 (or any media CDN) base URL — no trailing slash. */
export function getMediaCdnUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_MEDIA_CDN_URL?.trim();
  return url ? url.replace(/\/$/, "") : undefined;
}

/** Video URLs — served from R2/CDN when configured, otherwise local /assets/videos. */
export function videoAsset(path: string): string {
  const normalized = path.replace(/^\//, "");
  const cdn = getMediaCdnUrl();

  if (cdn) {
    return `${cdn}/${normalized}`;
  }

  return asset(normalized);
}

export function videosHostedOnCdn(): boolean {
  return Boolean(getMediaCdnUrl());
}
