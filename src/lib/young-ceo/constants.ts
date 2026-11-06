// Client-safe constants for the Young CEO Challenge (no server imports).

export const ENTRY_STATUSES = ["new", "reviewing", "shortlisted", "finalist", "rejected"] as const;
export type EntryStatus = (typeof ENTRY_STATUSES)[number];

export const PAYMENT_STATUSES = ["unpaid", "pending", "paid", "failed", "refunded"] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const YOUNG_CEO_PATH = "/ug/young-ceo-challenge";
