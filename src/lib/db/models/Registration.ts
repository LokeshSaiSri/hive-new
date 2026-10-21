import mongoose, { Schema, model, models } from "mongoose";
import type { RegistrationAnswer } from "@/lib/events/custom-fields";

export interface IRegistration {
  _id: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  answers: RegistrationAnswer[];
  ipHash: string;
  createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    eventTitle: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    linkedin: { type: String, trim: true, default: "" },
    answers: {
      type: [
        {
          questionId: { type: String, required: true },
          label: { type: String, required: true },
          value: { type: String, default: "" },
        },
      ],
      default: [],
    },
    ipHash: { type: String, default: "" }, // hashed IP — no PII stored raw
  },
  { timestamps: true }
);

// Index for dedup check (prevent double registration per event)
RegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

if (process.env.NODE_ENV !== "production" && models.Registration) {
  delete models.Registration;
}

export const Registration =
  models.Registration || model<IRegistration>("Registration", RegistrationSchema);
