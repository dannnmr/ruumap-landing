import type { SocialLink } from "@/content/developers";
import { cn } from "@/lib/utils";

/**
 * Glifos simples propios (no assets de marca), mismo criterio ya usado en
 * `components/sections/Footer.tsx` para Facebook/Instagram — se agrega
 * LinkedIn acá porque `docs/references/perfil.desarrollador.inmobiliario.png`
 * muestra un tercer ícono en el header del perfil. Set separado del de
 * `Footer.tsx` a propósito: ese archivo pertenece a la landing (fuera de
 * alcance de este change) y ya está verificado contra su propia referencia.
 */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Facebook: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4V11H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.6.4-1 1-1z"
        fill="currentColor"
      />
    </svg>
  ),
  Instagram: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="8.2" r="1.1" fill="currentColor" />
      <path d="M8 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M11.5 17v-3.4c0-1.2.9-2.1 2-2.1s1.9.9 1.9 2.1V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function SocialLinks({
  social,
  theme = "light",
  className,
}: {
  social: SocialLink[];
  theme?: "dark" | "light";
  className?: string;
}) {
  const iconWrapper =
    theme === "light"
      ? "text-[oklch(20%_0_0)] hover:text-black/60"
      : "bg-white text-black hover:bg-white/40 hover:text-white";

  return (
    <div className={cn("flex gap-4 sm:justify-end", className)}>
      {social.map(
        (item) =>
          SOCIAL_ICONS[item.label] && (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "flex h-7 w-7 items-center justify-center transition-colors duration-300",
                iconWrapper
              )}
            >
              {SOCIAL_ICONS[item.label]}
            </a>
          )
      )}
    </div>
  );
}
