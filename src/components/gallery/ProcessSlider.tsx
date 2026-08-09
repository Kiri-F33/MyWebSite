'use client';

import { useState, useRef } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

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
    <section id="processo" className="py-8 max-w-[1700px] mx-auto px-4 sm:px-8">
      <div className="navy-card p-10 sm:p-14 lg:p-16 rounded-[3.5rem] relative overflow-hidden border-4 border-[#5525A7]/30 shadow-[0_16px_0px_rgba(35,14,77,0.15)]">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="cartoon-sticker-badge mb-3 bg-[#FDB767] text-[#230E4D] px-4 py-1.5 text-xs font-mono">
            <span>✦</span>
            <span>{process.sectionBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-3" style={{ color: 'var(--text-title)' }}>
            {process.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base font-medium" style={{ color: 'var(--text-body)' }}>
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
          className="relative w-full max-w-[1400px] mx-auto aspect-[16/9] rounded-[2.5rem] overflow-hidden cursor-ew-resize select-none border-4 border-[#230E4D] dark:border-[#B64FFB] shadow-[0_12px_0px_#230E4D] bg-black"
        >
          {/* AFTER */}
          <div className="absolute inset-0 w-full h-full">
            <ArtworkPlaceholder title="Arte Finalizada" category="Render Digital" className="h-full w-full" />
            <div className="absolute top-4 right-4 z-20">
              <span className="cartoon-sticker-badge bg-[#B64FFB] text-white border-2 border-white shadow-md text-[10px]">
                🎨 {process.badgeAfter}
              </span>
            </div>
          </div>

          {/* BEFORE */}
          <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
            <div className="absolute inset-0 w-full h-full">
              <ArtworkPlaceholder title="Esboço Inicial" category="Grafite & Carvão" className="h-full w-full" />
              <div className="absolute top-4 left-4 z-20">
                <span className="cartoon-sticker-badge bg-[#E4ED73] text-[#230E4D] border-2 border-[#230E4D] shadow-md text-[10px]">
                  ✏️ {process.badgeBefore}
                </span>
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div className="absolute top-0 bottom-0 w-1.5 z-30 bg-[#E4ED73] shadow-[0_0_15px_#E4ED73]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#B64FFB] text-white border-3 border-[#230E4D] shadow-[0_4px_0px_#230E4D] flex items-center justify-center font-extrabold text-sm active:scale-90 transition-transform">
              &harr;
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono font-bold text-center" style={{ color: 'var(--text-body)' }}>
          <span className="cartoon-sticker-badge bg-white/40 text-[10px]">
            ⏳ {process.statTime}
          </span>
          <span className="cartoon-sticker-badge bg-white/40 text-[10px]">
            🎨 {process.statTechnique}
          </span>
        </div>
      </div>
    </section>
  );
}

