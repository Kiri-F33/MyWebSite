'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '@/types';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
}

export default function ArtworkCard({ artwork, onSelect }: ArtworkCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 40) + 12);

  const hasImage = artwork.imageUrl && !imageError;

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div
      onClick={() => onSelect(artwork)}
      className="group relative cursor-pointer overflow-hidden rounded-3xl navy-card transition-all duration-300 hover:border-[#7692FF]/50 hover:shadow-xl hover:-translate-y-1.5 flex flex-col"
    >
      {/* Artwork Image or Pastel Placeholder */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900/10">
        {hasImage ? (
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <ArtworkPlaceholder title={artwork.title} category={artwork.categoryName} />
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 text-[11px] font-mono font-semibold rounded-full bg-slate-900/70 backdrop-blur-md text-[#ABD2FA] dark:text-[#ABD2FA] border border-white/20 shadow-sm">
            {artwork.categoryName}
          </span>
        </div>

        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-200 hover:text-red-400 shadow-sm transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isLiked ? 'fill-red-400 text-red-400' : 'fill-none stroke-current'
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Author Badge overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full bg-[var(--badge-author-bg)] text-[var(--badge-author-text)] text-[10px] font-mono border border-white/10">
            by @dudu_atelier
          </span>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-serif text-base font-bold transition-colors leading-snug" style={{ color: 'var(--text-title)' }}>
            {artwork.title}
          </h3>
          <p className="text-xs line-clamp-2 mt-1 font-sans" style={{ color: 'var(--text-body)' }}>
            {artwork.description}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-mono opacity-80">
          <span>{artwork.medium}</span>
          <span className="font-semibold group-hover:translate-x-1 transition-transform" style={{ color: 'var(--text-accent)' }}>
            Ver &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
