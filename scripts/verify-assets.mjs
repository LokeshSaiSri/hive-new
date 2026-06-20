import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const required = [
  "public/assets/images/misc/hiveschool-logo.png",
  "public/assets/images/misc/hero-campus-poster.jpg",
  "public/assets/videos/hero-campus.mp4",
  "public/assets/images/life/life-1.avif",
];

const missing = required.filter((rel) => !existsSync(join(root, rel)));

if (missing.length > 0) {
  console.error("verify-assets: missing files after prepare-assets:");
  for (const file of missing) console.error(`  - ${file}`);
  console.error("Run: npm run prepare-assets");
  process.exit(1);
}

console.log(`verify-assets: ok (${required.length} critical paths)`);
