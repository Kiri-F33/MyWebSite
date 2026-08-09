'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '@/types';
import { SITE_CONFIG } from '@/config/siteConfig';
import { playPopSound } from '@/utils/popSound';

interface BubbleGalleryProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function BubbleGallery({ artworks, onSelectArtwork }: BubbleGalleryProps) {
  const { bubbleGallery } = SITE_CONFIG;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [poppingArtId, setPoppingArtId] = useState<string | null>(null);

  // Sizes array to create organic bubble variety matching reference image
  const bubbleSizes = [
    'w-40 h-40 sm:w-52 sm:h-52', // Large center
    'w-28 h-28 sm:w-36 sm:h-36', // Medium
    'w-32 h-32 sm:w-44 sm:h-44', // Medium Large
    'w-24 h-24 sm:w-32 sm:h-32', // Small
    'w-36 h-36 sm:w-48 sm:h-48', // Large
    'w-28 h-28 sm:w-36 sm:h-36', // Medium
  ];

  const handleBubbleClick = (art: Artwork, idx: number) => {
    // Play POP sound with pitch variation per index
    playPopSound(0.85 + (idx % 5) * 0.1);

    // Trigger visual pop pulse effect
    setPoppingArtId(art.id);

    setTimeout(() => {
      setPoppingArtId(null);
      onSelectArtwork(art);
    }, 200);
  };

  return (
    <section id="galeria-bolhas" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="navy-card p-8 sm:p-12 rounded-3xl relative overflow-hidden text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full font-mono text-xs font-semibold uppercase tracking-wider inline-block mb-3 border"
            style={{ background: 'rgba(36,194,229,0.15)', borderColor: 'rgba(36,194,229,0.3)', color: 'var(--text-accent)' }}
          >
            {bubbleGallery.sectionBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-title)' }}>
            {bubbleGallery.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
            {bubbleGallery.description}
          </p>
        </div>

        {/* Organic Circular Bubbles Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-5xl mx-auto py-6">
          {artworks.map((art, index) => {
            const sizeClass = bubbleSizes[index % bubbleSizes.length];
            const hasError = imageErrors[art.id];
            const hasImage = art.imageUrl && !hasError;
            const isPopping = poppingArtId === art.id;

            return (
              <div
                key={art.id}
                onClick={() => handleBubbleClick(art, index)}
                className={`group cursor-pointer relative ${sizeClass} rounded-full overflow-hidden border-4 shadow-xl transition-all duration-300 hover:scale-110 hover:border-[#24C2E5] hover:shadow-2xl hover:shadow-[#24C2E5]/40 active:scale-90 flex items-center justify-center ${
                  isPopping ? 'animate-pop' : ''
                }`}
                style={{ borderColor: 'rgba(249,255,233,0.8)' }}
                title={`${art.title} (Clique para estourar & abrir!)`}
              >
                {hasImage ? (
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    fill
                    onError={() => setImageErrors(prev => ({ ...prev, [art.id]: true }))}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#FEA06D]/40 via-[#EDE273]/40 to-[#24C2E5]/40 flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-2xl mb-1">🎨</span>
                    <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-white line-clamp-1">{art.title}</span>
                  </div>
                )}

                {/* Hover overlay badge */}
                <div className="absolute inset-0 bg-[#150A3C]/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                  <span className="text-xs font-serif font-bold line-clamp-1" style={{ color: 'var(--beige)' }}>{art.title}</span>
                  <span className="text-[10px] font-mono mt-1 font-semibold" style={{ color: 'var(--sky-surge)' }}>
                    Estourar & Ver Ficha 🫧
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="pt-8">
          <a
            href="#galeria"
            className="inline-block px-6 py-3 rounded-full bg-[#FEA06D] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all active:scale-95 border border-white/30"
          >
            {bubbleGallery.btnLoadMore}
          </a>
        </div>
      </div>
    </section>
  );
}
