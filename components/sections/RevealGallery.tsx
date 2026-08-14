"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteContent, type Project } from "@/content/site";
import { getDeveloperBySlug } from "@/content/developers";
import { SECTION_IDS } from "@/lib/navigation";
import { ProjectCard, type ProjectCardData } from "@/components/ui/ProjectCard";
import { useSectionViewTracking } from "@/hooks/useSectionViewTracking";

const { eyebrow, heading, projects } = siteContent.revealGallery;

/**
 * Mapea `Project` (content/site.ts) a la forma agnóstica que consume
 * `ProjectCard`, resolviendo `profileHref` cuando el desarrollador
 * referenciado por `developerSlug` existe en content/developers.ts.
 */
function toCardData(project: Project): ProjectCardData {
  const developer = project.developerSlug ? getDeveloperBySlug(project.developerSlug) : undefined;

  return {
    name: project.name,
    developer: project.developer,
    location: project.location,
    image: project.image,
    href: project.href,
    profileHref: developer ? `/desarrolladores/${developer.slug}` : undefined,
  };
}

/**
 * Catálogo de proyectos: carrusel de tarjetas compactas con scroll nativo +
 * scroll-snap (sin GSAP, sin dependencias nuevas), alineado con
 * docs/references/projects-secction.png. Reemplaza los paneles verticales
 * full-bleed anteriores — ver design.md del change
 * `complete-remaining-ruum-landing`. La tarjeta en sí (imagen, nombre,
 * desarrollador, ubicación, "Ver proyecto") vive en
 * `components/ui/ProjectCard.tsx`, reutilizada acá y en los perfiles de
 * desarrollador (`components/profile/`) — ver el change
 * `add-reusable-developer-profiles`.
 */
export default function RevealGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Índice de la tarjeta "activa" para las flechas. Se navega siempre a un
  // target absoluto (ver scrollByCard) en vez de acumular deltas relativos
  // sobre track.scrollLeft — con scroll-snap + scroll smooth en mobile, dos
  // clicks seguidos (next → prev) pueden superponerse con la animación
  // anterior todavía en vuelo, y leer scrollLeft en ese momento da un valor
  // intermedio: el segundo click entonces no vuelve exactamente a la
  // posición original. Trackear el índice evita depender de ese timing.
  const activeIndexRef = useRef(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  useSectionViewTracking(sectionRef, "projects");

  const getCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));
  }, []);

  // Resincroniza el índice activo con la posición real de scroll (soporta
  // swipe manual). Se corre solo cuando el scroll ya se asentó (scrollend),
  // no en cada tick — si se recalculara durante la animación smooth de un
  // click en las flechas, pisaría el índice "optimista" recién fijado.
  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current;
    const cards = getCards();
    if (!track || cards.length === 0) return;
    let closest = 0;
    let closestDelta = Infinity;
    cards.forEach((card, idx) => {
      const delta = Math.abs(card.offsetLeft - track.scrollLeft);
      if (delta < closestDelta) {
        closestDelta = delta;
        closest = idx;
      }
    });
    activeIndexRef.current = closest;
  }, [getCards]);

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    syncActiveIndex();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateEdges, { passive: true });
    track.addEventListener("scrollend", syncActiveIndex, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      track.removeEventListener("scrollend", syncActiveIndex);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges, syncActiveIndex]);

  function scrollByCard(direction: 1 | -1) {
    const cards = getCards();
    if (cards.length === 0) return;
    const nextIndex = Math.min(Math.max(activeIndexRef.current + direction, 0), cards.length - 1);
    activeIndexRef.current = nextIndex;
    cards[nextIndex].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.proyectos}
      className="scroll-mt-24 px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-16"
    >
      <div className="mb-10 sm:mb-14">
        <p className="mb-4 font-sans text-[12px] font-light uppercase tracking-[0.28em] text-accent sm:mb-[18px] sm:text-[13px]">
          {eyebrow}
        </p>
        <h2 className="max-w-[900px] font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white">
          {heading}
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:gap-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <div key={project.index} className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[380px]">
            <ProjectCard project={toCardData(project)} theme="dark" />
          </div>
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
