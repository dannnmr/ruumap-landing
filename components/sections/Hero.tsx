"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero con parallax "scrub" del fondo al hacer scroll.
 * Equivale al bloque `[data-hero]` / `[data-hero-img]` de la maqueta:
 * gsap.to(heroImg, { yPercent: 16, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
 *
 * Fondo: foto real de Unsplash (skyline nocturno de Manhattan), verificada
 * como imagen gratuita (no Unsplash+) antes de usarla.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imgWrapRef.current || !sectionRef.current) return;

      gsap.to(imgWrapRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative flex h-screen items-center overflow-hidden"
    >
      {/* Fondo parallax: skyline nocturno (Unsplash, foto real y gratuita) */}
      <div ref={imgWrapRef} data-hero-img className="absolute inset-x-0 -top-[15%] h-[130%]">
        <Image
          src="https://images.unsplash.com/photo-1767342976156-83239d26f08e?q=80&w=1920&auto=format&fit=crop"
          alt="Skyline nocturno de Manhattan, Nueva York"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/35" />
      </div>

      {/* Degradado de contraste para el texto */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(12%_0_0)_10%,transparent_55%)]" />

      {/* Contenido */}
      <div className="relative max-w-[720px] px-5 pb-10 pt-24 sm:px-10 sm:pt-20 lg:px-16">
        <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-accent sm:text-[12.5px]">
          PropTech · Recorridos 3D
        </p>

        <h1
          className="mb-5 font-display font-semibold leading-[1.1] tracking-[-0.01em]
                     text-[clamp(28px,7vw,58px)] sm:leading-[1.08]"
        >
          Los proyectos más ambiciosos del mundo, documentados en tres dimensiones.
        </h1>

        <p className="mb-[26px] max-w-[520px] text-[15px] leading-[1.55] text-muted sm:text-base">
          ruum convierte cada etapa de construcción en un recorrido 3D navegable, con
          disponibilidad de unidades actualizada en tiempo real.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="rounded-full bg-accent px-6 py-3 text-[13px] font-semibold text-background
                       transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-95
                       sm:px-7 sm:py-[13px] sm:text-[13.5px]"
          >
            Explorar proyectos
          </button>
          <button
            type="button"
            className="rounded-full border border-muted-4/60 px-6 py-3 text-[13px] font-medium
                       transition-all duration-300 hover:scale-105 hover:border-foreground/70
                       hover:bg-white/5 active:scale-95 sm:px-7 sm:py-[13px] sm:text-[13.5px]"
          >
            Ver recorrido 3D
          </button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-[34px] left-1/2 hidden h-[34px] w-[22px] -translate-x-1/2
                   justify-center rounded-[14px] border-[1.5px] border-muted-4 pt-[6px] sm:flex"
      >
        <div className="h-2 w-[3px] animate-ruum-bounce rounded-full bg-accent" />
      </div>
    </section>
  );
}
