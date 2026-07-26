import { NextResponse } from "next/server";

const UNLOCK_COOKIE = "hive_admin_unlock";

/** Sets a short-lived cookie so the admin login page becomes reachable. */
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(UNLOCK_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });
  return response;
}

export { UNLOCK_COOKIE as ADMIN_UNLOCK_COOKIE };
