import { asset } from "@/lib/assets";
import { youtubeThumbnail } from "@/lib/youtube";

export type CampusTab = {
  id: string;
  label: string;
  image: string;
};

export const campusTabs: CampusTab[] = [
  {
    id: "campus-tour",
    label: "Campus Tour",
    image: asset("images/life/life-1.avif"),
  },
  {
    id: "pitch-arena",
    label: "Pitch Arena",
    image: asset("images/life/life-2.avif"),
  },
  {
    id: "brainstorm-arena",
    label: "Brainstorm Arena",
    image: asset("images/life/life-3.avif"),
  },
  {
    id: "meeting-pods",
    label: "Meeting Pods",
    image: asset("images/life/life-4.avif"),
  },
  {
    id: "common-area",
    label: "Common Area",
    image: asset("images/life/life-5.avif"),
  },
  {
    id: "gym",
    label: "Gym",
    image: asset("images/life/gym-hiveschool.jpg"),
  },
];

export const campusTourVideoId = "pNVzaRpfG14";
export const campusTourPoster = youtubeThumbnail(campusTourVideoId);
export const campusHeroImage = asset("images/misc/life-at-hive.webp");

export const campusVideoCaption =
  "Tour the pitch arena, brainstorm pods, and spaces where students present to founders and operators.";

export const campusDescription =
  "A purpose-built Gurugram campus designed for pitches, brainstorms, and operator-led sessions — the spaces where revenue skills are built in practice.";
