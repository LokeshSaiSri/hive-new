import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "assets");
const target = join(root, "public", "assets");
const skipVideos = Boolean(process.env.NEXT_PUBLIC_MEDIA_CDN_URL?.trim());

function copyTree(src, dest, { skipDirNames = [] } = {}) {
  mkdirSync(dest, { recursive: true });

  for (const entry of readdirSync(src, { withFileTypes: true })) {
    if (skipDirNames.includes(entry.name)) continue;

    const from = join(src, entry.name);
    const to = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyTree(from, to, { skipDirNames });
    } else {
      cpSync(from, to);
    }
  }
}

if (!existsSync(source)) {
  console.error("prepare-assets: missing ./assets directory");
  process.exit(1);
}

if (existsSync(target)) {
  const stat = lstatSync(target);
  rmSync(target, { recursive: true, force: true, ...(stat.isSymbolicLink() ? {} : {}) });
}

copyTree(source, target, { skipDirNames: skipVideos ? ["videos"] : [] });

if (skipVideos) {
  console.log("prepare-assets: copied assets/ -> public/assets/ (videos skipped — CDN enabled)");
} else {
  console.log("prepare-assets: copied assets/ -> public/assets/");
}
