import Image from "next/image";
import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SECTION_IDS } from "@/lib/navigation";

const { heading, subcopy, primaryCta, contact } = siteContent.closingCTA;

/**
 * Nota de implementación: la referencia visual principal para esta sección
 * es fondo oscuro sólido + retrato en blanco y negro sangrando a la
 * derecha (sin imagen de fondo a pantalla completa) — el
 * `backgroundImage`/parallax que tenía la implementación anterior no
 * corresponde a ningún elemento observable en la referencia para este
 * bloque, así que se reemplaza por este layout de dos columnas. Ver
 * tasks.md del change `complete-remaining-ruum-landing`, grupo 7.
 *
 * La columna de texto NO reparte 50/50 con la foto (eso dejaba el padding
 * derecho de 128px invisible entre cientos de píxeles de espacio sin usar,
 * ya que el copy es mucho más angosto que el 50% del viewport): es un
 * flex-item que se ajusta a su contenido (`max-w` + `shrink-0`), y la foto
 * es el que crece (`flex-1`) para ocupar el resto y llegar al borde real.
 * Ver tasks.md, grupo 14.
 */
export default function ClosingCTA() {
  return (
    <section id={SECTION_IDS.contacto} className="scroll-mt-24 overflow-hidden bg-background">
      <div className="flex flex-col justify-between gap-10 px-5 py-20 sm:px-10 sm:py-24 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:py-24 xl:px-32">
        <div className="flex flex-col justify-center gap-7 lg:max-w-[622px] lg:shrink-0">
          <h2 className="font-display text-[clamp(30px,5vw,46px)] font-light leading-[1.1] tracking-tight text-white">
            {heading}
          </h2>
          <p className="font-sans text-[15px] font-light leading-relaxed text-gray-300">
            {subcopy}
          </p>
          <div>
            <Button
              href={primaryCta.href}
              variant="primary"
              className="rounded-[10px] px-9 py-4 text-sm sm:px-11 sm:py-[18px] sm:text-[15px]"
            >
              {primaryCta.label}
            </Button>
          </div>

          <div className="flex flex-col gap-3 pt-4 text-[14.5px] font-medium text-gray-200">
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="flex w-fit items-center gap-3 transition-colors duration-300 hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-accent">
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
                  fill="currentColor"
                />
              </svg>
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex w-fit items-center gap-3 transition-colors duration-300 hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-accent">
                <path
                  d="M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path d="m4 6.5 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {contact.email}
            </a>
          </div>
        </div>

        <div className="relative h-[45vh] w-full min-w-0 overflow-hidden rounded-2xl sm:h-[55vh] lg:h-[520px] lg:flex-1">
          <Image
            src={contact.photo.src}
            alt={contact.photo.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/50 lg:via-transparent lg:to-transparent" />
          <p className="absolute bottom-6 right-6 font-sans text-[12px] font-semibold uppercase tracking-[0.15em] text-white drop-shadow-lg sm:bottom-10 sm:right-10">
            {contact.name}
          </p>
        </div>
      </div>
    </section>
  );
}
