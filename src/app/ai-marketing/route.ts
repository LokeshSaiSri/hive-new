import { readFile } from "node:fs/promises";
import path from "node:path";

// The AI Marketing & Entrepreneurship Fellowship page is one hand-built HTML file.
// It is read at build time, so edits to index.html need a new build.
export const dynamic = "force-static";

export async function GET() {
  const html = await readFile(path.join(process.cwd(), "src/app/ai-marketing/index.html"), "utf8");
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
