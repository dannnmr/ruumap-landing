import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

interface UseTextRevealProps {
  scopeRef: RefObject<HTMLElement | null>;
  lineRefs: RefObject<(HTMLElement | null)[]>;
  introRef?: RefObject<HTMLElement | null>;
}

export function useTextReveal({ scopeRef, lineRefs, introRef }: UseTextRevealProps) {
  useGSAP(
    () => {
      if (!scopeRef.current) return;

      const lines = lineRefs.current.filter(Boolean);
      if (!lines.length) return;

      const introTl = gsap.timeline({ delay: 0.15 });

      introTl.fromTo(
        lines,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12 },
      );

      if (introRef?.current) {
        introTl.fromTo(
          introRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.6",
        );
      }
    },
    { scope: scopeRef }
  );
}
