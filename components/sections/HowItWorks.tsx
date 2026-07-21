const STEPS = [
  {
    index: "01",
    title: "Elegí zona y presupuesto",
    description: "Filtrá entre proyectos activos en pre-venta según ciudad y rango de inversión.",
  },
  {
    index: "02",
    title: "Recorré el proyecto en 3D",
    description: "Navegá cada unidad como si ya estuvieras ahí, con vistas y terminaciones reales.",
  },
  {
    index: "03",
    title: "Reservá con disponibilidad real",
    description: "Confirmá tu unidad sabiendo exactamente qué queda disponible, hoy.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-surface px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-[130px]">
      <div className="mx-auto max-w-[1300px]">
        <p className="mb-4 text-[12px] uppercase tracking-[0.16em] text-accent sm:mb-[18px] sm:text-[12.5px]">
          Cómo funciona
        </p>
        <h2 className="mb-12 font-display text-[28px] font-semibold sm:mb-16 sm:text-[34px] lg:mb-[70px] lg:text-[40px]">
          Tres pasos, disponibilidad real.
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-14">
          {STEPS.map((step) => (
            <div
              key={step.index}
              className="border-t border-border-strong pt-6 transition-colors duration-300 hover:border-accent sm:pt-[26px]"
            >
              <div className="mb-3 font-display text-2xl text-accent sm:mb-[14px]">
                {step.index}
              </div>
              <div className="mb-[10px] text-[18px] font-semibold sm:text-[19px]">
                {step.title}
              </div>
              <p className="text-[14px] leading-[1.6] text-muted-3 sm:text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
