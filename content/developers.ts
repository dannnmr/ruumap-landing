/**
 * Fuente única de verdad para los perfiles de desarrolladores inmobiliarios
 * (ver docs/product-context.md y docs/page-structure.md, sección "Perfiles
 * inmobiliarios"). Colección separada de `siteContent` (content/site.ts)
 * porque no es copy de una sección de la landing sino una entidad propia,
 * referenciada desde ella — mismo criterio ya usado para separar
 * `content/logos.ts`.
 *
 * Ningún componente de `components/profile/` debería tener strings de
 * contenido hardcodeados: todo perfil se edita acá.
 *
 * IMPORTANTE — contenido provisional (decisión del usuario, 2026-08-05): los
 * tres desarrolladores de abajo reutilizan literalmente el mismo copy
 * observado en `docs/references/perfil.desarrollador.inmobiliario.png`
 * (que es, en rigor, el perfil de STTO Group), adaptado solo en el nombre
 * del desarrollador. Es contenido de relleno explícitamente marcado
 * (`status: "provisional"` + comentarios), a reemplazar por la información
 * real de cada desarrollador cuando esté disponible — no inventa empresas,
 * relaciones comerciales ni URLs nuevas más allá de lo observable en esa
 * referencia.
 */

import type { SiteImage, SiteVideo } from "./site";

export type SocialLink = {
  label: string;
  href: string;
};

export type PressNote = {
  outlet: string;
  headline: string;
  href: string;
  image?: SiteImage;
};

export type RelatedLink = {
  label: string;
  href: string;
};

export type Representative = {
  name: string;
  role: string;
  quote?: string;
  photo?: SiteImage;
};

/**
 * Entrada de la grilla "Otros proyectos" (portafolio) de un perfil. Distinta
 * de `Project` (content/site.ts): no viene del catálogo de la landing, no
 * tiene "Ver proyecto" (no observable en la referencia para esta grilla en
 * particular) y vive embebida en el propio `Developer`.
 */
export type OtherProjectRef = {
  name: string;
  location: string;
  image: SiteImage;
};

export type Developer = {
  slug: string;
  name: string;
  /** Sin logo real disponible todavía para ningún desarrollador — se deja
   *  `undefined` a propósito en los tres para que el perfil use el fallback
   *  de iniciales en vez de inventar un archivo de logo. */
  logo?: SiteImage;
  slogan?: string;
  coverImage?: SiteImage;
  social?: SocialLink[];
  address?: string;
  website?: string;
  video?: SiteVideo;
  description?: string;
  mission?: string;
  vision?: string;
  mainImage?: SiteImage;
  representative?: Representative;
  pressNotes?: PressNote[];
  relatedLinks?: RelatedLink[];
  otherProjects?: OtherProjectRef[];
  /** Ver Project.status (content/site.ts) — mismo criterio editorial. */
  status: "provisional" | "confirmed";
};

/** Reutilizado tal cual de siteContent.hero/about.video — mismo video/poster
 *  de prueba ya usado en Hero y AboutUs, mismo criterio de reuso. */
const PLACEHOLDER_VIDEO: SiteVideo = {
  src: "https://assets.mixkit.co/videos/49806/49806-720.mp4",
  poster: {
    src: "https://images.unsplash.com/photo-1767342976156-83239d26f08e?q=80&w=1920&auto=format&fit=crop",
    alt: "Arquitectura nocturna abstracta, fachadas de rascacielos en contraluz",
  },
};

/** Reutilizado de siteContent.closingCTA.contact.photo — mismo placeholder
 *  de retrato ya usado en la landing para un rol de "punto de contacto". */
const PLACEHOLDER_REPRESENTATIVE_PHOTO: SiteImage = {
  src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  alt: "Retrato del representante del desarrollador",
};

const PLACEHOLDER_COVER_IMAGE: SiteImage = {
  src: "https://images.unsplash.com/photo-1546412414-272690cb5cb3?q=80&w=1920&auto=format&fit=crop",
  alt: "Torre mixed-use de gran altura al atardecer",
};

/** Mismas 3 imágenes ya usadas en siteContent.revealGallery.projects — se
 *  reutilizan acá para las grillas "Proyectos añadidos"/"Otros proyectos"
 *  en vez de introducir assets nuevos. */
const ITAGUA_IMAGE: SiteImage = {
  src: "https://images.unsplash.com/photo-1563657296501-c3770ae0057b?q=80&w=1600&auto=format&fit=crop",
  alt: "Arquitectura residencial contemporánea con áreas comunes, proyecto Itaguá",
};
const BUEN_RETIRO_IMAGE: SiteImage = {
  src: "https://images.unsplash.com/photo-1655447844120-083802457b17?q=80&w=1600&auto=format&fit=crop",
  alt: "Torre residencial con jardines verticales integrados, proyecto Buen Retiro",
};
const ARTEMIS_IMAGE: SiteImage = {
  src: "https://images.unsplash.com/photo-1760259203238-01708384f7a2?q=80&w=1600&auto=format&fit=crop",
  alt: "Fachada de torre residencial de lujo con acabados de vidrio, proyecto Artemis",
};

/** Misma lista de "otros proyectos" reutilizada en los tres perfiles — la
 *  referencia (perfil.desarrollador.inmobiliario.png) muestra exactamente
 *  los mismos 3 proyectos duplicados en "Proyectos añadidos" y "Otros
 *  proyectos", así que se replica ese mismo patrón acá. */
const PLACEHOLDER_OTHER_PROJECTS: OtherProjectRef[] = [
  { name: "Itaguá", location: "Santa Cruz de la Sierra, Bolivia.", image: ITAGUA_IMAGE },
  { name: "Buen Retiro", location: "Santa Cruz de la Sierra, Bolivia.", image: BUEN_RETIRO_IMAGE },
  { name: "Artemis", location: "Santa Cruz de la Sierra, Bolivia.", image: ARTEMIS_IMAGE },
];

/** Mismas 3 notas de prensa observables en la referencia, reutilizadas
 *  literalmente en los tres perfiles (mismo criterio de replicación). */
const PLACEHOLDER_PRESS_NOTES: PressNote[] = [
  {
    outlet: "EL DEBER",
    headline: "Un nuevo edificio abre sus puertas",
    href: "#",
    image: {
      src: "https://images.unsplash.com/photo-1768230130990-6b4fe57778ce?q=80&w=1400&auto=format&fit=crop",
      alt: "Skyline moderno de edificios residenciales de lujo",
    },
  },
  {
    outlet: "EL DEBER",
    headline: "La tecnología impacta el hábitat",
    href: "#",
    image: {
      src: "https://images.unsplash.com/photo-1751711990617-bec0202c854a?q=80&w=1400&auto=format&fit=crop",
      alt: "Interior arquitectónico moderno con iluminación natural",
    },
  },
  {
    outlet: "EL DEBER",
    headline: "Liderazgo con visión",
    href: "#",
    image: PLACEHOLDER_REPRESENTATIVE_PHOTO,
  },
];

/** Mismo texto de descripción/misión/visión/representante observado en la
 *  referencia, reutilizado literalmente en los tres perfiles. */
const PLACEHOLDER_DESCRIPTION =
  "Con más de 10 años de experiencia, {name} se ha consolidado como líder en el sector inmobiliario, con más de 20 proyectos exitosos en áreas residenciales, comerciales e industriales en Bolivia. Nuestro compromiso con la innovación nos permite integrar las últimas tecnologías, como Building Information Modeling (BIM) y materiales ecoamigables, garantizando eficiencia y sostenibilidad en cada obra.";
const PLACEHOLDER_MISSION =
  "Transformar ideas en espacios funcionales y sostenibles, superando expectativas con calidad y responsabilidad.";
const PLACEHOLDER_VISION =
  "Ser referentes globales en construcción innovadora, contribuyendo al desarrollo urbano y al cuidado del medio ambiente.";

export const developers: Developer[] = [
  {
    slug: "stto-group",
    name: "STTO Group",
    slogan: "Bits Make Bricks",
    coverImage: PLACEHOLDER_COVER_IMAGE,
    social: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    // Dirección y sitio web leídos tal cual del texto visible en
    // perfil.desarrollador.inmobiliario.png (STTO Group) — no inventados.
    address: "Torre Alas, Piso 14. Centro Empresarial Equipetrol, Santa Cruz de la Sierra, Bolivia",
    website: "https://www.sttogroup.com",
    video: PLACEHOLDER_VIDEO,
    description: PLACEHOLDER_DESCRIPTION.replace("{name}", "STTO Group"),
    mission: PLACEHOLDER_MISSION,
    vision: PLACEHOLDER_VISION,
    mainImage: ITAGUA_IMAGE,
    representative: {
      name: "Carlos Zamorano Scott",
      role: "Liderazgo con visión",
      quote: PLACEHOLDER_DESCRIPTION.replace("{name}", "STTO Group"),
      photo: PLACEHOLDER_REPRESENTATIVE_PHOTO,
    },
    pressNotes: PLACEHOLDER_PRESS_NOTES,
    otherProjects: PLACEHOLDER_OTHER_PROJECTS,
    status: "provisional",
  },
  {
    slug: "kohler-weiss",
    name: "Kohler & Weiss Real Estate Development",
    // Provisional: slogan/dirección/sitio/video/descripción/misión/visión/
    // representante/prensa reutilizan literalmente el mismo contenido de
    // referencia que STTO Group (única captura de perfil disponible) — no
    // hay referencia propia para este desarrollador todavía. Reemplazar por
    // su información real en cuanto esté disponible.
    slogan: "Bits Make Bricks",
    coverImage: PLACEHOLDER_COVER_IMAGE,
    social: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    address: "Torre Alas, Piso 14. Centro Empresarial Equipetrol, Santa Cruz de la Sierra, Bolivia",
    website: "https://www.sttogroup.com",
    video: PLACEHOLDER_VIDEO,
    description: PLACEHOLDER_DESCRIPTION.replace("{name}", "Kohler & Weiss Real Estate Development"),
    mission: PLACEHOLDER_MISSION,
    vision: PLACEHOLDER_VISION,
    mainImage: BUEN_RETIRO_IMAGE,
    representative: {
      name: "Carlos Zamorano Scott",
      role: "Liderazgo con visión",
      quote: PLACEHOLDER_DESCRIPTION.replace("{name}", "Kohler & Weiss Real Estate Development"),
      photo: PLACEHOLDER_REPRESENTATIVE_PHOTO,
    },
    pressNotes: PLACEHOLDER_PRESS_NOTES,
    otherProjects: PLACEHOLDER_OTHER_PROJECTS,
    status: "provisional",
  },
  {
    slug: "symprax",
    name: "SYMPRAX",
    // Provisional: mismo criterio que Kohler & Weiss arriba — contenido
    // replicado de la referencia de STTO Group, pendiente de reemplazo.
    slogan: "Bits Make Bricks",
    coverImage: PLACEHOLDER_COVER_IMAGE,
    social: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    address: "Torre Alas, Piso 14. Centro Empresarial Equipetrol, Santa Cruz de la Sierra, Bolivia",
    website: "https://www.sttogroup.com",
    video: PLACEHOLDER_VIDEO,
    description: PLACEHOLDER_DESCRIPTION.replace("{name}", "SYMPRAX"),
    mission: PLACEHOLDER_MISSION,
    vision: PLACEHOLDER_VISION,
    mainImage: ARTEMIS_IMAGE,
    representative: {
      name: "Carlos Zamorano Scott",
      role: "Liderazgo con visión",
      quote: PLACEHOLDER_DESCRIPTION.replace("{name}", "SYMPRAX"),
      photo: PLACEHOLDER_REPRESENTATIVE_PHOTO,
    },
    pressNotes: PLACEHOLDER_PRESS_NOTES,
    otherProjects: PLACEHOLDER_OTHER_PROJECTS,
    status: "provisional",
  },
];

export function getDeveloperBySlug(slug: string): Developer | undefined {
  return developers.find((developer) => developer.slug === slug);
}
