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
  image: SiteImage;
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
   */
  nav: {
    links: [
      { label: "Proyectos", target: SECTION_IDS.proyectos },
      { label: "Servicios", target: SECTION_IDS.servicios },
      { label: "Cómo funciona", target: SECTION_IDS.proceso },
    ] satisfies NavLink[],
    cta: { label: "Hablemos", target: SECTION_IDS.contacto } satisfies NavLink,
  },

  hero: {
    eyebrow: "SHOWROOM · DIGITAL",
    titleLines: ["Haz que cada proyecto se venda ", "antes de construirse."],
    subcopy:
      "Ruum convierte renders, recorridos virtuales y experiencias inmersivas en una poderosa herramienta para vender más y captar mejores clientes.",
    primaryCta: { label: "Explorar proyectos", href: "#proyectos" },
    secondaryCta: { label: "Agenda una demo", href: "#contacto" },
    /**
     * Provisional: video y poster son recursos de prueba, pendientes de
     * reemplazo por los definitivos. El poster reutiliza una imagen que ya
     * estaba en el repo (antes en `backgroundImages`, sin uso) — no se
     * inventó ningún recurso nuevo.
     */
    video: {
      src: "https://assets.mixkit.co/videos/49806/49806-720.mp4",
      poster: {
        src: "https://images.unsplash.com/photo-1767342976156-83239d26f08e?q=80&w=1920&auto=format&fit=crop",
        alt: "Arquitectura nocturna abstracta, fachadas de rascacielos en contraluz",
      },
    } satisfies SiteVideo,
  },

  statement: {
    text: "Transformamos proyectos inmobiliarios en experiencias navegables que venden.",
    second_text: "De un plano estático a una experiencia navegable: recorridos virtuales, planos 2D/3D y amenidades exploradas al detalle, unidad por unidad."
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
        image: {
          src: "https://images.unsplash.com/photo-1723367194881-fe2e53534170?q=80&w=1400&auto=format&fit=crop",
          alt: "Vista aérea de una planta arquitectónica digitalizada",
        },
      },
      {
        index: "02",
        title: "Tus agentes cierran con confianza",
        description:
          "En cada visita o llamada, el equipo comercial muestra unidades, vistas y terminaciones reales sin depender de renders sueltos ni maquetas físicas.",
        image: {
          src: "https://images.unsplash.com/photo-1590985607645-75e6570fa4aa?q=80&w=1400&auto=format&fit=crop",
          alt: "Skyline nocturno premium que un agente comparte con el cliente",
        },
      },
      {
        index: "03",
        title: "El prospecto visualiza y decide",
        description:
          "El cliente final recorre el proyecto como si ya estuviera construido, acelerando la decisión de compra antes del primer ladrillo.",
        image: {
          src: "https://images.unsplash.com/photo-1663092340359-6a53ba3a3066?q=80&w=1400&auto=format&fit=crop",
          alt: "Desarrollo ya visualizado por completo, listo para decidir",
        },
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
