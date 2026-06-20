"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/assets";

const DEFAULT_VIDEO_SRC = asset("videos/hero-campus.mp4");
const DEFAULT_POSTER_SRC = asset("images/misc/hero-campus-poster.jpg");

type HeroBackgroundVideoProps = {
  videoSrc?: string;
  posterSrc?: string;
  variant?: "wedge" | "full";
};

export function HeroBackgroundVideo({
  videoSrc = DEFAULT_VIDEO_SRC,
  posterSrc = DEFAULT_POSTER_SRC,
  variant = "wedge",
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const isRemotePoster = posterSrc.startsWith("http");

  useEffect(() => {
    setVideoReady(false);
  }, [videoSrc]);

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
  }, [videoSrc]);

  const wrapperClass =
    variant === "full"
      ? "hero-video-full absolute inset-0 overflow-hidden"
      : "hero-video-wedge absolute inset-0 overflow-hidden";

  return (
    <div className={wrapperClass}>
      <Image
        src={posterSrc}
        alt=""
        fill
        priority
        unoptimized={isRemotePoster}
        className={`object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
      />

      <video
        key={videoSrc}
        ref={videoRef}
        className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        disablePictureInPicture
        controls={false}
        onCanPlay={() => setVideoReady(true)}
        onLoadedData={() => setVideoReady(true)}
        onPlay={() => setVideoReady(true)}
        aria-hidden
        tabIndex={-1}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {variant === "wedge" && (
        <div className="hero-video-edge-fade pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      )}
    </div>
  );
}
