"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent, type Project } from "@/content/site";
import { SECTION_IDS } from "@/lib/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { eyebrow, heading, projects } = siteContent.revealGallery;

function RevealPanel({ project }: { project: Project }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panelRef.current || !clipRef.current || !scaleRef.current) return;

      // Revelado: la máscara se abre al entrar la sección en viewport.
      gsap.fromTo(
        clipRef.current,
        { clipPath: "inset(14% round 0px)" },
        {
          clipPath: "inset(0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      // Parallax interno: la imagen escala de 1.2 a 1 durante todo el
      // recorrido de la sección, no solo en la entrada.
      gsap.fromTo(
        scaleRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top bottom",
            end: "bottom top",
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
      <div ref={clipRef} data-reveal-clip className="absolute inset-0 overflow-hidden">
        <div ref={scaleRef} data-reveal-scale className="absolute inset-0">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-background/35" />
      </div>

      <div
        ref={labelRef}
        data-reveal-label
        className="absolute bottom-6 left-5 right-5 sm:bottom-10 sm:left-10 sm:right-10 lg:bottom-14 lg:left-16 lg:right-16"
      >
        <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-accent drop-shadow-lg sm:mb-4 sm:text-[12.5px]">
          {project.index} // {project.tag}
        </p>
        <div className="font-display text-[clamp(40px,9vw,140px)] font-bold leading-[0.92] tracking-tight text-white drop-shadow-lg">
          {project.name}
        </div>
      </div>
    </div>
  );
}

export default function RevealGallery() {
  return (
    <section id={SECTION_IDS.proyectos} className="scroll-mt-24">
      {/* El texto de cabecera respeta el padding del sitio; los paneles van full-bleed */}
      <div className="px-5 sm:px-10 lg:px-16">
        <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-accent sm:mb-[18px] sm:text-[13px]">
          {eyebrow}
        </p>
        <h2 className="mb-12 max-w-[820px] font-display text-[clamp(32px,6vw,64px)] font-bold tracking-tight text-white sm:mb-16 lg:mb-[90px]">
          {heading}
        </h2>
      </div>

      {projects.map((project) => (
        <RevealPanel key={project.index} project={project} />
      ))}
    </section>
  );
}
