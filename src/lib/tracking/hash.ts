import { createHash } from "crypto";

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Meta / Google — lowercase, trim email before hashing. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Meta phone hashing — digits only, with country code.
 * Defaults Indian numbers (10 digits) to +91.
 */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `91${digits.slice(1)}`;
  return digits;
}

export function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z]/g, "");
}

export function hashEmail(email: string): string | undefined {
  const normalized = normalizeEmail(email);
  return normalized ? sha256(normalized) : undefined;
}

export function hashPhone(phone: string): string | undefined {
  const normalized = normalizePhone(phone);
  return normalized ? sha256(normalized) : undefined;
}

export function hashName(name: string): string | undefined {
  const normalized = normalizeName(name);
  return normalized ? sha256(normalized) : undefined;
}
