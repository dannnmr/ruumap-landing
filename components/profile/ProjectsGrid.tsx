"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/site";
import type { OtherProjectRef } from "@/content/developers";
import { ProjectCard, type ProjectCardData } from "@/components/ui/ProjectCard";

/**
 * "Proyectos añadidos": los proyectos de content/site.ts cuyo `developerSlug`
 * coincide con este desarrollador. Adaptado 1 a 1 con la especificación de Figma:
 * padding: 48px 64px, max-w-[1440px] mx-auto, eyebrow #D78951, título #141414.
 * Carrusel deslizable horizontalmente (horizontal scroll con snap), igual que en la landing.
 */
export function AddedProjectsSection({ projects }: { projects: Project[] }) {
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

  if (projects.length === 0) return null;

  return (
    <section id="proyectos" className="scroll-mt-10 bg-white px-6 py-12 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[18px]">
        <p className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-[#D78951]">
          PROYECTOS EN RUUM
        </p>
        <h2 className="font-display text-[32px] font-light tracking-tight text-[#141414] sm:text-[40px]">
          Proyectos añadidos
        </h2>

        {/* Carrusel deslizable a la derecha */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:gap-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => {
            const card: ProjectCardData = {
              name: project.name,
              location: project.location,
              image: project.image,
              href: project.href,
            };
            return (
              <div key={project.index} className="w-[82vw] shrink-0 snap-start sm:w-[50vw] lg:w-[416px]">
                <ProjectCard
                  project={card}
                  showDeveloper={false}
                  theme="light"
                  aspectRatio="3/4"
                />
              </div>
            );
          })}
        </div>

        {/* Botones de navegación si hay más proyectos de los que caben en pantalla */}
        {projects.length > 3 && (
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              aria-label="Proyecto anterior"
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#141414]/20 text-[#141414] transition-colors duration-300 hover:border-[#141414]/50 hover:bg-[#141414]/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#141414]/20 disabled:hover:bg-transparent"
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#141414]/20 text-[#141414] transition-colors duration-300 hover:border-[#141414]/50 hover:bg-[#141414]/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#141414]/20 disabled:hover:bg-transparent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * "Otros proyectos" (portafolio): lista de proyectos del desarrollador fuera de catálogo.
 */
export function OtherProjectsSection({ otherProjects }: { otherProjects?: OtherProjectRef[] }) {
  if (!otherProjects || otherProjects.length === 0) return null;

  return (
    <section className="bg-white px-6 py-12 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col">
        <p className="mb-2 font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-[#D78951]">
          PORTAFOLIO
        </p>
        <h2 className="mb-8 font-display text-[32px] font-light tracking-tight text-[#141414] sm:mb-10 sm:text-[40px]">
          Otros proyectos
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {otherProjects.map((project, index) => {
            const card: ProjectCardData = {
              name: project.name,
              location: project.location,
              image: project.image,
            };
            return (
              <ProjectCard
                key={`${project.name}-${index}`}
                project={card}
                showDeveloper={false}
                showAction={false}
                theme="light"
                aspectRatio="4/3"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
