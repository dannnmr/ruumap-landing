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
  excerpt?: string;
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

export type BusinessUnit = {
  name: string;
  iconKey?: string;
  logo?: SiteImage;
  /** URL directa de archivo SVG desde Strapi CMS */
  svgUrl?: string;
  /** Contenido SVG crudo/inline en string desde Strapi CMS */
  rawSvg?: string;
};

export type BusinessUnitsData = {
  eyebrow?: string;
  title: string;
  description?: string;
  units: BusinessUnit[];
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
  businessUnits?: BusinessUnitsData;
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
  src: "https://cdn.ruumap.com/899c970782a3830a3ece48d7f38d4e80d66bdbc8_1_436b878ca6.webp",
  alt: "Retrato del representante del desarrollador",
};

const PLACEHOLDER_COVER_IMAGE: SiteImage = {
  src: "https://cdn.ruumap.com/cover_stto_5f6607968b.png",
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
const STTO_OTHER_PROJECTS: OtherProjectRef[] = [
  {
    name: "Stratto Equipetrol",
    location: "Santa Cruz de la Sierra, Bolivia.",
    image: {
      src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop",
      alt: "Stratto Equipetrol",
    },
  },
  {
    name: "Stratto UP",
    location: "Santa Cruz de la Sierra, Bolivia.",
    image: {
      src: "https://cdn.ruumap.com/noticia1_2bbab59780.webp",
      alt: "Strattato UP",
    },
  },
  {
    name: "Strattto Vind",
    location: "Santa Cruz de la Sierra, Bolivia.",
    image: {
      src: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1400&auto=format&fit=crop",
      alt: "Stratto Vind",
    },
  },
  {
    name: "Itaguá",
    location: "Santa Cruz de la Sierra, Bolivia.",
    image: {
      src: "https://cdn.ruumap.com/itagua_facade_2a92cdf6a4.webp",
      alt: "Itaguá",
    },
  },
];

/** Mismas notas de prensa observables. */
const PLACEHOLDER_PRESS_NOTES: PressNote[] = [
  {
    outlet: "EL DEBER",
    headline: "STRATTO UP: el edificio residencial que eleva tu vida en Equipetrol Norte",
    excerpt:
      "Reconocida por innovar y realizar proyectos con tecnología de punta y alta calidad, Stratto, perteneciente al grupo empresarial STTO Group, realizó la entrega del innovador proyecto Stratto UP.",
    href: "https://eldeber.com.bo/te-puede-interesar/stto-group-presento-stratto-up-edificio-residencial-eleva-vida-equipetrol-norte_1780347682",
    image: {
      src: "https://cdn.ruumap.com/noticia1_2bbab59780.webp",
      alt: "STRATTO UP Edificio residencial",
    },
  },
  {
    outlet: "CONSTRUMARKET",
    headline: "Presentan STRATTO UP, el edificio residencial con domótica avanzada",
    excerpt:
      "El proyecto, de 19 niveles y una inversión de $us 7 millones, incorpora domótica avanzada para automatizar la iluminación, climatización, cortinas y accesos inteligentes, brindando mayor comodidad, seguridad y control desde cada departamento.",
    href: "https://construmarket.com.bo/actualidad/presentan-stratto-up-el-edificio-residencial-con-domotica-avanzada/",
    image: {
      src: "https://cdn.ruumap.com/eab7688a1f5bb947807d1d74e4b4fa47749a539b_fafb679755.webp",
      alt: "Domótica avanzada en STRATTO UP",
    },
  },
  {
    outlet: "STTO GROUP",
    headline: "STRATTO UP: La nueva propuesta residencial urbana en Santa Cruz.",
    excerpt:
      "La capital cruceña fue el escenario del lanzamiento oficial de STRATTO UP, el nuevo proyecto residencial de STTO Group ubicado en Equipetrol Norte.",
    href: "#",
    image: {
      src: "https://cdn.ruumap.com/fdba2dd9fe1f4e073625cc28209ba96b64ae1844_23d22d0418.webp",
      alt: "Lanzamiento oficial de STRATTO UP",
    },
  },
  {
    outlet: "BOLIVIAN BUSINESS",
    headline: "Innovación y sostenibilidad que transforman el desarrollo urbano de Santa Cruz",
    excerpt:
      "STTO Group es un holding que integra ocho unidades de negocio y combina tecnología, sostenibilidad y marketing estratégico en proyectos inmobiliarios.",
    href: "https://www.linkedin.com/posts/semanario-bolivian-business_stratto-activity-7370063247791509504-2LM-/",
    image: {
      src: "https://cdn.ruumap.com/899c970782a3830a3ece48d7f38d4e80d66bdbc8_1_436b878ca6.webp",
      alt: "Carlos Zamorano en evento de prensa",
    },
  },
];

/** Mismo texto de descripción/misión/visión/representante observado en la
 *  referencia, reutilizado literalmente en los tres perfiles. */
const PLACEHOLDER_DESCRIPTION =
  "Con más de 10 años de experiencia, {name} se ha consolidado como líder en el sector inmobiliario, con más de 20 proyectos exitosos en áreas residenciales, comerciales e industriales en Bolivia. Nuestro compromiso con la innovación nos ha permitido integrar las últimas tecnologías, como Building Information Modeling (BIM) y materiales ecoamigables, garantizando eficiencia y sostenibilidad en cada obra.";
const PLACEHOLDER_MISSION =
  "Transformar ideas en espacios funcionales y sostenibles, superando expectativas con calidad y responsabilidad.";
const PLACEHOLDER_VISION =
  "Ser referentes globales en construcción innovadora, contribuyendo al desarrollo urbano y al cuidado del medio ambiente.";

export const developers: Developer[] = [
  {
    slug: "stto-group",
    name: "STTO Group",
    logo: {
      src: "https://cdn.ruumap.com/133ef54342c8580aff3ca29ce8e2c0bb16367f71_24e8d5518b.webp",
      alt: "STTO Group Logo",
    },
    slogan: "Bits Make Bricks",
    coverImage: PLACEHOLDER_COVER_IMAGE,
    social: [
      { label: "Facebook", href: "https://www.facebook.com/share/1DDWkpxH7X/?mibextid=wwXIfr" },
      { label: "Instagram", href: "https://www.instagram.com/stto.bo?igsh=MWowN2JhcjE3cDJpaA==" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/strattobolivia/" },
    ],
    address: "Torre Alas, Piso 14. Centro Empresarial Equipetrol, Santa Cruz de la Sierra, Bolivia",
    website: "https://www.sttogroup.com",
    video: PLACEHOLDER_VIDEO,
    description:
      "Con más de 10 años de experiencia, STTO Group se ha consolidado como líder en el sector inmobiliario, con más de 20 proyectos exitosos en áreas residenciales, comerciales e industriales en Bolivia. Nuestro compromiso con la innovación nos ha permitido integrar las últimas tecnologías, como Building Information Modeling (BIM) y materiales ecoamigables, garantizando eficiencia y sostenibilidad en cada obra.",
    mission:
      "Transformar ideas en espacios funcionales y sostenibles, superando expectativas con calidad y responsabilidad.",
    vision:
      "Ser referentes globales en construcción innovadora, contribuyendo al desarrollo urbano y al cuidado del medio ambiente.",
    mainImage: ITAGUA_IMAGE,
    representative: {
      name: "CARLOS ZAMORANO SCOTT",
      role: "Liderazgo con visión",
      quote:
        "Carlos Zamorano Scott es un empresario y estratega con más de 15 años de experiencia internacional en desarrollo empresarial, tecnología y gestión. Actualmente, se desempeña como Director Ejecutivo de STTO Group SRL y Managing Partner en Veganis Bolivia, impulsando estrategias de ventas para productos veganos. En su etapa temprana, ocupó puestos estratégicos en multinacionales como BlackBerry en Canadá, Millicom International Cellular (Tigo) y Entel.",
      photo: PLACEHOLDER_REPRESENTATIVE_PHOTO,
    },
    businessUnits: {
      eyebrow: "STTO GROUP HOLDING",
      title: "Unidades de Negocios",
      description:
        "Desarrollamos proyectos inmobiliarios integrales. Ingeniería, diseño, construcción y gestión inmobiliaria. Todo lo que necesitas, en un solo lugar.",
      units: [
        { name: "assert", iconKey: "assert",svgUrl:"https://cdn.ruumap.com/assert_logo_ce43ea5705.svg"},
        { name: "STRATTO", iconKey: "stratto",svgUrl:"https://cdn.ruumap.com/stratto_logo_1_6aa056b882.svg" },
        { name: "STRATTO HOME", iconKey: "stratto-home",svgUrl:"https://cdn.ruumap.com/stto_home_logo_1_77e3a10e1c.svg" },
        { name: "Itaguá", iconKey: "itagua",svgUrl:"https://cdn.ruumap.com/itagua_logo_1_15ad8e20ec.svg" },
        { name: "Frak", iconKey: "frak",svgUrl:"https://cdn.ruumap.com/frak_logo_1_52d809adfa.svg" },
        { name: "STTO CAPITAL", iconKey: "stto-capital",svgUrl:"https://cdn.ruumap.com/stto_capital_logo_1_cf1e011e57.svg" },
        { name: "jōm", iconKey: "jom",svgUrl:"https://cdn.ruumap.com/jom_logo_1_f7fb0aacda.svg" },
      ],
    },
    pressNotes: PLACEHOLDER_PRESS_NOTES,
    otherProjects: STTO_OTHER_PROJECTS,
    status: "confirmed",
  },
  {
    slug: "kohler-weiss",
    name: "Kohler & Weiss Real Estate Development",
    slogan: "Innovación y Diseño Residencial",
    coverImage: {
      src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop",
      alt: "Torre residencial Kohler & Weiss al atardecer",
    },
    social: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    address: "Av. San Martín 1500, Equipetrol Norte, Santa Cruz de la Sierra, Bolivia",
    website: "https://buenretiro.ruumap.com",
    video: PLACEHOLDER_VIDEO,
    description:
      "Kohler & Weiss es una desarrolladora inmobiliaria enfocada en la creación de torres residenciales de alta fidelidad e integración de jardines verticales. Con una visión centrada en el bienestar y el diseño arquitectónico de vanguardia, cada desarrollo representa una oportunidad de inversión y estilo de vida exclusivo.",
    mission:
      "Crear comunidades residenciales sostenibles con los más altos estándares de diseño arquitectónico e ingeniería.",
    vision:
      "Liderar el mercado de desarrollo residencial de lujo en la región a través de proyectos icónicos y sustentables.",
    mainImage: BUEN_RETIRO_IMAGE,
    representative: {
      name: "Equipo Kohler & Weiss",
      role: "Desarrollo y Gestión Inmobiliaria",
      quote:
        "Diseñamos espacios pensando en la armonía entre la arquitectura urbana y la naturaleza.",
      photo: PLACEHOLDER_REPRESENTATIVE_PHOTO,
    },
    pressNotes: PLACEHOLDER_PRESS_NOTES,
    otherProjects: STTO_OTHER_PROJECTS,
    status: "confirmed",
  },
  {
    slug: "symprax",
    name: "SYMPRAX",
    slogan: "Arquitectura Inmobiliaria de Vanguardia",
    coverImage: {
      src: "https://cdn.ruumap.com/641f482eeb7f86bc7f4d30c64f758f1d597d6dd1_0354c6227f.webp",
      alt: "Desarrollo residencial premium SYMPRAX",
    },
    social: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    address: "Av. La Salle #400, Santa Cruz de la Sierra, Bolivia",
    website: "https://artemis.ruumap.com",
    video: PLACEHOLDER_VIDEO,
    description:
      "SYMPRAX se especializa en desarrollos inmobiliarios premium con recorridos 3D e integración tecnológica avanzada. Sus proyectos destacan por acabados de vidrio, fachadas icónicas y la máxima atención al detalle en cada espacio.",
    mission:
      "Ofrecer proyectos de infraestructura premium que potencien el valor inmobiliario y la experiencia inmersiva del comprador.",
    vision:
      "Consolidarse como la desarrolladora de referencia para proyectos de alta gama y vanguardia tecnológica en Latinoamérica.",
    mainImage: ARTEMIS_IMAGE,
    representative: {
      name: "Directorio SYMPRAX",
      role: "Desarrollo de Proyectos Premium",
      quote:
        "Ofrecemos proyectos de alta gama que combinan tecnología, diseño y la mejor rentabilidad.",
      photo: PLACEHOLDER_REPRESENTATIVE_PHOTO,
    },
    pressNotes: PLACEHOLDER_PRESS_NOTES,
    otherProjects: STTO_OTHER_PROJECTS,
    status: "confirmed",
  },
];

export function getDeveloperBySlug(slug: string): Developer | undefined {
  return developers.find((developer) => developer.slug === slug);
}
