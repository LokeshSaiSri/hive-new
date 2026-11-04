import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load .env from the mcp-server directory
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

// ── Configuration ─────────────────────────────────────────────────────────────
const WEBHOOK_URL = process.env.HIVESCHOOL_WEBHOOK_URL || "http://localhost:3000/api/blogs/webhook";
const WEBHOOK_SECRET = process.env.HIVESCHOOL_WEBHOOK_SECRET || "";
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
const SITE_URL = process.env.HIVESCHOOL_SITE_URL || "http://localhost:3000";

// ── Image Fetcher ─────────────────────────────────────────────────────────────
async function fetchCoverImage(query) {
  if (!UNSPLASH_KEY) {
    // Graceful fallback: return a professional dark editorial image from Picsum
    const seed = Math.abs(query.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    return `https://picsum.photos/seed/${seed}/1600/900`;
  }
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high&client_id=${UNSPLASH_KEY}`
    );
    if (!res.ok) throw new Error("Unsplash API error");
    const data = await res.json();
    // Use the high-quality "regular" size (1080px wide) - free and gorgeous
    return data.urls?.regular || "";
  } catch {
    const seed = Math.abs(query.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    return `https://picsum.photos/seed/${seed}/1600/900`;
  }
}

// ── Slug Generator ────────────────────────────────────────────────────────────
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── MCP Server ────────────────────────────────────────────────────────────────
const server = new Server(
  { name: "hiveschool-blog-publisher", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// ── Tool Definitions ──────────────────────────────────────────────────────────
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "publish_blog",
        description:
          "Publishes a fully written, human-quality blog post LIVE to the HiveSchool website immediately. " +
          "Use this ONLY after the full blog content has been written and reviewed. " +
          "The blog will be visible to all readers on hiveschool.co/blogs within seconds.",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The blog post title. Should be punchy, specific, and create intellectual tension. Max 12 words.",
            },
            excerpt: {
              type: "string",
              description: "A 2-sentence hook that creates FOMO. The reader must feel they will miss something critical if they skip this.",
            },
            content: {
              type: "string",
              description:
                "The full blog post body in Markdown format. Use ## for section headers (3-4 max). " +
                "Do NOT include the title in the content body. Minimum 800 words.",
            },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "2-3 specific tags. Max 2 words each. Examples: ['Enterprise Sales', 'GTM Strategy', 'Revenue Ops']",
            },
            coverImageQuery: {
              type: "string",
              description:
                "A descriptive search query for the cover photo. Be specific and visual. " +
                "Example: 'enterprise sales negotiation dark office' or 'data revenue analytics night'.",
            },
            isFeatured: {
              type: "boolean",
              description:
                "Set to true to place this post in the hero carousel on the blogs homepage. " +
                "Use sparingly — only for exceptional, landmark articles.",
            },
          },
          required: ["title", "excerpt", "content", "tags", "coverImageQuery"],
        },
      },
      {
        name: "draft_blog",
        description:
          "Saves a blog post as a DRAFT (not publicly visible) on HiveSchool. " +
          "Use this when the content is written but needs human review before going live. " +
          "The admin can then log into the dashboard at /hive-control-hub/blogs and publish it manually.",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The blog post title.",
            },
            excerpt: {
              type: "string",
              description: "A 2-sentence hook summary of the post.",
            },
            content: {
              type: "string",
              description: "The full blog post body in Markdown format.",
            },
            tags: {
              type: "array",
              items: { type: "string" },
              description: "2-3 relevant tags.",
            },
            coverImageQuery: {
              type: "string",
              description: "A descriptive search query for the cover photo.",
            },
          },
          required: ["title", "excerpt", "content", "tags", "coverImageQuery"],
        },
      },
    ],
  };
});

// ── Tool Execution ────────────────────────────────────────────────────────────
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name !== "publish_blog" && name !== "draft_blog") {
    throw new Error(`Unknown tool: ${name}`);
  }

  const { title, excerpt, content, tags, coverImageQuery, isFeatured } = args;
  const isPublished = name === "publish_blog";

  // 1. Fetch the cover image
  const imageQuery = coverImageQuery || (tags && tags[0]) || "enterprise business dark";
  const coverImage = await fetchCoverImage(imageQuery);

  // 2. Auto-generate slug from title
  const slug = generateSlug(title);

  // 3. Build the payload
  const payload = {
    title,
    slug,
    excerpt,
    content,
    coverImage,
    tags: tags || [],
    author: "Hive Editorial",
    isPublished,
    isFeatured: isFeatured || false,
    publishedAt: new Date().toISOString(),
  };

  // 4. POST to the HiveSchool webhook
  let response;
  try {
    response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WEBHOOK_SECRET}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    return {
      content: [
        {
          type: "text",
          text:
            `❌ Network Error: Could not reach HiveSchool at ${WEBHOOK_URL}.\n\n` +
            `Make sure the Next.js dev server is running (npm run dev) or the site is deployed.\n\nError: ${networkErr.message}`,
        },
      ],
      isError: true,
    };
  }

  const result = await response.json();

  if (!response.ok) {
    return {
      content: [
        {
          type: "text",
          text: `❌ Failed to ${isPublished ? "publish" : "save draft"}:\n\n${JSON.stringify(result, null, 2)}`,
        },
      ],
      isError: true,
    };
  }

  const blogSlug = result.blog?.slug || slug;
  const blogUrl = `${SITE_URL}/blogs/${blogSlug}`;

  const statusEmoji = isPublished ? "🚀" : "📝";
  const statusWord = isPublished ? "PUBLISHED LIVE" : "SAVED AS DRAFT";

  return {
    content: [
      {
        type: "text",
        text:
          `${statusEmoji} Blog ${statusWord} successfully!\n\n` +
          `**Title:** ${title}\n` +
          `**Slug:** ${blogSlug}\n` +
          `**Tags:** ${(tags || []).join(", ")}\n` +
          `**Cover Image:** ${coverImage}\n` +
          `**Featured:** ${isFeatured ? "Yes — appears in hero carousel" : "No"}\n\n` +
          (isPublished
            ? `🌐 **Live URL:** ${blogUrl}\n\nThe post is now live and visible to all readers.`
            : `📋 **Draft URL (admin only):** ${SITE_URL}/hive-control-hub/blogs\n\nGo to your admin dashboard to review and publish when ready.`),
      },
    ],
  };
});

// ── Start the Server ──────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
