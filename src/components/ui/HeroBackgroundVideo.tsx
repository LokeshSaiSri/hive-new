"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { asset, videoAsset } from "@/lib/assets";
import { extractYoutubeId, youtubePreviewEmbedUrl } from "@/lib/youtube";

const DEFAULT_VIDEO_SRC = videoAsset("videos/hero-campus.mp4");
const DEFAULT_POSTER_SRC = asset("images/misc/hero-campus-poster.jpg");
const YOUTUBE_READY_DELAY_MS = 2800;

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
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const isRemotePoster = posterSrc.startsWith("http");

  const youtubeId = activeSrc ? extractYoutubeId(activeSrc) : null;
  const isYouTube = Boolean(youtubeId);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVideoReady(false);
    setActiveSrc(null);

    let cancelled = false;
    let idleId: number | undefined;

    const activate = () => {
      if (!cancelled) setActiveSrc(videoSrc);
    };

    if (typeof requestIdleCallback === "function") {
      idleId = requestIdleCallback(activate, { timeout: 1200 });
    } else {
      idleId = window.setTimeout(activate, 400);
    }

    return () => {
      cancelled = true;
      if (typeof requestIdleCallback === "function" && idleId !== undefined) {
        cancelIdleCallback(idleId);
      } else if (idleId !== undefined) {
        window.clearTimeout(idleId);
      }
    };
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSrc || isYouTube) return;

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

    const readyFallback = window.setTimeout(markReady, 2000);

    return () => {
      mounted = false;
      window.clearTimeout(readyFallback);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("playing", markReady);
    };
  }, [activeSrc, isYouTube]);

  const markYoutubeReady = () => {
    window.setTimeout(() => setVideoReady(true), YOUTUBE_READY_DELAY_MS);
  };

  const wrapperClass =
    variant === "full"
      ? "hero-video-full absolute inset-0 overflow-hidden"
      : "hero-video-wedge absolute inset-0 overflow-hidden";

  return (
    <div className={wrapperClass}>
      {activeSrc && isYouTube && youtubeId && (
        <div className="hero-video absolute inset-0 z-[1] overflow-hidden" aria-hidden>
          <iframe
            key={activeSrc}
            className="pointer-events-none absolute left-1/2 top-1/2 select-none"
            style={{
              width: "100vw",
              height: "56.25vw",
              minHeight: "100vh",
              minWidth: "177.77vh",
              transform: "translate(-50%, -50%) scale(1.12)",
            }}
            src={youtubePreviewEmbedUrl(youtubeId)}
            allow="autoplay; encrypted-media"
            onLoad={markYoutubeReady}
            tabIndex={-1}
            title=""
          />
        </div>
      )}

      {activeSrc && !isYouTube && (
        <video
          key={activeSrc}
          ref={videoRef}
          className={`hero-video absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          disablePictureInPicture
          controls={false}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onPlay={() => setVideoReady(true)}
          aria-hidden
          tabIndex={-1}
        >
          <source src={activeSrc} type="video/mp4" />
        </video>
      )}

      <Image
        src={posterSrc}
        alt=""
        fill
        priority
        unoptimized={isRemotePoster}
        className={`absolute inset-0 z-[2] object-cover transition-opacity duration-700 ${
          videoReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
      />

      {variant === "wedge" && (
        <div className="hero-video-edge-fade pointer-events-none absolute inset-0 z-[3]" aria-hidden />
      )}
    </div>
  );
}
