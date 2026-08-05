/**
 * Fuente única de verdad para los logos de la sección "Empresas
 * relacionadas y clientes del ecosistema Ruum." — ningún logo debe
 * hardcodearse en JSX; agregar, quitar o reordenar empresas se hace
 * exclusivamente acá.
 *
 * Los `src` apuntan a los SVG reales de cada empresa, provistos por el
 * product owner (public/images/logos/*.svg). Nombres confirmados: son los
 * observables en docs/references/landing-desktop.png.
 */

export type LogoItem = {
  name: string;
  src: string;
  /** Fila del marquee en la que aparece (ver components/sections/Logos.tsx). */
  row: 1 | 2;
};

export const logos: LogoItem[] = [
  { name: "STTO Group", src: "/images/logos/stto_logo.svg", row: 1 },
  {
    name: "GuiArte Studio",
    src: "/images/logos/guiarte.studio.logo.svg",
    row: 1,
  },
  {
    name: "Castillo Arquitectura",
    src: "/images/logos/castillo.arquitectura.svg",
    row: 1,
  },
  {
    name: "Itaguá Condominio",
    src: "/images/logos/itagua_logo.svg",
    row: 1,
  },
  { name: "Stratto Vind", src: "/images/logos/stratto_vind_logo.svg", row: 1 },
  { name: "Buen Retiro", src: "/images/logos/buen_retiro_logo.svg", row: 2 },
  { name: "PV Norte", src: "/images/logos/pvnorte_logo.svg", row: 2 },
  { name: "Artemis Tower", src: "/images/logos/artemis_logo.svg", row: 2 },
  { name: "Frak", src: "/images/logos/frak_logo_overdark.svg", row: 2 },
  {
    name: "Kohler & Weiss",
    src: "/images/logos/kohler_weiss_logo.svg",
    row: 2,
  },
];
