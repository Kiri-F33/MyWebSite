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
    { id: 'rodape', label: '09. Rodapé' },
  ];

  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container');

    const updateActiveSection = () => {
      const container = scrollContainer || window;
      const scrollPos = scrollContainer
        ? scrollContainer.scrollTop + scrollContainer.clientHeight / 3
        : window.scrollY + window.innerHeight / 3;

      for (let i = points.length - 1; i >= 0; i--) {
        const element = document.getElementById(points[i].id);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPos >= offsetTop - 100) {
            setActiveSection(points[i].id);
            break;
          }
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateActiveSection, { passive: true });
    }
    window.addEventListener('scroll', updateActiveSection, { passive: true });

    updateActiveSection();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateActiveSection);
      }
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 py-3.5 px-2.5 rounded-full navy-card border-2 shadow-2xl backdrop-blur-md"
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
            <span className="absolute right-9 px-3 py-1 rounded-xl bg-slate-950/95 text-[#F4FFE9] text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md border border-white/20 pointer-events-none">
              {point.label}
            </span>

            {/* Glowing Dot Indicator */}
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-4 h-4 bg-[#B64FFB] ring-4 ring-[#B64FFB]/40 shadow-lg scale-110'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-[#FDB767] hover:scale-125'
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
