/**
 * Comprehensive email validator used across all forms.
 *
 * Rules enforced (explicit, step-by-step — no single-regex approach):
 *  1. No spaces anywhere
 *  2. Exactly one "@" character
 *  3. Local part (before @) must be ≥ 1 character
 *  4. Local part cannot start or end with a dot
 *  5. Local part cannot contain consecutive dots
 *  6. Local part can only contain: a-z A-Z 0-9 . _ % + -
 *  7. Domain part (after @) must be present
 *  8. Domain must contain at least one dot
 *  9. Domain cannot start or end with a dot or hyphen
 * 10. Domain cannot contain consecutive dots
 * 11. Domain can only contain: a-z A-Z 0-9 . -
 * 12. TLD (last segment) must be ≥ 2 alphabetical characters only
 *
 * Examples:
 *  "@mail.com"          → false  (empty local part)
 *  "user@@domain.com"   → false  (multiple @)
 *  "user@domain"        → false  (no TLD)
 *  "user@domain.c"      → false  (TLD too short)
 *  "user@.com"          → false  (domain starts with dot)
 *  ".user@domain.com"   → false  (local starts with dot)
 *  "user.@domain.com"   → false  (local ends with dot)
 *  "user@domain..com"   → false  (consecutive dots)
 *  "user name@domain"   → false  (space)
 *  "user@domain.com"    → true
 *  "name+tag@co.in"     → true
 */
export function isValidEmail(raw: string): boolean {
  const email = raw.trim();

  // No spaces
  if (/\s/.test(email)) return false;

  // Exactly one "@"
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return false;
  if (email.indexOf("@", atIndex + 1) !== -1) return false;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  // ── Local part ──────────────────────────────────────────────────────────────
  if (local.length === 0) return false;
  if (local.startsWith(".") || local.endsWith(".")) return false;
  if (/\.\./.test(local)) return false;
  if (!/^[a-zA-Z0-9._%+\-]+$/.test(local)) return false;

  // ── Domain part ─────────────────────────────────────────────────────────────
  if (domain.length === 0) return false;
  if (!domain.includes(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  if (domain.startsWith("-") || domain.endsWith("-")) return false;
  if (/\.\./.test(domain)) return false;
  if (!/^[a-zA-Z0-9.\-]+$/.test(domain)) return false;

  // TLD must be ≥ 2 alpha-only characters
  const tld = domain.split(".").pop() ?? "";
  if (!/^[a-zA-Z]{2,}$/.test(tld)) return false;

  return true;
}
