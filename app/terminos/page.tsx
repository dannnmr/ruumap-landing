import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { Logo } from "@/components/ui/Logo";
import { siteContent } from "@/content/site";

export const metadata = {
  title: "Términos y Condiciones — Ruumap",
  description:
    "Términos y condiciones de uso de la plataforma de visualización virtual e inmersiva inmobiliaria Ruumap.",
};

export default function TerminosPage() {
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
            Términos y Condiciones de Uso
          </h1>
          <p className="mt-4 font-sans text-sm font-light text-muted-7">
            Última actualización: 13 de agosto de 2026
          </p>
        </div>

        <div className="space-y-10 font-sans text-[15px] font-light leading-relaxed text-gray-300 sm:text-[16px]">
          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar la plataforma digital, sitio web y servicios de showroom virtual de{" "}
              <strong className="text-white font-medium">{siteContent.brand.name}</strong>, el usuario acepta de manera plena y sin reservas los presentes Términos y Condiciones de Uso. Si no está de acuerdo con alguno de los términos, le solicitamos abstenerse de utilizar el sitio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              2. Naturaleza del Servicio y Renders 3D
            </h2>
            <p>
              Ruumap proporciona herramientas digitales inmersivas, experiencias en 360°, animaciones orbitales y recorridos virtuales para la presentación y comercialización en pre-venta de proyectos inmobiliarios desarrollados por empresas independientes.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-gray-200">
              <strong className="text-[#D78951] block mb-1">Nota importante sobre renders y modelos 3D:</strong>
              Las imágenes, modelos 3D, mapas interactivos, dimensiones y materiales exhibidos en la plataforma tienen carácter meramente ilustrativo y orientativo. Están sujetos a modificaciones técnicas, arquitectónicas o de construcción según las decisiones del desarrollador inmobiliario de cada proyecto.
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              3. Propiedad Intelectual
            </h2>
            <p>
              Todo el contenido visual, código fuente, renders, marcas, logotipos, arquitecturas 3D y tecnología interactiva integrada en Ruumap son propiedad exclusiva de Ruumap o de sus respectivos desarrolladores licenciantes. Queda prohibida la reproducción, distribución o modificación total o parcial sin autorización expresa por escrito.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              4. Relación Comercial con Desarrolladores
            </h2>
            <p>
              Ruumap actúa como facilitador tecnológico y plataforma de showroom digital. Las ofertas comerciales, precios, acuerdos de reserva y contratos de compraventa de inmuebles son responsabilidad exclusiva del desarrollador inmobiliario correspondiente a cada proyecto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              5. Limitación de Responsabilidad
            </h2>
            <p>
              Ruumap se esfuerza por garantizar la máxima disponibilidad y precisión de la información presentada. Sin embargo, no garantiza la ausencia de interrupciones técnicas ni se responsabiliza por decisiones de inversión tomadas sin la correspondiente asesoría legal o inmobiliaria directa con el desarrollador del proyecto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-normal text-white">
              6. Contacto
            </h2>
            <p>
              Para cualquier consulta legal o aclaración referente a estos términos, puede ponerse en contacto con nuestro equipo a través del correo electrónico{" "}
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
