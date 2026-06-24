"use client";

import type { ProgramSlug } from "@/data/programPages/types";
import type { HubSpotSubmissionField } from "@/lib/hubspot/submit";
import {
  createLeadEventId,
  getMetaFbc,
  getMetaFbp,
  pushGoogleLeadEvent,
} from "@/lib/tracking/client";
import { parseLeadFields } from "@/lib/tracking/parse-lead-fields";

function getHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export async function submitLeadForm(
  course: ProgramSlug,
  fields: HubSpotSubmissionField[],
): Promise<void> {
  const eventId = createLeadEventId();
  const lead = parseLeadFields(fields);

  const response = await fetch("/api/forms/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      course,
      fields,
      pageUri: window.location.href,
      pageName: document.title,
      hutk: getHubspotUtk(),
      tracking: {
        eventId,
        fbc: getMetaFbc(),
        fbp: getMetaFbp(),
        userAgent: navigator.userAgent,
      },
    }),
  });

  if (!response.ok) {
    let message = "Could not submit application. Please try again.";
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // Keep default message.
    }
    throw new Error(message);
  }

  pushGoogleLeadEvent({
    eventId,
    course,
    email: lead.email,
    phone: lead.phone,
    programme: lead.programme,
    city: lead.city,
  });
}
