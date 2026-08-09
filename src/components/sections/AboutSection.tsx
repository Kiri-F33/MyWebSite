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
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border" style={{ borderColor: 'var(--border-card)' }}>
            <ArtworkPlaceholder title={brand.artistName} category="Artista & Criador" className="h-full rounded-3xl" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-md border shadow-md"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
            >
              <p className="font-serif text-lg font-bold" style={{ color: 'var(--text-title)' }}>{brand.artistName}</p>
              <p className="text-xs font-mono font-semibold" style={{ color: 'var(--text-accent)' }}>{brand.role}</p>
            </div>
          </div>

          {/* Text Bio & Tools */}
          <div className="lg:col-span-7 space-y-5">
            <span className="px-3 py-1 rounded-full font-mono text-xs font-semibold border inline-block"
              style={{ background: 'rgba(36,194,229,0.15)', borderColor: 'rgba(36,194,229,0.3)', color: 'var(--text-accent)' }}
            >
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
              <h4 className="text-xs font-mono uppercase mb-2.5 font-bold" style={{ color: 'var(--text-muted)' }}>
                {about.toolsTitle}
              </h4>
              <div className="flex flex-wrap gap-2">
                {about.tools.map((tool, idx) => (
                  <span key={idx}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium border"
                    style={{ background: 'rgba(254,160,109,0.15)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                  >
                    ✨ {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t font-mono text-xs" style={{ borderColor: 'var(--border-card)' }}>
              {about.stats.map((stat, idx) => (
                <div key={idx}>
                  <span className="font-serif text-2xl font-bold block" style={{ color: 'var(--text-accent)' }}>{stat.value}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
