import mongoose, { Schema, model, models } from "mongoose";

export interface IEvent {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  posterUrl: string;
  date: Date;
  endDate?: Date;
  venue: string;
  venueLink?: string;
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

// Auto-generate slug from title if not provided
// eslint-disable-next-line @typescript-eslint/no-explicit-any
EventSchema.pre("validate", function (this: any, next: any) {
  if (!this.slug && this.title) {
    this.slug = String(this.title)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

export const Event = models.Event || model<IEvent>("Event", EventSchema);
