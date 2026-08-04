import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseHorizontalScrollProps {
  sectionRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
  slideCount?: number;
  dwell?: number;
  duration?: number;
}

export function useHorizontalScroll({
  sectionRef,
  trackRef,
  slideCount,
  dwell = 0.35,
  duration,
}: UseHorizontalScrollProps) {
  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      
      const scrollEndMultiplier = slideCount 
        ? slideCount - 1 + dwell 
        : 1 + dwell;

      const endValue = slideCount 
        ? () => `+=${scrollEndMultiplier * window.innerHeight}`
        : () => `+=${(track.scrollWidth - window.innerWidth) * scrollEndMultiplier}`;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: endValue,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          duration: duration || (slideCount ? slideCount - 1 : 1),
        })
        .to({}, { duration: dwell });
    },
    { scope: sectionRef, dependencies: [slideCount] }
  );
}
