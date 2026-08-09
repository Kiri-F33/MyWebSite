'use client';

import { SITE_CONFIG } from '@/config/siteConfig';

interface MikuHeroBannerProps {
  onOpenAddModal?: () => void;
}

export default function MikuHeroBanner({ onOpenAddModal }: MikuHeroBannerProps) {
  const { hero } = SITE_CONFIG;

  return (
    <div className="relative w-full miku-banner-navy p-8 sm:p-12 overflow-hidden text-white my-6">
      {/* Decorative Accent */}
      <div className="absolute top-6 left-8 font-mono text-xs opacity-80 tracking-widest uppercase text-[#ABD2FA]">
        {hero.japaneseBadge}
      </div>
      <div className="absolute top-6 right-8 text-2xl opacity-70 text-[#ABD2FA]">✦</div>
      <div className="absolute bottom-8 right-1/3 text-xl opacity-50 text-[#ABD2FA]">✨</div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 pt-4">
        {/* Left Info Column */}
        <div className="md:col-span-7 space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#ABD2FA]">
            {hero.title}
          </h1>

          <p className="text-slate-100 text-sm sm:text-base max-w-lg leading-relaxed font-sans opacity-95">
            {hero.description}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <a
              href="#galeria"
              className="inline-block font-semibold text-xs uppercase tracking-wider text-[#ABD2FA] border-b-2 border-[#ABD2FA] pb-0.5 hover:opacity-80 transition-opacity"
            >
              {hero.btnExplore}
            </a>

            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 rounded-full bg-[#091540] text-[#ABD2FA] border border-[#7692FF]/40 text-xs font-bold shadow-lg hover:bg-[#1B2CC1]/40 transition-all"
            >
              {hero.btnAddArt}
            </button>
          </div>

          {/* Slider Pagination Dashes */}
          <div className="flex items-center gap-2 pt-6">
            <span className="w-8 h-1.5 rounded-full bg-[#ABD2FA]" />
            <span className="w-8 h-1.5 rounded-full bg-white/30" />
            <span className="w-8 h-1.5 rounded-full bg-white/30" />
            <span className="w-8 h-1.5 rounded-full bg-white/30" />
          </div>
        </div>

        {/* Right Art Placeholder Banner Visual */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-[#091540]/60 backdrop-blur-md border border-[#7692FF]/40 p-4 shadow-2xl flex flex-col items-center justify-center text-center transform hover:rotate-2 transition-transform">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1B2CC1] to-[#7692FF] text-[#ABD2FA] flex items-center justify-center text-3xl font-serif font-bold shadow-lg mb-3 border border-[#ABD2FA]/30">
              🎨
            </div>
            <h3 className="font-serif text-lg font-bold text-[#ABD2FA]">{hero.placeholderTitle}</h3>
            <p className="text-xs text-slate-300 mt-1">{hero.placeholderSubtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
