import { PlacementsNewsGrid } from "@/components/program/ui/PlacementsNewsGrid";
import { pgpPlacementNews } from "@/data/coursePages/pgp-tabs";

export function HomeNewsSection() {
  return <PlacementsNewsGrid articles={pgpPlacementNews} className="pb-12 lg:pb-16 pt-0" />;
}
