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
  nosotros: "nosotros",
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

/**
 * Realiza un scroll suave hacia el hash especificado respetando Lenis y la
 * posición exacta de elementos estáticos y tarjetas apiladas (sticky).
 */
export function scrollToHash(hash: string, lenis: any) {
  if (typeof window === "undefined" || !lenis || !hash) return;

  const hashIndex = hash.indexOf("#");
  const cleanHash = hashIndex !== -1 ? hash.substring(hashIndex) : `#${hash}`;

  // Caso especial: Tarjeta "VISTAS 360°" / "Recorridos 3D" en FeatureSection (stack sticky)
  if (cleanHash === "#recorridos-3d" || cleanHash === "#vistas-360") {
    const featureSection = document.getElementById(SECTION_IDS.servicios);
    const cardEl = document.getElementById("recorridos-3d");
    if (featureSection) {
      const sectionTop = featureSection.getBoundingClientRect().top + window.scrollY;
      const cardHeight = cardEl?.clientHeight || window.innerHeight - NAV_OFFSET_PX;

      // Card 02 tiene índice 1 (segunda carta apilada)
      const targetScroll = sectionTop - NAV_OFFSET_PX + 1 * cardHeight;
      lenis.scrollTo(targetScroll);
      window.history.pushState(null, "", cleanHash);
      return;
    }
  }

  const targetEl = document.querySelector(cleanHash);
  if (targetEl) {
    lenis.scrollTo(cleanHash);
    window.history.pushState(null, "", cleanHash);
  }
}
