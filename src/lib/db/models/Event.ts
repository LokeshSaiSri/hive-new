import mongoose, { Schema, model, models } from "mongoose";

export interface IEvent {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  posterUrl: string;
  posterUrls: string[];
  date: Date;
  endDate?: Date;
  venue: string;
  venueLink?: string;
  isOnline: boolean;
  capacity?: number;
  registrationCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: String, default: "" },
    description: { type: String, required: true },
    posterUrl: { type: String, default: "" },
    posterUrls: { type: [String], default: [] },
    date: { type: Date, required: true },
    endDate: { type: Date },
    venue: { type: String, required: true },
    venueLink: { type: String },
    isOnline: { type: Boolean, default: false },
    capacity: { type: Number },
    registrationCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Auto-generate slug from title if not provided
EventSchema.pre("validate", function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = this as any;
  if (!doc.slug && doc.title) {
    doc.slug = String(doc.title)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
});

// In dev, drop the cached model so schema/middleware edits apply on HMR
if (process.env.NODE_ENV !== "production" && models.Event) {
  delete models.Event;
}

export const Event = (models.Event as mongoose.Model<IEvent>) || model<IEvent>("Event", EventSchema);
