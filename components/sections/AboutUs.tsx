"use client";

import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { useInViewport } from "@/hooks/useInViewport";

const { heading, video, cta } = siteContent.about;

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isInViewport = useInViewport(containerRef);

  // Reproducción siempre iniciada por el usuario: si sale del viewport se
  // pausa, pero no se reanuda solo por volver a verse — queda como el
  // usuario la dejó.
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
    <section className="bg-background px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
        <h2 className="mb-12 text-center font-display text-[clamp(28px,4vw,36px)] font-light tracking-tight text-white sm:mb-16">
          {heading}
        </h2>

        {/* Contenedor del Video (16:9 Aspect Ratio) */}
        <div
          ref={containerRef}
          className="relative mb-12 w-full max-w-[800px] overflow-hidden rounded-2xl bg-[#131314] shadow-2xl before:block before:pt-[56.25%] sm:mb-16"
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

          {/* Botón de Play Overlay */}
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

          {/* Si está reproduciendo, permitimos pausar al hacer click en el video */}
          {isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 block cursor-pointer"
              aria-label="Pausar video"
            />
          )}
        </div>

        {/* CTA */}
        <Button href={cta.href} variant="primary">
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
