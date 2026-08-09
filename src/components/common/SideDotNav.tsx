'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';

interface NavPoint {
  id: string;
  label: string;
}

export default function SideDotNav() {
  const { sectionOrder, isSectionVisible } = useAdmin();
  const [activeSection, setActiveSection] = useState('hero');
  const animFrameId = useRef<number | null>(null);

  const labelsMap: Record<string, string> = {
    hero: 'Hero',
    categorias: 'Categorias',
    'galeria-bolhas': 'Bolhas',
    acervo: 'Acervo',
    processo: 'Processo',
    blog: 'Blog',
    sobre: 'Sobre',
    encomendas: 'Encomendas',
    rodape: 'Rodapé',
  };

  const activeSectionIds = [...sectionOrder.filter(id => isSectionVisible(id)), 'rodape'];

  const points: NavPoint[] = activeSectionIds.map((id, index) => ({
    id,
    label: `${String(index + 1).padStart(2, '0')}. ${labelsMap[id] || id}`,
  }));


  const updateActiveSection = useCallback(() => {
    const container = document.getElementById('main-scroll-container') || document.documentElement;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Top boundary check
    if (scrollTop < 80) {
      setActiveSection('hero');
      return;
    }

    // Bottom boundary check
    if (scrollTop + clientHeight >= scrollHeight - 80) {
      setActiveSection('rodape');
      return;
    }

    const viewportCenter = window.innerHeight / 2;
    let minDistance = Infinity;
    let closestId = points[0].id;

    points.forEach((point) => {
      const el = document.getElementById(point.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestId = point.id;
        }
      }
    });

    setActiveSection(closestId);
  }, []);

  useEffect(() => {
    const container = document.getElementById('main-scroll-container');

    const handleScroll = () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
      animFrameId.current = requestAnimationFrame(() => {
        updateActiveSection();
      });
    };

    // Attach listeners to container & window
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation on mount
    updateActiveSection();

    // IntersectionObserver with center viewport band trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: container || null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    points.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
      observer.disconnect();
    };
  }, [updateActiveSection]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 py-4 px-3 rounded-full bg-[#230E4D] dark:bg-[#1E0A40] border-3 border-[#B64FFB] shadow-[0_10px_25px_rgba(35,14,77,0.35)] backdrop-blur-lg transition-all"
      aria-label="Navegação por Seção"
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
              className="absolute right-10 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border-2 border-[#B64FFB] pointer-events-none bg-[#230E4D] text-[#E4ED73]"
            >
              {point.label}
            </span>

            {/* Glowing Dot Indicator with High Contrast */}
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-4 h-4 bg-[#E4ED73] ring-4 ring-[#B64FFB]/60 shadow-[0_0_12px_#E4ED73] scale-125 border-2 border-[#230E4D]'
                  : 'w-3 h-3 bg-[#F4FFE9]/50 hover:bg-[#FDB767] hover:scale-125 hover:opacity-100 border border-[#F4FFE9]/20'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}


