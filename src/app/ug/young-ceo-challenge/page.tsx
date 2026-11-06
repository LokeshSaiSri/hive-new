import type { Metadata } from "next";
import { YoungCeoPage } from "@/components/young-ceo/YoungCeoPage";
import { youngCeoMeta } from "@/data/youngCeo";
import { YOUNG_CEO_PATH } from "@/lib/young-ceo/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: youngCeoMeta.title,
  description: youngCeoMeta.description,
  path: YOUNG_CEO_PATH,
});

export default function YoungCeoChallengePage() {
  return <YoungCeoPage />;
}
