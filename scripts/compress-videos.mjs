#!/usr/bin/env node
/**
 * Re-encode MP4s in assets/videos for web delivery.
 * - Hero / programme heroes: max 1280px wide, no audio, CRF 28
 * - Reels: max 720px wide, light AAC audio, CRF 30
 * Run: node scripts/compress-videos.mjs
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const videosRoot = join(root, "assets", "videos");

function sizeMb(path) {
  return (statSync(path).size / 1024 / 1024).toFixed(1);
}

function compress(input, profile) {
  const tmp = `${input}.tmp.mp4`;
  const args =
    profile === "hero"
      ? [
          "-y",
          "-i",
          input,
          "-vf",
          "scale='min(1280,iw)':-2",
          "-c:v",
          "libx264",
          "-crf",
          "28",
          "-preset",
          "medium",
          "-movflags",
          "+faststart",
          "-an",
          tmp,
        ]
      : [
          "-y",
          "-i",
          input,
          "-vf",
          "scale='min(720,iw)':-2",
          "-c:v",
          "libx264",
          "-crf",
          "30",
          "-preset",
          "medium",
          "-movflags",
          "+faststart",
          "-c:a",
          "aac",
          "-b:a",
          "96k",
          "-ac",
          "2",
          tmp,
        ];

  const before = sizeMb(input);
  execSync(`ffmpeg ${args.map((a) => `"${a}"`).join(" ")}`, { stdio: "inherit", shell: true });
  renameSync(tmp, input);
  const after = sizeMb(input);
  console.log(`  ${input.replace(root + "/", "")}: ${before} MB → ${after} MB`);
}

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith(".mp4")) files.push(full);
  }
  return files;
}

if (!existsSync(videosRoot)) {
  console.error("No assets/videos directory");
  process.exit(1);
}

const heroNames = new Set([
  "hero-campus.mp4",
  "campus-hero.mp4",
  "ai-marketing-hero.mp4",
  "pgp-hero.mp4",
]);

const files = walk(videosRoot);
console.log(`Compressing ${files.length} videos…\n`);

for (const file of files) {
  const name = file.split("/").pop();
  const profile = heroNames.has(name) ? "hero" : "reel";
  try {
    compress(file, profile);
  } catch (error) {
    const tmp = `${file}.tmp.mp4`;
    if (existsSync(tmp)) unlinkSync(tmp);
    console.error(`Failed: ${file}`, error.message);
    process.exitCode = 1;
  }
}

console.log("\nDone. Run npm run prepare-assets to sync public/assets.");
