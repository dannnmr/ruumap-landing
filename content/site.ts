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
  width?: number;
  height?: number;
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

/**
 * Modelo de contenido para `/privacidad` y `/terminos` — ver
 * openspec/changes/adopt-legal-terms-and-privacy-content. Cada documento se
 * transcribe de forma casi literal desde los PDFs aprobados por el equipo
 * legal (RUUM_Politica_de_Privacidad, RUUM_Terminos_y_Condiciones_de_Uso):
 * un item por bloque del documento fuente (un párrafo → un `p`, una lista →
 * un `list`, etc.), sin resumir ni reorganizar. Las únicas desviaciones
 * respecto al texto fuente son las documentadas explícitamente en
 * `LegalDocument`/`LegalSection` de cada documento (ver comentarios ahí) —
 * ninguna otra edición de copy legal debería hacerse sin pasar por ese
 * mismo proceso de revisión.
 *
 * Deliberado: la marca se transcribe como "RUUM" (no "Ruumap") en estos dos
 * documentos únicamente — decisión explícita del usuario, no un error. El
 * resto del sitio (`siteContent.brand.name`, meta/OG/JSON-LD) sigue
 * diciendo "Ruumap" sin relación con esto.
 */
export type LegalContentItem =
  | { kind: "p"; text: string }
  /** Subtítulo en negrita dentro de una sección (ej. "a) Landing Page general..."). */
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: string[] }
  /** Caja destacada (ej. "¿Qué significa esto para ti en la práctica?"). */
  | { kind: "callout"; title?: string; text: string };

export type LegalSection = {
  /** Ancla opcional — solo la sección de cookies de Privacidad usa "cookies". */
  id?: string;
  heading: string;
  content: LegalContentItem[];
};

export type LegalDocument = {
  documentTitle: string;
  subtitle: string;
  versionLine: string;
  sections: LegalSection[];
};

export const siteContent = {
  brand: {
    name: "Ruumap",
  },

  /**
   * Copy SEO/metadata (title, description, Open Graph, JSON-LD). Sigue el
   * posicionamiento aprobado — showrooms digitales/experiencias interactivas
   * como propuesta principal, "plataforma" solo como descriptor tecnológico
   * de soporte, nunca como sujeto — documentado en detalle en
   * openspec/changes/establish-seo-and-basic-analytics/design.md, "SEO
   * positioning boundary". No editar este bloque para volver a un enfoque
   * centrado en "plataforma" sin revisar esa sección primero.
   */
  meta: {
    title: "Ruumap | Showrooms digitales para proyectos inmobiliarios",
    description:
      "Creamos showrooms digitales y experiencias interactivas para presentar, explorar y comercializar proyectos inmobiliarios en Bolivia.",
    /** Copy propio de Open Graph/Twitter — no siempre idéntico a title/description. */
    ogTitle: "Ruumap — Experiencias digitales para proyectos inmobiliarios",
    ogDescription:
      "Transformamos proyectos inmobiliarios en showrooms interactivos que permiten conocer sus espacios, unidades e información de una forma más clara e inmersiva.",
    /** Descripción para JSON-LD Organization/WebSite — no debe inventar datos no confirmados. */
    jsonLdDescription:
      "Ruumap crea showrooms digitales y experiencias interactivas para la presentación y comercialización de proyectos inmobiliarios.",
    /**
     * Imagen social (Open Graph/Twitter) PROVISIONAL: todavía no existe un
     * asset dedicado 1200×630 aprobado, así que se reutiliza el poster del
     * video del Hero (ya en uso en el sitio). Reemplazar por un asset social
     * dedicado en cuanto esté aprobado — no requiere cambios de código,
     * solo actualizar este valor.
     */
    ogImage: {
      src: "https://cdn.ruumap.com/fotograma_1_dec780ddbc.webp",
      alt: "Arquitectura nocturna abstracta, fachadas de rascacielos en contraluz",
      width: 1920,
      height: 1080,
    } satisfies SiteImage,
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
        developer: "Kohler & Weiss",
        location: "Santa Cruz de la Sierra, Bolivia.",
        image: {
          src: "https://cdn.ruumap.com/buenretiro_facade_3d896f3b6f.webp",
          alt: "Torre residencial con jardines verticales integrados, proyecto Buen Retiro",
        },
        developerSlug: "kohler-weiss",
        href: "https://buenretiro.ruumap.com/",
        status: "confirmed",
      },
      {
        index: "03",
        name: "Artemis",
        tag: "RESIDENCIAL PREMIUM — RECORRIDO 3D",
        developer: "SYMPRAX",
        location: "Santa Cruz de la Sierra, Bolivia.",
        image: {
          src: "https://cdn.ruumap.com/artemise_facade_3343535dfe.webp",
          alt: "Fachada de torre residencial de lujo con acabados de vidrio, proyecto Artemis",
        },
        developerSlug: "symprax",
        href: "https://artemis.ruumap.com/",
        status: "confirmed",
      },
      {
        index: "04",
        name: "PV Norte",
        tag: "DESARROLLO PREMIUM — RECORRIDO 3D",
        developer: "Kohler & Weiss",
        location: "Santa Cruz de la Sierra, Bolivia.",
        image: {
          src: "https://cdn.ruumap.com/pvnorte_4d32edbe69.webp",
          alt: "Fachada de torre residencial, proyecto PV Norte",
        },
        developerSlug: "kohler-weiss",
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
  /**
   * Encabezado semántico de sección para FeatureSection (fix de accesibilidad/SEO,
   * ver openspec/changes/establish-seo-and-basic-analytics — capability
   * `landing-marketing-sections`). FeatureSection es un stack de tarjetas
   * `sticky` sin bloque de intro visible (pedido explícito del usuario,
   * 2026-08-05) — agregar un `<h2>` visible ahí correría el inicio del
   * stack y cambiaría el layout actual. Este heading se renderiza
   * visualmente oculto (`sr-only`): cierra el hueco de jerarquía de
   * encabezados (antes saltaba de `<h1>` a `<h3>` por fila) sin alterar un
   * solo píxel del diseño aprobado.
   */
  featuresSection: {
    heading: "Características",
  },

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
      href: "https://wa.me/59175018763?text=%C2%A1Hola!%20Estoy%20interesado/a%20en%20recibir%20m%C3%A1s%20informaci%C3%B3n.",
    },
    backgroundImage: {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&auto=format&fit=crop",
      alt: "Interior arquitectónico moderno con iluminación natural y sala de estar",
    } satisfies SiteImage,
    contact: {
      name: "Guillermo Castillo",
      phone: "+591 75018763",
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
      {
        title: "Producto",
        links: [
          { label: "Proyectos", href: "/#proyectos" },
          { label: "Recorridos 3D", href: "/#recorridos-3d" },
        ],
      },
      {
        title: "Compañía",
        links: [
          { label: "Nosotros", href: "/#nosotros" },
          { label: "Contacto", href: "/#contacto" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacidad", href: "/privacidad" },
          { label: "Términos", href: "/terminos" },
        ],
      },
    ],
    social: [
      { label: "Facebook", href: "https://www.facebook.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
    ],
    /** Entrada permanente para reabrir el banner de consentimiento (ver `consent` abajo). */
    cookiePreferences: {
      label: "Preferencias de cookies",
    },
  },

  /**
   * Copy de las páginas legales (`/privacidad`, `/terminos`). `metadata`
   * (title/description de SEO) no cambia frente a la versión anterior. El
   * cuerpo de cada documento (`document`) es la transcripción de los PDFs
   * aprobados por legal — ver el comentario sobre `LegalDocument` arriba, y
   * openspec/changes/adopt-legal-terms-and-privacy-content para el detalle
   * de qué se transcribió literal y qué son las desviaciones autorizadas
   * (marcadas `// Regla X` en los comentarios de abajo).
   */
  legal: {
    privacidad: {
      metadata: {
        title: "Política de Privacidad — Ruumap",
        description:
          "Política de privacidad y protección de datos personales de la plataforma Ruumap.",
      },
      document: {
        documentTitle: "Política de Privacidad",
        subtitle: "Plataforma tecnológica RUUM",
        versionLine: "Versión 1.0 — Vigente desde {{FECHA DE VIGENCIA}}", // Regla G
        // Regla F: sin caja "Sobre este documento" — arranca directo en la sección 1.
        sections: [
          {
            heading: "1. Introducción",
            content: [
              {
                kind: "p",
                text: "RUUM (“RUUM”, “nosotros”) opera una plataforma tecnológica de exhibición y comercialización digital de proyectos inmobiliarios (la “Plataforma”), que conecta a Desarrolladores Inmobiliarios (los “Desarrolladores”) con personas interesadas en sus proyectos (“Visitantes” o “Prospectos”). Esta Política de Privacidad describe cómo tratamos los datos personales de quienes usan la Plataforma.",
              },
              {
                // Regla B: reemplazo exacto del párrafo de consentimiento original.
                kind: "p",
                text: "Al usar la Plataforma y/o completar cualquiera de sus formularios, el Usuario reconoce haber tenido acceso a esta Política. Cuando un tratamiento requiera consentimiento, RUUM lo solicitará mediante el mecanismo correspondiente, como el banner de preferencias analíticas o los formularios habilitados en la Plataforma.",
              },
            ],
          },
          {
            heading: "2. Quién es responsable de tus datos: el doble rol de RUUM",
            content: [
              { kind: "p", text: "La Plataforma tiene dos superficies distintas, con implicaciones distintas para tus datos:" },
              { kind: "subheading", text: "a) Landing Page general y Perfiles de Desarrollador" },
              {
                kind: "p",
                text: "Si enviaste tus datos a través de la Landing Page general de RUUM o de un Perfil de Desarrollador (es decir, sin pasar por el Enlace propio de un Proyecto específico), RUUM — {{RAZÓN SOCIAL DE RUUM}}, con NIT {{NIT DE RUUM}} y domicilio en {{DOMICILIO LEGAL DE RUUM}} — actúa como RESPONSABLE del tratamiento de esos datos. Lo mismo aplica a los datos de navegación de la Plataforma en general y a los datos de las cuentas de acceso al Panel de Administración.",
              },
              { kind: "subheading", text: "b) Enlace propio de un Proyecto" },
              {
                kind: "p",
                text: "Si enviaste tus datos a través del Enlace propio de un Proyecto específico (su página dedicada dentro de la Plataforma), el Desarrollador titular de ese Proyecto actúa como RESPONSABLE del tratamiento de esos datos, y RUUM actúa únicamente como ENCARGADO del tratamiento: procesamos esa información por cuenta e instrucción del Desarrollador, exclusivamente para que pueda contactarte respecto de su Proyecto, conforme al contrato comercial suscrito entre RUUM y dicho Desarrollador.",
              },
              {
                kind: "callout",
                title: "¿Qué significa esto para ti en la práctica?",
                text: "Si tus datos fueron capturados en el Enlace de un Proyecto, para ejercer tus derechos (acceso, rectificación, supresión) sobre esos datos específicos, es posible que también debas dirigirte directamente al Desarrollador correspondiente, ya que es quien decide las finalidades y medios de ese tratamiento en particular. RUUM te ayudará a identificar el canal correcto si escribes a {{EMAIL DE PRIVACIDAD}}.",
              },
            ],
          },
          {
            heading: "3. Qué datos recopilamos",
            content: [
              { kind: "p", text: "Recopilamos datos personales en los siguientes casos:" },
              {
                kind: "list",
                items: [
                  // Regla A: qualifier agregado — todavía no existe ningún formulario en el sitio.
                  "Cuando completas un formulario de consulta sobre un Proyecto (una vez que dichos formularios se encuentren habilitados), en la Landing Page, en un Perfil de Desarrollador o en el Enlace de un Proyecto: nombre, correo electrónico, teléfono y el contenido de tu mensaje o consulta.",
                  "Cuando te contactas con nosotros directamente por correo electrónico, teléfono o redes sociales.",
                  "Cuando navegas la Plataforma: datos técnicos de tu dispositivo, dirección IP, patrones de navegación y cookies (ver sección 11).",
                  "Cuando un Desarrollador crea una cuenta de acceso al Panel de Administración: nombre, correo electrónico y credenciales de acceso de las personas autorizadas.",
                ],
              },
              {
                kind: "p",
                text: "No recopilamos intencionalmente categorías especiales de datos personales (origen racial o étnico, opiniones políticas, convicciones religiosas o filosóficas, afiliación sindical, salud, vida sexual, ni antecedentes penales). La Plataforma no está dirigida a menores de edad, y no recopilamos conscientemente datos de menores. Si tomamos conocimiento de que hemos recopilado datos de un menor sin la debida autorización, los eliminaremos.",
              },
              {
                // Regla C: párrafo nuevo sobre WhatsApp.
                kind: "p",
                text: "Cuando utilizas un enlace de contacto mediante WhatsApp: si únicamente haces clic en el enlace, RUUM registra el evento de contacto con fines analíticos cuando has autorizado Analytics, sin enviar a Google tu número telefónico ni el contenido de tu mensaje. Si decides comunicarte mediante WhatsApp, dicho servicio puede procesar tu número, nombre de perfil y el contenido que envíes, conforme a sus propias condiciones y políticas de privacidad.",
              },
            ],
          },
          {
            heading: "4. Para qué usamos tus datos",
            content: [
              {
                kind: "list",
                items: [
                  "Responder tus consultas y ponerte en contacto con el Desarrollador correspondiente cuando así lo hayas solicitado.",
                  "Gestionar las cuentas de acceso al Panel de Administración de los Desarrolladores.",
                  "Mantener, operar y mejorar la Plataforma y sus funcionalidades.",
                  "Elaborar estadísticas internas de uso, agregadas y/o disociadas cuando sea posible.",
                  "Cumplir las obligaciones asumidas en los contratos comerciales con los Desarrolladores.",
                  "Enviarte comunicaciones relacionadas con tu consulta o, si lo autorizaste, comunicaciones comerciales — que puedes cancelar en cualquier momento.",
                  "Cumplir obligaciones legales o requerimientos válidos de autoridad competente.",
                ],
              },
            ],
          },
          {
            heading: "5. Base legal y consentimiento",
            content: [
              {
                kind: "p",
                text: "A la fecha de esta Política, el Estado Plurinacional de Bolivia no cuenta con una ley integral de protección de datos personales, rigiendo únicamente el derecho constitucional a la privacidad y a la autodeterminación informativa reconocido en los artículos 21 y 130 de la Constitución Política del Estado. En ese marco, RUUM adopta voluntariamente el régimen de protección de datos descrito en esta Política, inspirado en estándares internacionales de buenas prácticas, como un compromiso contractual y autoimpuesto frente a sus Usuarios.",
              },
              {
                kind: "p",
                text: "El tratamiento de tus datos se basa en tu consentimiento libre, expreso e informado, otorgado al completar un formulario de la Plataforma o al aceptar esta Política, así como en la necesidad de ejecutar la relación contractual con los Desarrolladores y de dar respuesta a tu consulta.",
              },
            ],
          },
          {
            heading: "6. Con quién compartimos tus datos",
            content: [
              { kind: "p", text: "Compartimos datos personales únicamente en los siguientes casos:" },
              {
                kind: "list",
                items: [
                  "Leads del Enlace de un Proyecto: se comparten directamente con el Desarrollador titular de ese Proyecto — es la finalidad misma del formulario.",
                  "Leads de la Landing Page o de un Perfil de Desarrollador: son tratados en primer término por RUUM, y solo se ponen a disposición de un Desarrollador bajo condiciones comerciales adicionales acordadas por separado.",
                  "Proveedores tecnológicos que prestan servicios a RUUM (por ejemplo, hosting, correo electrónico, analítica), quienes actúan como encargados del tratamiento bajo obligaciones de confidencialidad y seguridad, y solo tratan los datos conforme a nuestras instrucciones.",
                  "Autoridades competentes, cuando exista un requerimiento legal válido.",
                ],
              },
              { kind: "p", text: "RUUM no vende datos personales a terceros ni los comparte con fines publicitarios ajenos a la Plataforma." },
            ],
          },
          {
            heading: "7. Cuánto tiempo conservamos tus datos",
            content: [
              {
                kind: "p",
                text: "Conservamos tus datos personales mientras sean útiles para las finalidades descritas en la sección 4, mientras no solicites su supresión, y mientras no exista una obligación legal o contractual de conservarlos por un plazo mayor.",
              },
            ],
          },
          {
            heading: "8. Transferencias internacionales",
            content: [
              {
                kind: "p",
                text: "La infraestructura tecnológica que usamos para operar la Plataforma (por ejemplo, servidores en la nube) puede estar ubicada fuera de Bolivia, actualmente con {{PROVEEDOR DE HOSTING / NUBE}}. En esos casos, exigimos a nuestros proveedores estándares de seguridad razonables y equivalentes a los descritos en esta Política, independientemente del país donde se alojen los datos.",
              },
            ],
          },
          {
            heading: "9. Tus derechos sobre tus datos",
            content: [
              {
                kind: "p",
                text: "Como titular de tus datos personales, puedes ejercer en cualquier momento los siguientes derechos, escribiendo a {{EMAIL DE PRIVACIDAD}}:",
              },
              {
                kind: "list",
                items: [
                  "Acceso: solicitar información sobre qué datos tuyos tratamos y con qué finalidad.",
                  "Rectificación: solicitar la corrección de datos inexactos o incompletos.",
                  "Supresión: solicitar la eliminación de tus datos, cuando ya no sean necesarios para las finalidades que motivaron su tratamiento o cuando revoques tu consentimiento.",
                  "Oposición: oponerte al tratamiento de tus datos para fines de comunicación comercial.",
                  "Revocación del consentimiento: revocar en cualquier momento el consentimiento otorgado, con efectos hacia el futuro. Ten en cuenta que revocarlo puede impedirnos dar seguimiento a una consulta en curso.",
                ],
              },
              {
                kind: "p",
                text: "Responderemos toda solicitud dentro de un plazo razonable. Si tu solicitud se refiere a datos capturados a través del Enlace de un Proyecto, podemos redirigirte al Desarrollador correspondiente conforme a lo explicado en la sección 2.",
              },
            ],
          },
          {
            heading: "10. Seguridad de los datos",
            content: [
              {
                kind: "p",
                text: "Implementamos medidas de seguridad técnicas y organizativas razonables para proteger tus datos personales frente a accesos no autorizados, pérdida, alteración o divulgación indebida. No obstante, ningún sistema es completamente infalible. Si llegáramos a tomar conocimiento de un incidente de seguridad que afecte tus datos, te lo notificaremos dentro de un plazo razonable, conforme a la normativa aplicable y, en el caso de datos gestionados por cuenta de un Desarrollador, conforme al plazo pactado en el contrato comercial respectivo.",
              },
            ],
          },
          {
            // Regla E: reemplazo completo del contenido — lleva el anchor del banner de consentimiento.
            id: "cookies",
            heading: "11. Cookies y tecnologías similares",
            content: [
              {
                kind: "p",
                text: "RUUM utiliza tecnologías necesarias para recordar las preferencias de consentimiento del Usuario y garantizar el funcionamiento del sitio. La decisión sobre el uso de analítica se almacena localmente en el navegador durante un plazo de ciento ochenta (180) días, salvo que el Usuario elimine previamente los datos de navegación o cambie su elección.",
              },
              {
                kind: "p",
                text: "Con la autorización del Usuario, RUUM utiliza Google Analytics 4 (GA4) para comprender cómo se utiliza la Plataforma y mejorar su experiencia. GA4 puede emplear cookies e identificadores del navegador y procesar información como las páginas visitadas, las secciones visualizadas, los clics realizados, el tipo de dispositivo, el navegador y la ubicación aproximada.",
              },
              {
                kind: "p",
                text: "Los eventos personalizados implementados por RUUM no envían deliberadamente a Google nombres, direcciones de correo electrónico, números de teléfono, contenido de mensajes ni otros campos de texto libre.",
              },
              {
                kind: "p",
                text: "El Usuario puede aceptar o rechazar el uso de analítica mediante el banner mostrado en la Plataforma y puede modificar su elección posteriormente desde la opción ‘Preferencias de cookies’ disponible en el pie de página. Google Analytics 4 no se carga mientras el Usuario no haya autorizado las cookies analíticas.",
              },
              {
                kind: "p",
                text: "El Usuario también puede restringir o eliminar cookies y datos almacenados desde la configuración de su navegador. La eliminación de estos datos puede provocar que la Plataforma vuelva a solicitar su elección.",
              },
            ],
          },
          {
            heading: "12. Menores de edad",
            content: [
              {
                kind: "p",
                text: "La Plataforma está dirigida a personas con capacidad legal para contratar. No solicitamos ni recopilamos intencionalmente datos de menores de edad.",
              },
            ],
          },
          {
            heading: "13. Tu relación con el Desarrollador",
            content: [
              {
                kind: "p",
                text: "Una vez que un Desarrollador recibe tus datos como Lead (ya sea a través del Enlace de su Proyecto, o de la Landing Page bajo las condiciones comerciales adicionales descritas en la sección 6), el tratamiento posterior que dicho Desarrollador haga de tus datos en sus propios sistemas (por ejemplo, su CRM comercial) se rige por las políticas de privacidad propias del Desarrollador. Te recomendamos revisarlas al interactuar directamente con él.",
              },
            ],
          },
          {
            heading: "14. Cambios a esta Política",
            content: [
              {
                kind: "p",
                text: "Podemos actualizar esta Política de Privacidad para reflejar cambios en la Plataforma, en nuestro modelo de negocio o en la normativa aplicable. Publicaremos la versión vigente en la Plataforma, indicando su fecha de actualización. Te recomendamos revisarla periódicamente.",
              },
            ],
          },
          {
            heading: "15. Contacto",
            content: [
              {
                kind: "p",
                text: "Para consultas sobre esta Política o para ejercer tus derechos, puedes escribir a {{EMAIL DE PRIVACIDAD}} o dirigirte a {{DOMICILIO LEGAL DE RUUM}}.",
              },
            ],
          },
        ],
      } satisfies LegalDocument,
    },
    terminos: {
      metadata: {
        title: "Términos y Condiciones — Ruumap",
        description:
          "Términos y condiciones de uso de la plataforma de visualización virtual e inmersiva inmobiliaria Ruumap.",
      },
      document: {
        documentTitle: "Términos y Condiciones de Uso",
        subtitle: "Plataforma tecnológica RUUM",
        versionLine: "Versión 1.0 — Vigente desde {{FECHA DE VIGENCIA}}", // Regla G
        // Regla F: sin caja "Sobre este documento" — arranca directo en la sección 1.
        sections: [
          {
            heading: "1. Aceptación de los Términos",
            content: [
              {
                kind: "p",
                text: "El acceso o uso de la Plataforma RUUM (la “Plataforma”), en cualquiera de sus componentes —Landing Page, Perfiles de Desarrollador, Enlaces de Proyecto o Panel de Administración—, implica la aceptación plena y sin reservas de estos Términos. Si el Usuario no está de acuerdo con ellos, debe abstenerse de acceder o usar la Plataforma.",
              },
              {
                kind: "p",
                text: "Cuando el acceso lo realiza una empresa u organización a través de un representante, se entiende que dicho representante cuenta con facultades suficientes para aceptar estos Términos en su nombre.",
              },
            ],
          },
          {
            heading: "2. Definiciones",
            content: [
              { kind: "p", text: "“Plataforma”: el conjunto de la Landing Page de RUUM, los Perfiles de Desarrollador, los Enlaces de Proyecto y el Panel de Administración, así como cualquier otro producto, aplicación o funcionalidad que RUUM ofrezca bajo su marca." },
              { kind: "p", text: "“Landing Page de RUUM”: la página principal o portal general de RUUM, donde se exhiben de forma agregada distintos Desarrolladores y Proyectos." },
              { kind: "p", text: "“Perfil de Desarrollador”: la sección dentro de la Landing Page que agrupa la marca, información institucional y los Proyectos de un Desarrollador." },
              { kind: "p", text: "“Enlace del Proyecto”: la página propia y específica de un Proyecto dentro de la Plataforma, distinta de la Landing Page." },
              { kind: "p", text: "“Panel de Administración”: el módulo de acceso restringido que permite a un Desarrollador cargar y editar la información de sus Proyectos." },
              { kind: "p", text: "“Contenido”: planos, renders, fotografías, videos, tours virtuales, textos, precios, disponibilidad, marcas y demás material relativo a un Proyecto o a un Perfil de Desarrollador." },
              { kind: "p", text: "“Leads”: los datos de contacto y demás información de Visitantes o Prospectos interesados en un Proyecto, capturados a través de formularios de la Plataforma." },
              { kind: "p", text: "“Usuario”: toda persona que accede o usa la Plataforma, incluyendo Visitantes, Prospectos y Desarrolladores." },
              { kind: "p", text: "“Visitante / Prospecto”: toda persona natural que navega la Plataforma y/o consulta información sobre un Proyecto, con o sin intención de compra." },
              { kind: "p", text: "“Desarrollador”: la empresa u organización dedicada al desarrollo, construcción y/o comercialización de proyectos inmobiliarios que contrata los servicios de RUUM." },
            ],
          },
          {
            heading: "3. Naturaleza del Servicio",
            content: [
              { kind: "p", text: "RUUM opera una plataforma tecnológica de exhibición y comercialización digital de proyectos inmobiliarios — una vitrina digital que conecta a Desarrolladores Inmobiliarios con el público interesado." },
              { kind: "p", text: "RUUM no es una agencia inmobiliaria, corredor, intermediario, agente, representante ni garante de ningún Desarrollador ni de sus Proyectos. RUUM no participa en la negociación, celebración ni ejecución de contratos de compraventa, reserva, promesa de venta, anticrético o cualquier otro instrumento entre un Desarrollador y sus clientes." },
              { kind: "p", text: "RUUM no interviene, procesa, custodia ni recibe pagos, reservas, señas o anticipos relacionados con la compra de unidades inmobiliarias. Toda transacción se pacta y ejecuta de forma directa entre el Desarrollador y sus clientes, sin intermediación de RUUM." },
              { kind: "p", text: "Los componentes, funcionalidades y modalidades comerciales de la Plataforma pueden evolucionar, ampliarse, modificarse o descontinuarse en el tiempo, a criterio de RUUM y conforme a su desarrollo como producto y negocio." },
            ],
          },
          {
            heading: "4. Tipos de Usuario",
            content: [
              {
                // Regla A: qualifier agregado.
                kind: "p",
                text: "Visitantes y Prospectos: personas que navegan la Plataforma, consultan Proyectos y/o completan formularios de contacto (cuando se encuentren habilitados). Su uso de la Plataforma es gratuito.",
              },
              {
                kind: "p",
                text: "Desarrolladores Inmobiliarios: empresas que contratan a RUUM para exhibir sus Proyectos, bajo un contrato comercial suscrito por separado, cuyas condiciones específicas (tarifas, plazos, vigencia, modalidades de publicación) se acuerdan de forma individual y prevalecen, para esa relación, sobre estos Términos en caso de conflicto.",
              },
              {
                kind: "p",
                text: "RUUM podrá, en el futuro, habilitar otros perfiles de cliente (por ejemplo, agentes o corredores inmobiliarios individuales, u otros actores del sector), sujetos a condiciones comerciales y contractuales propias que se comunicarán oportunamente.",
              },
            ],
          },
          {
            heading: "5. Cuentas de Acceso y Panel de Administración",
            content: [
              {
                kind: "p",
                text: "El acceso al Panel de Administración se realiza mediante credenciales individuales asignadas al Desarrollador o a las personas que este autorice. El Desarrollador es responsable de custodiar diligentemente dichas credenciales y de toda actividad realizada a través de ellas, incluida la de sus dependientes, empleados o subcontratistas.",
              },
              {
                kind: "p",
                text: "El Desarrollador debe notificar a RUUM de inmediato ante cualquier sospecha de uso no autorizado de sus credenciales de acceso.",
              },
            ],
          },
          {
            heading: "6. Contenido Publicado en la Plataforma",
            content: [
              {
                kind: "p",
                text: "Gran parte del Contenido visible en la Plataforma (fotografías, renders, precios, disponibilidad, descripciones y demás información de un Proyecto) es suministrado directamente por el Desarrollador correspondiente, quien es el único responsable de su veracidad, exactitud, vigencia y legalidad.",
              },
              {
                kind: "p",
                text: "RUUM no verifica de forma independiente el derecho propietario del Desarrollador, la existencia o vigencia de permisos, licencias de construcción, planos aprobados u otras autorizaciones necesarias para el desarrollo del Proyecto. La publicación de un Proyecto en la Plataforma no implica, en ningún caso, un aval, respaldo, recomendación ni garantía por parte de RUUM respecto del Desarrollador o del Proyecto.",
              },
              {
                kind: "p",
                text: "Se recomienda a todo Visitante o Prospecto verificar directamente con el Desarrollador cualquier información relevante (precios, disponibilidad, plazos de entrega, permisos, condiciones de compra) antes de tomar cualquier decisión.",
              },
            ],
          },
          {
            heading: "7. Formularios de Contacto y Datos Compartidos",
            content: [
              {
                // Regla A: qualifier agregado.
                kind: "p",
                text: "Cuando un Visitante o Prospecto completa un formulario de contacto sobre un Proyecto específico a través de su Enlace propio (cuando dichos formularios se encuentren habilitados), sus datos se comparten directamente con el Desarrollador titular de ese Proyecto, para que este pueda atenderlo. Cuando el formulario se completa a través de la Landing Page general o de un Perfil de Desarrollador (sin pasar por el Enlace propio del Proyecto), los datos son recibidos y tratados en primera instancia por RUUM.",
              },
              {
                kind: "p",
                text: "El detalle de qué entidad trata cada dato, con qué finalidad y bajo qué rol, se encuentra en la Política de Privacidad de RUUM, la cual forma parte integral de estos Términos.",
              },
              {
                // Regla D: párrafo nuevo sobre WhatsApp.
                kind: "p",
                text: "La Plataforma también puede habilitar canales de contacto externos, como WhatsApp. Cuando el Usuario decide utilizarlos, la comunicación posterior se realiza a través del servicio de tercero correspondiente y se sujeta adicionalmente a sus términos y políticas.",
              },
            ],
          },
          {
            heading: "8. Uso Aceptable de la Plataforma",
            content: [
              { kind: "p", text: "Al usar la Plataforma, el Usuario se compromete a no:" },
              {
                kind: "list",
                items: [
                  "Acceder o intentar acceder a áreas restringidas de la Plataforma sin autorización.",
                  "Utilizar robots, scrapers u otros medios automatizados para extraer datos o Contenido de la Plataforma sin autorización previa y escrita de RUUM.",
                  "Realizar ingeniería inversa, descompilar o intentar obtener el código fuente de la Plataforma.",
                  "Suplantar la identidad de otra persona o entidad, o falsear su afiliación con alguna de ellas.",
                  "Enviar comunicaciones no solicitadas (spam) a través de los formularios o canales de la Plataforma.",
                  "Publicar, cargar o transmitir contenido difamatorio, ilícito, fraudulento o que infrinja derechos de propiedad intelectual de terceros.",
                  "Interferir con la seguridad, integridad o normal funcionamiento de la Plataforma, incluyendo la introducción de virus o código malicioso.",
                  "Usar la Plataforma para cualquier fin ilícito conforme a la normativa boliviana aplicable.",
                ],
              },
              {
                kind: "p",
                text: "El incumplimiento de esta sección faculta a RUUM a suspender o restringir el acceso del Usuario, sin perjuicio de las demás acciones legales que correspondan.",
              },
            ],
          },
          {
            heading: "9. Propiedad Intelectual",
            content: [
              {
                kind: "p",
                text: "La marca “RUUM”, el software, el código fuente, la base de datos estructural, el diseño y la interfaz de la Plataforma son de propiedad exclusiva de RUUM o de sus licenciantes. Ninguna disposición de estos Términos se interpretará como una cesión, licencia o autorización de uso de dichos elementos a favor del Usuario, salvo el uso ordinario de la Plataforma conforme a su finalidad.",
              },
              {
                kind: "p",
                text: "El Contenido de cada Proyecto (renders, planos, fotografías, marca del Proyecto, textos comerciales) pertenece al Desarrollador respectivo, en los términos que se pacten en el contrato comercial correspondiente.",
              },
              {
                kind: "p",
                text: "Queda prohibida la reproducción, distribución o uso del Contenido de la Plataforma con fines distintos a la consulta personal del Usuario, sin autorización previa y escrita del titular correspondiente.",
              },
            ],
          },
          {
            heading: "10. Servicios y Alianzas de Terceros",
            content: [
              {
                kind: "p",
                text: "La Plataforma puede integrar, enlazar o apoyarse en servicios, herramientas o alianzas de terceros (por ejemplo, proveedores de renderizado, mapas, hosting, analítica, o soluciones de acceso a financiamiento inmobiliario) para complementar el Servicio. RUUM no controla ni es responsable del contenido, disponibilidad ni de las políticas de privacidad de dichos terceros, y recomienda al Usuario revisarlas antes de interactuar con ellos.",
              },
            ],
          },
          {
            heading: "11. Disponibilidad del Servicio",
            content: [
              {
                kind: "p",
                text: "RUUM procura mantener la Plataforma disponible y operativa de forma razonable, pero no garantiza un acceso ininterrumpido o libre de errores. RUUM podrá suspender temporalmente el Servicio por mantenimiento, actualizaciones, causas de fuerza mayor o motivos de seguridad, procurando informar oportunamente cuando sea posible.",
              },
            ],
          },
          {
            heading: "12. Limitación de Responsabilidad",
            content: [
              { kind: "p", text: "En la máxima medida permitida por la normativa boliviana aplicable, RUUM no será responsable por:" },
              {
                kind: "list",
                items: [
                  "Actos, omisiones, incumplimientos, fraudes o conductas dolosas del Desarrollador frente a sus compradores, prospectos o terceros.",
                  "La exactitud, vigencia o veracidad de precios, disponibilidad, permisos, renders o cualquier otro Contenido publicado por un Desarrollador.",
                  "La no entrega, entrega tardía o entrega de características distintas a las ofertadas respecto de unidades comercializadas a través de la Plataforma.",
                  "Controversias, reclamos o litigios entre un Desarrollador y sus compradores, prospectos o terceros.",
                  "Daños indirectos, incidentales o lucro cesante derivados del uso o imposibilidad de uso de la Plataforma, salvo dolo o culpa grave de RUUM.",
                ],
              },
              {
                kind: "p",
                text: "Esta limitación no excluye la responsabilidad de RUUM por dolo o culpa grave propia, ni contraviene disposiciones imperativas de protección al consumidor que resulten aplicables.",
              },
            ],
          },
          {
            heading: "13. Indemnidad",
            content: [
              {
                kind: "p",
                text: "El Usuario se compromete a mantener indemne a RUUM, sus socios, administradores, empleados y dependientes, frente a cualquier reclamo, demanda o gasto razonable derivado del uso indebido de la Plataforma por su parte o del incumplimiento de estos Términos.",
              },
            ],
          },
          {
            heading: "14. Modificaciones a estos Términos",
            content: [
              {
                kind: "p",
                text: "RUUM podrá actualizar estos Términos en cualquier momento, para reflejar cambios en la Plataforma, en su modelo de negocio o en la normativa aplicable. Los cambios materiales se notificarán mediante un aviso visible en la Plataforma, con antelación razonable cuando ello sea posible, indicando su fecha de vigencia. El uso continuado de la Plataforma con posterioridad a la publicación de un cambio implica su aceptación.",
              },
            ],
          },
          {
            heading: "15. Suspensión y Terminación de Acceso",
            content: [
              {
                kind: "p",
                text: "RUUM podrá suspender, restringir o dar de baja el acceso de un Usuario que incumpla estos Términos, incurra en conductas fraudulentas o genere un riesgo razonable para la Plataforma, otros Usuarios o terceros, sin perjuicio de las demás acciones legales que correspondan. Para Desarrolladores, la terminación del vínculo comercial se rige adicionalmente por el contrato suscrito con RUUM.",
              },
            ],
          },
          {
            heading: "16. Legislación Aplicable y Resolución de Controversias",
            content: [
              { kind: "p", text: "Estos Términos se rigen e interpretan conforme a las leyes del Estado Plurinacional de Bolivia." },
              {
                kind: "p",
                text: "Las controversias entre RUUM y un Desarrollador se resuelven conforme al mecanismo pactado en su contrato comercial (arbitraje ante el Centro de Conciliación y Arbitraje Comercial de CAINCO, Santa Cruz de la Sierra).",
              },
              {
                kind: "p",
                text: "Para Visitantes y Prospectos, cualquier controversia derivada del uso de la Plataforma se someterá a los tribunales ordinarios competentes de {{CIUDAD}}, Bolivia, sin perjuicio de las normas de protección al consumidor que, en su caso, resulten aplicables e irrenunciables.",
              },
            ],
          },
          {
            heading: "17. Disposiciones Generales",
            content: [
              {
                kind: "p",
                text: "Si alguna disposición de estos Términos fuera declarada nula, inválida o inexigible, ello no afectará la validez de las restantes, las cuales mantendrán su plena vigencia.",
              },
              {
                kind: "p",
                text: "La falta de ejercicio por parte de RUUM de algún derecho previsto en estos Términos no implica renuncia a ejercerlo posteriormente.",
              },
              {
                kind: "p",
                text: "Estos Términos, junto con la Política de Privacidad de RUUM, constituyen el acuerdo íntegro entre RUUM y el Usuario respecto del uso general de la Plataforma, sin perjuicio de los contratos comerciales específicos suscritos con los Desarrolladores.",
              },
              { kind: "p", text: "El idioma que prevalece para efectos de interpretación de estos Términos es el español." },
            ],
          },
          {
            heading: "18. Contacto",
            content: [
              {
                kind: "p",
                text: "Para consultas sobre estos Términos, el Usuario puede escribir a {{EMAIL DE CONTACTO}} o dirigirse a {{DOMICILIO LEGAL DE RUUM}}.",
              },
            ],
          },
        ],
      } satisfies LegalDocument,
    },
  },

  /**
   * Copy del banner de consentimiento de cookies/analítica. Dos categorías
   * únicamente: necesarias (siempre activas, sin toggle) y analíticas
   * (desactivadas por defecto). Ver componentes/consent/ y
   * openspec/changes/establish-seo-and-basic-analytics/specs/analytics-consent.
   */
  consent: {
    banner: {
      message:
        "Usamos cookies propias y de terceros para el funcionamiento del sitio y para analizar el tráfico web. Puede aceptar su uso o configurar sus preferencias de privacidad.",
      acceptLabel: "Aceptar",
      rejectLabel: "Rechazar",
      moreInfoLabel: "Más información",
      moreInfoHref: "/privacidad#cookies",
    },
  },
};
