import { useState, useCallback } from "react";
import EmberParticles from "@/components/EmberParticles";
import LoadingScreen from "@/components/LoadingScreen";
import CursorGlow from "@/components/CursorGlow";
import MusicToggle from "@/components/MusicToggle";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CharacterShowcase from "@/components/CharacterShowcase";
import SwordsSection from "@/components/SwordsSection";
import BreathingStylesSection from "@/components/BreathingStylesSection";
import HashiraSection from "@/components/HashiraSection";
import LegendsSection from "@/components/LegendsSection";
import DemonsSection from "@/components/DemonsSection";
import ArcsSection from "@/components/ArcsSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative">
      {!loaded && <LoadingScreen onComplete={onLoadComplete} />}
      <EmberParticles />
      <CursorGlow />
      <MusicToggle />
      <Navbar />
      <HeroSection />
      <CharacterShowcase />
      <SwordsSection />
      <BreathingStylesSection />
      <HashiraSection />
      <LegendsSection />
      <DemonsSection />
      <ArcsSection />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Index;
