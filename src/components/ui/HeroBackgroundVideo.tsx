"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/assets";

const HERO_VIDEO_SRC = asset("videos/hero-campus.mp4");
const HERO_POSTER_SRC = asset("images/misc/hero-campus-poster.jpg");

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let mounted = true;

    const tryPlay = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const markReady = () => {
      if (!mounted) return;
      setVideoReady(true);
    };

    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("playing", markReady);
    tryPlay();

    const readyFallback = window.setTimeout(markReady, 1600);

    return () => {
      mounted = false;
      window.clearTimeout(readyFallback);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("playing", markReady);
    };
  }, []);

  return (
    <div className="hero-video-wedge absolute inset-0 overflow-hidden">
      <Image
        src={HERO_POSTER_SRC}
        alt=""
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
      />

      <video
        ref={videoRef}
        className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER_SRC}
        disablePictureInPicture
        controls={false}
        onCanPlay={() => setVideoReady(true)}
        onLoadedData={() => setVideoReady(true)}
        onPlay={() => setVideoReady(true)}
        aria-hidden
        tabIndex={-1}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="hero-video-edge-fade pointer-events-none absolute inset-0 z-[2]" aria-hidden />
    </div>
  );
}
