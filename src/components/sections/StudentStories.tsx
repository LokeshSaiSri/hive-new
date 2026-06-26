"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { HeroStudentCollage } from "@/components/ui/HeroStudentCollage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useVideo } from "@/components/providers/VideoProvider";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { easeHive } from "@/lib/motion";
import { youtubePreviewEmbedUrl, youtubeThumbnail } from "@/lib/youtube";

function StoryPreviewPanel({ story }: { story: Testimonial }) {
  const { openVideo } = useVideo();
  const [posterQuality, setPosterQuality] = useState<"maxresdefault" | "hqdefault">("maxresdefault");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: easeHive }}
      className="student-story-preview h-full"
    >
      <div className="student-story-preview__player">
        {story.videoId ? (
          <>
            <Image
              src={youtubeThumbnail(story.videoId, posterQuality)}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 720px"
              onError={() => {
                if (posterQuality !== "hqdefault") setPosterQuality("hqdefault");
              }}
            />
            <iframe
              src={youtubePreviewEmbedUrl(story.videoId)}
              title={`${story.name} preview`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="student-story-preview__iframe pointer-events-none absolute inset-0 h-full w-full border-0"
            />
          </>
        ) : (
          <Image
            src={story.image}
            alt={`${story.name} at ${story.company}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
        )}
        <span className="student-story-preview__scrim pointer-events-none absolute inset-0" aria-hidden />
        <span className="pointer-events-none absolute bottom-4 left-4 right-4 text-left sm:bottom-5">
          <span className="block text-lg font-bold text-white sm:text-xl">{story.name}</span>
          <span className="mt-1 block text-sm text-white/75">
            {story.role} @ {story.company}
          </span>
        </span>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3">
        {story.companyLogo ? (
          <span className="flex h-10 max-w-[112px] items-center justify-center rounded-full bg-white px-3">
            <Image
              src={story.companyLogo}
              alt={story.company}
              width={88}
              height={28}
              className="h-5 w-auto object-contain"
            />
          </span>
        ) : (
          <span className="text-sm text-white/55">Muted preview playing</span>
        )}

        {story.videoId ? (
          <button
            type="button"
            onClick={() => openVideo(story.videoId!)}
            className="student-story-preview__sound-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch full video
          </button>
        ) : (
          <span className="student-story-preview__sound-btn text-white/40 cursor-not-allowed">
            Reading profile...
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function StudentStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex] ?? testimonials[0];

  return (
    <section className="section-band-dark overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            light={false}
            eyebrow="Testimonials"
            statement="Hear it from"
            emphasis="our students."
            description="Student stories rotate on the left — muted preview on the right. Open the full story when you're ready."
          />
        </ScrollReveal>

        <div className="student-stories-stage mt-10 sm:mt-12">
          <HeroStudentCollage
            students={testimonials}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
            previewMode
            className="student-stories-collage"
          />

          <div className="student-stories-player">
            <div className="premium-frame-dark h-full">
              <div className="premium-surface-dark premium-metallic-edge h-full overflow-hidden rounded-[calc(1.5rem-1px)] p-4 sm:p-5 lg:p-6">
                <AnimatePresence mode="wait" initial={false}>
                  <StoryPreviewPanel key={active.videoId} story={active} />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
