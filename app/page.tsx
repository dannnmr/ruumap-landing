import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import RevealGallery from "@/components/sections/RevealGallery";
import Stats from "@/components/sections/Stats";
import FeatureSection from "@/components/sections/FeatureSection";
import HowItWorks from "@/components/sections/HowItWorks";
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

      <FeatureSection />

      <HowItWorks />

      <ClosingCTA />

      <Footer />
    </main>
  );
}
