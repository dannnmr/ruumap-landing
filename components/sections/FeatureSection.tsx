"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useStackedCards } from "@/hooks/useStackedCards";
import { SECTION_IDS } from "@/lib/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { features } = siteContent;

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

  useStackedCards({ sectionRef, cardRefs, disabled: prefersReducedMotion });

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.servicios}
      className="relative scroll-mt-24 bg-background"
    >
      {features.map((feature, i) => (
        <div
          key={feature.index}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          style={{ zIndex: i + 1 }}
          className="sticky top-24 flex h-[calc(100dvh-6rem)] items-center overflow-hidden bg-surface shadow-2xl motion-reduce:static motion-reduce:h-auto motion-reduce:rounded-none motion-reduce:border-x-0 motion-reduce:border-t-0 motion-reduce:shadow-none"
        >
          {/* Cada fila lleva su propio padding (no un gap de contenedor): así el
              espacio interno se arma con el padding de la fila, igual que el
              auto-layout de Figma por fila (fill width, hug height, padding
              64/96 a nivel de fila). */}
          <div className="grid w-full grid-cols-1 items-center gap-8 px-5 py-10 sm:px-10 sm:py-14 md:grid-cols-2 md:gap-14 lg:gap-20 lg:px-16 lg:py-24">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </div>

            <div>
              <Eyebrow className="mb-4 sm:mb-6">{feature.eyebrow}</Eyebrow>
              <h3 className="mb-4 max-w-[480px] font-display text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
                {feature.title}
              </h3>
              <p className="max-w-[440px] font-sans text-[15px] font-medium leading-relaxed text-gray-300 sm:text-[16px]">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
