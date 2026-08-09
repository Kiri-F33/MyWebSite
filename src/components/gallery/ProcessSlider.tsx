'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/siteConfig';

export default function ProcessSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { process } = SITE_CONFIG;

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="processo" className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="navy-card p-8 sm:p-12 rounded-3xl relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="px-3 py-1 rounded-full font-mono text-xs font-semibold uppercase tracking-wider inline-block mb-3 border"
            style={{ background: 'rgba(128,161,212,0.15)', borderColor: 'rgba(128,161,212,0.3)', color: 'var(--sky-blue)' }}
          >
            {process.sectionBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--text-title)' }}>
            {process.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-body)' }}>
            {process.description}
          </p>
        </div>

        {/* Interactive Comparison Box */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border shadow-2xl bg-black"
          style={{ borderColor: 'var(--border-card)' }}
        >
          {/* AFTER */}
          <div className="absolute inset-0 w-full h-full">
            <Image src="/images/fantasy_portrait.png" alt="Arte Finalizada" fill className="object-cover" priority />
            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-white">
              {process.badgeAfter}
            </div>
          </div>

          {/* BEFORE */}
          <div className="absolute inset-0 h-full overflow-hidden transition-all duration-75" style={{ width: `${sliderPosition}%` }}>
            <div className="relative w-full aspect-[16/9] min-w-[300px] sm:min-w-[600px] md:min-w-[800px] h-full">
              <Image src="/images/charcoal_sketch.png" alt="Esboço Inicial" fill className="object-cover" priority />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-slate-200">
                {process.badgeBefore}
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div className="absolute top-0 bottom-0 w-1 z-30"
            style={{ left: `${sliderPosition}%`, background: 'var(--text-accent)', boxShadow: '0 0 15px rgba(16,185,129,0.6)' }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#10B981] text-white shadow-lg flex items-center justify-center font-bold text-xs">
              &harr;
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-center" style={{ color: 'var(--text-body)' }}>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            {process.statTime}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--text-accent)' }}></span>
            {process.statTechnique}
          </span>
        </div>
      </div>
    </section>
  );
}
