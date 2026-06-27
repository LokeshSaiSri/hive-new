import { HUBSPOT_CONTACT_FIELDS } from "@/data/hubspot";
import type { HubSpotSubmissionField } from "@/lib/hubspot/submit";

export function splitFullName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstname: "", lastname: "" };
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

export function formatHubSpotPhone(phone: string): string {
  // The phone_number field in HubSpot is set as a 'Number' property,
  // so it CANNOT contain the '+' symbol, otherwise HubSpot rejects it.
  return phone.replace(/\D/g, "");
}

export function mapCourseApplicationFields(form: {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
}): HubSpotSubmissionField[] {
  const { firstname, lastname } = splitFullName(form.name);
  const formattedPhone = formatHubSpotPhone(form.phone);

  return [
    { name: HUBSPOT_CONTACT_FIELDS.firstName, value: firstname },
    { name: HUBSPOT_CONTACT_FIELDS.lastName, value: lastname },
    { name: HUBSPOT_CONTACT_FIELDS.email, value: form.email },
    { name: HUBSPOT_CONTACT_FIELDS.phone, value: formattedPhone },
    { name: "phone", value: formattedPhone },
    { name: HUBSPOT_CONTACT_FIELDS.linkedin, value: form.linkedin },
  ];
}

export function mapApplyFormFields(form: {
  fullName: string;
  email: string;
  phone: string;
  programme: string;
}): HubSpotSubmissionField[] {
  const { firstname, lastname } = splitFullName(form.fullName);
  const formattedPhone = formatHubSpotPhone(form.phone);

  return [
    { name: HUBSPOT_CONTACT_FIELDS.firstName, value: firstname },
    { name: HUBSPOT_CONTACT_FIELDS.lastName, value: lastname },
    { name: HUBSPOT_CONTACT_FIELDS.email, value: form.email },
    { name: HUBSPOT_CONTACT_FIELDS.phone, value: formattedPhone },
    { name: "phone", value: formattedPhone },
    { name: HUBSPOT_CONTACT_FIELDS.programmeOfInterest, value: form.programme },
  ];
}

export function mapPlacementReportFields(form: {
  fullName: string;
  email: string;
  phone: string;
  editionLabel: string;
}): HubSpotSubmissionField[] {
  const { firstname, lastname } = splitFullName(form.fullName);
  const formattedPhone = formatHubSpotPhone(form.phone);

  return [
    { name: HUBSPOT_CONTACT_FIELDS.firstName, value: firstname },
    { name: HUBSPOT_CONTACT_FIELDS.lastName, value: lastname },
    { name: HUBSPOT_CONTACT_FIELDS.email, value: form.email },
    { name: HUBSPOT_CONTACT_FIELDS.phone, value: formattedPhone },
    { name: "phone_number", value: formattedPhone },
    { name: "mobilephone", value: formattedPhone },
    {
      name: HUBSPOT_CONTACT_FIELDS.programmeOfInterest,
      value: `Placement Report — ${form.editionLabel}`,
    },
  ];
}

export function mapDocumentDownloadFields(form: {
  fullName: string;
  email: string;
  phone: string;
  documentLabel: string;
}): HubSpotSubmissionField[] {
  const { firstname, lastname } = splitFullName(form.fullName);
  const formattedPhone = formatHubSpotPhone(form.phone);

  return [
    { name: HUBSPOT_CONTACT_FIELDS.firstName, value: firstname },
    { name: HUBSPOT_CONTACT_FIELDS.lastName, value: lastname },
    { name: HUBSPOT_CONTACT_FIELDS.email, value: form.email },
    { name: HUBSPOT_CONTACT_FIELDS.phone, value: formattedPhone },
    { name: "phone_number", value: formattedPhone },
    { name: "mobilephone", value: formattedPhone },
    {
      name: HUBSPOT_CONTACT_FIELDS.programmeOfInterest,
      value: form.documentLabel,
    },
  ];
}
