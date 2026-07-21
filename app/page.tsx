import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import RevealGallery from "@/components/sections/RevealGallery";
import Stats from "@/components/sections/Stats";
import FeatureSection from "@/components/sections/FeatureSection";
import HowItWorks from "@/components/sections/HowItWorks";
import AvailabilityCatalog from "@/components/sections/AvailabilityCatalog";
import ClosingCTA from "@/components/sections/ClosingCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <Hero />

      <Statement />

      <RevealGallery />

      <Stats />

      <div id="recorridos-3d" className="scroll-mt-24">
        <FeatureSection
          index="01"
          title="Recorridos virtuales de alta fidelidad"
          description="Tus prospectos caminan cada unidad, piso y vista antes de que exista un solo ladrillo, con reconstrucción fiel a los planos finales. La herramienta que tus agentes necesitan para vender con confianza en cada visita."
          image="https://images.unsplash.com/photo-1751711990617-bec0202c854a?q=80&w=1400&auto=format&fit=crop"
          alt="Interior arquitectónico moderno con iluminación natural"
        />

        <FeatureSection
          reverse
          index="02"
          title="Planos 2D y 3D interactivos"
          description="Convertimos planos técnicos en experiencias navegables: cambiá de piso, girá la unidad y compará metrajes en segundos. Así tus desarrolladores presentan avances con claridad total, sin depender de un plano estático."
          image="https://images.unsplash.com/photo-1723367194881-fe2e53534170?q=80&w=1400&auto=format&fit=crop"
          alt="Vista aérea de un desarrollo inmobiliario en planta"
        />

        <FeatureSection
          index="03"
          title="Exploración detallada de amenidades"
          description="Alberca, gimnasio, lobby, áreas comunes: cada amenidad se explora en detalle, generando el deseo que acelera la decisión de compra y le da a tu equipo de ventas un argumento visual imposible de igualar con folletos."
          image="https://images.unsplash.com/photo-1768230130990-6b4fe57778ce?q=80&w=1400&auto=format&fit=crop"
          alt="Skyline moderno de edificios residenciales"
        />
      </div>

      <HowItWorks />

      <AvailabilityCatalog />

      <ClosingCTA />

      <Footer />
    </main>
  );
}
