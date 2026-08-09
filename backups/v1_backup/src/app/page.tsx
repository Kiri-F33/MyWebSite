'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import MikuHeroBanner from '@/components/hero/MikuHeroBanner';
import ArtworkGrid from '@/components/gallery/ArtworkGrid';
import ArtworkModal from '@/components/gallery/ArtworkModal';
import ProcessSlider from '@/components/gallery/ProcessSlider';
import BlogSection from '@/components/blog/BlogSection';
import AboutSection from '@/components/sections/AboutSection';
import CommissionSection from '@/components/sections/CommissionSection';
import Footer from '@/components/layout/Footer';
import AddArtworkModal from '@/components/gallery/AddArtworkModal';
import { ARTWORKS_DATA } from '@/data/artworks';
import { Artwork } from '@/types';

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen theme-bg-gradient transition-colors duration-400 flex flex-col">
      {/* Top Navbar */}
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Main Content Dashboard */}
      <main className="flex-1 space-y-8 max-w-7xl mx-auto w-full px-4 sm:px-6">
        {/* Miku UI Style Banner */}
        <MikuHeroBanner onOpenAddModal={() => setIsAddModalOpen(true)} />

        {/* Artwork Showcase & Dashboard Columns */}
        <ArtworkGrid
          artworks={ARTWORKS_DATA}
          onSelectArtwork={art => setSelectedArtwork(art)}
        />

        {/* Process Slider Section */}
        <div className="pt-6">
          <ProcessSlider />
        </div>

        {/* Blog & Notes Section */}
        <div className="pt-6">
          <BlogSection />
        </div>

        {/* About Section */}
        <div className="pt-6">
          <AboutSection />
        </div>

        {/* Commission Section */}
        <div className="pt-6">
          <CommissionSection />
        </div>
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
