import type { Metadata } from "next";
import { PgpRevampPage } from "@/components/pgp/PgpRevampPage";

/**
 * An unlisted copy of the revamped PGP page, for review.
 * Not linked from anywhere, not in the sitemap, and marked noindex.
 */
export const metadata: Metadata = {
  title: "PGP preview | HiveSchool",
  alternates: { canonical: "/pgp-preview" },
  robots: { index: false, follow: false, nocache: true },
};

export default function PgpPreviewPage() {
  return <PgpRevampPage />;
}
