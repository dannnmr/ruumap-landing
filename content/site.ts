/**
 * Fuente única de verdad para todo el copy y las imágenes del sitio.
 * Editar textos, URLs de Unsplash o CTAs se hace exclusivamente acá —
 * ningún componente debería tener strings de contenido hardcodeados.
 */

export type SiteImage = {
  src: string;
  alt: string;
};

export type Project = {
  index: string;
  name: string;
  tag: string;
  image: SiteImage;
};

export type Feature = {
  index: string;
  title: string;
  description: string;
  image: SiteImage;
};

export type Step = {
  index: string;
  title: string;
  description: string;
};

export const siteContent = {
  meta: {
    title: "Ruumap — Visualización arquitectónica que vende antes de construir",
    description:
      "Ruumap diseña experiencias digitales inmersivas —recorridos virtuales, planos 2D/3D interactivos y plataformas web— para desarrollos inmobiliarios de lujo.",
  },

  nav: {
    links: [
      { label: "Portafolio", href: "#proyectos" },
      { label: "Servicios", href: "#servicios" },
      { label: "Proceso", href: "#proceso" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: "Hablemos",
  },

  hero: {
    eyebrow: "Visualización arquitectónica de lujo",
    titleLines: ["Construye la visión.", "Nosotros la hacemos explorable."],
    subcopy:
      "Ruumap transforma planos y renders en experiencias digitales inmersivas —recorridos virtuales, planos 2D/3D interactivos y plataformas web— para que tu próximo desarrollo se venda antes de la primera piedra.",
    primaryCta: { label: "Ver portafolio", href: "#proyectos" },
    secondaryCta: { label: "Hablemos del proyecto", href: "#contacto" },
    backgroundImage: {
      src: "https://images.unsplash.com/photo-1767342976156-83239d26f08e?q=80&w=1920&auto=format&fit=crop",
      alt: "Arquitectura nocturna abstracta, fachadas de rascacielos en contraluz",
    } satisfies SiteImage,
  },

  revealGallery: {
    eyebrow: "Portafolio",
    heading: "Cuatro desarrollos. Un mismo nivel de detalle.",
    projects: [
      {
        index: "01",
        name: "Artemis",
        tag: "RESIDENCIAL PREMIUM — RECORRIDO 3D",
        image: {
          src: "https://images.unsplash.com/photo-1760259203238-01708384f7a2?q=80&w=1600&auto=format&fit=crop",
          alt: "Fachada de torre residencial de lujo con acabados de vidrio, proyecto Artemis",
        },
      },
      {
        index: "02",
        name: "Itagua",
        tag: "DESARROLLO HORIZONTAL — EXPLORACIÓN DE AMENIDADES",
        image: {
          src: "https://images.unsplash.com/photo-1563657296501-c3770ae0057b?q=80&w=1600&auto=format&fit=crop",
          alt: "Arquitectura residencial contemporánea con áreas comunes, proyecto Itagua",
        },
      },
      {
        index: "03",
        name: "PV Norte",
        tag: "MIXED-USE — PLANOS 2D/3D INTERACTIVOS",
        image: {
          src: "https://images.unsplash.com/photo-1546412414-272690cb5cb3?q=80&w=1600&auto=format&fit=crop",
          alt: "Torre mixed-use de gran altura al atardecer, proyecto PV Norte",
        },
      },
      {
        index: "04",
        name: "Buen Retiro",
        tag: "TORRE RESIDENCIAL — RECORRIDO DE ALTA FIDELIDAD",
        image: {
          src: "https://images.unsplash.com/photo-1655447844120-083802457b17?q=80&w=1600&auto=format&fit=crop",
          alt: "Torre residencial con jardines verticales integrados, proyecto Buen Retiro",
        },
      },
    ] satisfies Project[],
  },

  stats: [
    { value: "4+", label: "desarrollos digitalizados" },
    { value: "3x", label: "cierre de venta más rápido" },
    { value: "100%", label: "recorrido navegable, sin instalar nada" },
  ],

  features: [
    {
      index: "01",
      title: "Planos 3D Interactivos",
      description:
        "Convertimos planos técnicos en modelos navegables: cambiá de piso, girá la unidad y compará metrajes en tiempo real. Tu equipo comercial presenta cada opción con precisión milimétrica, sin depender de un plano estático.",
      image: {
        src: "https://images.unsplash.com/photo-1723367194881-fe2e53534170?q=80&w=1400&auto=format&fit=crop",
        alt: "Vista aérea de una planta arquitectónica de un desarrollo inmobiliario",
      },
    },
    {
      index: "02",
      title: "Recorridos de Alta Fidelidad",
      description:
        "Tus prospectos caminan cada unidad, piso y vista antes de que exista un solo ladrillo, con reconstrucción fiel a los acabados finales. Una experiencia fotorrealista que reemplaza la maqueta física.",
      image: {
        src: "https://images.unsplash.com/photo-1751711990617-bec0202c854a?q=80&w=1400&auto=format&fit=crop",
        alt: "Interior arquitectónico moderno con iluminación natural",
      },
    },
    {
      index: "03",
      title: "Integración de Amenidades",
      description:
        "Alberca, gimnasio, lobby, rooftop: cada amenidad se explora en detalle dentro de la misma experiencia, generando el deseo que acelera la decisión de compra sin necesidad de folletos impresos.",
      image: {
        src: "https://images.unsplash.com/photo-1768230130990-6b4fe57778ce?q=80&w=1400&auto=format&fit=crop",
        alt: "Skyline moderno de edificios residenciales de lujo",
      },
    },
  ] satisfies Feature[],

  howItWorks: {
    eyebrow: "Proceso",
    heading: "Una herramienta de ventas, no solo una imagen bonita.",
    steps: [
      {
        index: "01",
        title: "Digitalizamos tu desarrollo",
        description:
          "Partimos de tus planos y renders para construir un recorrido virtual, planos 2D/3D interactivos y amenidades navegables, listos para usarse como herramienta de ventas.",
      },
      {
        index: "02",
        title: "Tus agentes cierran con confianza",
        description:
          "En cada visita o llamada, el equipo comercial muestra unidades, vistas y terminaciones reales sin depender de renders sueltos ni maquetas físicas.",
      },
      {
        index: "03",
        title: "El prospecto visualiza y decide",
        description:
          "El cliente final recorre el proyecto como si ya estuviera construido, acelerando la decisión de compra antes del primer ladrillo.",
      },
    ] satisfies Step[],
  },

  closingCTA: {
    heading: "Acelera las ventas de tu próximo desarrollo. Hablemos.",
    primaryCta: { label: "Agendar una llamada", href: "#contacto" },
    backgroundImage: {
      src: "https://images.unsplash.com/photo-1723369962563-5e873df9b93b?q=80&w=1920&auto=format&fit=crop",
      alt: "Vista aérea de una obra en construcción al atardecer",
    } satisfies SiteImage,
  },

  footer: {
    tagline:
      "Recorridos virtuales, planos 2D/3D interactivos y exploración de amenidades para que agentes y desarrolladores vendan más rápido.",
    columns: [
      { title: "Producto", links: ["Recorridos virtuales", "Planos 2D/3D", "Amenidades", "Precios"] },
      { title: "Compañía", links: ["Nosotros", "Contacto"] },
      { title: "Legal", links: ["Privacidad", "Términos"] },
    ],
  },
};
