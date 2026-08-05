"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SECTION_IDS } from "@/lib/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { features } = siteContent;

/**
 * Fila image+copy, alineada con la referencia visual principal: 5 bloques
 * apilados verticalmente (sin pin ni scroll horizontal), cada uno con la
 * imagen a la izquierda y el copy a la derecha. Reemplaza el carrusel
 * horizontal pineado anterior — ver design.md del change
 * `complete-remaining-ruum-landing` para el detalle de la decisión.
 */
export default function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      rowRefs.current.forEach((row) => {
        if (!row) return;

        gsap.fromTo(
          row,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, features.length] }
  );

  return (
    <section ref={sectionRef} id={SECTION_IDS.servicios} className="scroll-mt-24">
      {/* Cada fila lleva su propio padding (no un gap de contenedor): así el
          espacio entre filas se arma con dos padding-y consecutivos, igual
          que el auto-layout de Figma por fila (fill width, hug height,
          padding 64/96 a nivel de fila). */}
      {features.map((feature, i) => (
        <div
          key={feature.index}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          className="grid grid-cols-1 items-center gap-8 px-5 py-10 sm:px-10 sm:py-14 md:grid-cols-2 md:gap-14 lg:gap-20 lg:px-16 lg:py-24"
        >
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
      ))}
    </section>
  );
}
