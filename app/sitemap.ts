import type { MetadataRoute } from "next";
import { developers } from "@/content/developers";
import { getSiteUrl, isSiteIndexable } from "@/lib/site-config";

/**
 * Vacío cuando el ambiente no es indexable — nunca hay que publicar rutas
 * "para cuando esté listo": si `SITE_INDEXABLE` no es exactamente `"true"`,
 * este sitemap no existe en la práctica. Cuando sí es indexable, lista solo
 * rutas públicas, canónicas: home + cada perfil de desarrollador (misma
 * lista `developers` que ya usa `generateStaticParams` en
 * app/desarrolladores/[slug]/page.tsx — no se introduce una segunda fuente
 * de verdad para qué perfiles existen). `/privacy` y `/terms` quedan
 * fuera a propósito: tienen su propio canonical/OG por si se comparten
 * directamente, pero no son superficies de descubrimiento de marketing (ver
 * design.md, "robots.ts / sitemap.ts shape").
 *
 * URLs en inglés (`/developers/[slug]`) — coincide con el canonical de
 * `app/desarrolladores/[slug]/page.tsx` y con los redirects 308 desde las
 * rutas en español en `next.config.ts` (2026-08-14).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSiteIndexable()) return [];

  const siteUrl = getSiteUrl();

  return [
    { url: siteUrl },
    ...developers.map((developer) => ({
      url: `${siteUrl}/developers/${developer.slug}`,
    })),
  ];
}
