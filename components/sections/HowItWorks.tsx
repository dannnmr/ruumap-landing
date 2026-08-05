"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SECTION_IDS } from "@/lib/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { eyebrow, heading, steps } = siteContent.howItWorks;

/**
 * Fila de 3 columnas sin pin, alineada con la referencia visual principal
 * (número, título, descripción, separador superior por columna). Reemplaza
 * el efecto anterior de stacking/pin por columna con imagen — ver
 * design.md del change `complete-remaining-ruum-landing` para el detalle
 * de la decisión.
 */
export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        columnRefs.current.filter(Boolean),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 40%",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, steps.length] },
  );

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.proceso}
      className="scroll-mt-24 bg-background px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-[130px]"
    >
      <p className="mb-6 font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-accent sm:mb-8">
        {eyebrow}
      </p>
      <h2 className="mb-10 max-w-[760px] font-display text-[clamp(32px,5vw,52px)] font-bold leading-[1.05] tracking-tight text-white sm:mb-12">
        {heading}
      </h2>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-14">
        {steps.map((step, i) => (
          <div
            key={step.index}
            ref={(el) => {
              columnRefs.current[i] = el;
            }}
            className="border-t border-border pt-6"
          >
            <div className="mb-4 font-display text-[44px] font-bold leading-none text-accent sm:mb-6 sm:text-[52px]">
              {step.index}
            </div>
            <h3 className="mb-3 font-display text-[20px] font-semibold leading-tight text-white sm:text-[22px]">
              {step.title}
            </h3>
            <p className="max-w-[360px] font-sans text-[14.5px] font-medium leading-relaxed text-gray-400 sm:text-[15px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
