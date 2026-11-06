import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Global references
let transport: WebStandardStreamableHTTPServerTransport | null = null;
let server: Server | null = null;

// ── Image Fetcher ─────────────────────────────────────────────────────────────
async function fetchCoverImage(query: string) {
  const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || "";
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

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function initializeServer() {
  if (server) return server;
  
  server = new Server(
    { name: "hiveschool-blog-publisher", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "publish_blog",
          description: "Publishes a fully written, human-quality blog post LIVE to the HiveSchool website immediately.",
          inputSchema: {
            type: "object",
            properties: {
              title: { type: "string" },
              excerpt: { type: "string" },
              content: { type: "string" },
              tags: { type: "array", items: { type: "string" } },
              coverImageQuery: { type: "string" },
              isFeatured: { type: "boolean" },
            },
            required: ["title", "excerpt", "content", "tags", "coverImageQuery"],
          },
        },
        {
          name: "draft_blog",
          description: "Saves a blog post as a DRAFT (not publicly visible) on HiveSchool.",
          inputSchema: {
            type: "object",
            properties: {
              title: { type: "string" },
              excerpt: { type: "string" },
              content: { type: "string" },
              tags: { type: "array", items: { type: "string" } },
              coverImageQuery: { type: "string" },
            },
            required: ["title", "excerpt", "content", "tags", "coverImageQuery"],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    if (name !== "publish_blog" && name !== "draft_blog") {
      throw new Error(`Unknown tool: ${name}`);
    }

    const { title, excerpt, content, tags, coverImageQuery, isFeatured } = args as any;
    const isPublished = name === "publish_blog";

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
      isPublished,
      isFeatured: isFeatured || false,
      publishedAt: new Date().toISOString(),
    };

    const siteUrl = process.env.HIVESCHOOL_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
    const webhookUrl = `${siteUrl}/api/blogs/webhook`;
    const WEBHOOK_SECRET = process.env.HIVESCHOOL_WEBHOOK_SECRET || process.env.CLAUDE_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      return {
        content: [{ type: "text", text: "Webhook secret is not configured (set HIVESCHOOL_WEBHOOK_SECRET)." }],
        isError: true,
      };
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${WEBHOOK_SECRET}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(`Webhook failed: ${JSON.stringify(result)}`);

      const blogSlug = result.blog?.slug || slug;
      const statusWord = isPublished ? "PUBLISHED LIVE" : "SAVED AS DRAFT";
      const statusEmoji = isPublished ? "🚀" : "📝";

      return {
        content: [
          {
            type: "text",
            text: `${statusEmoji} Blog ${statusWord} successfully!\n\n**Title:** ${title}\n**Slug:** ${blogSlug}\n**Cover Image:** ${coverImage}\n\n${isPublished ? `🌐 **Live URL:** ${siteUrl}/blogs/${blogSlug}` : `📋 **Draft URL:** ${siteUrl}/hive-control-hub/blogs`}`,
          },
        ],
      };
    } catch (networkErr: any) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Network Error: Could not reach HiveSchool at ${webhookUrl}.\nError: ${networkErr.message}`,
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}

function getTransport() {
  if (transport) return transport;
  
  const mcpServer = initializeServer();
  transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
  });
  
  mcpServer.connect(transport);
  return transport;
}

/** Requires "Authorization: Bearer <MCP_AUTH_TOKEN>". Fails closed when the token is not configured. */
function authorize(req: Request): Response | null {
  const expected = process.env.MCP_AUTH_TOKEN;
  if (!expected) {
    return Response.json({ error: "MCP endpoint is not configured" }, { status: 503 });
  }
  const a = Buffer.from(req.headers.get("authorization") ?? "");
  const b = Buffer.from(`Bearer ${expected}`);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(req: Request) {
  const denied = authorize(req);
  if (denied) return denied;
  const t = getTransport();
  return t.handleRequest(req);
}

export async function POST(req: Request) {
  const denied = authorize(req);
  if (denied) return denied;
  const t = getTransport();
  return t.handleRequest(req);
}
