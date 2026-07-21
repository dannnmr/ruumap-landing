const STEPS = [
  {
    index: "01",
    title: "Digitalizamos tu desarrollo",
    description:
      "Convertimos planos y renders en un recorrido virtual, planos 2D/3D interactivos y amenidades navegables, listos para usarse como herramienta de ventas.",
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
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-24 bg-surface px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-[130px]"
    >
      <div className="mx-auto max-w-[1300px]">
        <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent sm:mb-[18px] sm:text-[12.5px]">
          Cómo funciona
        </p>
        <h2 className="mb-12 font-display text-[28px] font-extrabold tracking-tight text-white sm:mb-16 sm:text-[34px] lg:mb-[70px] lg:text-[40px]">
          Una herramienta de ventas, no solo una imagen bonita.
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-14">
          {STEPS.map((step) => (
            <div
              key={step.index}
              className="border-t border-border-strong pt-6 transition-colors duration-300 hover:border-accent sm:pt-[26px]"
            >
              <div className="mb-3 font-display text-2xl font-bold text-accent sm:mb-[14px]">
                {step.index}
              </div>
              <div className="mb-[10px] font-display text-[18px] font-bold text-white sm:text-[19px]">
                {step.title}
              </div>
              <p className="font-sans text-[14px] font-medium leading-relaxed text-gray-100 sm:text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
