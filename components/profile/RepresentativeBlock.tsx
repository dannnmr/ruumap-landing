import Image from "next/image";
import type { Developer } from "@/content/developers";
import { getInitials } from "@/lib/utils";

/**
 * Bloque del representante del desarrollador adaptado 1 a 1 con la especificación de Figma:
 * padding: 64px (px-16 py-16), gap: 48px (gap-12), max-w-[1312px] mx-auto.
 */
export function RepresentativeBlock({ developer }: { developer: Developer }) {
  const representative = developer.representative;
  if (!representative) return null;

  return (
    <section className="bg-white px-6 py-12 lg:px-16">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        {/* Foto del representante */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#141414]">
          {representative.photo ? (
            <Image
              src={representative.photo.src}
              alt={representative.photo.alt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
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

        {/* Información y biografía del representante */}
        <div className="flex flex-col gap-4">
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.25em] text-[#D78951]">
            {representative.name}
          </p>
          <h2 className="font-display text-[28px] font-light leading-[1.15] tracking-tight text-[#141414] sm:text-[36px] lg:text-[40px]">
            {representative.role}
          </h2>
          {representative.quote && (
            <p className="font-sans text-[15px] font-light leading-relaxed text-[#404040] sm:text-[16px]">
              {representative.quote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
