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
// antes de usarlas — ver auditoría de fidelidad visual.
const LANDMARKS: Landmark[] = [
  {
    index: "01",
    name: "One57",
    location: "Nueva York, Estados Unidos",
    image:
      "https://images.unsplash.com/photo-1590985607645-75e6570fa4aa?q=80&w=1600&auto=format&fit=crop",
    alt: "Skyline nocturno de una ciudad de Estados Unidos",
  },
  {
    index: "02",
    name: "Bosco Verticale",
    location: "Milán, Italia",
    image:
      "https://images.unsplash.com/photo-1655447844120-083802457b17?q=80&w=1600&auto=format&fit=crop",
    alt: "Bosco Verticale, torre residencial con vegetación en Milán",
  },
  {
    index: "03",
    name: "Marina Bay Sands Residences",
    location: "Singapur",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop",
    alt: "Marina Bay Sands al atardecer, Singapur",
  },
  {
    index: "04",
    name: "Burj Khalifa Residences",
    location: "Dubái, EAU",
    image:
      "https://images.unsplash.com/photo-1546412414-272690cb5cb3?q=80&w=1600&auto=format&fit=crop",
    alt: "Burj Khalifa en Dubái",
  },
  {
    index: "05",
    name: "Central Park Tower",
    location: "Nueva York, Estados Unidos",
    image:
      "https://images.unsplash.com/photo-1661263759183-e7937131b420?q=80&w=1600&auto=format&fit=crop",
    alt: "Skyline nocturno de rascacielos",
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
        <span className="font-display text-base text-accent sm:text-xl">{landmark.index}</span>
        <div>
          <div className="font-display text-xl font-semibold sm:text-2xl lg:text-[30px]">
            {landmark.name}
          </div>
          <div className="mt-1 text-xs text-muted-2 sm:text-sm">{landmark.location}</div>
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
        <p className="mb-4 text-[12px] uppercase tracking-[0.16em] text-accent sm:mb-[18px] sm:text-[13px]">
          Referencias globales
        </p>
        <h2 className="mb-12 font-display text-[28px] font-semibold sm:mb-16 sm:text-[34px] lg:mb-[90px] lg:text-[40px]">
          Estándar internacional, en cada proyecto.
        </h2>
      </div>

      {LANDMARKS.map((landmark) => (
        <RevealPanel key={landmark.index} landmark={landmark} />
      ))}
    </section>
  );
}
