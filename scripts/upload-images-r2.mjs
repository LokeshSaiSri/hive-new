#!/usr/bin/env node
import { createReadStream, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const root = process.cwd();
const imagesRoot = join(root, "assets", "images");

const accountId = process.env.R2_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
const bucket = process.env.R2_BUCKET_NAME?.trim();
const prefix = (process.env.R2_PREFIX ?? "images").replace(/^\/|\/$/g, "");

function requireEnv(name, value) {
  if (!value) {
    console.error(`upload-images-r2: missing ${name}`);
    process.exit(1);
  }
}

requireEnv("R2_ACCOUNT_ID", accountId);
requireEnv("R2_ACCESS_KEY_ID", accessKeyId);
requireEnv("R2_SECRET_ACCESS_KEY", secretAccessKey);
requireEnv("R2_BUCKET_NAME", bucket);

if (!existsSync(imagesRoot)) {
  console.error("upload-images-r2: assets/images not found");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'png': return 'image/png';
    case 'webp': return 'image/webp';
    case 'svg': return 'image/svg+xml';
    case 'gif': return 'image/gif';
    default: return 'application/octet-stream';
  }
}

function walkImages(dir, targetFolders) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Only traverse specified target folders at the root level, or everything if we are inside a target folder
      if (dir === imagesRoot && !targetFolders.includes(entry.name)) {
        continue;
      }
      files.push(...walkImages(full, targetFolders));
    } else {
      const ext = entry.name.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'].includes(ext)) {
        files.push(full);
      }
    }
  }
  return files;
}

const targetFolders = ["news", "tech", "timeline", "mentors", "Website pics"];
const files = walkImages(imagesRoot, targetFolders);
console.log(`Uploading ${files.length} images to R2 bucket "${bucket}" under prefix "${prefix}"...\n`);

async function uploadFiles() {
  for (const file of files) {
    const rel = relative(imagesRoot, file).replace(/\\/g, "/");
    const key = `${prefix}/${rel}`;
    const sizeMb = (statSync(file).size / 1024 / 1024).toFixed(3);

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: createReadStream(file),
        ContentType: getMimeType(file),
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    console.log(`  ✓ ${key} (${sizeMb} MB)`);
  }
  console.log(`\nDone uploading images!`);
}

uploadFiles().catch(console.error);
