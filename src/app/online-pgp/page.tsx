import type { Metadata } from "next";
import { ProgramPageLayout } from "@/components/program/ProgramPageLayout";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseApplicationForm } from "@/components/course/CourseApplicationForm";
import { ProgramSprintsStack } from "@/components/program/ui/ProgramSprintsStack";
import { CourseFees } from "@/components/course/CourseFees";
import { ProgramFaq } from "@/components/program/ProgramFaq";
import { ProgramPlacements } from "@/components/program/ProgramPlacements";
import { YoutubePhoneShowcase } from "@/components/ui/YoutubePhoneShowcase";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AdmissionsProcessDeck } from "@/components/program/ui/AdmissionsProcessDeck";
import { LaunchpadBootcampDeck } from "@/components/program/ui/LaunchpadBootcampDeck";
import { LaunchpadInsightsReels } from "@/components/program/ui/LaunchpadInsightsReels";
import { CampusVideoHero } from "@/components/ui/CampusVideoHero";
import { ProgramMentors } from "@/components/program/ProgramMentors";
import {
  onlinePgpCoursePage,
  launchpadBootcampPillars,
  launchpadAlumniQuotes,
  launchpadAlumniVideoIds,
  launchpadAlumniImages,
  launchpadAdmissionRounds,
  launchpadInsightVideos,
} from "@/data/coursePages/online-pgp";

export const metadata: Metadata = {
  title: onlinePgpCoursePage.meta.title,
  description: onlinePgpCoursePage.meta.description,
};

/** Build CohortStory[] from launchpadAlumniQuotes + their video / image maps */
function buildLaunchpadStories() {
  return launchpadAlumniQuotes.map((person) => ({
    name: person.name,
    role: person.role,
    company: person.company,
    quote: person.quote,
    image: launchpadAlumniImages[person.name] ?? launchpadAlumniImages["Abhik"]!,
    videoId: launchpadAlumniVideoIds[person.name] ?? undefined,
  }));
}

const launchpadStories = buildLaunchpadStories();

export default function OnlinePgpPage() {
  const { hero, sprints, timeline, fees, faqs, pillars, campusVideo } = onlinePgpCoursePage;
  void pillars; // pillars used in ProgramPlacements / ProofOfWorkStrip; available if needed

  return (
    <ProgramPageLayout slug="online-pgp" activeTab="overview" lead={<CourseHero hero={hero} />}>

      {/* ── 1. APPLY IN 60 SEC ─────────────────────────────────────────── */}
      <CourseApplicationForm
        courseSlug="online-pgp"
        title="Launchpad Application"
        headline="Online PGP application"
        metrics={hero.meta}
        showPlacementCharts={false}
      />

      {/* ── 2. PLACEMENTS — video + Career Trajectory chart ─────────────── */}
      <ProgramPlacements slug="online-pgp" />

      {/* ── 3. BOOTCAMP CAPSTONES — animated 2x2 grid ────────────────────── */}
      {pillars && (
        <LaunchpadBootcampDeck
          pillars={pillars.items}
          eyebrow={pillars.eyebrow}
          statement={pillars.statement}
          emphasis={pillars.emphasis}
          description={pillars.description}
        />
      )}

      {/* ── 4. CURRICULUM SPRINTS — animated stacked cards ───────────────── */}
      {sprints && (
        <section className="bg-ink pb-8 pt-8">
          <ProgramSprintsStack 
            panels={sprints}
            eyebrow="Sprints"
            title="Built for the Demands of B2B, SaaS, and Tech Sales"
          />
        </section>
      )}

      {/* ── 5. ALUMNI VOICES — YouTube Shorts Reels UI ────────────────── */}
      <section className="hive-dark-band reels-stage relative overflow-hidden bg-ink">
        <div className="reels-stage-glow pointer-events-none absolute inset-0" aria-hidden />

        <div className="section-container relative section-py">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Launchpad Alumni</SectionEyebrow>

            <h2 className="mt-5 text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[0.95] tracking-tight text-white">
              Hear Straight from <em className="font-serif font-medium not-italic text-accent">Our Alumni</em>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              Our alumni talk about their journey at HiveSchool and how they now contribute to building and growing the companies they work with.
            </p>
          </ScrollReveal>

          <div className="mt-12 sm:mt-16">
            <YoutubePhoneShowcase 
              reels={[
                { id: "MXyLVrW1XAg", caption: "Alumni Story 1" },
                { id: "Wi5F5VVUazE", caption: "Alumni Story 2" },
                { id: "2vGhE-M6YH4", caption: "Alumni Story 3" },
                { id: "PReaGlsMaM0", caption: "Alumni Story 4" },
              ]}
            />
          </div>
        </div>
      </section>
      {/* ── 6. BEHIND THE CHAOS — industry insights reels ────────────────── */}
      <LaunchpadInsightsReels videos={launchpadInsightVideos} />

      {/* ── 6.5. OFFLINE CAMPUS — bootcamp video ──────────────────────────── */}
      {campusVideo && (
        <section id="bootcamp-campus">
          <CampusVideoHero
            videoId={campusVideo.videoId}
            eyebrow={campusVideo.eyebrow}
            statement={campusVideo.statement}
            emphasis={campusVideo.emphasis}
            description={campusVideo.description}
            fullScreen={true}
          />
        </section>
      )}

      {/* ── 6.75. MENTORS ──────────────────────────────────────────────────── */}
      <ProgramMentors />

      {/* ── 7. ADMISSIONS — 3-stage step-through deck ────────────────────── */}
      <AdmissionsProcessDeck rounds={launchpadAdmissionRounds} />

      {/* ── 8. FEES & SCHOLARSHIPS ───────────────────────────────────────── */}
      {fees && <CourseFees fees={fees} />}

      {/* ── 9. FAQ THEATRE ───────────────────────────────────────────────── */}
      <ProgramFaq
        faqs={faqs}
        variant="theatre"
        applyHref="/online-pgp#apply"
      />

    </ProgramPageLayout>
  );
}


