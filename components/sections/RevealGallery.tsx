"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Landmark = {
  index: string;
  name: string;
  location: string;
  image: string;
  alt: string;
};

// Todas las fotos verificadas como gratuitas (licencia Unsplash, no Unsplash+)
// antes de usarlas — mismas 4 imágenes que en el portafolio de casos de éxito.
const LANDMARKS: Landmark[] = [
  {
    index: "01",
    name: "Artemis",
    location: "Torre residencial · Recorrido virtual",
    image:
      "https://images.unsplash.com/photo-1760259203238-01708384f7a2?q=80&w=1600&auto=format&fit=crop",
    alt: "Fachada de torre residencial moderna de vidrio, proyecto Artemis",
  },
  {
    index: "02",
    name: "Itagua",
    location: "Desarrollo horizontal · Exploración de amenidades",
    image:
      "https://images.unsplash.com/photo-1563657296501-c3770ae0057b?q=80&w=1600&auto=format&fit=crop",
    alt: "Edificio residencial moderno, proyecto Itagua",
  },
  {
    index: "03",
    name: "PV Norte",
    location: "Mixed-use · Planos 2D interactivos",
    image:
      "https://images.unsplash.com/photo-1663092340359-6a53ba3a3066?q=80&w=1600&auto=format&fit=crop",
    alt: "Skyline nocturno del entorno del proyecto PV Norte",
  },
  {
    index: "04",
    name: "Buen Retiro",
    location: "Torre residencial · Recorrido de alta fidelidad",
    image:
      "https://images.unsplash.com/photo-1590985607645-75e6570fa4aa?q=80&w=1600&auto=format&fit=crop",
    alt: "Skyline nocturno del entorno del proyecto Buen Retiro",
  },
];

function RevealPanel({ landmark }: { landmark: Landmark }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imgRef.current || !panelRef.current) return;

      gsap.fromTo(
        imgRef.current,
        { clipPath: "inset(6% round 28px)", scale: 0.88 },
        {
          clipPath: "inset(0% round 0px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 55%",
              end: "top 15%",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: panelRef }
  );

  return (
    <div
      ref={panelRef}
      data-reveal
      className="relative mb-0.5 flex h-[60vh] items-center justify-center sm:h-[80vh] lg:h-screen"
    >
      <div
        ref={imgRef}
        data-reveal-img
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <Image
          src={landmark.image}
          alt={landmark.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/25" />
      </div>

      <div
        ref={labelRef}
        data-reveal-label
        className="absolute bottom-6 left-5 flex items-baseline gap-3 sm:bottom-10 sm:left-10
                   sm:gap-4 lg:bottom-14 lg:left-16"
      >
        <span className="font-display text-base font-bold text-accent drop-shadow-lg sm:text-xl">
          {landmark.index}
        </span>
        <div>
          <div className="font-display text-xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-2xl lg:text-[30px]">
            {landmark.name}
          </div>
          <div className="mt-1 font-medium text-gray-100 drop-shadow-lg text-xs sm:text-sm">
            {landmark.location}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RevealGallery() {
  return (
    <section>
      {/* El texto de cabecera respeta el padding del sitio; los paneles van full-bleed */}
      <div className="px-5 sm:px-10 lg:px-16">
        <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent sm:mb-[18px] sm:text-[13px]">
          Recorridos destacados
        </p>
        <h2 className="mb-12 max-w-[820px] font-display text-[28px] font-extrabold tracking-tight text-white sm:mb-16 sm:text-[34px] lg:mb-[90px] lg:text-[40px]">
          Así se siente explorar un desarrollo antes de que exista.
        </h2>
      </div>

      {LANDMARKS.map((landmark) => (
        <RevealPanel key={landmark.index} landmark={landmark} />
      ))}
    </section>
  );
}
