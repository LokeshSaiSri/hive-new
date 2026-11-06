// Shared by the browser form and the API route, so both apply the same rules.

export type EntryInput = {
  name: string;
  email: string;
  phone: string;
  school: string;
  age: number;
  pitchUrl: string;
  consent: true;
};

export type EntryFieldErrors = Partial<Record<keyof EntryInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns a clean 10-digit Indian mobile number, or null. Accepts +91 / 91 / 0 prefixes. */
export function normalisePhone(raw: unknown): string | null {
  let p = String(raw ?? "").replace(/[\s\-()]/g, "");
  if (p.startsWith("+91")) p = p.slice(3);
  else if (p.startsWith("91") && p.length === 12) p = p.slice(2);
  else if (p.startsWith("0")) p = p.slice(1);
  return /^[6-9]\d{9}$/.test(p) ? p : null;
}

export function normaliseUrl(raw: unknown): string | null {
  try {
    const u = new URL(String(raw ?? "").trim());
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export function validateEntry(
  input: Record<string, unknown>,
): { ok: true; value: EntryInput } | { ok: false; fields: EntryFieldErrors } {
  const fields: EntryFieldErrors = {};

  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim().toLowerCase();
  const phone = normalisePhone(input.phone);
  const school = String(input.school ?? "").trim();
  const age = Number.parseInt(String(input.age ?? ""), 10);
  const pitchUrl = normaliseUrl(input.pitchUrl);

  if (name.length < 2 || name.length > 100) fields.name = "Enter your full name.";
  if (!EMAIL_RE.test(email) || email.length > 200) fields.email = "Enter a valid email address.";
  if (!phone) fields.phone = "Enter a valid 10-digit Indian mobile number.";
  if (school.length < 2 || school.length > 150) fields.school = "Enter your school name.";
  if (!Number.isInteger(age) || age < 14 || age > 22) fields.age = "Enter your age (14 to 22).";
  if (!pitchUrl || pitchUrl.length > 500) fields.pitchUrl = "Enter a valid link starting with https://";
  if (input.consent !== true) fields.consent = "Please confirm to continue.";

  if (Object.keys(fields).length) return { ok: false, fields };
  return {
    ok: true,
    value: { name, email, phone: phone!, school, age, pitchUrl: pitchUrl!, consent: true },
  };
}
