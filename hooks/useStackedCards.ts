import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useState } from "react";

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
 *
 * También expone `activeIndex`: el índice de la tarjeta actualmente al
 * frente del stack. Se deriva de los mismos `ScrollTrigger` de arriba (sin
 * agregar listeners de scroll propios que dupliquen lo que ya maneja
 * Lenis/GSAP): como las transiciones son secuenciales y no se solapan en el
 * scroll, la transición hacia la tarjeta `i` es la única con progreso
 * cambiante en cada momento, así que basta con "¿ya pasó la mitad de su
 * recorrido?" para decidir si el frente pasó de `i - 1` a `i`. Lo consume
 * `FeatureSection` para autoplay condicionado (solo la tarjeta activa
 * reproduce su video, ver `components/ui/AutoplayVideo.tsx`).
 */
export function useStackedCards({ sectionRef, cardRefs, disabled = false }: UseStackedCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

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
              onUpdate: (self) => setActiveIndex(self.progress >= 0.5 ? i : i - 1),
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [disabled, cardRefs.current.length] }
  );

  return { activeIndex };
}
