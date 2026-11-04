import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Load .env from the mcp-server directory
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const WEBHOOK_URL = process.env.HIVESCHOOL_WEBHOOK_URL || "http://localhost:3000/api/blogs/webhook";
const WEBHOOK_SECRET = process.env.HIVESCHOOL_WEBHOOK_SECRET || "";
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
const SITE_URL = process.env.HIVESCHOOL_SITE_URL || "http://localhost:3000";

async function fetchCoverImage(query) {
  if (!UNSPLASH_KEY) {
    const seed = Math.abs(query.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    return `https://picsum.photos/seed/${seed}/1600/900`;
  }
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high&client_id=${UNSPLASH_KEY}`
    );
    if (!res.ok) throw new Error("Unsplash API error");
    const data = await res.json();
    return data.urls?.regular || "";
  } catch {
    const seed = Math.abs(query.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    return `https://picsum.photos/seed/${seed}/1600/900`;
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: node publish-cli.mjs <path-to-payload-json>");
    process.exit(1);
  }

  const payloadPath = args[0];
  const payloadStr = fs.readFileSync(payloadPath, "utf8");
  const { title, excerpt, content, tags, coverImageQuery, isFeatured, isPublished } = JSON.parse(payloadStr);

  const imageQuery = coverImageQuery || (tags && tags[0]) || "enterprise business dark";
  const coverImage = await fetchCoverImage(imageQuery);
  const slug = generateSlug(title);

  const payload = {
    title,
    slug,
    excerpt,
    content,
    coverImage,
    tags: tags || [],
    author: "Hive Editorial",
    isPublished: isPublished === undefined ? false : isPublished,
    isFeatured: isFeatured || false,
    publishedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WEBHOOK_SECRET}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(JSON.stringify({ error: true, message: `Failed to save: ${JSON.stringify(result)}` }));
      process.exit(1);
    }

    const blogSlug = result.blog?.slug || slug;
    const blogUrl = `${SITE_URL}/blogs/${blogSlug}`;

    console.log(JSON.stringify({
      success: true,
      slug: blogSlug,
      url: isPublished ? blogUrl : `${SITE_URL}/hive-control-hub/blogs`,
      isPublished,
      coverImage
    }, null, 2));

  } catch (err) {
    console.error(JSON.stringify({ error: true, message: `Network error: ${err.message}` }));
    process.exit(1);
  }
}

main();
