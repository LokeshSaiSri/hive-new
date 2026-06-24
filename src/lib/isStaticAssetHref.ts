/** Paths that must use a native anchor — not Next.js <Link> (avoids ?_rsc= 404 on PDFs, etc.). */
export function isStaticAssetHref(href: string): boolean {
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")) {
    return true;
  }
  return /\.(pdf|zip|docx?|xlsx?|pptx?|mp4|webm|csv)(\?|#|$)/i.test(href);
}
