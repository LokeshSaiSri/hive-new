#!/usr/bin/env node
/**
 * Re-encode MP4s in assets/videos for web delivery.
 *
 * Standard (fast site):  npm run compress-videos
 * High quality (R2 CDN): npm run compress-videos:hq
 */
import { execSync } from "node:child_process";
import { existsSync, readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const videosRoot = join(root, "assets", "videos");
const highQuality = process.argv.includes("--hq");

function sizeMb(path) {
  return (statSync(path).size / 1024 / 1024).toFixed(1);
}

function compress(input, profile) {
  const tmp = `${input}.tmp.mp4`;

  const heroArgs = highQuality
    ? ["-vf", "scale='min(1920,iw)':-2", "-crf", "22", "-preset", "slow"]
    : ["-vf", "scale='min(1280,iw)':-2", "-crf", "28", "-preset", "medium"];

  const reelArgs = highQuality
    ? ["-vf", "scale='min(1080,iw)':-2", "-crf", "24", "-preset", "slow"]
    : ["-vf", "scale='min(720,iw)':-2", "-crf", "30", "-preset", "medium"];

  const args =
    profile === "hero"
      ? ["-y", "-i", input, ...heroArgs, "-c:v", "libx264", "-movflags", "+faststart", "-an", tmp]
      : [
          "-y",
          "-i",
          input,
          ...reelArgs,
          "-c:v",
          "libx264",
          "-movflags",
          "+faststart",
          "-c:a",
          "aac",
          "-b:a",
          highQuality ? "128k" : "96k",
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
console.log(`Compressing ${files.length} videos (${highQuality ? "HQ for R2" : "standard"})…\n`);

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
