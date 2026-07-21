"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const {
  eyebrow,
  titleLines,
  subcopy,
  primaryCta,
  secondaryCta,
  backgroundImages,
} = siteContent.hero;

const SLIDE_COUNT = backgroundImages.length;

/**
 * Hero con tres animaciones GSAP independientes:
 * 1. Text masking del título al montar (yPercent 100 -> 0 por línea).
 * 2. Carrusel scroll-driven: la sección queda pinned y el track de
 *    imágenes se traslada horizontalmente en sincronía con el scroll
 *    vertical (scrub). Al agotarse el recorrido, el scroll continúa
 *    normalmente hacia la siguiente sección.
 * 3. Mouse parallax: cada imagen del carrusel se desplaza sutilmente en
 *    dirección opuesta al cursor, sobre un lienzo sobredimensionado para
 *    no exponer bordes.
 *
 * Sin flechas ni dots: la única forma de avanzar es el scroll.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      // 1. Text masking de entrada
      const lines = lineRefs.current.filter(Boolean);
      const introTl = gsap.timeline({ delay: 0.15 });

      introTl.fromTo(
        lines,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12 },
      );

      if (introRef.current) {
        introTl.fromTo(
          introRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.6",
        );
      }

      // 2. Carrusel horizontal pinned, atado al scroll vertical.
      // Traslado en px (no xPercent: xPercent es relativo al ancho propio
      // del track, que mide SLIDE_COUNT*100% del viewport, no el 100% de
      // un slide — usarlo aquí sobrestima el desplazamiento y el track
      // termina desplazándose mucho más allá de su contenido real).
      const track = trackRef.current;
      const dwell = 0.35; // fracción extra de scroll para "descansar" en el último slide

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${(SLIDE_COUNT - 1 + dwell) * window.innerHeight}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          duration: SLIDE_COUNT - 1,
        })
        .to({}, { duration: dwell });

      // 3. Mouse parallax sobre las imágenes del carrusel
      const parallaxSetters = slideRefs.current
        .filter((el): el is HTMLDivElement => Boolean(el))
        .map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" }),
        }));

      const strength = 22;

      function handleMouseMove(event: MouseEvent) {
        const relX = (event.clientX / window.innerWidth - 0.5) * 2;
        const relY = (event.clientY / window.innerHeight - 0.5) * 2;

        parallaxSetters.forEach(({ x, y }) => {
          x(-relX * strength);
          y(-relY * strength);
        });
      }

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative h-screen overflow-hidden">
      {/* Carrusel: track de N slides al 100vw cada uno, trasladado por scroll.
          Cada slide mide exactamente 100vw (w-screen), no un porcentaje
          calculado (100/3% es un decimal periódico y puede dejar un hueco
          de subpíxel entre slides en el límite entre uno y otro). El track
          no necesita ancho explícito: al ser flex con hijos shrink-0, su
          ancho total sale solo por overflow, y la sección ya lo recorta.
          Las imágenes son solo el fondo (mismo tamaño, se mueven con el
          track); el oscurecimiento vive en una única capa estática por
          fuera del track, para que no quede fragmentado por slide. */}
      <div ref={trackRef} className="absolute inset-0 flex h-full">
        {backgroundImages.map((image, i) => (
          <div key={image.src} className="relative h-full w-screen shrink-0">
            <div
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="absolute -inset-[4%] will-change-transform">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overlay estático: tinte plano + degradado de contraste, fijo encima
          del carrusel (no está dentro del track, así que no se traslada). */}
      <div className="absolute inset-0 bg-background/50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(12%_0_0)_0%,oklch(12%_0_0/0.35)_50%,transparent_90%)]" />

      {/* Contenido, fijo mientras dura el pin */}
      <div className="relative max-w-[820px] px-5 pb-10 pt-24 sm:px-10 sm:pt-20 lg:px-16">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-accent drop-shadow-lg sm:text-[12.5px]">
          {eyebrow}
        </p>

        <h1
          className="mb-7 font-display font-bold leading-[0.98] tracking-tight text-white
                     drop-shadow-lg text-[clamp(38px,8vw,92px)]">
          {titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div ref={introRef}>
          <p className="mb-9 max-w-[540px] font-sans text-[15px] font-medium leading-relaxed text-gray-100 drop-shadow-lg sm:text-base">
            {subcopy}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={primaryCta.href}
              className="rounded-full bg-accent px-7 py-[13px] text-[13px] font-bold text-background
                         transition-all duration-500 hover:scale-105 hover:opacity-90 active:scale-95
                         sm:text-[13.5px]">
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="rounded-full border border-white/20 px-7 py-[13px] text-[13px] font-semibold text-white
                         transition-all duration-500 hover:scale-105 hover:border-white/50
                         hover:bg-white/5 active:scale-95 sm:text-[13.5px]">
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-[34px] left-1/2 hidden h-[34px] w-[22px] -translate-x-1/2
                   justify-center rounded-[14px] border-[1.5px] border-white/20 pt-[6px] sm:flex">
        <div className="h-2 w-[3px] animate-ruum-bounce rounded-full bg-accent" />
      </div>
    </section>
  );
}
