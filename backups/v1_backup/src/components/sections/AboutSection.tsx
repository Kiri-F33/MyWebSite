'use client';

import { SITE_CONFIG } from '@/config/siteConfig';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

export default function AboutSection() {
  const { about, brand } = SITE_CONFIG;

  return (
    <section id="sobre" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="navy-card p-8 sm:p-12 lg:p-14 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Profile Card / Placeholder */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-slate-900/10">
            <ArtworkPlaceholder title={brand.artistName} category="Artista & Criador" className="h-full rounded-3xl" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-card)] shadow-md">
              <p className="font-serif text-lg font-bold" style={{ color: 'var(--text-title)' }}>{brand.artistName}</p>
              <p className="text-xs font-mono font-semibold" style={{ color: 'var(--text-accent)' }}>{brand.role}</p>
            </div>
          </div>

          {/* Text Bio & Tools */}
          <div className="lg:col-span-7 space-y-5">
            <span className="px-3 py-1 rounded-full bg-[#75C9C8]/20 dark:bg-[#1B2CC1] text-[#2B9392] dark:text-[#ABD2FA] font-mono text-xs font-semibold border border-white/10">
              {about.sectionBadge}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--text-title)' }}>
              {about.title}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed font-sans" style={{ color: 'var(--text-body)' }}>
              {about.bioParagraph1}
            </p>

            <p className="text-xs sm:text-sm leading-relaxed font-sans opacity-90" style={{ color: 'var(--text-body)' }}>
              {about.bioParagraph2}
            </p>

            {/* Tools Badges */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase opacity-70 mb-2.5 font-bold" style={{ color: 'var(--text-title)' }}>
                {about.toolsTitle}
              </h4>
              <div className="flex flex-wrap gap-2">
                {about.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-black/5 dark:bg-[#3D518C]/30 text-xs font-mono font-medium border border-white/10"
                    style={{ color: 'var(--text-body)' }}
                  >
                    ✨ {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/5 dark:border-white/10 font-mono text-xs">
              {about.stats.map((stat, idx) => (
                <div key={idx}>
                  <span className="font-serif text-2xl font-bold block" style={{ color: 'var(--text-title)' }}>{stat.value}</span>
                  <span className="opacity-70">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
