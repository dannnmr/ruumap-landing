"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ClosingCTA() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imgRef.current || !wrapRef.current) return;

      gsap.to(imgRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <section className="relative flex h-[70vh] items-center justify-center overflow-hidden sm:h-[80vh]">
      <div ref={wrapRef} data-parallax-wrap className="absolute inset-0">
        <div ref={imgRef} data-parallax-img className="absolute inset-x-0 -top-[15%] h-[130%]">
          <Image
            src="https://images.unsplash.com/photo-1723369962563-5e873df9b93b?q=80&w=1920&auto=format&fit=crop"
            alt="Vista aérea de una obra en construcción"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-background/55" />
      <div className="relative px-5 text-center sm:px-16">
        <h2 className="mb-6 font-display text-[32px] font-semibold sm:mb-[34px] sm:text-[52px]">
          Sumá tu proyecto al recorrido.
        </h2>
        <button
          type="button"
          className="inline-block rounded-full bg-accent px-8 py-4 text-sm font-semibold
                     text-background transition-all duration-300 hover:scale-105 hover:opacity-90
                     active:scale-95 sm:px-10 sm:py-[18px] sm:text-[15px]"
        >
          Solicitar acceso
        </button>
      </div>
    </section>
  );
}
