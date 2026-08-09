'use client';

import { useState } from 'react';
import { Artwork, ArtworkCategory } from '@/types';
import { SITE_CONFIG } from '@/config/siteConfig';
import ArtworkCard from './ArtworkCard';
import AddArtworkModal from './AddArtworkModal';
import SearchChips from '../dashboard/SearchChips';
import FeatureCards from '../dashboard/FeatureCards';

interface ArtworkGridProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function ArtworkGrid({ artworks: initialArtworks, onSelectArtwork }: ArtworkGridProps) {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [activeCategory, setActiveCategory] = useState<ArtworkCategory>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const { gallery } = SITE_CONFIG;

  const categories: { key: ArtworkCategory; label: string }[] = [
    { key: 'all', label: gallery.categories.all },
    { key: 'digital', label: gallery.categories.digital },
    { key: 'traditional', label: gallery.categories.traditional },
    { key: 'sketchbook', label: gallery.categories.sketchbook },
    { key: 'concept', label: gallery.categories.concept }
  ];

  const handleAddArtwork = (newArt: Artwork) => {
    setArtworks([newArt, ...artworks]);
  };

  const filteredArtworks = activeCategory === 'all'
    ? artworks
    : artworks.filter(art => art.category === activeCategory);

  const displayedArtworks = filteredArtworks.slice(0, visibleCount);

  return (
    <section id="galeria" className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Category Filter Pills Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-[#75C9C8] dark:bg-gradient-to-r dark:from-[#1B2CC1] dark:to-[#7692FF] text-white shadow-md scale-105'
                  : 'navy-card hover:opacity-100 opacity-80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Action Button: Add Artwork */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-[#75C9C8] dark:bg-[#1B2CC1] text-white text-xs font-bold font-mono shadow-md hover:brightness-110 transition-all active:scale-95 border border-white/20"
        >
          {gallery.btnAddArt}
        </button>
      </div>

      {/* Miku UI Dashboard 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Artwork Showcase */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-title)' }}>
              <span>Artwork</span>
              <span className="text-[#75C9C8] dark:text-[#7692FF]">&gt;</span>
            </h3>
            <span className="text-xs font-mono opacity-60">({filteredArtworks.length} itens)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displayedArtworks.map(artwork => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onSelect={onSelectArtwork}
              />
            ))}
          </div>

          {/* View More Button */}
          {visibleCount < filteredArtworks.length && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="w-full py-3.5 rounded-2xl navy-card font-bold text-xs shadow-md hover:brightness-105 transition-all"
                style={{ color: 'var(--text-title)' }}
              >
                View More
              </button>
            </div>
          )}
        </div>

        {/* Middle Column: Recent Search & Tags */}
        <div className="lg:col-span-3">
          <SearchChips />
        </div>

        {/* Right Column: Numbered Feature Cards (01, 02, 03) */}
        <div className="lg:col-span-3">
          <FeatureCards />
        </div>
      </div>

      {/* Add Artwork Modal */}
      <AddArtworkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddArtwork={handleAddArtwork}
      />
    </section>
  );
}
