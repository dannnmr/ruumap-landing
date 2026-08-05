"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteImage } from "@/content/site";
import { cn } from "@/lib/utils";

export type Embed360ViewerProps = {
  src: string;
  poster: SiteImage;
  title: string;
  className?: string;
};

/**
 * Recorrido 360°/3D embebido (iframe) bajo demanda: se muestra `poster`
 * (imagen estática) con un botón explícito ("Ver recorrido 360°") y el
 * `<iframe>` recién se monta al hacer click — nunca se carga automáticamente
 * al entrar en viewport (ver docs/performance-guidelines.md, "Recursos 3D /
 * recorridos virtuales"). Mismo patrón poster+CTA que
 * `components/ui/VideoPlayer.tsx` (ahí con `<video preload="none">`, acá con
 * el iframe fuera del DOM hasta la interacción).
 */
export function Embed360Viewer({ src, poster, title, className }: Embed360ViewerProps) {
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    return (
      <iframe
        src={src}
        title={title}
        className={cn("absolute inset-0 h-full w-full border-0", className)}
        allow="gyroscope; accelerometer; xr-spatial-tracking"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsActive(true)}
      aria-label="Ver recorrido 360°"
      className={cn(
        "absolute inset-0 flex cursor-pointer items-center justify-center transition-colors hover:bg-black/20",
        className
      )}
    >
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        sizes="(min-width: 768px) 45vw, 90vw"
        className="object-cover"
      />

      <span className="relative flex flex-col items-center gap-3">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-white/60 bg-black/30 backdrop-blur-sm transition-transform hover:scale-105 hover:border-white sm:h-20 sm:w-20">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white sm:h-8 sm:w-8">
            <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </svg>
        </span>
        <span className="rounded-full bg-black/40 px-3 py-1 text-[13px] font-light text-white backdrop-blur-sm">
          Ver recorrido 360°
        </span>
      </span>
    </button>
  );
}
