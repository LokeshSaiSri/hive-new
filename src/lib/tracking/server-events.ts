import { sendGa4LeadEvent } from "@/lib/tracking/ga4-measurement";
import { sendMetaLeadEvent } from "@/lib/tracking/meta-capi";
import { parseLeadFields } from "@/lib/tracking/parse-lead-fields";
import type { HubSpotSubmissionField } from "@/lib/hubspot/submit";
import type { LeadTrackingContext } from "@/lib/tracking/types";
import type { ProgramSlug } from "@/data/programPages/types";

type TrackLeadConversionInput = {
  course: ProgramSlug;
  fields: HubSpotSubmissionField[];
  tracking?: LeadTrackingContext;
  pageUri?: string;
  pageName?: string;
  ipAddress?: string;
};

/** Fire server-side conversion events. Failures are logged, never thrown to the client. */
export async function trackLeadConversion(input: TrackLeadConversionInput): Promise<void> {
  if (!input.tracking?.eventId) return;

  const lead = parseLeadFields(input.fields);

  const payload = {
    eventId: input.tracking.eventId,
    fbc: input.tracking.fbc,
    fbp: input.tracking.fbp,
    userAgent: input.tracking.userAgent,
    course: input.course,
    email: lead.email,
    phone: lead.phone,
    firstName: lead.firstName,
    lastName: lead.lastName,
    programme: lead.programme,
    city: lead.city,
    pageUri: input.pageUri,
    pageName: input.pageName,
    ipAddress: input.ipAddress,
  };

  const results = await Promise.allSettled([
    sendMetaLeadEvent(payload),
    sendGa4LeadEvent(payload),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Lead conversion tracking failed:", result.reason);
    }
  }
}
