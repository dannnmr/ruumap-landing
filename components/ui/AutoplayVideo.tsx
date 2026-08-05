"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { SiteImage } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type AutoplayVideoProps = {
  src: string;
  poster: SiteImage;
  /** Tarjeta actualmente al frente del stack (ver `hooks/useStackedCards.ts`). */
  isActive: boolean;
  /**
   * Debounce antes de arrancar la reproducción una vez `isActive` pasa a
   * `true` — evita descargar/decodificar video en un scroll rápido que solo
   * pasa de largo por la tarjeta (ver docs/performance-guidelines.md,
   * "Conexiones lentas y carga progresiva"). Decisión del usuario,
   * 2026-08-05: corto a propósito (no tan largo como para sentirse una
   * espera).
   */
  activationDelayMs?: number;
  className?: string;
};

/**
 * Video en loop, muted, que solo reproduce mientras su tarjeta está activa
 * (al frente del stack de `FeatureSection`) — nunca autoplay inmediato solo
 * por entrar en viewport, y nunca en tarjetas tapadas por la siguiente
 * (`isActive` ya resuelve eso vía scroll progress, a diferencia de un
 * `IntersectionObserver` que no distingue "tapado por sticky" de "fuera de
 * viewport"). Crossfade poster→video (y viceversa al desactivarse) con
 * `opacity`, igual patrón fluido que `DayNightToggle`/`Embed360Viewer`.
 * Respeta `prefers-reduced-motion`: nunca monta el `<video>`, se queda en el
 * poster. Usado en `FeatureSection` (filas "VIDEO ORBITAL", "AMBIENTES
 * HUMANIZADOS", "PANEL DE CONTROL").
 */
export function AutoplayVideo({
  src,
  poster,
  isActive,
  activationDelayMs = 400,
  className,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !isActive) {
      setShouldPlay(false);
      return;
    }

    const timer = setTimeout(() => setShouldPlay(true), activationDelayMs);
    return () => clearTimeout(timer);
  }, [isActive, activationDelayMs, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      // Autoplay con audio bloqueado por el navegador es prácticamente
      // imposible acá (muted + playsInline), pero igual se atrapa por las
      // dudas en vez de dejar una promesa rechazada sin manejar.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  return (
    <div className={cn("absolute inset-0 h-full w-full overflow-hidden", className)}>
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        sizes="(min-width: 768px) 45vw, 90vw"
        className="object-cover"
      />

      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src={src}
          preload="none"
          muted
          loop
          playsInline
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out",
            shouldPlay ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
