import type { ProgramSlug } from "@/data/programPages/types";

export type LeadTrackingContext = {
  eventId: string;
  fbc?: string;
  fbp?: string;
  userAgent?: string;
};

export type LeadTrackingPayload = LeadTrackingContext & {
  course: ProgramSlug;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  programme?: string;
  city?: string;
  pageUri?: string;
  pageName?: string;
  ipAddress?: string;
};

export type GoogleLeadEvent = {
  eventId: string;
  course: ProgramSlug;
  email?: string;
  phone?: string;
  programme?: string;
  city?: string;
};
