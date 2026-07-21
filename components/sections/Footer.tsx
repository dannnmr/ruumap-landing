import Image from "next/image";
import { siteContent } from "@/content/site";

const { brand, footer } = siteContent;

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 pb-10 pt-14 sm:px-10 sm:pb-12 sm:pt-16 lg:px-16 lg:pb-[50px] lg:pt-[70px]">
      <div className="mx-auto mb-12 grid max-w-[1400px] grid-cols-1 gap-10 sm:mb-16 sm:grid-cols-2 lg:mb-[60px] lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/assets/ruum_logo_black.png"
            alt={brand.name}
            width={96}
            height={24}
            className="mb-[18px] h-6 w-auto"
          />
          <p className="max-w-[280px] text-sm font-medium leading-relaxed text-gray-300">
            {footer.tagline}
          </p>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-muted-7">
              {column.title}
            </p>
            <div className="flex flex-col gap-3 text-[14.5px] font-medium text-gray-200">
              {column.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="w-fit transition-colors duration-300 hover:text-accent"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1400px] border-t border-border pt-[30px] text-[13px] text-muted-7">
        © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
