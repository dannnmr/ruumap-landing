"use client";

import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MarqueeProps {
  children: ReactNode;
  /** Sentido del desplazamiento continuo. */
  direction?: "left" | "right";
  /** Duración de un ciclo completo del loop, en segundos. */
  durationSeconds?: number;
  className?: string;
}

/**
 * Ticker continuo animado en CSS puro (sin JS atado a scroll/rAF, ver
 * docs/performance-guidelines.md). El track duplica los `children` una vez
 * para que el segundo tramo continúe exactamente donde termina el primero
 * — el loop no tiene salto visible. Con `prefers-reduced-motion: reduce` la
 * animación no se aplica: el contenido queda estático (visible, sin
 * desplazamiento).
 */
export function Marquee({ children, direction = "left", durationSeconds = 32, className }: MarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const items = Children.toArray(children);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-14 sm:gap-20 lg:gap-20",
          !prefersReducedMotion &&
            (direction === "left" ? "animate-marquee-left" : "animate-marquee-right")
        )}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {items.map((child, i) => (
          <div key={`marquee-a-${i}`} className="flex shrink-0 items-center">
            {child}
          </div>
        ))}
        {/* Copia duplicada del track completo (no de cada item por separado):
            técnica estándar para un loop continuo sin salto — ver Marquee.tsx
            arriba. Oculta a lectores de pantalla para no anunciar cada logo
            dos veces. */}
        {items.map((child, i) => (
          <div key={`marquee-b-${i}`} aria-hidden="true" className="flex shrink-0 items-center">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
