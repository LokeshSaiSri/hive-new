import { Schema, model, models } from "mongoose";

// Payments Jodo reported that we could not tie to a registration. Kept so nothing is lost.
const YoungCeoUnmatchedPaymentSchema = new Schema(
  {
    eventId: { type: String, index: true },
    event: { type: Schema.Types.Mixed },
  },
  { timestamps: true, collection: "young_ceo_unmatched_payments" },
);

if (process.env.NODE_ENV !== "production" && models.YoungCeoUnmatchedPayment) {
  delete models.YoungCeoUnmatchedPayment;
}

export const YoungCeoUnmatchedPayment =
  models.YoungCeoUnmatchedPayment || model("YoungCeoUnmatchedPayment", YoungCeoUnmatchedPaymentSchema);
