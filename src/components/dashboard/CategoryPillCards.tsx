'use client';

import { SITE_CONFIG } from '@/config/siteConfig';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

export default function CategoryPillCards() {
  const { categoriesSection } = SITE_CONFIG;

  const cardStyles = [
    { bg: 'rgba(253,183,103,0.18)', border: '#FDB767', btnClass: 'cartoon-btn-clay', icon: '🎨' },
    { bg: 'rgba(182,79,251,0.18)', border: '#B64FFB', btnClass: 'cartoon-btn-magenta', icon: '🔮' },
    { bg: 'rgba(228,237,115,0.22)', border: '#E4ED73', btnClass: 'cartoon-btn-lime', icon: '🌱' },
  ];

  return (
    <section className="py-8 max-w-[1700px] mx-auto px-4 sm:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="cartoon-sticker-badge mb-3 px-4 py-1.5 text-xs font-mono">
          <span>✨</span>
          <span>{categoriesSection.title}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4" style={{ color: 'var(--text-title)' }}>
          {categoriesSection.title}
        </h2>
        <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: 'var(--text-body)' }}>
          {categoriesSection.description}
        </p>
      </div>

      {/* 3 Cartoon Collectible Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-4">
        {categoriesSection.cards.map((card, idx) => {
          const style = cardStyles[idx % cardStyles.length];

          return (
            <div
              key={card.id}
              className="group rounded-[3rem] p-8 lg:p-10 shadow-[0_12px_0px_rgba(35,14,77,0.12)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 border-4"
              style={{ background: style.bg, borderColor: style.border }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 rounded-2xl bg-white/40 border border-white/60 shadow-sm">{style.icon}</span>
                  <span className="cartoon-sticker-badge text-[10px]">
                    Categoria
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: 'var(--text-title)' }}>
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed opacity-90 mb-6 font-sans font-medium" style={{ color: 'var(--text-body)' }}>
                  {card.desc}
                </p>

                {/* Artwork Preview Box inside Cartoon Card */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md mb-6 border-2 border-white/60">
                  <ArtworkPlaceholder title={card.title} category="Preview" className="h-full w-full" />
                </div>
              </div>

              <a
                href="#galeria-bolhas"
                className={`w-full py-3 text-xs uppercase tracking-wider text-center block ${style.btnClass}`}
              >
                Explorar Categoria ✦
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

