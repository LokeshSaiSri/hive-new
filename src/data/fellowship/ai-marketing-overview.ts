import { aiMarketingCoursePage } from "@/data/coursePages/ai-marketing";
import { aiMarketingCurriculumTracks } from "@/data/coursePages/ai-marketing-tabs";
import { mentors } from "@/data/mentors";
import { asset } from "@/lib/assets";

export const fellowshipVisuals = {
  spreads: [
    {
      index: "01",
      title: "AI-native from week one",
      image: asset("images/tech/tech-stack-2.png"),
    },
    {
      index: "02",
      title: "Real campaigns. Real budgets.",
      image: asset("images/challenges/dohful.webp"),
    },
    {
      index: "03",
      title: "Hire — or build your own practice",
      image: asset("images/misc/life-at-hive.webp"),
    },
  ],
  pathPanels: [
    {
      index: "01",
      title: "Get hired",
      subtitle: "₹6–15 LPA marketing roles",
      image: asset("images/students/Ansh.webp"),
    },
    {
      index: "02",
      title: "Go independent",
      subtitle: "Agency · D2C · freelance",
      image: asset("images/why/present-to-founders.webp"),
    },
  ],
  trackImages: {
    brand: asset("images/challenges/fixmycurls.webp"),
    performance: asset("images/challenges/dohful.webp"),
    "ai-ops": asset("images/tech/tech-stack-1.png"),
    founder: asset("images/why/present-to-founders.webp"),
  } as Record<string, string>,
  capstoneImages: [
    asset("images/challenges/dohful.webp"),
    asset("images/challenges/fixmycurls.webp"),
    asset("images/challenges/peesafe.webp"),
    asset("images/challenges/culture-circle.webp"),
    asset("images/challenges/swiggy.webp"),
    asset("images/tech/tech-stack-1.png"),
    asset("images/why/break-down-business-models.webp"),
    asset("images/challenges/bbt.webp"),
    asset("images/challenges/linkedin.webp"),
    asset("images/tech/tech-stack-2.png"),
  ],
  galleryStrip: [
    asset("images/challenges/fixmycurls.webp"),
    asset("images/challenges/peesafe.webp"),
    asset("images/misc/life-at-hive.webp"),
    asset("images/students/Soham.webp"),
    asset("images/challenges/culture-circle.webp"),
    asset("images/why/ship-work.webp"),
    asset("images/students/Sanyu.webp"),
    asset("images/challenges/dohful.webp"),
  ],
  faqPortrait: asset("images/misc/life-at-hive.webp"),
};

export const fellowshipOverview = {
  hero: {
    ...aiMarketingCoursePage.hero,
    tagline: "October 2026 · Gurugram",
    description: "Six months on campus. Ten live capstones. One portfolio that gets you hired.",
  },
  spreads: fellowshipVisuals.spreads,
  stats: [
    { value: "06", label: "Months" },
    { value: "10", label: "Capstones" },
    { value: "4", label: "Tracks" },
    { value: "25+", label: "Sprints" },
  ],
  pathPanels: fellowshipVisuals.pathPanels,
  paths: aiMarketingCoursePage.paths!,
  tracks: aiMarketingCurriculumTracks.map((track) => ({
    ...track,
    image: fellowshipVisuals.trackImages[track.id] ?? asset("images/misc/life-at-hive.webp"),
  })),
  capstones: {
    ...aiMarketingCoursePage.capstones!,
    items: aiMarketingCoursePage.capstones!.items.map((item, i) => ({
      ...item,
      image: fellowshipVisuals.capstoneImages[i] ?? asset("images/misc/life-at-hive.webp"),
      shortTitle: item.title.split(" ").slice(0, 3).join(" "),
    })),
  },
  timeline: aiMarketingCoursePage.timeline!,
  galleryStrip: fellowshipVisuals.galleryStrip,
  fees: aiMarketingCoursePage.fees!,
  faqs: {
    ...aiMarketingCoursePage.faqs,
    items: aiMarketingCoursePage.faqs.items.slice(0, 4),
  },
  faqPortrait: fellowshipVisuals.faqPortrait,
  applicationForm: aiMarketingCoursePage.applicationForm!,
  mentors: mentors.filter((m) => m.category === "Marketing" || m.category === "GTM"),
};

export type FellowshipOverview = typeof fellowshipOverview;
