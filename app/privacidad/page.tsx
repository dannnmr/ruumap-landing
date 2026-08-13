import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { Logo } from "@/components/ui/Logo";
import { siteContent } from "@/content/site";

export const metadata = {
  title: "Política de Privacidad — Ruumap",
  description:
    "Política de privacidad y protección de datos personales de la plataforma Ruumap.",
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

      {/* Contenido principal */}
      <main className="mx-auto w-full max-w-[900px] px-6 py-16 sm:py-24 lg:px-12">
        <div className="mb-12">
          <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.28em] text-[#D78951]">
            DOCUMENTO LEGAL
          </p>
          <h1 className="font-display text-[32px] font-light tracking-tight text-white sm:text-[44px]">
            Política de Privacidad
          </h1>
          <p className="mt-4 font-sans text-sm font-light text-muted-7">
            Última actualización: 13 de agosto de 2026
          </p>
        </div>

        <div className="space-y-10 font-sans text-[15px] font-light leading-relaxed text-gray-300 sm:text-[16px]">
          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              1. Información que Recopilamos
            </h2>
            <p>
              En <strong className="text-white font-medium">{siteContent.brand.name}</strong> respetamos la privacidad de nuestros usuarios. Recopilamos únicamente la información necesaria para atender solicitudes de información o agendamiento de demostraciones, tales como nombre, teléfono y correo electrónico cuando se envían voluntariamente a través de nuestros canales de contacto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              2. Uso de la Información
            </h2>
            <p>
              La información recolectada se utiliza exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-gray-300">
              <li>Responder a consultas comerciales sobre desarrollos inmobiliarios y servicios 3D.</li>
              <li>Conectar a potenciales compradores con los desarrolladores oficiales del proyecto de su interés.</li>
              <li>Mejorar la experiencia de navegación en nuestra plataforma.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              3. Protección de Datos y Cookies
            </h2>
            <p>
              Implementamos medidas de seguridad administrativas y técnicas para proteger sus datos personales contra acceso no autorizado. Nuestro sitio utiliza únicamente cookies estrictamente necesarias para el correcto funcionamiento de la navegación e interacción con modelos interactivos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              4. Contacto de Privacidad
            </h2>
            <p>
              Si desea ejercer sus derechos de acceso, rectificación o eliminación de sus datos, envíenos un mensaje a{" "}
              <a
                href={`mailto:${siteContent.closingCTA.contact.email}`}
                className="text-[#D78951] underline underline-offset-4 hover:text-white"
              >
                {siteContent.closingCTA.contact.email}
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
