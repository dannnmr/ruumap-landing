import Image from "next/image";

type Project = {
  name: string;
  category: string;
  highlight: string;
  cta: string;
  image: string;
  alt: string;
};

// Fotos verificadas como gratuitas (licencia Unsplash) antes de usarlas.
const PROJECTS: Project[] = [
  {
    name: "Artemis",
    category: "Torre residencial",
    highlight: "Recorrido virtual + planos 3D",
    cta: "Ver caso de éxito",
    image:
      "https://images.unsplash.com/photo-1760259203238-01708384f7a2?q=80&w=1200&auto=format&fit=crop",
    alt: "Fachada de torre residencial moderna de vidrio, proyecto Artemis",
  },
  {
    name: "Itagua",
    category: "Desarrollo horizontal",
    highlight: "Exploración de amenidades",
    cta: "Ver caso de éxito",
    image:
      "https://images.unsplash.com/photo-1563657296501-c3770ae0057b?q=80&w=1200&auto=format&fit=crop",
    alt: "Edificio residencial moderno, proyecto Itagua",
  },
  {
    name: "PV Norte",
    category: "Mixed-use",
    highlight: "Planos 2D interactivos",
    cta: "Ver caso de éxito",
    image:
      "https://images.unsplash.com/photo-1663092340359-6a53ba3a3066?q=80&w=1200&auto=format&fit=crop",
    alt: "Skyline nocturno del entorno del proyecto PV Norte",
  },
  {
    name: "Buen Retiro",
    category: "Torre residencial",
    highlight: "Recorrido virtual de alta fidelidad",
    cta: "Ver caso de éxito",
    image:
      "https://images.unsplash.com/photo-1590985607645-75e6570fa4aa?q=80&w=1200&auto=format&fit=crop",
    alt: "Skyline nocturno del entorno del proyecto Buen Retiro",
  },
];

export default function AvailabilityCatalog() {
  return (
    <section
      id="proyectos"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-[150px]"
    >
      <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent sm:mb-[18px] sm:text-[12.5px]">
        Portafolio de casos de éxito
      </p>
      <h2 className="mb-10 max-w-[720px] font-display text-[28px] font-extrabold tracking-tight text-white sm:mb-16 sm:text-[34px] lg:mb-16 lg:text-[40px]">
        Desarrollos que ya digitalizamos para vender más rápido.
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
        {PROJECTS.map((project) => (
          <div key={project.name} className="group">
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[10px]">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
            <div className="mb-1.5 font-display text-[18px] font-bold tracking-tight text-white sm:text-[19px]">
              {project.name}
            </div>
            <div className="mb-3 text-[13px] font-medium text-gray-300 sm:text-[13.5px]">
              {project.category}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-100">{project.highlight}</span>
              <span className="font-semibold text-accent">{project.cta}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
