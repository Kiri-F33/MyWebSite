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
        className="absolute inset-0 bg-[#091540]/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[#091540] border border-[#7692FF]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1B2CC1]/40 text-[#ABD2FA] hover:bg-[#1B2CC1] border border-[#7692FF]/30 flex items-center justify-center transition-colors"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {/* Image Preview Side */}
        <div className="relative w-full md:w-3/5 bg-black/40 flex items-center justify-center p-6 min-h-[350px] md:min-h-[550px]">
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
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#091540]">
          <div>
            {/* Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#1B2CC1] text-[#ABD2FA] border border-[#7692FF]/30 font-semibold">
                {artwork.categoryName}
              </span>
              <span className="text-xs font-mono text-slate-400">{artwork.year}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#ABD2FA] mb-4 leading-snug">
              {artwork.title}
            </h2>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
              {artwork.description}
            </p>

            {/* Story Behind Artwork */}
            <div className="mb-6 p-4 rounded-2xl bg-[#3D518C]/20 border border-[#7692FF]/20">
              <h4 className="text-xs font-mono uppercase text-[#7692FF] mb-2 tracking-wider font-bold">
                ✦ História da Criação
              </h4>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{artwork.story}"
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-white/10 pt-4">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Mídia / Software:</span>
                <span className="text-[#ABD2FA] font-semibold">{artwork.medium}</span>
              </div>
              {artwork.dimensions && (
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Dimensões:</span>
                  <span className="text-[#ABD2FA] font-semibold">{artwork.dimensions}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-6">
              {artwork.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-sans rounded-lg bg-[#3D518C]/30 text-[#ABD2FA]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="mt-8 pt-4 border-t border-white/10 flex gap-3">
            <a
              href="#encomendas"
              onClick={onClose}
              className="flex-1 py-3 text-center rounded-2xl bg-gradient-to-r from-[#1B2CC1] to-[#7692FF] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#1B2CC1]/40 hover:brightness-110 transition-all"
            >
              Pedir Arte Semelhante
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
