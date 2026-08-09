'use client';

import { SITE_CONFIG } from '@/config/siteConfig';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

export default function CategoryPillCards() {
  const { categoriesSection } = SITE_CONFIG;

  const cardStyles = [
    { bg: 'rgba(253,183,103,0.18)', border: 'rgba(253,183,103,0.45)', btnBg: '#FDB767', icon: '🎨', textColor: '#FFFFFF' },
    { bg: 'rgba(182,79,251,0.18)', border: 'rgba(182,79,251,0.45)', btnBg: '#B64FFB', icon: '🔮', textColor: '#FFFFFF' },
    { bg: 'rgba(228,237,115,0.22)', border: 'rgba(228,237,115,0.55)', btnBg: '#E4ED73', icon: '🍋', textColor: '#230E4D' },
  ];

  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full font-mono text-xs font-semibold uppercase tracking-wider inline-block mb-3 border"
          style={{ background: 'rgba(182,79,251,0.15)', borderColor: 'rgba(182,79,251,0.3)', color: 'var(--text-accent)' }}
        >
          ✨ {categoriesSection.title}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-title)' }}>
          {categoriesSection.title}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
          {categoriesSection.description}
        </p>
      </div>

      {/* 3 Category Pill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {categoriesSection.cards.map((card, idx) => {
          const style = cardStyles[idx % cardStyles.length];

          return (
            <div
              key={card.id}
              className="group rounded-3xl p-6 shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 border"
              style={{ background: style.bg, borderColor: style.border }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{style.icon}</span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold shadow-sm border"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
                  >
                    Categoria
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: 'var(--text-title)' }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed opacity-90 mb-6 font-sans" style={{ color: 'var(--text-body)' }}>
                  {card.desc}
                </p>

                {/* Artwork Preview Box inside Pill Card */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md mb-6 border" style={{ borderColor: 'var(--border-card)' }}>
                  <ArtworkPlaceholder title={card.title} category="Preview" className="h-full w-full" />
                </div>
              </div>

              <a
                href="#galeria"
                className="w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-center block shadow-md hover:brightness-110 transition-all"
                style={{
                  background: style.btnBg,
                  color: style.textColor,
                }}
              >
                Explorar
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
