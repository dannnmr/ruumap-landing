import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.ruumap.com",
      },
    ],
  },
  /**
   * URLs públicas en inglés para las rutas antes en español (pedido del
   * usuario, 2026-08-14). Las carpetas bajo `app/` siguen en español
   * (`app/desarrolladores/[slug]`, `app/privacidad`, `app/terminos` — no se
   * renombraron, cambio de menor riesgo) pero la URL que ve el usuario, los
   * links internos (`RevealGallery`, `content/site.ts` footer/consent) y el
   * canonical/OG de cada página ahora son en inglés (`/developers/[slug]`,
   * `/privacy`, `/terms`).
   *
   * - `redirects()` (308 permanente): quien entre por la URL vieja en
   *   español (link externo, favorito, resultado de buscador ya indexado)
   *   es redirigido a la versión en inglés — nunca 404.
   * - `rewrites()`: la URL en inglés se sirve internamente desde la carpeta
   *   en español correspondiente, sin duplicar contenido ni página.
   *
   * Orden de Next.js: redirects se evalúan antes que rewrites, así que una
   * request a /desarrolladores/x nunca llega a hacer match con el rewrite
   * de abajo — sale redirigida antes.
   */
  async redirects() {
    return [
      { source: "/desarrolladores/:slug", destination: "/developers/:slug", permanent: true },
      { source: "/desarrolladores", destination: "/developers", permanent: true },
      { source: "/privacidad", destination: "/privacy", permanent: true },
      { source: "/terminos", destination: "/terms", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/developers", destination: "/desarrolladores" },
      { source: "/developers/:slug", destination: "/desarrolladores/:slug" },
      { source: "/privacy", destination: "/privacidad" },
      { source: "/terms", destination: "/terminos" },
    ];
  },
};

export default nextConfig;
