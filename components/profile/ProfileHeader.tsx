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
    <header id="inicio" className="scroll-mt-6 bg-white">
      {developer.coverImage && (
        <div className="relative h-50 w-full overflow-hidden bg-[oklch(90%_0_0)] sm:h-55 lg:h-70">
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

      <div className="border-b border-[oklch(15%_0_0)]/10 px-5 pb-8 sm:px-10 lg:px-24 lg:pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 lg:gap-7">
            {/* Logo superpuesto a la portada con sombra y borde blanco */}
            {developer.logo ? (
              <div className="relative -mt-14 h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-[3px] border-white bg-black shadow-xl sm:-mt-16 sm:h-36 sm:w-36 lg:-mt-20 lg:h-[160px] lg:w-[160px]">
                <Image src={developer.logo.src} alt={developer.logo.alt} fill className="object-contain p-2" />
              </div>
            ) : (
              <div
                className="relative -mt-14 flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border-[3px] border-white bg-black font-display text-[28px] font-bold text-white shadow-xl sm:-mt-16 sm:h-36 sm:w-36 sm:text-[40px] lg:-mt-20 lg:h-[160px] lg:w-[160px] lg:text-[48px]"
                aria-hidden="true"
              >
                {getInitials(developer.name)}
              </div>
            )}

            <div className="pt-2 sm:pb-1">
              <h1 className="font-display text-[28px] font-bold leading-none tracking-tight text-surface sm:text-[34px] lg:text-[44px]">
                {developer.name}
              </h1>
              {developer.slogan && (
                <p className="mt-2 text-[14px] font-medium text-[oklch(45%_0_0)] lg:text-[18px]">
                  {developer.slogan}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end sm:pb-1">
            {developer.social && developer.social.length > 0 && (
              <SocialLinks social={developer.social} theme="light" />
            )}
            <div className="text-[13.5px] font-normal leading-relaxed text-[oklch(45%_0_0)] sm:text-right lg:text-[15px]">
              {developer.address && <p>{developer.address}</p>}
              {developer.website && (
                <a
                  href={developer.website}
                  className="mt-0.5 inline-block text-[oklch(35%_0_0)] transition-colors duration-300 hover:text-accent"
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
