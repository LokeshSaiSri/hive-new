import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const videosOnCdn = Boolean(process.env.NEXT_PUBLIC_MEDIA_CDN_URL?.trim());

const required = [
  "public/assets/images/misc/hiveschool-logo.png",
  "public/assets/images/misc/hero-campus-poster.jpg",
  "public/assets/images/life/life-1.avif",
];

if (!videosOnCdn) {
  required.push("public/assets/videos/hero-campus.mp4");
}

const missing = required.filter((rel) => !existsSync(join(root, rel)));

if (missing.length > 0) {
  console.error("verify-assets: missing files after prepare-assets:");
  for (const file of missing) console.error(`  - ${file}`);
  console.error("Run: npm run prepare-assets");
  process.exit(1);
}

const note = videosOnCdn ? "videos on CDN" : `${required.length} critical paths`;
console.log(`verify-assets: ok (${note})`);
