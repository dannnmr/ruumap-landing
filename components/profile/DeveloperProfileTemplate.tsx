import type { Developer } from "@/content/developers";
import type { Project } from "@/content/site";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfoBlock } from "@/components/profile/ProfileInfoBlock";
import { RepresentativeBlock } from "@/components/profile/RepresentativeBlock";
import { BusinessUnitsBlock } from "@/components/profile/BusinessUnitsBlock";
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

export function DeveloperProfileTemplate({ developer, addedProjects }: DeveloperProfileTemplateProps) {
  return (
    <div className="bg-[oklch(98%_0_0)] font-sans text-[oklch(15%_0_0)]">
      <ProfileHeader developer={developer} />

      {developer.video && (
        <section className="bg-white px-6 py-12 lg:px-16">
          {/* Tarjeta de video destacada con sombra y proporciones de la referencia visual */}
          <VideoPlayer video={developer.video} className="mx-auto lg:max-w-[720px]" />
        </section>
      )}

      <ProfileInfoBlock developer={developer} />
      <RepresentativeBlock developer={developer} />
      <BusinessUnitsBlock developer={developer} />
      <AddedProjectsSection projects={addedProjects} />
      <OtherProjectsSection otherProjects={developer.otherProjects} />
      <PressSection developer={developer} />

      <ProfileFooter developer={developer} />
    </div>
  );
}
