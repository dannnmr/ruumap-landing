import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SECTION_IDS } from "@/lib/navigation";

const { heading, subcopy, primaryCta } = siteContent.closingCTA;

/**
 * Cambio de dirección explícito del usuario (2026-08-05, con captura de
 * referencia): pasa de un layout de dos columnas (texto + retrato) a un
 * único bloque centrado (heading + subcopy + CTA), sin foto ni datos de
 * contacto visibles.
 *
 * `siteContent.closingCTA.contact` (teléfono, email, foto, nombre) sigue
 * existiendo tal cual en `content/site.ts` — no se borró ningún dato, a
 * pedido explícito del usuario, por si se vuelve a mostrar más adelante.
 * Simplemente este componente ya no lo consume; para reactivarlo, volver a
 * desestructurar `contact` acá y reintroducir el bloque de teléfono/email
 * (y la foto, con su propia columna) que tenía la versión anterior — ver
 * historial de git de este archivo.
 */
export default function ClosingCTA() {
  return (
    <section
      id={SECTION_IDS.contacto}
      className="scroll-mt-24 overflow-hidden bg-background"
    >
      <div className="mx-auto flex max-w-[890px] flex-col items-center gap-7 px-5 py-24 text-center sm:px-10 sm:py-28 lg:py-32">
        <h2 className="font-display text-[clamp(30px,5vw,46px)] font-light leading-[1.15] tracking-tight text-white">
          {heading}
        </h2>
        <p className="max-w-full font-sans text-[15px] font-light leading-relaxed text-gray-300">
          {subcopy}
        </p>
        <Button
          href={primaryCta.href}
          variant="primary"
          className="rounded-[10px] px-9 font-normal py-4 text-sm sm:px-11 sm:py-[18px] sm:text-[15px]"
        >
          {primaryCta.label}
        </Button>
      </div>
    </section>
  );
}
