"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DayNightToggle } from "@/components/ui/DayNightToggle";
import { Embed360Viewer } from "@/components/ui/Embed360Viewer";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useStackedCards } from "@/hooks/useStackedCards";
import { SECTION_IDS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { features } = siteContent;

/**
 * Imagen de una fila de features:
 * - `feature.embed360` (hoy solo la fila 02, "VISTAS 360°"): poster estático
 *   + botón explícito que carga un iframe bajo demanda (nunca automático al
 *   entrar en viewport — ver docs/performance-guidelines.md, "Recursos 3D /
 *   recorridos virtuales"). Ver `components/ui/Embed360Viewer.tsx`.
 * - `feature.video` (hoy filas 03 "VIDEO ORBITAL", 04 "AMBIENTES
 *   HUMANIZADOS" y 05 "PANEL DE CONTROL"): `image` como poster + reproducción
 *   automática en loop, muted, solo mientras la tarjeta está activa (al
 *   frente del stack) — pedido explícito del usuario, 2026-08-05. Ver
 *   `components/ui/AutoplayVideo.tsx` y `hooks/useStackedCards.ts`
 *   (`activeIndex`).
 * - `feature.imageNight` (hoy solo la fila 01, "RENDERS DIURNO | NOCTURNO"):
 *   monta ambas imágenes apiladas y las alterna solo con `opacity`
 *   (crossfade fluido, sin parpadeo/CLS) según un toggle día/noche propio de
 *   la tarjeta.
 * - Resto de las filas: una única imagen estática, sin cambios.
 */
function FeatureVisual({
  feature,
  isActive,
}: {
  feature: (typeof features)[number];
  isActive: boolean;
}) {
  const [mode, setMode] = useState<"day" | "night">("day");
  const hasNight = Boolean(feature.imageNight);
  const isNight = hasNight && mode === "night";

  if (feature.embed360) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <Embed360Viewer src={feature.embed360.src} poster={feature.image} title={feature.title} />
      </div>
    );
  }

  if (feature.video) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <AutoplayVideo src={feature.video.src} poster={feature.image} isActive={isActive} />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
      <Image
        src={feature.image.src}
        alt={feature.image.alt}
        fill
        sizes="(min-width: 768px) 45vw, 90vw"
        className={cn(
          "object-cover transition-opacity duration-700 ease-in-out motion-reduce:transition-none",
          isNight ? "opacity-0" : "opacity-100"
        )}
      />

      {feature.imageNight && (
        <Image
          src={feature.imageNight.src}
          alt={feature.imageNight.alt}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className={cn(
            "object-cover transition-opacity duration-700 ease-in-out motion-reduce:transition-none",
            isNight ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {hasNight && (
        <DayNightToggle mode={mode} onChange={setMode} className="absolute left-4 top-4 z-10" />
      )}
    </div>
  );
}

/**
 * "Cartas apiladas" en scroll: cada una de las 5 tarjetas de servicio es
 * `position: sticky`, así que al hacer scroll cada tarjeta se pega debajo
 * del Navbar y la siguiente sube por detrás cubriéndola por completo —
 * igual que una baraja de cartas o papeles apilándose en un escritorio
 * (pedido explícito del usuario, 2026-08-05). El apilado en sí es CSS puro
 * (sin `pin` de GSAP: no hace falta calcular altura de pin a mano, la
 * altura total de la sección es simplemente la suma de las 5 tarjetas).
 * `hooks/useStackedCards.ts` solo agrega el pulido de profundidad
 * (achicar la tarjeta saliente mientras la entrante la cubre).
 *
 * Reemplaza el layout de 5 bloques apilados en flujo normal (sin pin) que
 * había antes — ver design.md del change `complete-remaining-ruum-landing`
 * para esa decisión previa; este es un mecanismo distinto (sticky-stack,
 * no el carrusel horizontal pineado que aquel change removió) y una
 * reautorización explícita, no una reversión.
 */
export default function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { activeIndex } = useStackedCards({ sectionRef, cardRefs, disabled: prefersReducedMotion });

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.servicios}
      className="relative scroll-mt-24 bg-background"
    >
      {features.map((feature, i) => (
        <div
          key={feature.index}
          id={feature.index === "02" ? "recorridos-3d" : undefined}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          style={{ zIndex: i + 1 }}
          className="sticky top-24 flex h-[calc(100dvh-6rem)] items-center overflow-hidden bg-surface shadow-2xl motion-reduce:static motion-reduce:h-auto motion-reduce:rounded-none motion-reduce:border-x-0 motion-reduce:border-t-0 motion-reduce:shadow-none scroll-mt-24"
        >
          {/* Cada fila lleva su propio padding (no un gap de contenedor): así el
              espacio interno se arma con el padding de la fila, igual que el
              auto-layout de Figma por fila (fill width, hug height, padding
              64/96 a nivel de fila). */}
          <div className="grid w-full grid-cols-1 items-center gap-8 px-5 py-10 sm:px-10 sm:py-14 md:grid-cols-2 md:gap-14 lg:gap-20 lg:px-16 lg:py-24">
            <FeatureVisual feature={feature} isActive={activeIndex === i} />

            <div>
              <Eyebrow className="mb-4 sm:mb-6">{feature.eyebrow}</Eyebrow>
              <h3 className="mb-4 max-w-[480px] font-display text-[28px] font-light leading-[1.1] tracking-tight text-white sm:text-[36px]">
                {feature.title}
              </h3>
              <p className="max-w-[440px] font-sans text-[15px] font-light leading-relaxed text-[#9E9E9E] sm:text-[16px]">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
