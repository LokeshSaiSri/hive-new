import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable in .env.local");
  process.exit(1);
}

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    tagline: { type: String, default: "" },
    description: { type: String, required: true },
    posterUrl: { type: String, default: "" },
    date: { type: Date, required: true },
    endDate: { type: Date },
    venue: { type: String, required: true },
    venueLink: { type: String },
    capacity: { type: Number },
    registrationCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Clear existing events (just in case)
    await Event.deleteMany({});
    console.log("Cleared existing events.");

    const now = new Date();
    
    const events = [
      {
        title: "Hive Founders Summit 2026",
        slug: "hive-founders-summit-2026",
        tagline: "The premier gathering for visionary builders and creators.",
        description: "Join us for an exclusive, invite-only summit featuring keynote speeches from industry leaders, intensive hands-on workshops, and unparalleled networking opportunities. This is where the next generation of unicorns is born.",
        posterUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000",
        date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        venue: "Taj West End, Bengaluru",
        capacity: 500,
        registrationCount: 124,
        isPublished: true,
        isFeatured: true,
        tags: ["Networking", "Keynotes", "Premium"],
      },
      {
        title: "Masterclass: Scaling to $1M ARR",
        slug: "scaling-to-1m-arr",
        tagline: "Actionable strategies for early-stage B2B SaaS founders.",
        description: "A deep dive into go-to-market strategies, sales velocity, and product-led growth. Limited to 50 founders to ensure personalized attention and Q&A.",
        posterUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
        date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        venue: "Virtual Event (Zoom)",
        capacity: 50,
        registrationCount: 48, // 2 spots left! (Urgent)
        isPublished: true,
        isFeatured: false,
        tags: ["Masterclass", "SaaS", "Virtual"],
      },
      {
        title: "AI in Design: The New Frontier",
        slug: "ai-in-design",
        tagline: "How generative AI is reshaping the creative workflow.",
        description: "We explored how tools like Midjourney, Figma AI, and custom models are accelerating the design process without sacrificing quality.",
        posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000",
        date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago (Past)
        venue: "Hive HQ, Cyber City",
        capacity: 200,
        registrationCount: 200,
        isPublished: true,
        isFeatured: false,
        tags: ["Design", "AI", "Workshop"],
      }
    ];

    await Event.insertMany(events);
    console.log("Successfully seeded 3 sample events!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding events:", error);
    process.exit(1);
  }
}

seed();
