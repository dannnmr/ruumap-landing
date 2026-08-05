import Image from "next/image";
import type { Developer } from "@/content/developers";
import { getInitials } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialLinks";

/**
 * Encabezado del perfil: imagen de portada + fila de identidad (logo,
 * nombre, slogan) y contacto (dirección, sitio web, redes). Cada campo
 * opcional se omite individualmente cuando no está configurado — ver
 * specs/developer-profiles "Profile header presents core identity and
 * contact fields".
 */
export function ProfileHeader({ developer }: { developer: Developer }) {
  return (
    <header id="inicio" className="scroll-mt-6">
      {developer.coverImage && (
        <div className="relative h-[160px] w-full overflow-hidden bg-[oklch(90%_0_0)] sm:h-[210px] lg:h-[280px]">
          <Image
            src={developer.coverImage.src}
            alt={developer.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-6 border-b border-[oklch(15%_0_0)]/10 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-20 lg:py-10">
        <div className="flex items-center gap-5 lg:gap-6">
          {developer.logo ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[oklch(15%_0_0)] sm:h-28 sm:w-28 lg:h-[180px] lg:w-[180px]">
              <Image src={developer.logo.src} alt={developer.logo.alt} fill className="object-contain" />
            </div>
          ) : (
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[oklch(15%_0_0)] font-display text-[20px] font-bold text-white sm:h-28 sm:w-28 sm:text-[32px] lg:h-[180px] lg:w-[180px] lg:text-[48px]"
              aria-hidden="true"
            >
              {getInitials(developer.name)}
            </div>
          )}

          <div>
            <h1 className="font-display text-[22px] font-bold leading-tight text-[oklch(15%_0_0)] sm:text-[28px] lg:text-[32px]">
              {developer.name}
            </h1>
            {developer.slogan && (
              <p className="mt-1.5 text-[13.5px] text-[oklch(45%_0_0)] lg:text-[15px]">{developer.slogan}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          {developer.social && developer.social.length > 0 && (
            <SocialLinks social={developer.social} theme="light" />
          )}
          <div className="text-[12.5px] leading-relaxed text-[oklch(45%_0_0)] sm:text-right">
            {developer.address && <p>{developer.address}</p>}
            {developer.website && (
              <a
                href={developer.website}
                className="text-accent transition-opacity duration-300 hover:opacity-80"
              >
                {developer.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
