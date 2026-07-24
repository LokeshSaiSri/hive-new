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

const EventSchema = new mongoose.Schema({ title: String }, { strict: false });
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

const RegistrationSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    eventTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String, default: "" },
    ipHash: { type: String, default: "" },
  },
  { timestamps: true }
);

const Registration = mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);

async function seedRegistrations() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Fetch the featured event
    const summitEvent = await Event.findOne({ slug: "hive-founders-summit-2026" });
    const masterclassEvent = await Event.findOne({ slug: "scaling-to-1m-arr" });

    if (!summitEvent || !masterclassEvent) {
      console.error("Could not find the events. Make sure you ran seed-events.mjs first!");
      process.exit(1);
    }

    await Registration.deleteMany({});
    console.log("Cleared existing dummy registrations.");

    const registrations = [
      {
        eventId: summitEvent._id,
        eventTitle: summitEvent.title,
        name: "Aisha Patel",
        email: "aisha.patel@example.com",
        phone: "+91 98765 43210",
        linkedin: "linkedin.com/in/aishapatel",
        ipHash: "dummy-hash-1",
      },
      {
        eventId: summitEvent._id,
        eventTitle: summitEvent.title,
        name: "Rahul Sharma",
        email: "rahul.s@techstartup.in",
        phone: "+91 91234 56789",
        linkedin: "https://linkedin.com/in/rahulsharma-tech",
        ipHash: "dummy-hash-2",
      },
      {
        eventId: masterclassEvent._id,
        eventTitle: masterclassEvent.title,
        name: "Priya Desai",
        email: "priyadesai99@gmail.com",
        phone: "+91 88888 77777",
        linkedin: "", // Testing missing linkedin
        ipHash: "dummy-hash-3",
      },
      {
        eventId: masterclassEvent._id,
        eventTitle: masterclassEvent.title,
        name: "Karan Singh",
        email: "karan@vc-fund.co",
        phone: "+91 77777 66666",
        linkedin: "linkedin.com/in/karansinghvc",
        ipHash: "dummy-hash-4",
      }
    ];

    await Registration.insertMany(registrations);
    console.log("Successfully seeded 4 dummy registrations!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding registrations:", error);
    process.exit(1);
  }
}

seedRegistrations();
