"use client";

import { logos } from "@/content/logos";
import { Marquee } from "@/components/ui/Marquee";

const row1 = logos.filter((logo) => logo.row === 1);
const row2 = logos.filter((logo) => logo.row === 2);

/**
 * Sección "Empresas relacionadas y clientes del ecosistema Ruum.": dos
 * filas de marquee en direcciones opuestas, alimentadas desde
 * content/logos.ts.
 */
export default function Logos() {
  return (
    <section className="px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto mb-14 max-w-[720px] text-center sm:mb-20">
        <h2 className="mb-4 font-display text-[clamp(26px,4vw,40px)] font-extralight leading-[1.2] tracking-tight text-white">
          Empresas relacionadas y clientes del ecosistema Ruum.
        </h2>
        <p className="font-sans text-[12px] font-extralight uppercase tracking-[0.4em] text-accent">
          Partners | Clientes | Desarrolladores inmobiliarios | Constructoras | Software
        </p>
      </div>

      <div className="flex flex-col gap-14 sm:gap-16">
        <Marquee direction="left">
          {row1.map((logo) => (
            <div
              key={logo.name}
              className="flex aspect-3/2 w-30 items-center justify-center sm:w-45 lg:w-60 p-4 sm:p-6 lg:p-8"
            >
              <img
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                className="h-full w-full object-contain opacity-60 grayscale"
              />
            </div>
          ))}
        </Marquee>

        <Marquee direction="right">
          {row2.map((logo) => (
            <div
              key={logo.name}
              className="flex aspect-3/2 w-30 items-center justify-center sm:w-45 lg:w-60 p-4 sm:p-6 lg:p-8"
            >
              <img
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                className="h-full w-full object-contain opacity-60 grayscale"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
