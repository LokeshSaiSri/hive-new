import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-dev-secret";
const COOKIE_NAME = "hive_admin_token";
const EXPIRY = "24h";

export type AdminTokenPayload = {
  role: "admin";
  iat: number;
  exp: number;
};

export function signAdminToken(): string {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: EXPIRY });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function getAdminTokenFromCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminTokenFromCookie();
  if (!token) return false;
  return verifyAdminToken(token) !== null;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

export function buildAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  };
}
