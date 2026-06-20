import { asset } from "@/lib/assets";
import type { AlumniQuote } from "@/data/coursePages/pgp-tabs";
import type { Testimonial } from "@/data/testimonials";

export type CohortStory = {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  videoId?: string;
  companyLogo?: string;
};

const studentImageByName: Record<string, string> = {
  Deepanshu: asset("images/students/Deepanshu.webp"),
  Tanishq: asset("images/students/Tanishq.webp"),
  Harsh: asset("images/students/Harsh.webp"),
  Sanyu: asset("images/students/Sanyu.webp"),
  Soumya: asset("images/students/Saumya.webp"),
  Saumya: asset("images/students/Saumya.webp"),
  Hritik: asset("images/students/Hrithik.webp"),
  Hrithik: asset("images/students/Hrithik.webp"),
  "Om Mishra": asset("images/students/Om.webp"),
  Om: asset("images/students/Om.webp"),
  "Aryan Suri": asset("images/students/Aryan.webp"),
  Aryan: asset("images/students/Aryan.webp"),
  "Soham Chatterjee": asset("images/students/Soham.webp"),
  Soham: asset("images/students/Soham.webp"),
  "Abhinav Srivastava": asset("images/students/Abhinav.webp"),
  Abhinav: asset("images/students/Abhinav.webp"),
  "Ansh Agrawal": asset("images/students/Ansh.webp"),
  Ansh: asset("images/students/Ansh.webp"),
  Himanshu: asset("images/students/Himanshu.webp"),
};

function storyKey(name: string) {
  return name.trim().toLowerCase().split(/\s+/)[0];
}

const videoNameAliases: Record<string, string> = {
  hritik: "hrithik",
};

function resolveVideoStory(
  personName: string,
  videoByKey: Map<string, Testimonial>,
) {
  const key = storyKey(personName);
  const alias = videoNameAliases[key];
  return videoByKey.get(key) ?? (alias ? videoByKey.get(alias) : undefined);
}

export function buildCohortStories(
  alumni: AlumniQuote[],
  testimonials: Testimonial[],
): CohortStory[] {
  const videoByKey = new Map(
    testimonials.map((story) => [storyKey(story.name), story]),
  );
  const matchedVideoKeys = new Set<string>();

  const fromAlumni = alumni.map((person) => {
    const videoStory = resolveVideoStory(person.name, videoByKey);
    if (videoStory) {
      matchedVideoKeys.add(storyKey(videoStory.name));
    }

    const key = storyKey(person.name);

    return {
      name: person.name,
      role: person.role,
      company: person.company,
      quote: person.quote,
      image:
        videoStory?.image ??
        studentImageByName[person.name] ??
        studentImageByName[key] ??
        asset("images/students/Krish.webp"),
      videoId: videoStory?.videoId,
      companyLogo: videoStory?.companyLogo,
    };
  });

  const fromVideos = testimonials
    .filter((story) => !matchedVideoKeys.has(storyKey(story.name)))
    .map((story) => ({
      name: story.name,
      role: story.role,
      company: story.company,
      quote: `Hear how ${story.name.split(" ")[0]} moved into ${story.role.toLowerCase()} at ${story.company} after HiveSchool.`,
      image: story.image,
      videoId: story.videoId,
      companyLogo: story.companyLogo,
    }));

  return [...fromAlumni, ...fromVideos].sort((a, b) => {
    const aHasVideo = a.videoId ? 0 : 1;
    const bHasVideo = b.videoId ? 0 : 1;
    return aHasVideo - bHasVideo;
  });
}
