'use client';

import { useState } from 'react';
import { playPopSound } from '@/utils/popSound';

interface StaticBubble {
  id: number;
  size: number;
  left: number;
  top: number; // percentage down the page
  color: string;
}

export default function InteractiveBubbleOverlay() {
  const [poppedIds, setPoppedIds] = useState<Record<number, boolean>>({});
  const [poppingId, setPoppingId] = useState<number | null>(null);
  const [poppedCount, setPoppedCount] = useState(0);

  // Fixed static positions across the background matching the reference image layout
  const staticBubbles: StaticBubble[] = [
    { id: 1, size: 48, left: 4, top: 2, color: 'rgba(112, 166, 232, 0.35)' },
    { id: 2, size: 32, left: 12, top: 6, color: 'rgba(52, 211, 153, 0.35)' },
    { id: 3, size: 64, left: 88, top: 4, color: 'rgba(255, 255, 255, 0.45)' },
    { id: 4, size: 38, left: 94, top: 9, color: 'rgba(252, 165, 165, 0.35)' },
    { id: 5, size: 52, left: 3, top: 22, color: 'rgba(192, 185, 221, 0.35)' },
    { id: 6, size: 28, left: 95, top: 28, color: 'rgba(112, 166, 232, 0.35)' },
    { id: 7, size: 58, left: 2, top: 42, color: 'rgba(52, 211, 153, 0.35)' },
    { id: 8, size: 42, left: 92, top: 48, color: 'rgba(255, 255, 255, 0.45)' },
    { id: 9, size: 36, left: 5, top: 64, color: 'rgba(252, 165, 165, 0.35)' },
    { id: 10, size: 60, left: 91, top: 72, color: 'rgba(112, 166, 232, 0.35)' },
    { id: 11, size: 44, left: 4, top: 86, color: 'rgba(52, 211, 153, 0.35)' },
    { id: 12, size: 50, left: 93, top: 92, color: 'rgba(192, 185, 221, 0.35)' },
  ];

  const handlePopBubble = (id: number) => {
    if (poppedIds[id] || poppingId === id) return;

    playPopSound(1.0 + (id % 4) * 0.1);
    setPoppedCount(prev => prev + 1);
    setPoppingId(id);

    setTimeout(() => {
      setPoppedIds(prev => ({ ...prev, [id]: true }));
      setPoppingId(null);

      // Respawn statically after 5 seconds
      setTimeout(() => {
        setPoppedIds(prev => ({ ...prev, [id]: false }));
      }, 5000);
    }, 280);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden min-h-full">
      {/* Static Background Bubbles */}
      {staticBubbles.map(bubble => {
        const isPopped = poppedIds[bubble.id];
        const isPopping = poppingId === bubble.id;

        if (isPopped) return null;

        return (
          <div
            key={bubble.id}
            onClick={() => handlePopBubble(bubble.id)}
            className={`pointer-events-auto absolute rounded-full border border-white/60 shadow-lg cursor-pointer backdrop-blur-xs transition-transform duration-200 hover:scale-125 active:scale-90 ${
              isPopping ? 'animate-pop' : ''
            }`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              backgroundColor: bubble.color,
              boxShadow: 'inset 0 0 10px rgba(255,255,255,0.7), 0 4px 15px rgba(0,0,0,0.1)',
            }}
            title="Clique para estourar! 🫧"
          >
            {/* Shimmer Highlight */}
            <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/80" />
          </div>
        );
      })}

      {/* Live Popped Counter Widget (Fixed at bottom right) */}
      {poppedCount > 0 && (
        <div className="pointer-events-auto fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full bg-slate-900/85 backdrop-blur-md border border-[#34D399]/40 text-white font-mono text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <span className="text-base animate-bounce">🫧</span>
          <span className="font-bold text-[#34D399]">{poppedCount}</span>
          <span>bolha{poppedCount > 1 ? 's' : ''} estourada{poppedCount > 1 ? 's' : ''}!</span>
        </div>
      )}
    </div>
  );
}
