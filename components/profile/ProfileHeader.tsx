import Image from "next/image";
import type { Developer } from "@/content/developers";
import { getInitials } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialLinks";

/**
 * Encabezado del perfil: imagen de portada + fila de identidad (logo,
 * nombre, slogan) y contacto (dirección, sitio web, redes sociales).
 * Adaptado 1 a 1 con Figma (cover.desarrollador.inmobiliario):
 * padding 0 80px (px-5 sm:px-10 lg:px-[80px]), pb-12 (48px bottom),
 * max-w-[1440px], logo offset -48px (-mt-12), gap 32px.
 */
export function ProfileHeader({ developer }: { developer: Developer }) {
  return (
    <header id="inicio" className="scroll-mt-6 bg-white">
      {developer.coverImage && (
        <div className="relative h-52 w-full overflow-hidden bg-[oklch(90%_0_0)] sm:h-64 lg:h-80">
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

      <div className="w-full border-b border-[#E5E5E5] px-6 pb-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Identidad del desarrollador (Logo + Nombre + Slogan) — Gap exacto de 42px al texto */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-[42px]">
            {/* Logo superpuesto a la portada (-mt-12 = -48px) con borde blanco */}
            {developer.logo ? (
              <div className="relative -mt-12 h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-[3px] border-white bg-black shadow-xl sm:-mt-12 sm:h-32 sm:w-32 lg:h-[136px] lg:w-[136px]">
                <Image src={developer.logo.src} alt={developer.logo.alt} fill className="object-contain p-2" />
              </div>
            ) : (
              <div
                className="relative -mt-12 flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-[3px] border-white bg-black font-display text-[26px] font-bold text-white shadow-xl sm:-mt-12 sm:h-32 sm:w-32 sm:text-[36px] lg:h-[136px] lg:w-[136px] lg:text-[42px]"
                aria-hidden="true"
              >
                {getInitials(developer.name)}
              </div>
            )}

            <div className="pt-2 sm:pb-1">
              <h1 className="font-display text-[28px] font-semibold leading-tight tracking-tight text-[#141414] sm:text-[32px] lg:text-[36px]">
                {developer.name}
              </h1>
              {developer.slogan && (
                <p className="mt-1 font-sans text-[14px] font-medium text-[#737373] sm:text-[15px]">
                  {developer.slogan}
                </p>
              )}
            </div>
          </div>

          {/* Bloque de Contacto — Espacio superior exacto de 28px (pt-[28px]) */}
          <div className="flex flex-col gap-2.5 pt-[28px] sm:items-end sm:text-right sm:pb-1">
            {developer.social && developer.social.length > 0 && (
              <SocialLinks social={developer.social} theme="light" className="sm:justify-end" />
            )}
            <div className="font-sans text-[13px] font-normal leading-snug text-[#737373] sm:text-right sm:text-[13.5px]">
              {developer.address && <p className="leading-snug">{developer.address}</p>}
              {developer.website && (
                <a
                  href={developer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[13.5px] font-medium text-[#141414] transition-colors duration-300 hover:text-[#D78951]"
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
