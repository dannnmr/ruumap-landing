import type { Developer } from "@/content/developers";
import type { Project } from "@/content/site";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfoBlock } from "@/components/profile/ProfileInfoBlock";
import { RepresentativeBlock } from "@/components/profile/RepresentativeBlock";
import { AddedProjectsSection, OtherProjectsSection } from "@/components/profile/ProjectsGrid";
import { PressSection } from "@/components/profile/PressCard";
import { ProfileFooter } from "@/components/profile/ProfileFooter";

export type DeveloperProfileTemplateProps = {
  developer: Developer;
  /** Proyectos de content/site.ts cuyo `developerSlug` referencia a este
   *  desarrollador — derivado por el caller (la ruta), no almacenado en
   *  `Developer` (ver design.md "Data model"). */
  addedProjects: Project[];
};

/**
 * Plantilla única y reutilizable para todo perfil de desarrollador —
 * ver docs/references/perfil.desarrollador.inmobiliario.png y
 * specs/developer-profiles. Cada sección se omite por completo cuando su
 * dato no está configurado; esta plantilla es la única responsable de esa
 * decisión (los componentes de sección hijos son presentacionales).
 *
 * Tema claro, propio de esta plantilla y de `components/profile/` — no
 * toca los tokens globales de `app/globals.css` ni el fondo oscuro del
 * resto de la landing (ver design.md "Profile visual theme is light,
 * scoped to components/profile/ and the new route only").
 */
export function DeveloperProfileTemplate({ developer, addedProjects }: DeveloperProfileTemplateProps) {
  return (
    <div className="bg-[oklch(98%_0_0)] font-sans text-[oklch(15%_0_0)]">
      <ProfileHeader developer={developer} />

      {developer.video && (
        <section className="px-5 py-14 sm:px-10 lg:px-24 lg:py-16">
          {/* Tarjeta de video destacada con sombra y proporciones de la referencia visual */}
          <VideoPlayer video={developer.video} className="mx-auto lg:max-w-[720px]" />
        </section>
      )}

      <ProfileInfoBlock developer={developer} />
      <RepresentativeBlock developer={developer} />
      <AddedProjectsSection projects={addedProjects} />
      <OtherProjectsSection otherProjects={developer.otherProjects} />
      <PressSection developer={developer} />

      <ProfileFooter developer={developer} />
    </div>
  );
}
