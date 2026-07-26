import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, buildAdminCookieOptions } from "@/lib/admin/auth";

const UNLOCK_COOKIE = "hive_admin_unlock";

/**
 * Unlocks the admin login page for a short window.
 * Also clears any existing admin session so the password form is always required.
 */
export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(UNLOCK_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  // Force re-auth every time the shortcut is used
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...buildAdminCookieOptions(),
    maxAge: 0,
  });

  return response;
}

export { UNLOCK_COOKIE as ADMIN_UNLOCK_COOKIE };
