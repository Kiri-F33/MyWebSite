'use client';

import { SOCIAL_LINKS } from '@/data/socials';

export default function FeatureCards() {
  const items = [
    {
      number: '01',
      title: 'O Atelier',
      desc: 'Ilustrações autorais e estudos visuais focados em expressão.',
      icon: '🎨',
      link: '#sobre',
      color: 'text-[#75C9C8] dark:text-[#ABD2FA]'
    },
    {
      number: '02',
      title: 'Redes Sociais',
      desc: 'Siga no Instagram, ArtStation e Behance para novidades.',
      icon: '📷',
      link: SOCIAL_LINKS.instagram.url,
      color: 'text-[#80A1D4] dark:text-[#7692FF]'
    },
    {
      number: '03',
      title: 'Encomendas',
      desc: 'Solicite seu desenho personalizado em formato digital ou físico.',
      icon: '✨',
      link: '#encomendas',
      color: 'text-[#C0B9DD] dark:text-[#3D518C]'
    }
  ];

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          className="group block p-5 rounded-3xl navy-card hover:border-[#75C9C8] dark:hover:border-[#7692FF]/50 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            {/* Number badge */}
            <div className={`font-serif text-3xl font-bold ${item.color} leading-none tracking-tight group-hover:scale-110 transition-transform`}>
              {item.number}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="font-serif text-base font-bold transition-colors flex items-center gap-2" style={{ color: 'var(--text-title)' }}>
                <span>{item.title}</span>
                <span className="text-sm">{item.icon}</span>
              </h4>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                {item.desc}
              </p>
            </div>

            <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sm" style={{ color: 'var(--text-title)' }}>
              &rarr;
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
