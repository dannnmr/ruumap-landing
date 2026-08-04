import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

interface UseParallaxProps {
  sectionRef: RefObject<HTMLElement | null>;
  elementRefs: RefObject<(HTMLElement | null)[]>;
  strength?: number;
}

export function useParallax({ sectionRef, elementRefs, strength = 22 }: UseParallaxProps) {
  useGSAP(
    () => {
      if (!sectionRef.current || !elementRefs.current) return;

      const elements = elementRefs.current.filter((el): el is HTMLElement => Boolean(el));
      if (!elements.length) return;

      const parallaxSetters = elements.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" }),
      }));

      function handleMouseMove(event: MouseEvent) {
        const relX = (event.clientX / window.innerWidth - 0.5) * 2;
        const relY = (event.clientY / window.innerHeight - 0.5) * 2;

        parallaxSetters.forEach(({ x, y }) => {
          x(-relX * strength);
          y(-relY * strength);
        });
      }

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: sectionRef }
  );
}
