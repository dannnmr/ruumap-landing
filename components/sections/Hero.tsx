"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { siteContent } from "@/content/site";
import { useTextReveal } from "@/hooks/useTextReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useInViewport } from "@/hooks/useInViewport";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { track } from "@/lib/analytics/track";

const { eyebrow, titleLines, subcopy, primaryCta, secondaryCta, video } =
  siteContent.hero;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useTextReveal({ scopeRef: sectionRef, lineRefs, introRef });

  const prefersReducedMotion = usePrefersReducedMotion();
  const isInViewport = useInViewport(sectionRef);

  // Con prefers-reduced-motion no se monta el <video> en absoluto (ver abajo),
  // así que este efecto no tiene nada que hacer en ese caso. Cuando sí está
  // montado, el propio autoplay lo arranca de entrada; este efecto se encarga
  // de pausarlo/reanudarlo según entra o sale del viewport.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || prefersReducedMotion) return;

    if (isInViewport) {
      videoEl.play().catch(() => {
        // El navegador puede rechazar el play() (política de autoplay); no es
        // crítico, el poster ya cubre ese estado.
      });
    } else {
      videoEl.pause();
    }
  }, [isInViewport, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative flex h-screen min-h-150 items-center justify-center overflow-hidden bg-background"
    >
      {/* Fondo: video ambiental, o imagen estática si el usuario prefiere menos movimiento */}
      <div className="absolute inset-0">
        {prefersReducedMotion ? (
          <Image
            src={video.poster.src}
            alt={video.poster.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={video.poster.src}
            className="h-full w-full object-cover"
          >
            <source src={video.src} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Overlays */}
      {/* Capa 1: Filtro uniforme #000000 al 30% de opacidad */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      {/* Capa 2: Gradiente Linear (75% opacidad): 10% negro abajo -> 50% transparente hacia arriba */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.75) 10%, rgba(0, 0, 0, 0) 50%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-328 px-5 text-center sm:px-10 lg:px-16">
        <Eyebrow className="mb-6 text-white/70 drop-shadow-none">{eyebrow}</Eyebrow>

        <h1
          className="mb-7 font-display font-light leading-[1.05] tracking-tight text-white
                     text-[clamp(42px,7vw,64px)]"
        >
          {titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="block will-change-transform"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div ref={introRef}>
          <p className="mb-9 mx-auto max-w-167.5 font-sans text-base font-light leading-relaxed text-white/80 sm:text-base">
            {subcopy}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href={primaryCta.href}
              variant="primary"
              className="rounded-[10px] px-8 py-3.5"
              onClick={() =>
                track({ name: "cta_click", label: primaryCta.label, target: primaryCta.href })
              }
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              className="rounded-[10px] px-8 py-3.5"
              onClick={() =>
                track({ name: "cta_click", label: secondaryCta.label, target: secondaryCta.href })
              }
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
