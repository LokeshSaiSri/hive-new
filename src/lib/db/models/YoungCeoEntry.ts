import mongoose, { Schema, model, models } from "mongoose";
import { ENTRY_STATUSES, PAYMENT_STATUSES } from "@/lib/young-ceo/constants";
import type { EntryStatus, PaymentStatus } from "@/lib/young-ceo/constants";

export interface IYoungCeoPayment {
  status: PaymentStatus;
  amount: number;
  currency: string;
  provider: string | null;
  reference: string | null;
  paidAt: Date | null;
  settlementUtr: string | null;
  history: { at: Date; status: string; source: string; reference?: string | null; eventId?: string | null }[];
}

export interface IYoungCeoEntry {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  school: string;
  age: number;
  pitchUrl: string;
  consent: boolean;
  status: EntryStatus;
  notes: string;
  payment: IYoungCeoPayment;
  ipHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IYoungCeoPayment>(
  {
    status: { type: String, enum: PAYMENT_STATUSES, default: "unpaid" },
    amount: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: "INR" },
    provider: { type: String, default: null },
    reference: { type: String, default: null },
    paidAt: { type: Date, default: null },
    settlementUtr: { type: String, default: null },
    history: {
      type: [
        {
          _id: false,
          at: { type: Date, default: Date.now },
          status: String,
          source: String,
          reference: { type: String, default: null },
          eventId: { type: String, default: null },
        },
      ],
      default: [],
    },
  },
  { _id: false },
);

const YoungCeoEntrySchema = new Schema<IYoungCeoEntry>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 200, unique: true },
    phone: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true, maxlength: 150 },
    age: { type: Number, required: true, min: 14, max: 22 },
    pitchUrl: { type: String, required: true, trim: true, maxlength: 500 },
    consent: { type: Boolean, required: true },
    status: { type: String, enum: ENTRY_STATUSES, default: "new", index: true },
    notes: { type: String, default: "", maxlength: 2000 },
    payment: { type: PaymentSchema, default: () => ({}) },
    ipHash: { type: String, default: "" }, // hashed IP, no raw PII
  },
  { timestamps: true, collection: "young_ceo_entries" },
);

YoungCeoEntrySchema.index({ createdAt: -1 });
YoungCeoEntrySchema.index({ "payment.status": 1 });

if (process.env.NODE_ENV !== "production" && models.YoungCeoEntry) {
  delete models.YoungCeoEntry;
}

export const YoungCeoEntry =
  models.YoungCeoEntry || model<IYoungCeoEntry>("YoungCeoEntry", YoungCeoEntrySchema);
