/**
 * Fuente única de verdad para todo el copy y las imágenes del sitio.
 * Editar textos, URLs de Unsplash o CTAs se hace exclusivamente acá —
 * ningún componente debería tener strings de contenido hardcodeados.
 *
 * Los identificadores de sección usados por la navegación (`nav.links[].target`,
 * `nav.cta.target`) vienen de `lib/navigation.ts`, la fuente única para esos ids
 * — no repetirlos acá como strings independientes.
 */

import { SECTION_IDS, type SectionId } from "@/lib/navigation";

export type SiteImage = {
  src: string;
  alt: string;
};

export type SiteVideo = {
  src: string;
  poster: SiteImage;
};

export type NavLink = {
  label: string;
  target: SectionId;
};

export type Project = {
  index: string;
  name: string;
  tag: string;
  /** Nombre del desarrollador/constructora del proyecto. */
  developer: string;
  /** Ubicación mostrada en la tarjeta (ej. "Santa Cruz de la Sierra, Bolivia."). */
  location: string;
  image: SiteImage;
  /**
   * Slug del `Developer` (content/developers.ts) al que pertenece este
   * proyecto. Conecta la tarjeta del catálogo con el perfil de ese
   * desarrollador (`/desarrolladores/[developerSlug]`) y hace que el
   * proyecto aparezca en la lista de "proyectos añadidos" de ese perfil.
   * Reemplaza el viejo campo `slug?` (sin uso) — los perfiles son por
   * desarrollador, no por proyecto (confirmado en docs/product-context.md).
   */
  developerSlug?: string;
  /**
   * Categoría o relación con el perfil (ej. "Torre residencial"). Solo dato
   * por ahora — ninguna referencia visual muestra un elemento de categoría
   * visible en la tarjeta del catálogo ni en las listas de proyectos del
   * perfil, así que este campo no se renderiza todavía.
   */
  category?: string;
  /**
   * URL futura de la acción "Ver proyecto", provista por el product owner
   * por proyecto. Mientras no exista, se deja `undefined` a propósito — la
   * acción se renderiza como no interactiva en vez de inventar un destino,
   * tanto en el catálogo de la landing como en el perfil del desarrollador.
   */
  href?: string;
  /**
   * Marca editorial: si los datos de esta entrada están confirmados por el
   * product owner o siguen siendo provisionales/leídos de una referencia.
   * No condiciona ningún comportamiento por sí sola — la regla existente de
   * "omitir entradas sin desarrollador/ubicación confirmados" ya cubre eso;
   * este campo solo ayuda a rastrear qué falta confirmar.
   */
  status: "provisional" | "confirmed";
};

export type Feature = {
  index: string;
  /** Micro-label en mayúsculas sobre el título (ej. "VISTAS 360°"). */
  eyebrow: string;
  title: string;
  description: string;
  image: SiteImage;
  /**
   * Versión nocturna de `image`, opcional. Cuando está presente,
   * `FeatureSection` muestra un toggle día/noche sobre la imagen (hoy solo
   * la fila 01, "RENDERS DIURNO | NOCTURNO", la tiene).
   */
  imageNight?: SiteImage;
  /**
   * Recorrido 360°/3D embebible (iframe), opcional. Cuando está presente,
   * `FeatureSection` muestra `image` como poster con un botón explícito que
   * carga el iframe bajo demanda (nunca automático al entrar en viewport —
   * ver docs/performance-guidelines.md, "Recursos 3D / recorridos
   * virtuales"). Hoy solo la fila 02, "VISTAS 360°", la tiene.
   */
  embed360?: { src: string };
  /**
   * Video de demo/showcase, opcional. Cuando está presente, `FeatureSection`
   * muestra `image` como poster y reproduce este video con el mismo patrón
   * de `components/ui/VideoPlayer.tsx` (click-to-play, `preload="none"`,
   * pausa fuera de viewport — nunca autoplay). Hoy lo tienen las filas 03
   * ("VIDEO ORBITAL"), 04 ("AMBIENTES HUMANIZADOS") y 05 ("PANEL DE
   * CONTROL").
   */
  video?: { src: string };
};

export type Step = {
  index: string;
  title: string;
  description: string;
  /**
   * Provisional/sin uso: la referencia visual principal muestra estos pasos
   * como una fila de 3 columnas sin imagen (ver HowItWorks.tsx). El campo se
   * mantiene opcional en el tipo por si una futura sección de pasos lo
   * necesita, pero HowItWorks no lo consume.
   */
  image?: SiteImage;
};

export const siteContent = {
  brand: {
    name: "Ruumap",
  },

  meta: {
    title: "Ruumap — Visualización arquitectónica que vende antes de construir",
    description:
      "Ruumap diseña experiencias digitales inmersivas —recorridos virtuales, planos 2D/3D interactivos y plataformas web— para desarrollos inmobiliarios de lujo.",
  },

  /**
   * Provisional: labels leídos de la referencia visual principal
   * (docs/references/landing-desktop.png), pendientes de confirmar como
   * copy definitivo. "Testimonios" aparece en esa referencia pero no tiene
   * sección construida todavía — se omite acá a propósito (no se renderiza
   * como link roto); agregar su entrada cuando la sección exista, junto con
   * su id en lib/navigation.ts.
   *
   * El botón de CTA del Navbar se quitó a propósito (pedido explícito del
   * usuario, 2026-08-05): en su lugar, `links` ganó una entrada más que
   * apunta a `ClosingCTA` (`SECTION_IDS.contacto`), como un link de texto
   * más entre los demás en vez de un botón destacado. `cta` se deja definida
   * tal cual (no se borra) por si se reintroduce el botón más adelante —
   * `Navbar.tsx` ya no la consume, ver comentario ahí.
   */
  nav: {
    links: [
      { label: "Proyectos", target: SECTION_IDS.proyectos },
      { label: "Características", target: SECTION_IDS.servicios },
      { label: "Cómo funciona", target: SECTION_IDS.proceso },
      { label: "Contacto", target: SECTION_IDS.contacto },
    ] satisfies NavLink[],
    cta: {
      label: "Agendá una demo",
      target: SECTION_IDS.contacto,
    } satisfies NavLink,
  },

  hero: {
    eyebrow: "SHOWROOM · DIGITAL",
    titleLines: ["Haz que cada proyecto se venda ", "antes de construirse"],
    subcopy:
      "Ruum convierte renders, recorridos virtuales y experiencias inmersivas en una poderosa herramienta para vender más y captar mejores clientes.",
    primaryCta: { label: "Explora proyectos", href: "#proyectos" },
    secondaryCta: { label: "Contáctanos", href: "#contacto" },
    /**
     * Provisional: video y poster son recursos de prueba, pendientes de
     * reemplazo por los definitivos. El poster reutiliza una imagen que ya
     * estaba en el repo (antes en `backgroundImages`, sin uso) — no se
     * inventó ningún recurso nuevo.
     */
    video: {
      src: "https://cdn.ruumap.com/rumm_hero_2618d6b3d1.mp4",
      poster: {
        src: "https://cdn.ruumap.com/fotograma_1_dec780ddbc.webp",
        alt: "Arquitectura nocturna abstracta, fachadas de rascacielos en contraluz",
      },
    } satisfies SiteVideo,
  },

  statement: {
    text: "Transformamos proyectos inmobiliarios en experiencias navegables que venden.",
    second_text:
      "De un plano estático a una experiencia navegable: recorridos virtuales, planos 2D/3D y amenidades exploradas al detalle, unidad por unidad.",
  },

  about: {
    heading: "Conocé la nueva forma de vender tus proyectos",
    // Provisional: mismo criterio que hero.video — ver comentario ahí.
    video: {
      src: "https://assets.mixkit.co/videos/49806/49806-720.mp4",
      poster: {
        src: "https://images.unsplash.com/photo-1767342976156-83239d26f08e?q=80&w=1920&auto=format&fit=crop",
        alt: "Arquitectura nocturna abstracta, fachadas de rascacielos en contraluz",
      },
    } satisfies SiteVideo,
    cta: { label: "Agendá una demo", href: "#contacto" },
  },

  /**
   * Provisional: catálogo leído de docs/references/projects-secction.png.
   * Solo se incluyen los proyectos cuyo desarrollador y ubicación son
   * observables en esa referencia — la relación proyecto↔desarrollador no
   * está confirmada oficialmente todavía (ver docs/product-context.md).
   * "PV Norte" existía en una versión anterior de este catálogo pero no
   * tiene desarrollador/ubicación observable en ninguna referencia, así que
   * se deja fuera a propósito en vez de inventar esos datos — puede
   * reincorporarse en cuanto haya datos confirmados.
   *
   * `developerSlug` conecta cada entrada con content/developers.ts (ver
   * docs/page-structure.md, "Perfiles inmobiliarios") — los 3 desarrolladores
   * abajo ya existen en esa colección. `href` son las URLs reales de "Ver
   * proyecto" provistas por el usuario (2026-08-05) — ya no son
   * provisionales.
   */
  revealGallery: {
    eyebrow: "CATÁLOGO ACTIVO",
    heading: "Últimos proyectos añadidos",
    projects: [
      {
        index: "01",
        name: "Itaguá",
        tag: "DESARROLLO HORIZONTAL — EXPLORACIÓN DE AMENIDADES",
        developer: "STTO Group",
        location: "Santa Cruz de la Sierra, Bolivia.",
        image: {
          src: "https://cdn.ruumap.com/itagua_facade_2a92cdf6a4.webp",
          alt: "Arquitectura residencial contemporánea con áreas comunes, proyecto Itaguá",
        },
        developerSlug: "stto-group",
        href: "https://itagua.ruumap.com/",
        status: "confirmed",
      },
      {
        index: "02",
        name: "Buen Retiro",
        tag: "TORRE RESIDENCIAL — RECORRIDO DE ALTA FIDELIDAD",
        developer: "STTO Group",
        location: "Santa Cruz de la Sierra, Bolivia.",
        image: {
          src: "https://cdn.ruumap.com/buenretiro_facade_3d896f3b6f.webp",
          alt: "Torre residencial con jardines verticales integrados, proyecto Buen Retiro",
        },
        developerSlug: "stto-group",
        href: "https://buenretiro.ruumap.com/",
        status: "confirmed",
      },
      {
        index: "03",
        name: "Artemis",
        tag: "RESIDENCIAL PREMIUM — RECORRIDO 3D",
        developer: "STTO Group",
        location: "Santa Cruz de la Sierra, Bolivia.",
        image: {
          src: "https://cdn.ruumap.com/artemise_facade_3343535dfe.webp",
          alt: "Fachada de torre residencial de lujo con acabados de vidrio, proyecto Artemis",
        },
        developerSlug: "stto-group",
        href: "https://artemis.ruumap.com/",
        status: "confirmed",
      },
      {
        index: "04",
        name: "PV Norte",
        tag: "DESARROLLO PREMIUM — RECORRIDO 3D",
        developer: "STTO Group",
        location: "Santa Cruz de la Sierra, Bolivia.",
        image: {
          src: "https://cdn.ruumap.com/pvnorte_4d32edbe69.webp",
          alt: "Fachada de torre residencial, proyecto PV Norte",
        },
        developerSlug: "stto-group",
        href: "https://pvnorte.ruumap.com/",
        status: "confirmed",
      },
    ] satisfies Project[],
  },

  /**
   * Provisional: valores leídos de la referencia visual principal
   * (docs/references/landing-desktop.png), pendientes de confirmar como
   * cifras definitivas.
   */
  stats: [
    { value: "+50", label: "proyectos diseñados" },
    { value: "15", label: "desarrolladores inmobiliarios" },
    { value: "+20", label: "países servicios prestados" },
    { value: "+100", label: "unidades vendidas usando Ruum" },
  ],

  /**
   * Provisional: las 5 filas y su copy están leídas de
   * docs/references/landing-desktop.png (recortes de detalle). Las imágenes
   * de las filas 01 y 03 reutilizan assets que ya estaban en el repo (antes
   * en "PV Norte" del catálogo de proyectos, retirado de esa sección por no
   * tener desarrollador/ubicación confirmados) — no se agregó ningún asset
   * externo nuevo.
   */
  features: [
    {
      index: "01",
      eyebrow: "RENDERS DIURNO | NOCTURNO",
      title: "Visualiza tu proyecto en cualquier momento del día",
      description:
        "Muestra cada espacio con iluminación diurna y nocturna para transmitir la verdadera atmósfera del proyecto.",
      image: {
        src: "https://cdn.ruumap.com/itagua_face_day_62c3442020.webp",
        alt: "Fachada del proyecto Itagua Face, render diurno",
      },
      imageNight: {
        src: "https://cdn.ruumap.com/itagua_face_night_09a552c08c.webp",
        alt: "Fachada del proyecto Itagua Face, render nocturno",
      },
    },
    {
      index: "02",
      eyebrow: "VISTAS 360°",
      title: "Explora cada espacio desde todos los ángulos",
      description:
        "Recorre ambientes en 360° con total libertad y permite que cada cliente descubra el proyecto a su propio ritmo.",
      image: {
        src: "https://cdn.ruumap.com/thumb_360_77cd6e3518.webp",
        alt: "Interior arquitectónico moderno con iluminación natural",
      },
      embed360: {
        src: "https://kuula.co/share/collection/7TxHH?logo=-1&info=0&fs=0&vr=1&sd=0&initload=1&thumbs=0",
      },
    },
    {
      index: "03",
      eyebrow: "VIDEO ORBITAL",
      title: "Una perspectiva completa del proyecto",
      description:
        "Navega alrededor del edificio con vistas aéreas que resaltan su arquitectura, ubicación y entorno.",
      image: {
        src: "https://cdn.ruumap.com/fotograma_pv_272067cccf.png",
        alt: "Vista aérea de una planta arquitectónica de un desarrollo inmobiliario",
      },
      video: {
        src: "https://cdn.ruumap.com/orbitalbuenretiro_aaac35da95.mp4",
      },
    },
    {
      index: "04",
      eyebrow: "AMBIENTES HUMANIZADOS",
      title: "Espacios que cobran vida",
      description:
        "Animaciones cinematográficas con personas, movimiento y ambiente para transmitir cómo se vive realmente el proyecto.",
      image: {
        src: "https://cdn.ruumap.com/fotograma_br_09b739d42d.webp",
        alt: "Desarrollo residencial completamente visualizado, con ambientes iluminados",
      },
      video: {
        src: "https://cdn.ruumap.com/videos_humanizados_777e87659f.mp4",
      },
    },
    {
      index: "05",
      eyebrow: "PANEL DE CONTROL",
      title: "Gestiona tu proyecto con información en tiempo real",
      description:
        "Administra disponibilidad, contenido y métricas desde un panel centralizado diseñado para equipos comerciales y desarrolladores.",
      image: {
        src: "https://cdn.ruumap.com/fotograma_paanel_12208f2b3b.webp",
        alt: "Skyline moderno de edificios residenciales de lujo",
      },
      video: {
        src: "https://cdn.ruumap.com/cpanel2_2465d15c1c.mp4",
      },
    },
  ] satisfies Feature[],

  /**
   * Provisional: copy leído de docs/references/landing-desktop.png. La
   * referencia muestra estos 3 pasos como una fila simple sin imágenes (ver
   * HowItWorks.tsx) — los pasos ya no llevan `image`.
   */
  howItWorks: {
    eyebrow: "CÓMO FUNCIONA",
    heading: "Tres pasos para transformar la venta de tu proyecto.",
    steps: [
      {
        index: "01",
        title: "Creamos tu experiencia digital",
        description:
          "Convertimos planos, renders y material comercial en una experiencia inmersiva.",
      },
      {
        index: "02",
        title: "Publicamos tu proyecto",
        description:
          "Integramos recorridos 3D, disponibilidad, tipologías y contenido en una sola plataforma.",
      },
      {
        index: "03",
        title: "Impulsa tus ventas",
        description:
          "Tus clientes exploran, comparan y encuentran la unidad ideal con una experiencia memorable.",
      },
    ] satisfies Step[],
  },

  /**
   * Provisional: copy leído de docs/references/landing-desktop.png. El
   * bloque de contacto (`contact`) reproduce el nombre/teléfono/email
   * visibles en la referencia — son datos del mockup, no confirmados como
   * definitivos por el product owner (el teléfono "00000" ya se lee como un
   * placeholder en la propia referencia). La foto es un placeholder de
   * Unsplash: no existe todavía el asset real. El `backgroundImage` a
   * pantalla completa que tenía esta sección se retiró: la referencia
   * muestra fondo oscuro sólido + retrato, no una imagen de fondo con
   * parallax (ver comentario en ClosingCTA.tsx).
   */
  closingCTA: {
    heading:
      "Sumá tu proyecto a la experiencia más inmersiva y mejorá la experiencia de tus ventas.",
    subcopy:
      "Contáctanos y conversemos acerca de tu próximo proyecto inmobiliario.",
    primaryCta: {
      label: "Contáctanos",
      href: "https://wa.me/59168183484?text=Quiero%20m%C3%A1s%20informaci%C3%B3n",
    },
    backgroundImage: {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&auto=format&fit=crop",
      alt: "Interior arquitectónico moderno con iluminación natural y sala de estar",
    } satisfies SiteImage,
    contact: {
      name: "Guillermo Castillo",
      phone: "+591 68183484",
      email: "atencion@ruumap.com",
      photo: {
        src: "/images/contact.section.img.webp",
        alt: "Retrato de Guillermo Castillo, punto de contacto de Ruum",
      } satisfies SiteImage,
    },
  },

  /**
   * Provisional: tagline y columnas leídas de docs/references/footer.png.
   * Los `href` de columnas y redes sociales quedan en "#" a propósito — no
   * hay URLs reales confirmadas todavía.
   */
  footer: {
    tagline:
      "La solución de visualización virtual y gestión en tiempo real para proyectos en pre-venta de todo el mundo.",
    columns: [
      { title: "Producto", links: ["Proyectos", "Recorridos 3D", "Precios"] },
      { title: "Compañía", links: ["Nosotros", "Contacto"] },
      { title: "Legal", links: ["Privacidad", "Términos"] },
    ],
    social: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
};
