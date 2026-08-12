import Image from "next/image";
import type { Developer } from "@/content/developers";
import { getInitials } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialLinks";

const FOOTER_NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Características", href: "#caracteristicas" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Prensa", href: "#prensa" },
] as const;

/**
 * Footer propio del perfil — distinto del `Footer` de la landing (contenido
 * y lenguaje visual diferentes; ver design.md "Template composition"). A
 * diferencia del resto del perfil (tema claro), reutiliza el mismo fondo
 * oscuro que ya usa el resto del sitio: es lo que muestra
 * docs/references/perfil.desarrollador.inmobiliario.png para esta franja en
 * particular.
 */
export function ProfileFooter({ developer }: { developer: Developer }) {
  return (
    <footer className="bg-background px-6 py-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          {developer.logo ? (
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded">
              <Image src={developer.logo.src} alt={developer.logo.alt} fill className="object-contain" />
            </div>
          ) : (
            <div
              className="flex h-8 w-8 items-center justify-center rounded bg-white/10 font-display text-[11px] font-bold text-white"
              aria-hidden="true"
            >
              {getInitials(developer.name)}
            </div>
          )}
          <span className="font-display text-[14px] font-semibold text-white">{developer.name}</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-[13px] text-gray-300">
          {FOOTER_NAV.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors duration-300 hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>

        {developer.social && developer.social.length > 0 && (
          <SocialLinks social={developer.social} theme="dark" />
        )}
      </div>

      <p className="mx-auto mt-8 text-center text-[12px] text-muted-7 max-w-[1440px]">
        Desarrollado por Ruum, {new Date().getFullYear()}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
