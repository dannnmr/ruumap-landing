const STATS = [
  { value: "6", label: "continentes" },
  { value: "1.200+", label: "unidades relevadas" },
  { value: "Diaria", label: "actualización de datos" },
];

export default function Stats() {
  return (
    <section
      className="mx-auto flex max-w-[1200px] flex-col gap-10 border-y border-border
                 px-5 py-14 sm:flex-row sm:justify-between sm:gap-0 sm:px-10 sm:py-20 lg:px-16 lg:py-[90px]"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="font-display text-[32px] font-semibold text-accent sm:text-[40px]">
            {stat.value}
          </div>
          <div className="mt-2 text-[12px] uppercase tracking-[0.05em] text-muted-4 sm:text-[13px]">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}
