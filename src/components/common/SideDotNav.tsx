'use client';

import { useState, useEffect } from 'react';

interface NavPoint {
  id: string;
  label: string;
}

export default function SideDotNav() {
  const [activeSection, setActiveSection] = useState('hero');

  const points: NavPoint[] = [
    { id: 'hero', label: '01. Hero' },
    { id: 'categorias', label: '02. Categorias' },
    { id: 'galeria-bolhas', label: '03. Bolhas' },
    { id: 'acervo', label: '04. Acervo' },
    { id: 'processo', label: '05. Processo' },
    { id: 'blog', label: '06. Blog' },
    { id: 'sobre', label: '07. Sobre' },
    { id: 'encomendas', label: '08. Encomendas' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const point of points) {
        const element = document.getElementById(point.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(point.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 py-3 px-2 rounded-full navy-card border shadow-2xl backdrop-blur-md"
      style={{ background: 'var(--bg-nav)', borderColor: 'var(--border-card)' }}
      aria-label="Navegação em Pontos por Seção"
    >
      {points.map((point) => {
        const isActive = activeSection === point.id;

        return (
          <button
            key={point.id}
            onClick={() => scrollToSection(point.id)}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none"
            aria-label={point.label}
          >
            {/* Tooltip on Hover */}
            <span className="absolute right-8 px-2.5 py-1 rounded-xl bg-slate-950/90 text-[#F4FFE9] text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md border border-white/10 pointer-events-none">
              {point.label}
            </span>

            {/* Glowing Dot Indicator */}
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-4 h-4 bg-[#B64FFB] ring-4 ring-[#B64FFB]/30 shadow-lg scale-110'
                  : 'w-2.5 h-2.5 bg-slate-400/50 hover:bg-[#FDB767] hover:scale-125'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--hyper-magenta)' : undefined,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
