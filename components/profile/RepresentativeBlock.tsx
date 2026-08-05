import Image from "next/image";
import type { Developer } from "@/content/developers";
import { getInitials } from "@/lib/utils";

/**
 * Foto/nombre/rol/cita del representante del desarrollador — omitido por
 * completo si no hay representante configurado; si falta solo la foto, cae
 * a un placeholder de iniciales en vez de una imagen rota (ver
 * specs/developer-profiles "Representative block presents the configured
 * spokesperson").
 */
export function RepresentativeBlock({ developer }: { developer: Developer }) {
  const representative = developer.representative;
  if (!representative) return null;

  return (
    <section className="grid grid-cols-1 gap-8 px-5 py-14 sm:px-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12 lg:px-24 lg:py-16">
      {/* 540×400 en el diseño Figma (proporción 27/20), igual que la imagen
          principal de ProfileInfoBlock. */}
      <div className="relative aspect-[27/20] w-full overflow-hidden rounded-xl bg-[oklch(15%_0_0)] lg:max-w-[540px]">
        {representative.photo ? (
          <Image
            src={representative.photo.src}
            alt={representative.photo.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center font-display text-[40px] font-bold text-white"
            aria-hidden="true"
          >
            {getInitials(representative.name)}
          </div>
        )}
      </div>

      <div>
        <p className="mb-4 text-[12px] font-normal uppercase tracking-[0.28em] text-accent">
          {representative.name}
        </p>
        <h2 className="mb-4 font-display text-[35px] font-normal leading-tight text-[oklch(15%_0_0)] sm:text-[40px]">
          {representative.role}
        </h2>
        {representative.quote && (
          <p className="text-[16px] leading-relaxed font-normal text-[oklch(35%_0_0)]">{representative.quote}</p>
        )}
      </div>
    </section>
  );
}
