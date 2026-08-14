import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { developers, getDeveloperBySlug } from "@/content/developers";
import { siteContent } from "@/content/site";
import { DeveloperProfileTemplate } from "@/components/profile/DeveloperProfileTemplate";

type ProfilePageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Perfil de desarrollador (ver docs/product-context.md, "Perfiles
 * inmobiliarios", y specs/developer-profiles). Ruta estática: cada perfil
 * configurado se pre-renderiza en build (`generateStaticParams`) — no hay
 * fetch en cliente, coherente con `docs/performance-guidelines.md`.
 */
export async function generateStaticParams() {
  return developers.map((developer) => ({ slug: developer.slug }));
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const developer = getDeveloperBySlug(slug);

  if (!developer) {
    return { title: `Perfil no encontrado — ${siteContent.brand.name}` };
  }

  const title = `${developer.name} — ${siteContent.brand.name}`;
  const description =
    developer.slogan ?? developer.description ?? `Perfil de ${developer.name} en Ruum.`;
  const canonical = `/desarrolladores/${developer.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: developer.coverImage
        ? [{ url: developer.coverImage.src, alt: developer.coverImage.alt }]
        : undefined,
    },
  };
}

export default async function DeveloperProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const developer = getDeveloperBySlug(slug);

  if (!developer) {
    notFound();
  }

  const addedProjects = siteContent.revealGallery.projects.filter(
    (project) => project.developerSlug === developer.slug
  );

  return <DeveloperProfileTemplate developer={developer} addedProjects={addedProjects} />;
}
