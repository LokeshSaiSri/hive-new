import { CampusVideoHero } from "@/components/ui/CampusVideoHero";
import {
  campusDescription,
  campusTourPoster,
  campusTourVideoId,
} from "@/data/campus";

export function ProgramCampus({ className }: { className?: string } = {}) {
  return (
    <section id="campus" className={className}>
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
