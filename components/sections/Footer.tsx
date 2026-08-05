import Image from "next/image";
import { siteContent } from "@/content/site";

const { brand, footer } = siteContent;

/**
 * Iconos sociales inline: glifos simples propios (no assets de marca de
 * Facebook/Instagram), suficientes para el ícono redondeado que muestra
 * docs/references/footer.png. `href` provisional ("#") — ver
 * siteContent.footer.social en content/site.ts.
 */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Facebook: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4V11H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.6.4-1 1-1z"
        fill="currentColor"
      />
    </svg>
  ),
  Instagram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 pb-10 pt-14 sm:px-10 sm:pb-12 sm:pt-16 lg:px-16 lg:pb-[50px] lg:pt-[70px]">
      <div className="mb-12 grid grid-cols-1 gap-10 sm:mb-16 sm:grid-cols-2 lg:mb-[60px] lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/assets/ruum_logo.svg"
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
                  className="w-fit transition-colors duration-300 hover:text-accent">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse items-center gap-6 border-t border-border pt-[30px] text-[13px] text-muted-7 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
        </p>

        <div className="flex gap-3">
          {footer.social.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              {SOCIAL_ICONS[social.label]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
