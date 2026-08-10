import Image from "next/image";
import type { Developer } from "@/content/developers";
import { getInitials } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialLinks";

/**
 * Encabezado del perfil: imagen de portada + fila de identidad (logo,
 * nombre, slogan) y contacto (dirección, sitio web, redes sociales).
 * Diseñado según la especificación visual de Figma (max-width 377px en bloque
 * de contacto alineado a la derecha, proporciones exactas de logo y textos).
 */
export function ProfileHeader({ developer }: { developer: Developer }) {
  return (
    <header id="inicio" className="scroll-mt-6 bg-white">
      {developer.coverImage && (
        <div className="relative h-48 w-full overflow-hidden bg-[oklch(90%_0_0)] sm:h-60 lg:h-72">
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

      <div className="border-b border-[oklch(15%_0_0)]/10 px-5 pb-8 sm:px-10 lg:px-16 lg:pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Identidad del desarrollador (Logo + Nombre + Slogan) — Espacio exacto de 42.5px al texto */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-[42.5px]">
            {/* Logo superpuesto a la portada con sombra y borde blanco */}
            {developer.logo ? (
              <div className="relative -mt-12 h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-[3px] border-white bg-black shadow-xl sm:-mt-16 sm:h-32 sm:w-32 lg:-mt-18 lg:h-36 lg:w-36">
                <Image src={developer.logo.src} alt={developer.logo.alt} fill className="object-contain p-2" />
              </div>
            ) : (
              <div
                className="relative -mt-12 flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-[3px] border-white bg-black font-display text-[26px] font-bold text-white shadow-xl sm:-mt-16 sm:h-32 sm:w-32 sm:text-[36px] lg:-mt-18 lg:h-36 lg:w-36 lg:text-[42px]"
                aria-hidden="true"
              >
                {getInitials(developer.name)}
              </div>
            )}

            <div className="pt-2 sm:pb-1">
              <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-surface sm:text-[32px] lg:text-[38px]">
                {developer.name}
              </h1>
              {developer.slogan && (
                <p className="mt-1 text-[14px] font-medium text-[oklch(45%_0_0)] sm:text-[15px]">
                  {developer.slogan}
                </p>
              )}
            </div>
          </div>

          {/* Bloque de Contacto — Espacio superior exacto de 24px (pt-[24px]), W: 377px */}
          <div className="flex flex-col gap-3 pt-[24px] sm:max-w-[377px] sm:items-end sm:text-right sm:pb-1">
            {developer.social && developer.social.length > 0 && (
              <SocialLinks social={developer.social} theme="light" className="sm:justify-end" />
            )}
            <div className="text-[13px] font-normal leading-snug text-[oklch(45%_0_0)] sm:text-right sm:text-[13.5px]">
              {developer.address && <p className="leading-snug">{developer.address}</p>}
              {developer.website && (
                <a
                  href={developer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[13.5px] font-medium text-surface transition-colors duration-300 hover:text-accent"
                >
                  {developer.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
