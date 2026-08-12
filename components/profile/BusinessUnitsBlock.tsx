import Image from "next/image";
import type { BusinessUnit, Developer } from "@/content/developers";
import { BUSINESS_LOGOS } from "@/components/icons/business";

function BusinessUnitLogoItem({ unit }: { unit: BusinessUnit }) {
  // 1. Contenido SVG Inline/Raw directo desde Strapi CMS
  if (unit.rawSvg) {
    return (
      <div
        className="h-11 sm:h-12 lg:h-[52px] w-auto max-w-[220px] text-[#141414] [&>svg]:h-full [&>svg]:w-auto [&>svg]:fill-current"
        dangerouslySetInnerHTML={{ __html: unit.rawSvg }}
      />
    );
  }

  // 2. URL de archivo SVG o Imagen subida a Strapi CMS Media Library
  const strapiSrc = unit.svgUrl || unit.logo?.src;
  if (strapiSrc) {
    const isSvg = strapiSrc.endsWith(".svg") || strapiSrc.includes(".svg?") || strapiSrc.includes("/svg");
    return (
      <Image
        src={strapiSrc}
        alt={unit.logo?.alt || unit.name}
        width={unit.logo?.width || 220}
        height={unit.logo?.height || 64}
        unoptimized={isSvg}
        className="h-11 sm:h-12 lg:h-[52px] w-auto object-contain text-[#141414]"
      />
    );
  }

  // 3. Componente SVG vectorial local (fallback)
  const IconComponent = unit.iconKey ? BUSINESS_LOGOS[unit.iconKey] : null;
  if (IconComponent) {
    return <IconComponent className="h-11 sm:h-12 lg:h-[52px] w-auto text-[#141414]" />;
  }

  // 4. Fallback de texto tipográfico
  return (
    <span className="font-display text-[24px] font-light tracking-wide text-[#141414] sm:text-[28px]">
      {unit.name}
    </span>
  );
}

/**
 * Sección de "Unidades de Negocios" (Holding / Ecosistema) adaptada 1 a 1 con Figma:
 * Layer: unidades.de.negocios
 * Padding: 64px 128px 96px 128px (pt-16 pb-[96px] px-6 lg:px-16), max-w-[1440px].
 * Flex col, align-center, gap: 96px entre cabecera y logos.
 * Logos en 2 filas: Fila 1 (4 logos, gap 96px), Fila 2 (3 logos, gap 96px), gap vertical 48px.
 * Preparado para consumir SVGs inline o por URL desde Strapi CMS.
 */
export function BusinessUnitsBlock({ developer }: { developer: Developer }) {
  const businessUnits = developer.businessUnits;
  if (!businessUnits || !businessUnits.units || businessUnits.units.length === 0) {
    return null;
  }

  const eyebrowText = businessUnits.eyebrow || `${developer.name.toUpperCase()} HOLDING`;

  const row1Units = businessUnits.units.slice(0, 4);
  const row2Units = businessUnits.units.slice(4);

  return (
    <section className="bg-white px-6 pb-[96px] pt-16 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[96px]">
        {/* Cabecera de la sección */}
        <div className="flex max-w-[680px] flex-col items-center text-center">
          <p className="mb-3 font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-[#D78951]">
            {eyebrowText}
          </p>
          <h2 className="mb-4 font-display text-[32px] font-light tracking-tight text-[#141414] sm:text-[40px]">
            {businessUnits.title}
          </h2>
          {businessUnits.description && (
            <p className="font-sans text-[15px] font-light leading-relaxed text-[#292929] sm:text-[16px]">
              {businessUnits.description}
            </p>
          )}
        </div>

        {/* Distribución de Logos en 2 filas (Fila 1: 4 logos, Fila 2: 3 logos) */}
        <div className="flex w-full flex-col items-center gap-[48px]">
          {/* Fila 1 (assert, STRATTO, STRATTO HOME, Itaguá) */}
          <div className="flex w-full flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-[96px]">
            {row1Units.map((unit) => (
              <div
                key={unit.name}
                className="flex h-16 items-center justify-center px-2 transition-opacity duration-300 hover:opacity-80"
              >
                <BusinessUnitLogoItem unit={unit} />
              </div>
            ))}
          </div>

          {/* Fila 2 (Frak, STTO CAPITAL, jōm) */}
          {row2Units.length > 0 && (
            <div className="flex w-full flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-[96px]">
              {row2Units.map((unit) => (
                <div
                  key={unit.name}
                  className="flex h-16 items-center justify-center px-2 transition-opacity duration-300 hover:opacity-80"
                >
                  <BusinessUnitLogoItem unit={unit} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
