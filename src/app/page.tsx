import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { PlacementStats } from "@/components/sections/PlacementStats";
import { HandsOnLearning } from "@/components/sections/HandsOnLearning";
import { WhyRevenue } from "@/components/sections/WhyRevenue";
import { Programmes } from "@/components/sections/Programmes";
import { CareerPath } from "@/components/sections/CareerPath";
import { Pedagogy } from "@/components/sections/Pedagogy";
import { LiveChallenges } from "@/components/sections/LiveChallenges";
import { Mentors } from "@/components/sections/Mentors";
import { Campus } from "@/components/sections/Campus";
import { StudentStories } from "@/components/sections/StudentStories";
import { PgpReels } from "@/components/sections/PgpReels";
import { NextSteps } from "@/components/sections/NextSteps";
import { FAQ } from "@/components/sections/FAQ";
import { ExploreSection } from "@/components/sections/ExploreSection";
import { HomeNewsSection } from "@/components/sections/HomeNewsSection";
import { Footer } from "@/components/sections/Footer";

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
        <Programmes />
        <CareerPath />
        <LiveChallenges />
        <Pedagogy />
        <Mentors />
        <StudentStories />
        <PgpReels />
        <NextSteps />
        <ExploreSection />
        <Campus />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
