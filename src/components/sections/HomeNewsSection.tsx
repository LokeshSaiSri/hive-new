import { PlacementsNewsGrid } from "@/components/program/ui/PlacementsNewsGrid";
import { pgpPlacementNews } from "@/data/coursePages/pgp-tabs";

export function HomeNewsSection() {
  return (
    <PlacementsNewsGrid
      articles={pgpPlacementNews}
      className="pb-12 lg:pb-16"
      description="Press on the cohort, the placements, and the operators coming out of Gurugram."
    />
  );
}
