"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { features } = siteContent;

/**
 * Horizontal scroll pinned: la sección queda fija en viewport y el track
 * de tarjetas se traslada en px (no %) en función del scroll vertical,
 * de derecha a izquierda. La distancia de scroll necesaria es exactamente
 * el overflow horizontal del track (scrollWidth - innerWidth), así el
 * mapeo scroll -> desplazamiento es 1:1 sin importar cuántas tarjetas haya
 * ni su ancho responsive.
 */
export default function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const dwell = 0.4; // fracción extra de scroll para "descansar" en la última tarjeta

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${(track.scrollWidth - window.innerWidth) * (1 + dwell)}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          duration: 1,
        })
        .to({}, { duration: dwell });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative h-screen overflow-hidden scroll-mt-24"
    >
      <div
        ref={trackRef}
        className="flex h-full items-center gap-6 pl-5 pr-[12vw] will-change-transform sm:gap-10 sm:pl-10 lg:gap-14 lg:pl-16"
      >
        {features.map((feature) => (
          <article
            key={feature.index}
            className="relative h-[68vh] w-[82vw] shrink-0 overflow-hidden rounded-xl sm:h-[70vh] sm:w-[60vw] lg:w-[38vw]"
          >
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 82vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-accent drop-shadow-lg sm:mb-4">
                {feature.index}
              </p>
              <h3 className="mb-4 font-display text-[26px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-[32px]">
                {feature.title}
              </h3>
              <p className="max-w-[420px] font-sans text-[14px] font-medium leading-relaxed text-gray-100 drop-shadow-lg sm:text-[15px]">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
