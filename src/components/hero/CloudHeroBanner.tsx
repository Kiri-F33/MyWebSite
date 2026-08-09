'use client';

import { SITE_CONFIG } from '@/config/siteConfig';
import { useSiteCustomization } from '@/context/SiteCustomizationContext';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';
import PoppableBubble from '../common/PoppableBubble';

interface CloudHeroBannerProps {
  onOpenAddModal?: () => void;
}

export default function CloudHeroBanner({ onOpenAddModal }: CloudHeroBannerProps) {
  const { hero: staticHero } = SITE_CONFIG;
  const { customization } = useSiteCustomization();
  // Live merge: customization panel overrides static config
  const hero = { ...staticHero, ...customization.hero };

  return (
    <div className="relative w-full max-w-[1700px] mx-auto cloud-hero-banner py-14 sm:py-20 lg:py-24 px-8 sm:px-14 lg:px-20 overflow-hidden text-white my-4 min-h-[75vh] flex flex-col justify-center">
      {/* Decorative Wavy Cloud Bottom Contour (Reference Style Img 1 & 3) */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden pointer-events-none opacity-90">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full text-[var(--bg-page)] fill-current">
          <path d="M0,0 C150,90 350,-40 500,50 C650,130 900,10 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Floating Sparkles & Emojis - controlled by showSparkles toggle */}
      {hero.showSparkles && (
        <>
          <div className="absolute top-6 left-1/4 text-3xl animate-float-slow opacity-80 pointer-events-none">✨</div>
          <div className="absolute top-12 right-1/3 text-2xl animate-float-fast opacity-75 pointer-events-none text-[#E4ED73]">✶</div>
          <div className="absolute bottom-14 left-10 text-3xl animate-float-slow opacity-80 pointer-events-none">☁️</div>
          <div className="absolute bottom-16 right-16 text-2xl animate-float-fast opacity-90 pointer-events-none">🌻</div>
        </>
      )}

      {/* Interactive Poppable Hero Bubbles - controlled by showBubbles toggle */}
      {hero.showBubbles && (
        <>
          <PoppableBubble
            className="absolute top-8 left-10 w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border-3 border-white shadow-xl animate-float-slow"
            pitchMultiplier={0.9}
            respawnTimeMs={4000}
          >
            <div className="w-4 h-4 rounded-full bg-white absolute top-2 left-2.5" />
          </PoppableBubble>

          <PoppableBubble
            className="absolute top-14 right-20 w-20 h-20 rounded-full bg-white/30 backdrop-blur-md border-3 border-white shadow-xl animate-float-fast"
            pitchMultiplier={1.2}
            respawnTimeMs={3000}
          >
            <div className="w-5 h-5 rounded-full bg-white absolute top-2.5 left-3" />
          </PoppableBubble>

          <PoppableBubble
            className="absolute bottom-12 left-1/3 w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border-3 border-white shadow-xl animate-float-slow"
            pitchMultiplier={1.0}
            respawnTimeMs={5000}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-white absolute top-1.5 left-2" />
          </PoppableBubble>
        </>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left Text Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="cartoon-sticker-badge bg-[#F4FFE9] text-[#230E4D] shadow-md border-2 border-[#230E4D] px-4 py-1.5 text-xs font-mono">
            <span>✨</span>
            <span>{hero.badge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-[#F4FFE9] leading-[1.08] drop-shadow-[0_5px_0px_#230E4D]">
            {hero.title}
          </h1>

          <p className="text-white/95 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
            {hero.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5">
            <a
              href="#galeria-bolhas"
              className="cartoon-btn-magenta px-9 py-4 text-sm uppercase tracking-wider block"
            >
              {hero.btnExplore} 🫧
            </a>

            <button
              onClick={onOpenAddModal}
              className="cartoon-btn-clay px-9 py-4 text-sm uppercase tracking-wider"
            >
              {hero.btnAddArt} 🎨
            </button>
          </div>
        </div>

        {/* Right Artwork Showcase Display Frame (Sticker Frame Style) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px] rounded-[3rem] bg-white/20 backdrop-blur-md border-4 border-white p-5 shadow-[0_16px_0px_#230E4D] overflow-hidden flex flex-col items-center justify-center text-center transform hover:rotate-1 transition-transform">
            {hero.heroImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={hero.heroImageUrl} alt={hero.placeholderTitle} className="rounded-3xl h-full w-full object-cover border-2 border-white/60" />
            ) : (
              <ArtworkPlaceholder title={hero.placeholderTitle} category="Destaque" className="rounded-3xl h-full w-full border-2 border-white/60" />
            )}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#230E4D]/90 backdrop-blur-md border-2 border-[#E4ED73] text-white shadow-xl">
              <p className="font-serif text-sm sm:text-base font-bold text-[#E4ED73] flex items-center justify-center gap-1.5">
                <span>✦</span>
                <span>{hero.placeholderTitle}</span>
              </p>
              <p className="text-xs text-[#F4FFE9] opacity-90 mt-0.5">{hero.placeholderSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

