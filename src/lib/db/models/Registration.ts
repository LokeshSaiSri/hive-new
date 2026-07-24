import mongoose, { Schema, model, models } from "mongoose";

export interface IRegistration {
  _id: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
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
    ipHash: { type: String, default: "" }, // hashed IP — no PII stored raw
  },
  { timestamps: true }
);

// Index for dedup check (prevent double registration per event)
RegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

export const Registration =
  models.Registration || model<IRegistration>("Registration", RegistrationSchema);
