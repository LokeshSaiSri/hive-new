import { cpSync, existsSync, lstatSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "assets");
const target = join(root, "public", "assets");

if (!existsSync(source)) {
  console.error("prepare-assets: missing ./assets directory");
  process.exit(1);
}

if (existsSync(target)) {
  const stat = lstatSync(target);
  rmSync(target, { recursive: true, force: true, ...(stat.isSymbolicLink() ? {} : {}) });
}

cpSync(source, target, { recursive: true });
console.log("prepare-assets: copied assets/ -> public/assets/");
