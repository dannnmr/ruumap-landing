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

      <FeatureSection
        index="01"
        title="Recorridos 3D interactivos"
        description="Caminá cada unidad, piso y vista antes de firmar, con reconstrucción fiel a los planos finales."
        image="https://images.unsplash.com/photo-1751711990617-bec0202c854a?q=80&w=1400&auto=format&fit=crop"
        alt="Interior arquitectónico moderno con iluminación natural"
      />

      <FeatureSection
        reverse
        index="02"
        title="Video de obra semanal"
        description="Seguí el avance real de la construcción con registro en video, mes a mes."
        image="https://images.unsplash.com/photo-1723367194881-fe2e53534170?q=80&w=1400&auto=format&fit=crop"
        alt="Vista aérea de una obra en construcción con maquinaria"
      />

      <FeatureSection
        index="03"
        title="Disponibilidad en vivo"
        description="Unidades, pisos y precios sincronizados directo desde la desarrolladora."
        image="https://images.unsplash.com/photo-1768230130990-6b4fe57778ce?q=80&w=1400&auto=format&fit=crop"
        alt="Skyline moderno de edificios residenciales"
      />

      <HowItWorks />

      <AvailabilityCatalog />

      <ClosingCTA />

      <Footer />
    </main>
  );
}
