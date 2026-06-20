"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { youtubeThumbnail } from "@/lib/youtube";

type StoryTheatrePlayerProps = {
  videoId: string;
  name: string;
  onPlayingChange: (playing: boolean) => void;
};

const YT_PLAYING = 1;
const YT_BUFFERING = 3;

export function StoryTheatrePlayer({ videoId, name, onPlayingChange }: StoryTheatrePlayerProps) {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    setIsStarted(false);
    onPlayingChange(false);
  }, [videoId, onPlayingChange]);

  useEffect(() => {
    if (!isStarted) return;

    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://www.youtube.com") return;
      if (typeof event.data !== "string") return;

      try {
        const data = JSON.parse(event.data) as { event?: string; info?: number };
        if (data.event !== "onStateChange" || typeof data.info !== "number") return;

        const playing = data.info === YT_PLAYING || data.info === YT_BUFFERING;
        onPlayingChange(playing);
      } catch {
        // Ignore non-JSON YouTube messages.
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isStarted, onPlayingChange]);

  const handlePlay = useCallback(() => {
    setIsStarted(true);
    onPlayingChange(true);
  }, [onPlayingChange]);

  const embedOrigin =
    typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";

  return (
    <div className="program-story-theatre__player">
      {isStarted ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1&origin=${embedOrigin}`}
          title={`${name} — student story`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="program-story-theatre__player-iframe"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="program-story-theatre__player-poster group"
          aria-label={`Play ${name}'s story`}
        >
          <Image
            src={youtubeThumbnail(videoId)}
            alt={`${name} video thumbnail`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = youtubeThumbnail(videoId, "hqdefault");
            }}
          />
          <span className="program-story-theatre__player-scrim" aria-hidden />
          <span className="program-story-theatre__player-play" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-7 w-7">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
