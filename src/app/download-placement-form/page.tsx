import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PlacementReportDownloadForm } from "@/components/forms/PlacementReportDownloadForm";
import { getPlacementReportEdition } from "@/data/placementReportAccess";
import { placementReportEditions } from "@/data/placementReports";

export const metadata: Metadata = {
  title: "Download placement report — HiveSchool",
  description: "Request the HiveSchool placement report PDF.",
};

type DownloadPlacementFormPageProps = {
  searchParams: Promise<{ edition?: string }>;
};

export default async function DownloadPlacementFormPage({
  searchParams,
}: DownloadPlacementFormPageProps) {
  const params = await searchParams;
  const edition = getPlacementReportEdition(params.edition) ?? placementReportEditions[0];

  return (
    <>
      <Nav />
      <main className="hive-dark-band min-h-[80svh]">
        <div className="section-container section-py">
          <PlacementReportDownloadForm edition={edition} />
        </div>
      </main>
      <Footer />
    </>
  );
}
