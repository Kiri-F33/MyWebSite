'use client';

import { SITE_CONFIG } from '@/config/siteConfig';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';
import PoppableBubble from '../common/PoppableBubble';

interface CloudHeroBannerProps {
  onOpenAddModal?: () => void;
}

export default function CloudHeroBanner({ onOpenAddModal }: CloudHeroBannerProps) {
  const { hero } = SITE_CONFIG;

  return (
    <div className="relative w-full cloud-hero-banner pt-12 pb-16 px-6 sm:px-12 overflow-hidden text-white mb-10 border-b border-white/20">
      {/* Interactive Poppable Hero Bubbles */}
      <PoppableBubble
        className="absolute top-6 left-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 shadow-md animate-float-slow"
        pitchMultiplier={0.9}
        respawnTimeMs={4000}
      >
        <div className="w-2 h-2 rounded-full bg-white/80 absolute top-1 left-1.5" />
      </PoppableBubble>

      <PoppableBubble
        className="absolute top-16 right-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 shadow-md animate-float-fast"
        pitchMultiplier={1.2}
        respawnTimeMs={3000}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white/80 absolute top-1.5 left-2" />
      </PoppableBubble>

      <PoppableBubble
        className="absolute bottom-10 left-1/3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 shadow-md animate-float-slow"
        pitchMultiplier={1.0}
        respawnTimeMs={5000}
      >
        <div className="w-2 h-2 rounded-full bg-white/80 absolute top-1 left-1.5" />
      </PoppableBubble>

      <PoppableBubble
        className="absolute top-1/2 right-10 w-7 h-7 rounded-full bg-white/25 backdrop-blur-sm border border-white/50 shadow-md animate-float-fast"
        pitchMultiplier={1.4}
        respawnTimeMs={3500}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white/80 absolute top-1 left-1" />
      </PoppableBubble>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Text */}
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[#F4FFE9] text-xs font-mono font-semibold tracking-wider border border-white/30">
            {hero.badge}
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#F4FFE9] leading-tight">
            {hero.title}
          </h1>

          <p className="text-white/95 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
            {hero.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href="#galeria-bolhas"
              className="px-6 py-3 rounded-full bg-[#B64FFB] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all active:scale-95 border border-white/30"
            >
              {hero.btnExplore}
            </a>

            <button
              onClick={onOpenAddModal}
              className="px-6 py-3 rounded-full bg-[#FDB767] text-[#230E4D] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all active:scale-95 border border-white/30"
            >
              {hero.btnAddArt}
            </button>
          </div>
        </div>

        {/* Right Artwork Showcase Display Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-white/20 backdrop-blur-md border border-white/40 p-4 shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center">
            <ArtworkPlaceholder title={hero.placeholderTitle} category="Destaque" className="rounded-2xl h-full w-full" />
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#1E0A40]/90 backdrop-blur-md border border-white/20 text-white">
              <p className="font-serif text-xs font-bold text-[#E4ED73]">{hero.placeholderTitle}</p>
              <p className="text-[10px] text-[#F4FFE9] opacity-90">{hero.placeholderSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
