"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { eyebrow, heading, steps } = siteContent.howItWorks;

/**
 * Stacking cards: cada paso ocupa 100vh y se fija (pin, pinSpacing:false)
 * en el tope al llegar arriba. Como no reserva espacio propio, la tarjeta
 * siguiente sube y se monta encima en el mismo tramo de scroll. Mientras
 * eso pasa, la tarjeta anterior reduce su escala y se oscurece (un tween
 * separado atado al recorrido de scroll de la tarjeta siguiente), dando
 * la sensación de profundidad/apilamiento.
 */
export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      if (!cards.length || !cards[0]) return;

      cards.forEach((card, i) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
        });

        const nextCard = cards[i + 1];
        const overlay = overlayRefs.current[i];
        if (!nextCard) return;

        const scrub = {
          trigger: nextCard,
          start: "top bottom",
          end: "top top",
          scrub: true,
        };

        gsap.to(card, { scale: 0.92, ease: "none", scrollTrigger: { ...scrub } });
        if (overlay) {
          gsap.to(overlay, { opacity: 0.55, ease: "none", scrollTrigger: { ...scrub } });
        }
      });
    },
    { scope: sectionRef, dependencies: [steps.length] }
  );

  return (
    <section ref={sectionRef} id="proceso" className="relative bg-background">
      <div className="mx-auto max-w-[1300px] px-5 pb-16 pt-24 sm:px-10 sm:pt-32 lg:px-16 lg:pt-40">
        <p className="mb-6 font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-accent sm:mb-8">
          {eyebrow}
        </p>
        <h2 className="max-w-[760px] font-display text-[clamp(32px,5vw,52px)] font-bold leading-[1.05] tracking-tight text-white">
          {heading}
        </h2>
      </div>

      {steps.map((step, i) => (
        <div
          key={step.index}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="relative flex h-screen w-full flex-col justify-center overflow-hidden border-t border-white/10 bg-background px-5 sm:px-10 lg:px-16"
        >
          {/* Número gigante de fondo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[4vw] -top-[8vw] select-none font-display text-[46vw] font-bold leading-none text-white/[0.04] sm:text-[34vw]"
          >
            {step.index}
          </div>

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div>
              <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-accent sm:mb-6">
                {eyebrow} — {step.index}
              </p>
              <h3 className="mb-6 font-display text-[30px] font-bold leading-[1.05] tracking-tight text-white sm:text-[42px]">
                {step.title}
              </h3>
              <p className="max-w-[440px] font-sans text-[15px] font-medium leading-relaxed text-gray-300 sm:text-[16.5px]">
                {step.description}
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Overlay de oscurecimiento cuando la siguiente tarjeta sube */}
          <div
            ref={(el) => {
              overlayRefs.current[i] = el;
            }}
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-black opacity-0"
          />
        </div>
      ))}
    </section>
  );
}
