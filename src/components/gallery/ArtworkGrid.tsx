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
      {/* Section Header */}
      <div className="mb-6">
        <span className="px-3 py-1 rounded-full font-mono text-xs font-semibold uppercase tracking-wider inline-block mb-3 border"
          style={{ background: 'rgba(128,161,212,0.15)', borderColor: 'rgba(128,161,212,0.3)', color: 'var(--sky-blue)' }}
        >
          🖼️ {gallery.sectionBadge}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-title)' }}>
          {gallery.sectionTitle}
        </h2>
        <p className="text-sm max-w-xl" style={{ color: 'var(--text-body)' }}>{gallery.description}</p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
              style={{
                background: activeCategory === cat.key ? 'var(--text-accent)' : 'var(--bg-card)',
                color: activeCategory === cat.key ? '#FFFFFF' : 'var(--text-title)',
                border: `1px solid ${activeCategory === cat.key ? 'transparent' : 'var(--border-card)'}`,
                transform: activeCategory === cat.key ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeCategory === cat.key ? '0 4px 12px rgba(16,185,129,0.3)' : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold font-mono shadow-md transition-all active:scale-95 border border-white/20"
        >
          {gallery.btnAddArt}
        </button>
      </div>

      {/* 3-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Artwork Grid */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-title)' }}>
              <span>Artwork</span>
              <span style={{ color: 'var(--text-accent)' }}>&gt;</span>
            </h3>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>({filteredArtworks.length} itens)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displayedArtworks.map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} onSelect={onSelectArtwork} />
            ))}
          </div>

          {visibleCount < filteredArtworks.length && (
            <div className="pt-2 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="w-full py-3.5 rounded-2xl navy-card font-bold text-xs shadow-md hover:brightness-105 transition-all"
                style={{ color: 'var(--text-title)' }}
              >
                Ver Mais Obras
              </button>
            </div>
          )}
        </div>

        {/* Middle Column: Search Tags */}
        <div className="lg:col-span-3">
          <SearchChips />
        </div>

        {/* Right Column: Feature Cards */}
        <div className="lg:col-span-3">
          <FeatureCards />
        </div>
      </div>

      <AddArtworkModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddArtwork={handleAddArtwork} />
    </section>
  );
}
