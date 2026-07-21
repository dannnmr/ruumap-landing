import Image from "next/image";
import { siteContent } from "@/content/site";

const { links: NAV_LINKS, cta: NAV_CTA } = siteContent.nav;

/**
 * Navbar fija con fondo degradado + blur.
 * Server Component (sin "use client") — no requiere estado ni efectos.
 *
 * Mobile-first: en <lg los links de texto se ocultan (irían detrás de un
 * menú hamburguesa en una próxima iteración) para que el logo y el CTA
 * nunca colisionen en pantallas angostas.
 */
export default function Navbar() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4
                 px-5 py-4 backdrop-blur-md sm:px-8 sm:py-5 lg:px-12
                 bg-gradient-to-b from-background/85 to-transparent">
      <Image
        src="/assets/ruum_logo_black.png"
        alt="ruum"
        width={90}
        height={22}
        className="h-[18px] w-auto shrink-0 sm:h-[22px]"
        priority
      />

      <nav
        aria-label="Navegación principal"
        className="hidden shrink-0 gap-[22px] whitespace-nowrap text-[12.5px] font-semibold tracking-[0.02em]
                   text-gray-100  lg:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors duration-300 hover:text-accent">
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="shrink-0 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-[12px]
                   font-bold text-background transition-all duration-300
                   hover:scale-105 hover:opacity-90 active:scale-95
                   sm:px-5.5 sm:py-2.5 sm:text-[12.5px]">
        {NAV_CTA}
      </button>
    </header>
  );
}
