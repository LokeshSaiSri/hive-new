# HiveSchool MCP Server — Claude Desktop & Cloud Setup Guide

You can connect Claude to HiveSchool's publishing system in two ways depending on where you are using Claude (Locally on Desktop vs. Scheduled Tasks in the Cloud).

---

## ☁️ Method 1: Cloud Connection (For Scheduled Tasks & Vercel)

If your HiveSchool app is deployed on Vercel, the MCP Server is already hosted securely on the internet at `/api/mcp`. This is **required** if you want Claude's automated scheduled tasks to publish blogs for you, since cloud tasks cannot access your local laptop.

1. Find the URL of your Vercel production deployment (e.g., `https://www.hiveschool.co`)
2. In Claude (Platform or Desktop), add the remote MCP server to your configuration:

```json
"mcpServers": {
  "hiveschool": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/inspector",
      "https://www.hiveschool.co/api/mcp"
    ]
  }
}
```
*(Make sure to replace the domain with your actual Vercel domain).*

---

## 💻 Method 2: Local Desktop Connection (For Local Development)

If you only want to use Claude Desktop to draft blogs locally while running `npm run dev` on your own machine:

1. Open your File Explorer and navigate to `d:\hive-new\mcp-server\`
2. Double-click the file named **`connect-mcp.bat`**
3. A black terminal window will automatically install requirements and link your computer to Claude.
4. When it says `[SUCCESS]`, press any key to close the window.
5. Completely quit Claude Desktop (right-click the taskbar icon → Quit) and reopen it.

---

## Setting up the HiveSchool Editorial Project (Required for both)

To make sure Claude writes in the proper brand voice:

1. Click **"Projects"** in Claude's left sidebar
2. Click **"New Project"** and name it: `HiveSchool Editorial`
3. Click **"Set Project Instructions"**
4. Open `D:\hive-new\mcp-server\SYSTEM_PROMPT.md`
5. Copy everything between the `---` markers and paste it into the Project Instructions box
6. Save the project

---

## How to Use

Make sure the tools icon (🔨) shows `hiveschool` with `publish_blog` and `draft_blog` available.

| What you say | What happens |
|---|---|
| "Write a blog about [topic] and publish it live" | Claude writes → you confirm → post goes live |
| "Write a blog about [topic] and save as draft" | Claude writes → you confirm → saved for your review |
| "Make it featured" | Blog appears in the hero carousel on /blogs |
| "Don't feature it" | Blog goes into the Recent Articles grid |

