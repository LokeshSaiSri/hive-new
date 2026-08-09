export type SubmitTarget = "both" | "crm" | "hubspot";

/** One-line cutover: SUBMIT_TARGETS=both|crm|hubspot (default both). */
export function getSubmitTargets(): SubmitTarget {
  const raw = process.env.SUBMIT_TARGETS?.trim().toLowerCase();
  if (raw === "crm" || raw === "hubspot" || raw === "both") return raw;
  return "both";
}

export function shouldSubmitToCrm(target = getSubmitTargets()): boolean {
  return target === "both" || target === "crm";
}

export function shouldSubmitToHubSpot(target = getSubmitTargets()): boolean {
  return target === "both" || target === "hubspot";
}
