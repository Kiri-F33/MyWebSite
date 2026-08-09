'use client';

import { useState } from 'react';

export default function SearchChips() {
  const [chips, setChips] = useState([
    { id: 1, text: '#IlustraçãoDigital' },
    { id: 2, text: '#DesenhoTradicional' },
    { id: 3, text: '#SketchbookHabit' },
    { id: 4, text: '#CarvãoEGrafite' },
    { id: 5, text: '#ConceptArt2026' }
  ]);

  const removeChip = (id: number) => {
    setChips(chips.filter(c => c.id !== id));
  };

  const chipColors = [
    { bg: 'rgba(16,185,129,0.2)', border: 'rgba(52,211,153,0.4)', text: 'var(--text-accent)' },
    { bg: 'rgba(128,161,212,0.2)', border: 'rgba(128,161,212,0.4)', text: 'var(--sky-blue)' },
    { bg: 'rgba(252,165,165,0.15)', border: 'rgba(252,165,165,0.3)', text: 'var(--coral-pink)' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-title)' }}>
          <span>Categorias & Tags</span>
        </h3>
        <button className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shadow-md">
          ✕
        </button>
      </div>

      {/* Chips List */}
      <div className="flex flex-col gap-2.5">
        {chips.map((chip, idx) => {
          const colorSet = chipColors[idx % chipColors.length];
          return (
            <div
              key={chip.id}
              className="flex items-center justify-between px-4 py-3 rounded-2xl font-medium text-xs shadow-sm transition-transform hover:scale-[1.02] cursor-pointer border"
              style={{
                background: colorSet.bg,
                borderColor: colorSet.border,
                color: 'var(--text-title)',
              }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{chip.text}</span>
              </div>
              <button
                onClick={() => removeChip(chip.id)}
                className="opacity-70 hover:opacity-100 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* Decorative Card */}
      <div className="mt-6 p-4 rounded-3xl navy-card flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center text-2xl shadow-md border border-white/20">
          ✨
        </div>
        <div>
          <h4 className="font-bold text-xs" style={{ color: 'var(--text-title)' }}>Dudu Atelier Tag</h4>
          <p className="text-[11px]" style={{ color: 'var(--text-body)' }}>Explore e encontre estilos por tags</p>
        </div>
      </div>
    </div>
  );
}
