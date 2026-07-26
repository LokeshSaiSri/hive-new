"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/**
 * Hidden admin entry: Ctrl/Cmd + Shift + H
 * Unlocks the login page for a few minutes, then navigates there.
 */
export function AdminShortcut() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't attach on admin pages themselves
    if (pathname?.startsWith("/hive-control-hub")) return;

    async function onKeyDown(e: KeyboardEvent) {
      const isChord =
        (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "h";
      if (!isChord) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      e.preventDefault();

      try {
        await fetch("/api/admin/unlock", { method: "POST" });
      } catch {
        // Still try to navigate — middleware will 404 if unlock failed
      }
      router.push("/hive-control-hub/login");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname, router]);

  return null;
}
