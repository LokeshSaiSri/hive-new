import { HUBSPOT_CONTACT_FIELDS } from "@/data/hubspot";
import { splitFullName } from "@/lib/hubspot/fields";
import type { HubSpotSubmissionField } from "@/lib/hubspot/submit";

export function parseLeadFields(fields: HubSpotSubmissionField[]) {
  const map = new Map(fields.map((field) => [field.name, field.value.trim()]));

  const email = map.get(HUBSPOT_CONTACT_FIELDS.email);
  const phone = map.get(HUBSPOT_CONTACT_FIELDS.phone);
  const firstFromField = map.get(HUBSPOT_CONTACT_FIELDS.firstName);
  const lastFromField = map.get(HUBSPOT_CONTACT_FIELDS.lastName);
  const programme = map.get(HUBSPOT_CONTACT_FIELDS.programmeOfInterest);
  const city = map.get(HUBSPOT_CONTACT_FIELDS.city);

  let firstName = firstFromField;
  let lastName = lastFromField;

  if (firstFromField && !lastFromField) {
    const split = splitFullName(firstFromField);
    firstName = split.firstname;
    lastName = split.lastname;
  }

  return { email, phone, firstName, lastName, programme, city };
}
