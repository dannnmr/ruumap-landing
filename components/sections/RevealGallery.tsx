"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteContent, type Project } from "@/content/site";
import { SECTION_IDS } from "@/lib/navigation";

const { eyebrow, heading, projects } = siteContent.revealGallery;

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      data-project-card
      className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[380px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 60vw, 82vw"
          className="object-cover"
        />
      </div>

      <div className="pt-5">
        <h3 className="font-display text-[20px] font-semibold leading-tight text-white">
          {project.name}
        </h3>
        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
          {project.developer}
        </p>
        <p className="mt-2 text-[13.5px] text-gray-400">{project.location}</p>

        {project.href ? (
          <a
            href={project.href}
            className="mt-3 inline-block text-[13.5px] font-medium text-accent transition-opacity duration-300 hover:opacity-80"
          >
            Ver proyecto
          </a>
        ) : (
          // Sin URL confirmada todavía (ver Project.href en content/site.ts) — se
          // muestra como acción pendiente, no interactiva, en vez de inventar un destino.
          <span
            aria-disabled="true"
            className="mt-3 inline-block cursor-not-allowed text-[13.5px] font-medium text-accent/50"
          >
            Ver proyecto
          </span>
        )}
      </div>
    </article>
  );
}

/**
 * Catálogo de proyectos: carrusel de tarjetas compactas con scroll nativo +
 * scroll-snap (sin GSAP, sin dependencias nuevas), alineado con
 * docs/references/projects-secction.png. Reemplaza los paneles verticales
 * full-bleed anteriores — ver design.md del change
 * `complete-remaining-ruum-landing`.
 */
export default function RevealGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-project-card]");
    const gap = 24;
    const amount = card ? card.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id={SECTION_IDS.proyectos} className="scroll-mt-24 px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-16">
      <div className="mb-10 sm:mb-14">
        <p className="mb-4 font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-accent sm:mb-[18px] sm:text-[13px]">
          {eyebrow}
        </p>
        <h2 className="max-w-[600px] font-display text-[clamp(28px,5vw,48px)] font-bold tracking-tight text-white">
          {heading}
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:gap-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <ProjectCard key={project.index} project={project} />
        ))}
      </div>

      {/* Flechas de navegación abajo a la derecha, debajo del carrusel — igual
          que docs/references/projects-secction.png (no junto al heading). */}
      <div className="mt-6 flex justify-end gap-3 sm:mt-8">
        <button
          type="button"
          aria-label="Proyecto anterior"
          disabled={atStart}
          onClick={() => scrollByCard(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Siguiente proyecto"
          disabled={atEnd}
          onClick={() => scrollByCard(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-transparent"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
