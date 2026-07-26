/**
 * Clears all event registrations.
 * Does NOT insert mock/demo members.
 *
 * Usage: node scripts/seed-registrations.mjs
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
for (const file of [".env.local", ".env"]) {
  const envPath = resolve(__dirname, "..", file);
  if (fs.existsSync(envPath)) dotenv.config({ path: envPath });
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env or .env.local");
  process.exit(1);
}

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

const Registration =
  mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);

const EventSchema = new mongoose.Schema(
  { registrationCount: { type: Number, default: 0 } },
  { strict: false }
);
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

async function clearRegistrations() {
  try {
    await mongoose.connect(MONGODB_URI);
    const deleted = await Registration.deleteMany({});
    console.log(`Removed ${deleted.deletedCount} registration(s).`);

    const reset = await Event.updateMany({}, { $set: { registrationCount: 0 } });
    console.log(`Reset registrationCount on ${reset.modifiedCount} event(s).`);

    process.exit(0);
  } catch (error) {
    console.error("Error clearing registrations:", error);
    process.exit(1);
  }
}

clearRegistrations();
