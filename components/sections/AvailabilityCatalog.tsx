import Image from "next/image";

type Project = {
  name: string;
  location: string;
  price: string;
  availability: string;
  image: string;
  alt: string;
};

// Fotos verificadas como gratuitas (licencia Unsplash) antes de usarlas.
const PROJECTS: Project[] = [
  {
    name: "Torre Altamar",
    location: "Puerto Madero, Buenos Aires",
    price: "Desde USD 145.000",
    availability: "14 disponibles",
    image:
      "https://images.unsplash.com/photo-1760259203238-01708384f7a2?q=80&w=1200&auto=format&fit=crop",
    alt: "Torre residencial moderna de fachada de vidrio",
  },
  {
    name: "Distrito Norte",
    location: "Zapopan, Guadalajara",
    price: "Desde USD 98.000",
    availability: "8 disponibles",
    image:
      "https://images.unsplash.com/photo-1563657296501-c3770ae0057b?q=80&w=1200&auto=format&fit=crop",
    alt: "Edificio moderno en Guadalajara, México",
  },
  {
    name: "Cielo Nuevo Polanco",
    location: "Ciudad de México",
    price: "Desde USD 210.000",
    availability: "Últimas 5",
    image:
      "https://images.unsplash.com/photo-1663092340359-6a53ba3a3066?q=80&w=1200&auto=format&fit=crop",
    alt: "Skyline nocturno de Ciudad de México",
  },
];

export default function AvailabilityCatalog() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-[150px]">
      <p className="mb-4 text-[12px] uppercase tracking-[0.16em] text-accent sm:mb-[18px] sm:text-[12.5px]">
        Catálogo activo
      </p>
      <h2 className="mb-10 font-display text-[28px] font-semibold sm:mb-16 sm:text-[34px] lg:mb-16 lg:text-[40px]">
        Disponibilidad en pre-venta
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
            </div>
            <div className="mb-1.5 text-[18px] font-semibold sm:text-[19px]">{project.name}</div>
            <div className="mb-3 text-[13px] text-muted-5 sm:text-[13.5px]">{project.location}</div>
            <div className="flex justify-between text-sm">
              <span>{project.price}</span>
              <span className="text-accent">{project.availability}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
