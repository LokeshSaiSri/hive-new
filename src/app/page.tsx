import dynamic from "next/dynamic";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { PlacementStats } from "@/components/sections/PlacementStats";

function SectionFallback({ minHeight = "min-h-[28vh]" }: { minHeight?: string }) {
  return <div className={minHeight} aria-hidden />;
}

const HomeNewsSection = dynamic(
  () => import("@/components/sections/HomeNewsSection").then((m) => m.HomeNewsSection),
  { loading: () => <SectionFallback /> },
);
const HandsOnLearning = dynamic(
  () => import("@/components/sections/HandsOnLearning").then((m) => m.HandsOnLearning),
  { loading: () => <SectionFallback /> },
);
const WhyRevenue = dynamic(
  () => import("@/components/sections/WhyRevenue").then((m) => m.WhyRevenue),
  { loading: () => <SectionFallback /> },
);
const Programmes = dynamic(
  () => import("@/components/sections/Programmes").then((m) => m.Programmes),
  { loading: () => <SectionFallback minHeight="min-h-[50vh]" /> },
);
const CareerPath = dynamic(
  () => import("@/components/sections/CareerPath").then((m) => m.CareerPath),
  { loading: () => <SectionFallback /> },
);
const LiveChallenges = dynamic(
  () => import("@/components/sections/LiveChallenges").then((m) => m.LiveChallenges),
  { loading: () => <SectionFallback /> },
);
const Pedagogy = dynamic(
  () => import("@/components/sections/Pedagogy").then((m) => m.Pedagogy),
  { loading: () => <SectionFallback minHeight="min-h-[60vh]" /> },
);
const Mentors = dynamic(
  () => import("@/components/sections/Mentors").then((m) => m.Mentors),
  { loading: () => <SectionFallback minHeight="min-h-[50vh]" /> },
);
const StudentStories = dynamic(
  () => import("@/components/sections/StudentStories").then((m) => m.StudentStories),
  { loading: () => <SectionFallback /> },
);
const PgpReels = dynamic(
  () => import("@/components/sections/PgpReels").then((m) => m.PgpReels),
  { loading: () => <SectionFallback minHeight="min-h-[70vh]" /> },
);
const NextSteps = dynamic(
  () => import("@/components/sections/NextSteps").then((m) => m.NextSteps),
  { loading: () => <SectionFallback /> },
);
const ExploreSection = dynamic(
  () => import("@/components/sections/ExploreSection").then((m) => m.ExploreSection),
  { loading: () => <SectionFallback /> },
);
const Campus = dynamic(
  () => import("@/components/sections/Campus").then((m) => m.Campus),
  { loading: () => <SectionFallback minHeight="min-h-[50vh]" /> },
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQ),
  { loading: () => <SectionFallback /> },
);
const Footer = dynamic(
  () => import("@/components/sections/Footer").then((m) => m.Footer),
  { loading: () => <SectionFallback minHeight="min-h-[24vh]" /> },
);

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PlacementStats />
        <HomeNewsSection />
        <HandsOnLearning />
        <WhyRevenue />
        <Programmes className="pt-0" />
        <CareerPath />
        <LiveChallenges />
        <Pedagogy className="pt-0" />
        <Mentors />
        <StudentStories />
        <PgpReels className="pt-0" />
        <NextSteps className="pt-0" />
        <ExploreSection className="pt-0" />
        <Campus />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
