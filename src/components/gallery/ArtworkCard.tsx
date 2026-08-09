'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '@/types';
import { SITE_CONFIG } from '@/config/siteConfig';
import { useAdmin } from '@/context/AdminContext';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';


interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
}

export default function ArtworkCard({ artwork, onSelect }: ArtworkCardProps) {
  const { isAdmin, deleteArtwork } = useAdmin();
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 40) + 12);

  const hasImage = artwork.imageUrl && !imageError;

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Deseja excluir a arte "${artwork.title}"?`)) {
      deleteArtwork(artwork.id);
    }
  };

  const getAspectClass = () => {
    switch (artwork.aspectRatio) {
      case 'landscape': return 'aspect-[4/3]';
      case 'square': return 'aspect-square';
      case 'auto': return 'aspect-auto max-h-80';
      case 'portrait':
      default: return 'aspect-[3/4]';
    }
  };

  return (
    <div
      onClick={() => onSelect(artwork)}
      className="group relative cursor-pointer overflow-hidden rounded-[2rem] navy-card border-3 border-[#230E4D] dark:border-[#B64FFB]/40 shadow-[0_8px_0px_rgba(35,14,77,0.15)] transition-all duration-300 hover:shadow-[0_12px_0px_rgba(35,14,77,0.25)] hover:-translate-y-2 flex flex-col"
    >
      {/* Artwork Image or Pastel Placeholder */}
      <div className={`relative w-full overflow-hidden border-b-3 border-[#230E4D] dark:border-[#B64FFB]/30 ${getAspectClass()}`}>
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

        {/* Category Sticker Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          <span className="cartoon-sticker-badge text-[10px] bg-[#E4ED73] text-[#230E4D]">
            {artwork.categoryName}
          </span>

          {isAdmin && (
            <button
              onClick={handleDelete}
              className="px-2.5 py-0.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-mono text-[10px] font-bold shadow-md border border-white/40"
              title="Excluir Desenho"
            >
              🗑️ Excluir
            </button>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#F4FFE9] border-2 border-[#230E4D] shadow-md flex items-center justify-center text-[#230E4D] hover:scale-110 active:scale-95 transition-transform"
        >
          <svg
            className={`w-4 h-4 transition-transform ${
              isLiked ? 'fill-red-500 text-red-500 scale-110' : 'fill-none stroke-current'
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Author Badge overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#1E0A40]/90 text-[#F4FFE9] border border-white/20 shadow-sm">
            by {SITE_CONFIG.socials.instagram.handle}
          </span>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white/40 dark:bg-black/10">
        <div>
          <h3 className="font-serif text-base font-extrabold transition-colors leading-snug" style={{ color: 'var(--text-title)' }}>
            {artwork.title}
          </h3>
          <p className="text-xs line-clamp-2 mt-1 font-sans font-medium" style={{ color: 'var(--text-body)' }}>
            {artwork.description}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t flex items-center justify-between text-xs font-mono font-bold"
          style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
        >
          <span>{artwork.medium}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#B64FFB] text-white text-[10px] font-extrabold group-hover:scale-105 transition-transform border border-white/30">
            Ver ✦
          </span>
        </div>
      </div>
    </div>
  );
}

