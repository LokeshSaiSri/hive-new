import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const CDN_URL = process.env.NEXT_PUBLIC_MEDIA_CDN_URL!;

function getR2Client(): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
    // Avoid AWS SDK v3 default CRC32 checksums that R2 rejects on some paths
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });
}

export function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

/** Upload a file buffer to R2 from the server (avoids browser CORS). */
export async function uploadPosterToR2(
  body: Buffer | Uint8Array,
  filename: string,
  contentType: string
): Promise<{ publicUrl: string; key: string }> {
  const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
  const unique = crypto.randomBytes(8).toString("hex");
  const key = `events/posters/${unique}.${ext}`;

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  const publicUrl = `${CDN_URL.replace(/\/$/, "")}/${key}`;
  return { publicUrl, key };
}
