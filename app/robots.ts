import type { MetadataRoute } from "next";
import { getSiteUrl, isSiteIndexable } from "@/lib/site-config";

/**
 * `robots.txt` siempre permite el rastreo completo del sitio, en cualquier
 * ambiente — nunca usa `Disallow: /` como forma de mantener un ambiente
 * fuera del índice. La exclusión real de indexación vive en la directiva
 * `noindex, nofollow` por página (`app/layout.tsx`), que solo funciona si el
 * crawler puede efectivamente rastrear la página para leerla; bloquear el
 * rastreo dejaría URLs ya descubiertas potencialmente indexadas solo con su
 * URL, sin forma de que Google confirme el `noindex` (ver
 * openspec/changes/establish-seo-and-basic-analytics/specs/seo-foundations,
 * "robots.ts never substitutes a blanket disallow for noindex").
 *
 * El `sitemap` solo se anuncia cuando el ambiente es indexable — no tiene
 * sentido publicitar un sitemap que en ese caso está vacío.
 */
export default function robots(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots["rules"] = {
    userAgent: "*",
    allow: "/",
  };

  if (!isSiteIndexable()) {
    return { rules };
  }

  return {
    rules,
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
