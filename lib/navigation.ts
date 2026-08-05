/**
 * Fuente única de verdad para los identificadores de sección usados por la
 * navegación interna. `content/site.ts` (labels/CTA) y cada sección destino
 * (`RevealGallery`, `FeatureSection`, `HowItWorks`, `ClosingCTA`) importan de
 * acá — ningún id de sección debe volver a declararse como string literal
 * independiente en otro archivo.
 *
 * "Testimonios" aparece en la referencia visual principal
 * (docs/references/landing-desktop.png) pero esa sección todavía no existe
 * en la landing. Se deja fuera de este registro a propósito — agregar su id
 * acá (y su entrada en `siteContent.nav.links`) cuando la sección se
 * construya.
 */
export const SECTION_IDS = {
  proyectos: "proyectos",
  servicios: "servicios",
  proceso: "proceso",
  contacto: "contacto",
} as const;

export type SectionId = keyof typeof SECTION_IDS;

/** Construye el href interno (`#proyectos`, etc.) para un id de sección. */
export function sectionHref(id: SectionId): string {
  return `#${SECTION_IDS[id]}`;
}

/**
 * Alto del header fijo (Navbar), en píxeles. Fuente única para el offset de
 * scroll hacia una sección: debe coincidir con la clase `scroll-mt-24`
 * (6rem = 96px) que ya usan `RevealGallery`, `FeatureSection`, `HowItWorks`
 * y `ClosingCTA` en su elemento raíz, y es el valor a pasar como `offset` a
 * `lenis.scrollTo()` si una verificación en ejecución determina que Lenis no
 * respeta `scroll-margin-top` por sí solo. Si el alto del header cambia,
 * actualizar este valor y las clases `scroll-mt-*` de esas cuatro secciones
 * juntos — no introducir un segundo número hardcodeado en ningún otro lugar.
 */
export const NAV_OFFSET_PX = 96;
