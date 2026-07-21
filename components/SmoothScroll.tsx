"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";

/**
 * Lenis debe correr en el mismo ticker que GSAP: si cada uno maneja su
 * propio requestAnimationFrame, los ScrollTrigger con scrub (Hero,
 * FeatureSection, RevealGallery, ClosingCTA) quedan desincronizados del
 * scroll suavizado.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function onTick(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(onTick);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, duration: 1.2, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
