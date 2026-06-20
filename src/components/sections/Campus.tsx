import { CampusVideoHero } from "@/components/ui/CampusVideoHero";
import {
  campusDescription,
  campusTourPoster,
  campusTourVideoId,
} from "@/data/campus";

export function Campus() {
  return (
    <section id="campus">
      <CampusVideoHero
        videoId={campusTourVideoId}
        posterSrc={campusTourPoster}
        eyebrow="Offline Campus"
        statement="Experience"
        emphasis="Our Campus"
        description={campusDescription}
        fullScreen
      />
    </section>
  );
}
