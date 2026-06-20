import { PlacementsNewsGrid } from "@/components/program/ui/PlacementsNewsGrid";
import { pgpPlacementNews } from "@/data/coursePages/pgp-tabs";

export function HomeNewsSection() {
  return <PlacementsNewsGrid articles={pgpPlacementNews} compact />;
}
