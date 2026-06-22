import type { Metadata } from "next";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — HiveSchool",
  description: "How HiveSchool collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <SitePageLayout>
      <LegalDocument document={privacyPolicy} />
    </SitePageLayout>
  );
}
