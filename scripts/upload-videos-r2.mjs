#!/usr/bin/env node
/**
 * Upload assets/videos/**/*.mp4 to Cloudflare R2 (S3-compatible API).
 *
 * Required env (do not commit):
 *   R2_ACCOUNT_ID
 *   R2_ACCESS_KEY_ID
 *   R2_SECRET_ACCESS_KEY
 *   R2_BUCKET_NAME
 *
 * Optional:
 *   R2_PREFIX=videos          — object key prefix (default: videos)
 *
 * After upload, set the public CDN URL in Vercel:
 *   NEXT_PUBLIC_MEDIA_CDN_URL=https://media.hiveschool.co
 *   (custom domain on the R2 bucket, or https://pub-xxxx.r2.dev)
 */
import { createReadStream, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const root = process.cwd();
const videosRoot = join(root, "assets", "videos");

const accountId = process.env.R2_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
const bucket = process.env.R2_BUCKET_NAME?.trim();
const prefix = (process.env.R2_PREFIX ?? "videos").replace(/^\/|\/$/g, "");

function requireEnv(name, value) {
  if (!value) {
    console.error(`upload-videos-r2: missing ${name}`);
    process.exit(1);
  }
}

requireEnv("R2_ACCOUNT_ID", accountId);
requireEnv("R2_ACCESS_KEY_ID", accessKeyId);
requireEnv("R2_SECRET_ACCESS_KEY", secretAccessKey);
requireEnv("R2_BUCKET_NAME", bucket);

if (!existsSync(videosRoot)) {
  console.error("upload-videos-r2: assets/videos not found");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

function walkMp4(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkMp4(full));
    else if (entry.name.endsWith(".mp4")) files.push(full);
  }
  return files;
}

const files = walkMp4(videosRoot);
console.log(`Uploading ${files.length} videos to R2 bucket "${bucket}"…\n`);

for (const file of files) {
  const rel = relative(videosRoot, file).replace(/\\/g, "/");
  const key = `${prefix}/${rel}`;
  const sizeMb = (statSync(file).size / 1024 / 1024).toFixed(1);

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: createReadStream(file),
      ContentType: "video/mp4",
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  console.log(`  ✓ ${key} (${sizeMb} MB)`);
}

console.log(`
Done. Set in Vercel / .env:
  NEXT_PUBLIC_MEDIA_CDN_URL=<your R2 public URL>

Example object URL:
  https://<your-cdn>/${prefix}/hero-campus.mp4
`);
