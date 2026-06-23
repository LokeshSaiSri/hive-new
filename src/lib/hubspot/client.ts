"use client";

import type { ProgramSlug } from "@/data/programPages/types";
import type { HubSpotSubmissionField } from "@/lib/hubspot/submit";

function getHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

export async function submitHubSpotForm(
  course: ProgramSlug,
  fields: HubSpotSubmissionField[],
): Promise<void> {
  const response = await fetch("/api/forms/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      course,
      fields,
      pageUri: window.location.href,
      pageName: document.title,
      hutk: getHubspotUtk(),
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
}
