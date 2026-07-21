"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { eyebrow, titleLines, subcopy, primaryCta, secondaryCta, backgroundImage } =
  siteContent.hero;

/**
 * Hero con dos animaciones GSAP:
 * 1. Text masking del título — cada línea vive en un contenedor
 *    overflow-hidden y su span interno emerge con yPercent 100 -> 0.
 * 2. Parallax "scrub" del fondo atado al scroll de la sección.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);

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

      const lines = lineRefs.current.filter(Boolean);
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        lines,
        { yPercent: 100 },
        { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12 }
      );

      if (introRef.current) {
        tl.fromTo(
          introRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.6"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative flex h-screen items-center overflow-hidden"
    >
      {/* Fondo parallax: arquitectura nocturna abstracta */}
      <div ref={imgWrapRef} data-hero-img className="absolute inset-x-0 -top-[15%] h-[130%]">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
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
      <div className="relative max-w-[820px] px-5 pb-10 pt-24 sm:px-10 sm:pt-20 lg:px-16">
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-accent drop-shadow-lg sm:text-[12.5px]">
          {eyebrow}
        </p>

        <h1
          className="mb-7 font-display font-bold leading-[0.98] tracking-tight text-white
                     drop-shadow-lg text-[clamp(38px,8vw,92px)]"
        >
          {titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="block will-change-transform"
              >
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
                         sm:text-[13.5px]"
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="rounded-full border border-white/20 px-7 py-[13px] text-[13px] font-semibold text-white
                         transition-all duration-500 hover:scale-105 hover:border-white/50
                         hover:bg-white/5 active:scale-95 sm:text-[13.5px]"
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-[34px] left-1/2 hidden h-[34px] w-[22px] -translate-x-1/2
                   justify-center rounded-[14px] border-[1.5px] border-white/20 pt-[6px] sm:flex"
      >
        <div className="h-2 w-[3px] animate-ruum-bounce rounded-full bg-accent" />
      </div>
    </section>
  );
}
