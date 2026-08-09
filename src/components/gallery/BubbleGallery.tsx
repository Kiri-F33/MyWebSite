'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '@/types';
import { SITE_CONFIG } from '@/config/siteConfig';
import { playPopSound } from '@/utils/popSound';
import { useAdmin } from '@/context/AdminContext';

interface BubbleGalleryProps {
  artworks?: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function BubbleGallery({ artworks: propArtworks, onSelectArtwork }: BubbleGalleryProps) {
  const { artworks: contextArtworks } = useAdmin();
  const artworks = propArtworks || contextArtworks;

  const { bubbleGallery } = SITE_CONFIG;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [poppingArtId, setPoppingArtId] = useState<string | null>(null);


  // Sizes array to create organic bubble variety matching reference image
  const bubbleSizes = [
    'w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72', // Large center
    'w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56', // Medium
    'w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64', // Medium Large
    'w-32 h-32 sm:w-44 sm:h-44 lg:w-48 lg:h-48', // Small
    'w-44 h-44 sm:w-60 sm:h-60 lg:w-68 lg:h-68', // Large
    'w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56', // Medium
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
    <section id="galeria-bolhas" className="py-8 max-w-[1700px] mx-auto px-4 sm:px-8">
      <div className="navy-card p-10 sm:p-14 lg:p-16 rounded-[3.5rem] relative overflow-hidden text-center border-4 border-[#B64FFB]/30 shadow-[0_16px_0px_rgba(35,14,77,0.15)]">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="cartoon-sticker-badge mb-3 bg-[#E4ED73] text-[#230E4D] px-4 py-1.5 text-xs font-mono">
            <span>🫧</span>
            <span>{bubbleGallery.sectionBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4" style={{ color: 'var(--text-title)' }}>
            {bubbleGallery.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: 'var(--text-body)' }}>
            {bubbleGallery.description}
          </p>
        </div>

        {/* Organic Circular Bubbles Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 lg:gap-12 max-w-[1500px] mx-auto py-6">
          {artworks.map((art, index) => {
            const sizeClass = bubbleSizes[index % bubbleSizes.length];
            const hasError = imageErrors[art.id];
            const hasImage = art.imageUrl && !hasError;
            const isPopping = poppingArtId === art.id;

            return (
              <div
                key={art.id}
                onClick={() => handleBubbleClick(art, index)}
                className={`group cursor-pointer relative ${sizeClass} rounded-full overflow-hidden border-4 border-[#230E4D] shadow-[0_8px_0px_#230E4D] transition-all duration-300 hover:scale-110 hover:rotate-2 active:scale-90 flex items-center justify-center ${
                  isPopping ? 'animate-pop' : ''
                }`}
                style={{ background: 'var(--bg-card)' }}
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
                  <div className="w-full h-full bg-gradient-to-br from-[#B64FFB]/40 via-[#FDB767]/40 to-[#E4ED73]/40 flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-3xl mb-1">🎨</span>
                    <span className="text-[11px] font-bold text-[#230E4D] dark:text-[#F4FFE9] line-clamp-1">{art.title}</span>
                  </div>
                )}

                {/* Glossy Bubble Reflection Effect */}
                <div className="absolute top-2 left-3 w-6 h-3 rounded-full bg-white/40 rotate-[-25deg] pointer-events-none" />

                {/* Hover overlay sticker badge */}
                <div className="absolute inset-0 bg-[#230E4D]/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                  <span className="text-xs font-serif font-extrabold line-clamp-1 text-[#E4ED73]">{art.title}</span>
                  <span className="text-[10px] font-mono mt-1 font-bold text-[#FDB767] bg-[#1E0A40] px-2 py-0.5 rounded-full border border-white/30">
                    Estourar 🫧
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="pt-6">
          <a
            href="#acervo"
            className="cartoon-btn-magenta px-8 py-3.5 text-xs uppercase tracking-wider inline-block"
          >
            {bubbleGallery.btnLoadMore} ✦
          </a>
        </div>
      </div>
    </section>
  );
}

