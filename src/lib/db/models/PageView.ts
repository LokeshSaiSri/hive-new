import { Schema, model, models } from "mongoose";

export interface IPageView {
  _id: string;
  page: string;         // "events" | event slug
  visitorId: string;    // SHA-256(ip+ua+date) — anonymous, no PII
  date: string;         // YYYY-MM-DD — day-level granularity
  referrer: string;
  createdAt: Date;
}

const PageViewSchema = new Schema<IPageView>(
  {
    page: { type: String, required: true },
    visitorId: { type: String, required: true },
    date: { type: String, required: true },
    referrer: { type: String, default: "" },
  },
  { timestamps: true }
);

// One unique fingerprint per page per day
PageViewSchema.index({ page: 1, visitorId: 1, date: 1 }, { unique: true });

export const PageView = models.PageView || model<IPageView>("PageView", PageViewSchema);
