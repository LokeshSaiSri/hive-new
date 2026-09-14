#!/usr/bin/env node
import { createReadStream, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const root = process.cwd();
const file = join(root, "public", "Salespreneur-Report.pdf");
const key = "docs/Day-Zero-Report.pdf";

const accountId = process.env.R2_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
const bucket = process.env.R2_BUCKET_NAME?.trim();
const cdn = process.env.NEXT_PUBLIC_MEDIA_CDN_URL?.trim()?.replace(/\/$/, "");

for (const [name, value] of [
  ["R2_ACCOUNT_ID", accountId],
  ["R2_ACCESS_KEY_ID", accessKeyId],
  ["R2_SECRET_ACCESS_KEY", secretAccessKey],
  ["R2_BUCKET_NAME", bucket],
]) {
  if (!value) {
    console.error(`upload-day-zero-r2: missing ${name}`);
    process.exit(1);
  }
}

if (!existsSync(file)) {
  console.error("upload-day-zero-r2: public/Salespreneur-Report.pdf not found");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

const sizeMb = (statSync(file).size / 1024 / 1024).toFixed(2);

await client.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: createReadStream(file),
    ContentType: "application/pdf",
    ContentDisposition: 'inline; filename="Day-Zero-Report.pdf"',
    CacheControl: "public, max-age=86400",
  }),
);

const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
const publicUrl = `${cdn ?? ""}/${key}`;

console.log(`uploaded ${key} (${sizeMb} MB)`);
console.log(`etag ${head.ETag ?? "n/a"}`);
console.log(`url ${publicUrl}`);
