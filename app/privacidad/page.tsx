import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { Logo } from "@/components/ui/Logo";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteContent } from "@/content/site";

const { metadata: legalMeta, document } = siteContent.legal.privacidad;

export const metadata: Metadata = {
  title: legalMeta.title,
  description: legalMeta.description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: legalMeta.title,
    description: legalMeta.description,
    url: "/privacy",
  },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Header simplificado de navegación */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md px-5 py-4 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link href="/" aria-label="Inicio Ruumap">
            <Logo className="h-6 w-auto text-white" />
          </Link>
          <Link
            href="/"
            className="font-sans text-xs font-medium uppercase tracking-widest text-[#D78951] transition-colors hover:text-white"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <LegalPage document={document} />

      <Footer />
    </div>
  );
}
