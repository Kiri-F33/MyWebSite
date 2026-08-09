'use client';

import { SITE_CONFIG } from '@/config/siteConfig';
import { useSiteCustomization } from '@/context/SiteCustomizationContext';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

export default function AboutSection() {
  const { about, brand } = SITE_CONFIG;
  const { customization } = useSiteCustomization();
  // Merge: live customization overrides static config
  const liveAbout = { ...about, ...customization.sections.about };
  const liveBrand = { ...brand, ...customization.brand };

  return (
    <section id="sobre" className="py-8 max-w-[1700px] mx-auto px-4 sm:px-8">
      <div className="navy-card p-10 sm:p-14 lg:p-16 relative overflow-hidden border-4 border-[#B64FFB]/30 shadow-[0_16px_0px_rgba(35,14,77,0.15)] rounded-[3.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Card / Placeholder */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-[#230E4D] dark:border-[#B64FFB] shadow-[0_12px_0px_#230E4D]">
            <ArtworkPlaceholder title={liveBrand.artistName} category="Artista & Criador" className="h-full rounded-3xl" />
            <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-[#230E4D]/90 backdrop-blur-md border-2 border-[#E4ED73] text-white shadow-xl">
              <p className="font-serif text-xl font-extrabold text-[#E4ED73] flex items-center gap-2">
                <span>🎨</span>
                <span>{liveBrand.artistName}</span>
              </p>
              <p className="text-xs font-mono font-bold text-[#FDB767] mt-0.5">{liveBrand.role}</p>
            </div>
          </div>

          {/* Text Bio & Tools */}
          <div className="lg:col-span-7 space-y-6">
            <div className="cartoon-sticker-badge bg-[#E4ED73] text-[#230E4D] px-4 py-1.5 text-xs font-mono">
              <span>✨</span>
              <span>{liveAbout.sectionBadge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight" style={{ color: 'var(--text-title)' }}>
              {liveAbout.title}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed font-sans font-medium" style={{ color: 'var(--text-body)' }}>
              {liveAbout.bioParagraph1}
            </p>

            <p className="text-xs sm:text-sm leading-relaxed font-sans font-medium opacity-90" style={{ color: 'var(--text-body)' }}>
              {liveAbout.bioParagraph2}
            </p>

            {/* Tools Badges */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase mb-2.5 font-bold" style={{ color: 'var(--text-muted)' }}>
                {about.toolsTitle}
              </h4>
              <div className="flex flex-wrap gap-2">
                {about.tools.map((tool, idx) => (
                  <span key={idx}
                    className="cartoon-sticker-badge bg-[#FDB767] text-[#230E4D] text-[11px]"
                  >
                    🎨 {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t font-mono text-xs" style={{ borderColor: 'var(--border-card)' }}>
              {about.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/40 dark:bg-black/20 border-2 border-[#230E4D]/20 text-center">
                  <span className="font-serif text-2xl font-extrabold block text-[#B64FFB] dark:text-[#E4ED73]">{stat.value}</span>
                  <span className="font-bold text-[11px]" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

