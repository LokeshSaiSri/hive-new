"use client";

import type { ProgramSlug } from "@/data/programPages/types";
import { HUBSPOT_CONTACT_FIELDS } from "@/data/hubspot";
import type { HubSpotSubmissionField } from "@/lib/hubspot/submit";
import {
  createLeadEventId,
  getMetaFbc,
  getMetaFbp,
  pushGoogleLeadEvent,
} from "@/lib/tracking/client";
import { parseLeadFields } from "@/lib/tracking/parse-lead-fields";

declare global {
  interface Window {
    HiveTrack?: {
      getSessionId: () => string;
      bindForm: (form: HTMLFormElement) => void;
      trackPageview: () => void;
      flush: () => void;
    };
  }
}

function getHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

function getHiveSessionId(): string | undefined {
  const fromTracker = window.HiveTrack?.getSessionId();
  if (fromTracker) return fromTracker;

  const input = document.querySelector<HTMLInputElement>('input[name="session_id"]');
  if (input?.value) return input.value;

  const match = document.cookie.match(/(?:^|;\s*)hs_session_id=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

type DualWriteResponse = {
  ok?: boolean;
  thankYouUrl?: string;
  eventId?: string;
  error?: string;
  crm?: { ok?: boolean; error?: string };
  hubspot?: { ok?: boolean; error?: string };
};

export async function submitLeadForm(
  course: ProgramSlug,
  fields: HubSpotSubmissionField[],
): Promise<string> {
  const eventId = createLeadEventId();
  const lead = parseLeadFields(fields);
  const fieldMap = new Map(fields.map((field) => [field.name, field.value.trim()]));
  const sessionId = getHiveSessionId();

  const response = await fetch("/api/admissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      course,
      fields,
      name: [lead.firstName, lead.lastName].filter(Boolean).join(" "),
      phone: lead.phone,
      email: lead.email ?? null,
      course_id: null,
      cohort_id: null,
      source: "website",
      linkedin: fieldMap.get(HUBSPOT_CONTACT_FIELDS.linkedin) || null,
      years_experience: null,
      preferred_industry: null,
      intent_score: null,
      session_id: sessionId ?? null,
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

  const data = (await response.json()) as DualWriteResponse;

  if (!response.ok || !data.ok) {
    if (data.crm && !data.crm.ok) {
      console.error("CRM admissions submission failed:", data.crm.error);
    }
    if (data.hubspot && !data.hubspot.ok) {
      console.error("HubSpot admissions submission failed:", data.hubspot.error);
    }
    throw new Error(data.error ?? "Could not submit application. Please try again.");
  }

  if (data.crm && !data.crm.ok) {
    console.error("CRM admissions submission failed:", data.crm.error);
  }
  if (data.hubspot && !data.hubspot.ok) {
    console.error("HubSpot admissions submission failed:", data.hubspot.error);
  }

  pushGoogleLeadEvent({
    eventId: data.eventId ?? eventId,
    course,
    email: lead.email,
    phone: lead.phone,
    programme: lead.programme,
    city: lead.city,
  });

  return (
    data.thankYouUrl ??
    `/pgp-revenue-tech-entrepreneurship-form-submitted?submissionGuid=${encodeURIComponent(
      data.eventId ?? eventId,
    )}`
  );
}
