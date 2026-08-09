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
    const container = document.getElementById('main-scroll-container');

    const checkActiveSection = () => {
      const scrollEl = container || document.documentElement;
      const viewportCenter = window.innerHeight / 2;

      let foundId = points[0].id;
      let minDistance = Infinity;

      points.forEach((point) => {
        const el = document.getElementById(point.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            foundId = point.id;
          }
        }
      });

      setActiveSection(foundId);
    };

    // Attach scroll listener to scroll container and window
    if (container) {
      container.addEventListener('scroll', checkActiveSection, { passive: true });
    }
    window.addEventListener('scroll', checkActiveSection, { passive: true });

    // Initial check
    checkActiveSection();

    // IntersectionObserver for bulletproof detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: container || null,
        threshold: [0.3, 0.5, 0.7],
      }
    );

    points.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkActiveSection);
      }
      window.removeEventListener('scroll', checkActiveSection);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 py-4 px-3 rounded-full navy-card border-2 shadow-2xl backdrop-blur-md transition-colors"
      style={{
        background: 'var(--bg-nav)',
        borderColor: 'var(--border-card)',
      }}
      aria-label="Navegação em Pontos por Seção"
    >
      {points.map((point) => {
        const isActive = activeSection === point.id;

        return (
          <button
            key={point.id}
            onClick={() => scrollToSection(point.id)}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
            aria-label={point.label}
          >
            {/* Tooltip on Hover */}
            <span
              className="absolute right-10 px-3 py-1.5 rounded-xl text-[11px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border pointer-events-none"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-card)',
                color: 'var(--text-title)',
              }}
            >
              {point.label}
            </span>

            {/* Glowing Dot Indicator with High Contrast */}
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-4 h-4 bg-[#B64FFB] ring-4 ring-[#B64FFB]/40 shadow-lg scale-125'
                  : 'w-2.5 h-2.5 bg-slate-500/50 dark:bg-white/40 hover:bg-[#FDB767] hover:scale-125 border border-slate-700/20 dark:border-white/20'
              }`}
              style={{
                backgroundColor: isActive ? '#B64FFB' : undefined,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
