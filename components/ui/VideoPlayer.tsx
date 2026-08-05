"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteVideo } from "@/content/site";
import { useInViewport } from "@/hooks/useInViewport";
import { cn } from "@/lib/utils";

export type VideoPlayerProps = {
  video: SiteVideo;
  className?: string;
};

/**
 * Video con poster, `preload="none"` y reproducción siempre iniciada por el
 * usuario (nunca autoplay): si el contenedor sale del viewport se pausa,
 * pero no se reanuda solo por volver a estar visible — queda como el
 * usuario lo dejó. Extraído de `AboutUs.tsx` (comportamiento sin cambios)
 * para reutilizarlo también en el video de un perfil de desarrollador
 * (`components/profile/`) — ver design.md del change
 * `add-reusable-developer-profiles`, "Reuse the existing project card and
 * video patterns".
 */
export function VideoPlayer({ video, className }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isInViewport = useInViewport(containerRef);

  useEffect(() => {
    if (isInViewport) return;
    videoRef.current?.pause();
  }, [isInViewport]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-[#131314] shadow-2xl before:block before:pt-[56.25%]",
        className
      )}
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster.src}
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex cursor-pointer items-center justify-center transition-colors hover:bg-black/20"
          aria-label="Reproducir video"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-white/60 bg-transparent transition-transform hover:scale-105 hover:border-white sm:h-20 sm:w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1 h-6 w-6 sm:ml-1.5 sm:h-8 sm:w-8"
            >
              <path d="M6 4l15 8-15 8z" />
            </svg>
          </div>
        </button>
      )}

      {isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 block cursor-pointer"
          aria-label="Pausar video"
        />
      )}
    </div>
  );
}
