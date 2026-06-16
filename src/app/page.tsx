import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { AdmissionsForm } from "@/components/sections/AdmissionsForm";
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
import { CareerOutcomes } from "@/components/sections/CareerOutcomes";
import { NextSteps } from "@/components/sections/NextSteps";
import { FAQ } from "@/components/sections/FAQ";
import { ExploreSection } from "@/components/sections/ExploreSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AdmissionsForm />
        <PlacementStats />
        <HandsOnLearning />
        <WhyRevenue />
        <Programmes />
        <CareerPath />
        <LiveChallenges />
        <Pedagogy />
        <Mentors />
        <Campus />
        <StudentStories />
        <CareerOutcomes />
        <NextSteps />
        <ExploreSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
