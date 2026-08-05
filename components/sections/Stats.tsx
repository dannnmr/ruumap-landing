import { siteContent } from "@/content/site";

export default function Stats() {
  return (
    <section
      className="flex flex-col gap-10 border-y border-border
                 px-5 py-14 sm:flex-row sm:justify-between sm:gap-0 sm:px-10 sm:py-20 lg:px-16 lg:py-[90px] xl:px-[240px]"
    >
      {siteContent.stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="font-display text-[32px] font-normal tracking-tight text-accent sm:text-[40px] lg:text-[64px]">
            {stat.value}
          </div>
          <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.05em] text-gray-300 sm:text-[13px]">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}
