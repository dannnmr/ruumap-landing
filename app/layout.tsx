import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { siteContent } from "@/content/site";
import { getSiteUrl, isSiteIndexable } from "@/lib/site-config";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const { brand, meta, closingCTA } = siteContent;

/**
 * `metadataBase` + robots + Open Graph/Twitter viven acá porque aplican a
 * todo el sitio; cada ruta con su propio contenido (home vía `app/page.tsx`
 * heredando esto, `/privacidad`, `/terminos`, `/desarrolladores/[slug]`)
 * agrega su propio `alternates.canonical` y, cuando corresponde, su propio
 * title/description/OG (ver esas rutas). El copy en sí vive en
 * `content/site.ts` — nada hardcodeado acá (ver
 * openspec/changes/establish-seo-and-basic-analytics/design.md, "SEO
 * positioning boundary").
 *
 * `robots` depende de `SITE_INDEXABLE`: no indexable por defecto en
 * cualquier ambiente salvo que esté explícitamente en `"true"` (ver
 * lib/site-config.ts). Esto nunca usa `Disallow: /` — la exclusión de
 * indexación vive acá, en la directiva `noindex, nofollow` por página; ver
 * `app/robots.ts` para la razón de por qué el robots.txt en sí sigue
 * permitiendo el rastreo.
 */
const indexable = isSiteIndexable();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: "/",
  },
  robots: indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    url: "/",
    siteName: brand.name,
    locale: "es_BO",
    type: "website",
    images: [
      {
        url: meta.ogImage.src,
        width: meta.ogImage.width,
        height: meta.ogImage.height,
        alt: meta.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.ogDescription,
    images: [meta.ogImage.src],
  },
};

/**
 * JSON-LD Organization + WebSite. Solo campos respaldados por datos ya
 * confirmados en el repo (nombre de marca, email de contacto público, el
 * dominio confirmado, la descripción aprobada) — sin dirección, redes
 * sociales, premios ni valoraciones inventadas (ver design.md, "JSON-LD
 * field selection"). `footer.social` son URLs genéricas de placeholder
 * (facebook.com/instagram.com sin handle real), no perfiles reales de
 * Ruumap, así que tampoco son elegibles para `sameAs`.
 */
function buildJsonLd(siteUrl: string) {
  const organization = {
    "@type": "Organization",
    name: brand.name,
    url: siteUrl,
    email: closingCTA.contact.email,
    description: meta.jsonLdDescription,
    logo: `${siteUrl}/icon.svg`,
  };

  const website = {
    "@type": "WebSite",
    name: brand.name,
    url: siteUrl,
    description: meta.jsonLdDescription,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildJsonLd(getSiteUrl());

  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body className="bg-background font-sans font-medium text-gray-100 antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConsentProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <ConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
