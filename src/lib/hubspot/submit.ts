import { buildHubSpotSubmissionContext } from "@/lib/hubspot/context";

export type HubSpotSubmissionField = {
  name: string;
  value: string;
};

export type HubSpotSubmissionContext = {
  pageUri?: string;
  pageName?: string;
  hutk?: string;
  ipAddress?: string;
};

export type HubSpotSubmitResult = {
  redirectUri?: string;
};

export async function submitToHubSpot({
  portalId,
  formGuid,
  fields,
  context: contextInput,
}: {
  portalId: string;
  formGuid: string;
  fields: HubSpotSubmissionField[];
  context?: HubSpotSubmissionContext;
}): Promise<HubSpotSubmitResult> {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const context = buildHubSpotSubmissionContext(contextInput ?? {});

  const payload: {
    fields: { objectTypeId: string; name: string; value: string }[];
    context?: HubSpotSubmissionContext;
  } = {
    fields: fields
      .map((field) => ({ ...field, value: field.value.trim() }))
      .filter((field) => field.value.length > 0)
      .map((field) => ({
        objectTypeId: "0-1",
        name: field.name,
        value: field.value,
      })),
  };

  if (context) {
    payload.context = context;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`HubSpot submission failed (${response.status}): ${detail}`);
  }

  try {
    const data = (await response.json()) as { redirectUri?: string };
    return { redirectUri: data.redirectUri };
  } catch {
    return {};
  }
}
