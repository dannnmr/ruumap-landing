import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import AboutUs from "@/components/sections/AboutUs";
import RevealGallery from "@/components/sections/RevealGallery";
import Stats from "@/components/sections/Stats";
import FeatureSection from "@/components/sections/FeatureSection";
import HowItWorks from "@/components/sections/HowItWorks";
import Logos from "@/components/sections/Logos";
import ClosingCTA from "@/components/sections/ClosingCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <Hero />

      <Statement />
      
      <AboutUs />

      <Stats />

      <RevealGallery />

      <FeatureSection />

      <HowItWorks />

      <Logos />

      <ClosingCTA />

      <Footer />
    </main>
  );
}
