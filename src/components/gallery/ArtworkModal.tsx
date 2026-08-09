'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Artwork } from '@/types';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (artwork) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  const hasImage = artwork.imageUrl && !imageError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-md cursor-pointer"
        style={{ background: 'rgba(0,0,0,0.6)' }}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto border"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center border transition-colors font-bold"
          style={{ background: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {/* Image Preview Side */}
        <div className="relative w-full md:w-3/5 flex items-center justify-center p-6 min-h-[350px] md:min-h-[550px]"
          style={{ background: 'rgba(0,0,0,0.15)' }}
        >
          {hasImage ? (
            <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                onError={() => setImageError(true)}
                className="object-contain rounded-xl"
                priority
              />
            </div>
          ) : (
            <ArtworkPlaceholder title={artwork.title} category={artwork.categoryName} className="rounded-2xl shadow-sm" />
          )}
        </div>

        {/* Info & Story Side */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
          style={{ background: 'var(--bg-card)' }}
        >
          <div>
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-mono rounded-full font-semibold border"
                style={{ background: 'var(--text-accent)', color: '#FFFFFF', borderColor: 'transparent' }}
              >
                {artwork.categoryName}
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{artwork.year}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 leading-snug" style={{ color: 'var(--text-title)' }}>
              {artwork.title}
            </h2>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-6 font-sans" style={{ color: 'var(--text-body)' }}>
              {artwork.description}
            </p>

            {/* Story Behind Artwork */}
            <div className="mb-6 p-4 rounded-2xl border"
              style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'var(--border-card)' }}
            >
              <h4 className="text-xs font-mono uppercase mb-2 tracking-wider font-bold" style={{ color: 'var(--text-accent)' }}>
                ✦ História da Criação
              </h4>
              <p className="text-xs italic leading-relaxed" style={{ color: 'var(--text-body)' }}>
                &ldquo;{artwork.story}&rdquo;
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2 text-xs font-mono pt-4 border-t" style={{ borderColor: 'var(--border-card)' }}>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Mídia / Software:</span>
                <span className="font-semibold" style={{ color: 'var(--text-accent)' }}>{artwork.medium}</span>
              </div>
              {artwork.dimensions && (
                <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border-card)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dimensões:</span>
                  <span className="font-semibold" style={{ color: 'var(--text-accent)' }}>{artwork.dimensions}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-6">
              {artwork.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-sans rounded-lg border"
                  style={{ background: 'rgba(52,211,153,0.1)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8 pt-4 border-t flex gap-3" style={{ borderColor: 'var(--border-card)' }}>
            <a
              href="#encomendas"
              onClick={onClose}
              className="flex-1 py-3 text-center rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Pedir Arte Semelhante
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
