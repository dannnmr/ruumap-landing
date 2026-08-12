import Image from "next/image";
import type { Developer } from "@/content/developers";

/**
 * Bloque de información del desarrollador (Descripción, Misión y Visión) adaptado 1 a 1 con Figma:
 * padding: 64px (px-16 py-16), gap: 48px (gap-12), max-w-[1312px] mx-auto.
 */
export function ProfileInfoBlock({ developer }: { developer: Developer }) {
  const hasText = developer.description || developer.mission || developer.vision;
  if (!hasText && !developer.mainImage) return null;

  return (
    <section
      id="caracteristicas"
      className="scroll-mt-10 bg-white px-6 py-12 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        {hasText && (
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[12px] font-medium uppercase tracking-[0.25em] text-[#D78951]">
              {developer.name}
            </p>
            <h2 className="font-display text-[28px] font-light leading-[1.15] tracking-tight text-[#141414] sm:text-[36px] lg:text-[40px]">
              Construyendo con innovación
            </h2>

            {developer.description && (
              <p className="mb-2 font-sans text-[15px] font-light leading-relaxed text-[#292929] sm:text-[16px]">
                {developer.description}
              </p>
            )}

            {developer.mission && (
              <div className="mb-2">
                <p className="mb-1 font-sans text-[15px] font-semibold text-[#141414] sm:text-[16px]">
                  Misión
                </p>
                <p className="font-sans text-[15px] font-light leading-relaxed text-[#292929] sm:text-[16px]">
                  {developer.mission}
                </p>
              </div>
            )}

            {developer.vision && (
              <div>
                <p className="mb-1 font-sans text-[15px] font-semibold text-[#141414] sm:text-[16px]">
                  Visión
                </p>
                <p className="font-sans text-[15px] font-light leading-relaxed text-[#292929] sm:text-[16px]">
                  {developer.vision}
                </p>
              </div>
            )}
          </div>
        )}

        {developer.mainImage && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#141414]">
            <Image
              src={developer.mainImage.src}
              alt={developer.mainImage.alt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
