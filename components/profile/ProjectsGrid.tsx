import type { Project } from "@/content/site";
import type { OtherProjectRef } from "@/content/developers";
import { ProjectCard, type ProjectCardData } from "@/components/ui/ProjectCard";

/**
 * "Proyectos añadidos": los `Project` (content/site.ts) cuyo `developerSlug`
 * coincide con este desarrollador — la relación se deriva de esos datos, no
 * se duplica en `Developer` (ver design.md "Data model": una sola fuente de
 * verdad para el vínculo). Sección completa omitida si no hay proyectos
 * vinculados (specs/developer-profiles "Added projects list...").
 */
export function AddedProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="proyectos" className="scroll-mt-10 border-t border-[oklch(15%_0_0)]/10 px-5 py-14 sm:px-10 lg:px-24 lg:py-16">
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.28em] text-accent">
        PROYECTOS EN RUUM
      </p>
      <h2 className="mb-10 font-display text-[26px] font-bold text-[oklch(15%_0_0)] sm:text-[32px]">
        Proyectos añadidos
      </h2>
      {/* Imagen 420×500 en el diseño Figma (proporción 21/25). */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[18px]">
        {projects.map((project) => {
          const card: ProjectCardData = {
            name: project.name,
            location: project.location,
            image: project.image,
            href: project.href,
          };
          return (
            <ProjectCard
              key={project.index}
              project={card}
              showDeveloper={false}
              theme="light"
              aspectRatio="21/25"
            />
          );
        })}
      </div>
    </section>
  );
}

/**
 * "Otros proyectos" (portafolio): lista propia del desarrollador, distinta
 * de la anterior — sin "Ver proyecto" (no observable en la referencia para
 * esta grilla). Sección completa omitida si no está configurada.
 */
export function OtherProjectsSection({ otherProjects }: { otherProjects?: OtherProjectRef[] }) {
  if (!otherProjects || otherProjects.length === 0) return null;

  return (
    <section className="border-t border-[oklch(15%_0_0)]/10 px-5 py-14 sm:px-10 lg:px-24 lg:py-16">
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.28em] text-accent">
        PORTAFOLIO
      </p>
      <h2 className="mb-10 font-display text-[36px] font-normal text-[oklch(15%_0_0)] sm:text-[40px]">
        Otros proyectos
      </h2>
      {/* Imagen 408×306 en el diseño Figma (proporción 4/3 exacta). */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
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
    </section>
  );
}
