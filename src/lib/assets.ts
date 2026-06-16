/** Local static asset paths served from /public/assets */
export function asset(path: string): string {
  return `/assets/${path.replace(/^\//, "")}`;
}
