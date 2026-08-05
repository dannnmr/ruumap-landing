import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Forma de datos mínima y agnóstica de origen para renderizar una tarjeta de
 * proyecto — tanto `RevealGallery` (catálogo de la landing, con `Project` de
 * content/site.ts) como `components/profile/` (con `Project` u
 * `OtherProjectRef` de content/developers.ts) mapean su propio dato a esta
 * forma en vez de que el componente conozca esos tipos.
 */
export type ProjectCardData = {
  name: string;
  developer?: string;
  location?: string;
  image: SiteImage;
  /**
   * URL del propio proyecto ("Ver proyecto"), interna o externa. La imagen y
   * el nombre navegan acá también — mismo destino, dos affordances (decisión
   * del usuario, 2026-08-05). Sin valor → ninguno de los dos navega, y "Ver
   * proyecto" se muestra no interactiva (ver showAction).
   */
  href?: string;
  /** Si está presente, la línea de desarrollador navega al perfil de ese
   *  desarrollador (siempre interna: `/desarrolladores/[slug]`). */
  profileHref?: string;
};

export type ProjectCardProps = {
  project: ProjectCardData;
  /** Oculta la línea de desarrollador — útil dentro del propio perfil de ese
   *  desarrollador, donde repetir su nombre es redundante. Default: true. */
  showDeveloper?: boolean;
  /** Renderiza la acción "Ver proyecto" (interactiva o no, según `href`).
   *  Default: true. La grilla "Otros proyectos" de un perfil la desactiva —
   *  esa grilla no tiene esa acción en la referencia visual. */
  showAction?: boolean;
  /** Paleta de texto: "dark" (landing, fondo oscuro) o "light" (perfil de
   *  desarrollador, fondo claro) — ver design.md, "Profile visual theme". */
  theme?: "dark" | "light";
  /**
   * Proporción imagen ancho/alto, como fracción Tailwind arbitraria (ej.
   * "21/25" para 420×500). Default "4/5": la proporción original del
   * catálogo de la landing (`RevealGallery`) — no cambiarlo ahí. Cada
   * grilla del perfil pasa la proporción del diseño Figma para esa grilla
   * en particular (ver ProjectsGrid.tsx).
   */
  aspectRatio?: string;
  className?: string;
};

const THEME_CLASSES = {
  dark: {
    name: "text-white",
    developer: "text-gray-400",
    location: "text-gray-400",
  },
  light: {
    name: "text-[oklch(18%_0_0)]",
    developer: "text-[oklch(45%_0_0)]",
    location: "text-[oklch(45%_0_0)]",
  },
} as const;

export function ProjectCard({
  project,
  showDeveloper = true,
  showAction = true,
  theme = "dark",
  aspectRatio = "4/5",
  className,
}: ProjectCardProps) {
  const palette = THEME_CLASSES[theme];

  const media = (
    <div
      className="relative overflow-hidden rounded-xl bg-surface"
      style={{ aspectRatio: aspectRatio.replace("/", " / ") }}
    >
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 60vw, 82vw"
        className="object-cover"
      />
    </div>
  );

  const heading = (
    <h3 className={cn("font-display text-[20px] font-light", palette.name)}>
      {project.name}
    </h3>
  );

  return (
    <article data-project-card className={cn("w-full", className)}>
      {project.href ? (
        <a href={project.href}>{media}</a>
      ) : (
        media
      )}

      <div className="pt-5">
        {project.href ? <a href={project.href}>{heading}</a> : heading}

        {showDeveloper && project.developer && (
          <p className="mt-1.5">
            {project.profileHref ? (
              <Link
                href={project.profileHref}
                className={cn(
                  "text-[11px] font-light uppercase tracking-[0.12em] transition-opacity duration-300 hover:opacity-70",
                  palette.developer
                )}
              >
                {project.developer}
              </Link>
            ) : (
              <span className={cn("text-[12px] font-light uppercase tracking-[0.12em]", palette.developer)}>
                {project.developer}
              </span>
            )}
          </p>
        )}
        {project.location && (
          <p className={cn("mt-2 text-[13.5px] font-light", palette.location)}>{project.location}</p>
        )}

        {showAction &&
          (project.href ? (
            <a
              href={project.href}
              className="mt-3 inline-block text-[14px] font-light text-accent transition-opacity duration-300 hover:opacity-80"
            >
              Ver proyecto
            </a>
          ) : (
            // Sin URL confirmada todavía — se muestra como acción pendiente,
            // no interactiva, en vez de inventar un destino (ver
            // Project.href en content/site.ts).
            <span
              aria-disabled="true"
              className="mt-3 inline-block cursor-not-allowed text-[13.5px] font-medium text-accent/50"
            >
              Ver proyecto
            </span>
          ))}
      </div>
    </article>
  );
}
