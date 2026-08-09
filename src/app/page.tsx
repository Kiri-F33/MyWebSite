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
import { ARTWORKS_DATA } from '@/data/artworks';
import { Artwork } from '@/types';

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen theme-bg-gradient transition-colors duration-300 flex flex-col relative">
      {/* Interactive Poppable Floating Bubbles Overlay */}
      <InteractiveBubbleOverlay />

      {/* Top Navbar */}
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Atmospheric Cloud & Floating Bubble Hero Banner */}
      <CloudHeroBanner onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Main Content Dashboard */}
      <main className="flex-1 space-y-10 max-w-7xl mx-auto w-full px-4 sm:px-6 relative z-10">
        {/* Section 1: 3 Pastel Category Pill Cards (Coral, Sky Blue, Mint Green) */}
        <CategoryPillCards />

        {/* Section 2: Circular Bubble Gallery (Section 4 from Reference) */}
        <BubbleGallery
          artworks={ARTWORKS_DATA}
          onSelectArtwork={art => setSelectedArtwork(art)}
        />

        {/* Section 3: Standard Gallery Grid Dashboard */}
        <ArtworkGrid
          artworks={ARTWORKS_DATA}
          onSelectArtwork={art => setSelectedArtwork(art)}
        />

        {/* Section 4: Process Comparison Slider */}
        <ProcessSlider />

        {/* Section 5: Blog & Articles Section */}
        <BlogSection />

        {/* Section 6: About Section */}
        <AboutSection />

        {/* Section 7: Commission Form Section */}
        <CommissionSection />
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
