'use client';

import { useState } from 'react';
import { Artwork, ArtworkCategory } from '@/types';
import { SITE_CONFIG } from '@/config/siteConfig';
import ArtworkCard from './ArtworkCard';
import AddArtworkModal from './AddArtworkModal';
import SearchChips from '../dashboard/SearchChips';
import FeatureCards from '../dashboard/FeatureCards';
import { useAdmin } from '@/context/AdminContext';

interface ArtworkGridProps {
  artworks?: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function ArtworkGrid({ artworks: propArtworks, onSelectArtwork }: ArtworkGridProps) {
  const { artworks: contextArtworks, addArtwork } = useAdmin();
  const artworks = propArtworks || contextArtworks;

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
    addArtwork(newArt);
  };


  const filteredArtworks = activeCategory === 'all'
    ? artworks
    : artworks.filter(art => art.category === activeCategory);

  const displayedArtworks = filteredArtworks.slice(0, visibleCount);

  return (
    <div className="py-4 max-w-[1700px] mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="mb-6">
        <span className="cartoon-sticker-badge mb-3 bg-[#80A1D4] text-[#230E4D] px-4 py-1.5 text-xs font-mono">
          🖼️ {gallery.sectionBadge}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-3" style={{ color: 'var(--text-title)' }}>
          {gallery.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base font-medium max-w-2xl" style={{ color: 'var(--text-body)' }}>{gallery.description}</p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all border-2 ${
                activeCategory === cat.key
                  ? 'bg-[#B64FFB] text-white border-[#230E4D] shadow-[0_4px_0px_#230E4D] scale-105'
                  : 'bg-white/40 dark:bg-black/20 text-[#230E4D] dark:text-[#F4FFE9] border-[#230E4D]/30 dark:border-white/20 hover:scale-105'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="cartoon-btn-lime px-5 py-2.5 text-xs uppercase"
        >
          {gallery.btnAddArt} 🎨
        </button>
      </div>

      {/* 3-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Artwork Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold flex items-center gap-2" style={{ color: 'var(--text-title)' }}>
              <span>Artwork</span>
              <span className="text-[#B64FFB]">&gt;</span>
            </h3>
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--text-muted)' }}>({filteredArtworks.length} itens)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayedArtworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} onSelect={onSelectArtwork} />
            ))}
          </div>

          {visibleCount < filteredArtworks.length && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="cartoon-btn-clay w-full py-3.5 text-xs uppercase"
              >
                Ver Mais Obras ✦
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Search Tags & Feature Cards */}
        <div className="lg:col-span-4 space-y-6">
          <SearchChips />
          <FeatureCards />
        </div>
      </div>

      <AddArtworkModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddArtwork={handleAddArtwork} />
    </div>
  );
}

