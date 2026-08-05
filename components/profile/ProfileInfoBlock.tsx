import Image from "next/image";
import type { Developer } from "@/content/developers";

/**
 * Descripción / misión / visión del desarrollador, junto a su imagen
 * principal — cada campo es independientemente opcional (ver
 * specs/developer-profiles "Narrative block presents description, mission,
 * and vision"). No se renderiza nada si ninguno de los cuatro campos está
 * configurado.
 */
export function ProfileInfoBlock({ developer }: { developer: Developer }) {
  const hasText = developer.description || developer.mission || developer.vision;
  if (!hasText && !developer.mainImage) return null;

  return (
    <section
      id="caracteristicas"
      className="grid scroll-mt-10 grid-cols-1 gap-10 px-5 py-14 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-12 lg:px-24 lg:py-16"
    >
      {hasText && (
        <div>
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-accent">
            {developer.name}
          </p>

          {developer.description && (
            <p className="mb-6 text-[14.5px] leading-relaxed text-[oklch(35%_0_0)]">
              {developer.description}
            </p>
          )}

          {developer.mission && (
            <div className="mb-5">
              <p className="mb-1.5 text-[13px] font-semibold text-[oklch(15%_0_0)]">Misión</p>
              <p className="text-[14.5px] leading-relaxed text-[oklch(35%_0_0)]">{developer.mission}</p>
            </div>
          )}

          {developer.vision && (
            <div>
              <p className="mb-1.5 text-[13px] font-semibold text-[oklch(15%_0_0)]">Visión</p>
              <p className="text-[14.5px] leading-relaxed text-[oklch(35%_0_0)]">{developer.vision}</p>
            </div>
          )}
        </div>
      )}

      {developer.mainImage && (
        // 540×400 en el diseño Figma (proporción 27/20) — max-w para no
        // estirarse de más en columnas anchas, se achica en mobile.
        <div className="relative aspect-[27/20] w-full overflow-hidden rounded-xl bg-[oklch(90%_0_0)] lg:max-w-[540px]">
          <Image
            src={developer.mainImage.src}
            alt={developer.mainImage.alt}
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  );
}
