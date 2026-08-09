'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import CloudHeroBanner from '@/components/hero/CloudHeroBanner';
import CategoryPillCards from '@/components/dashboard/CategoryPillCards';
import BubbleGallery from '@/components/gallery/BubbleGallery';
import ArtworkGrid from '@/components/gallery/ArtworkGrid';
import ArtworkModal from '@/components/gallery/ArtworkModal';
import ProcessSlider from '@/components/gallery/ProcessSlider';
import BlogSection from '@/components/blog/BlogSection';
import AboutSection from '@/components/sections/AboutSection';
import CommissionSection from '@/components/sections/CommissionSection';
import Footer from '@/components/layout/Footer';
import AddArtworkModal from '@/components/gallery/AddArtworkModal';
import InteractiveBubbleOverlay from '@/components/common/InteractiveBubbleOverlay';
import AnimatedSectionWrapper from '@/components/common/AnimatedSectionWrapper';
import SectionDivider from '@/components/common/SectionDivider';
import { ARTWORKS_DATA } from '@/data/artworks';
import { Artwork } from '@/types';

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen theme-bg-gradient transition-colors duration-300 flex flex-col relative overflow-x-hidden">
      {/* Interactive Poppable Floating Bubbles Overlay */}
      <InteractiveBubbleOverlay />

      {/* Top Navbar */}
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Hero Banner Section */}
      <section className="relative z-10 pt-4 pb-8">
        <AnimatedSectionWrapper animation="zoom-in">
          <CloudHeroBanner onOpenAddModal={() => setIsAddModalOpen(true)} />
        </AnimatedSectionWrapper>
      </section>

      {/* Main Content Dashboard with Natural Smooth Scrolling & Distinct Blur Animations */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10 space-y-16 py-8">
        
        {/* Section 1: 3 Pastel Category Pill Cards (Transition: Fade Up + Blur) */}
        <AnimatedSectionWrapper animation="fade-up" delayMs={50}>
          <CategoryPillCards />
        </AnimatedSectionWrapper>

        <SectionDivider icon="🌱" label="Mundo de Ilustrações" />

        {/* Section 2: Circular Bubble Gallery (Transition: Zoom In + Blur) */}
        <AnimatedSectionWrapper animation="zoom-in" delayMs={50}>
          <BubbleGallery
            artworks={ARTWORKS_DATA}
            onSelectArtwork={art => setSelectedArtwork(art)}
          />
        </AnimatedSectionWrapper>

        <SectionDivider icon="🎨" label="Acervo Completo" />

        {/* Section 3: Standard Gallery Grid Dashboard (Transition: Slide Left + Blur) */}
        <AnimatedSectionWrapper animation="slide-left" delayMs={50}>
          <ArtworkGrid
            artworks={ARTWORKS_DATA}
            onSelectArtwork={art => setSelectedArtwork(art)}
          />
        </AnimatedSectionWrapper>

        <SectionDivider icon="✦" label="Bastidores & Processo" />

        {/* Section 4: Process Comparison Slider (Transition: Slide Right + Blur) */}
        <AnimatedSectionWrapper animation="slide-right" delayMs={50}>
          <ProcessSlider />
        </AnimatedSectionWrapper>

        <SectionDivider icon="✍️" label="Diário de Ateliê" />

        {/* Section 5: Blog & Articles Section (Transition: Fade Up + Blur) */}
        <AnimatedSectionWrapper animation="fade-up" delayMs={50}>
          <BlogSection />
        </AnimatedSectionWrapper>

        <SectionDivider icon="✨" label="Sobre o Atelier" />

        {/* Section 6: About Section (Transition: Slide Left + Blur) */}
        <AnimatedSectionWrapper animation="slide-left" delayMs={50}>
          <AboutSection />
        </AnimatedSectionWrapper>

        <SectionDivider icon="💌" label="Encomendas Personalizadas" />

        {/* Section 7: Commission Form Section (Transition: Zoom In + Blur) */}
        <AnimatedSectionWrapper animation="zoom-in" delayMs={50}>
          <CommissionSection />
        </AnimatedSectionWrapper>
      </main>

      {/* Artwork Lightbox Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />

      {/* Quick Add Artwork Modal */}
      <AddArtworkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddArtwork={newArt => {
          ARTWORKS_DATA.unshift(newArt);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
