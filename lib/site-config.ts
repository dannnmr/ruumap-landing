/**
 * Contrato de entorno para SEO/indexación (ver openspec/changes/
 * establish-seo-and-basic-analytics/design.md, "SITE_URL / SITE_INDEXABLE
 * env contract"). Server-side únicamente — nada acá debe leerse desde un
 * componente cliente, y ningún valor puede inferirse de un host provisto por
 * el proveedor de hosting (p. ej. la URL de un deployment de Vercel): eso
 * acoplaría el canonical/OG/sitemap al proveedor actual y rompería la
 * portabilidad a Cloudflare.
 */

/**
 * URL canónica del sitio (sin slash final), leída de `SITE_URL`. Lanza en
 * build/render si falta — nunca cae en un fallback silencioso a un host de
 * Vercel o a localhost, que sería exactamente el acoplamiento que este
 * contrato existe para evitar.
 */
export function getSiteUrl(): string {
  const raw = process.env.SITE_URL;
  if (!raw) {
    throw new Error(
      "SITE_URL no está configurada. Definila en el entorno (ver .env.example) — " +
        "nunca debe inferirse de un host provisto por el proveedor de hosting."
    );
  }
  return raw.replace(/\/+$/, "");
}

/**
 * Indica si este ambiente debe ser indexable por buscadores. Comparación
 * estricta contra `"true"`: cualquier otro valor (vacío, `"1"`, `"yes"`, no
 * definida, un typo) resuelve a `false` — fail-closed a propósito, para que
 * un error de configuración nunca termine indexando un ambiente de prueba.
 */
export function isSiteIndexable(): boolean {
  return process.env.SITE_INDEXABLE === "true";
}
