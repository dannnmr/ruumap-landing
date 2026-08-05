import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseStackedCardsProps {
  sectionRef: RefObject<HTMLElement | null>;
  cardRefs: RefObject<(HTMLElement | null)[]>;
  /** Si es true, no se registra ningún ScrollTrigger (prefers-reduced-motion). */
  disabled?: boolean;
}

/**
 * Pulido de "cartas apiladas": el apilado en sí lo resuelve CSS puro
 * (`position: sticky` en cada tarjeta, ver FeatureSection.tsx) — esta hook
 * solo agrega la sensación de profundidad, achicando levemente cada
 * tarjeta saliente mientras la siguiente se desliza encima. Solo anima
 * `transform` (scale), con `scrub` atado al scroll — mismo criterio que
 * `useHorizontalScroll`/`useParallax` y las demás secciones del repo.
 */
export function useStackedCards({ sectionRef, cardRefs, disabled = false }: UseStackedCardsProps) {
  useGSAP(
    () => {
      if (disabled || !sectionRef.current) return;

      const cards = cardRefs.current.filter((el): el is HTMLElement => Boolean(el));
      if (cards.length < 2) return;

      for (let i = 1; i < cards.length; i++) {
        const outgoing = cards[i - 1];
        const incoming = cards[i];

        gsap.fromTo(
          outgoing,
          { scale: 1 },
          {
            scale: 0.92,
            ease: "none",
            scrollTrigger: {
              trigger: incoming,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [disabled, cardRefs.current.length] }
  );
}
