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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-title)' }}>
          <span>Categorias & Tags</span>
        </h3>
        <button className="w-8 h-8 rounded-full bg-[#75C9C8] dark:bg-[#1B2CC1] text-white flex items-center justify-center text-xs font-bold shadow-md">
          ✕
        </button>
      </div>

      {/* Chips List */}
      <div className="flex flex-col gap-2.5">
        {chips.map((chip, idx) => (
          <div
            key={chip.id}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl font-medium text-xs shadow-sm transition-transform hover:scale-[1.02] cursor-pointer ${
              idx === 0
                ? 'bg-[#75C9C8] dark:bg-[#1B2CC1] text-white'
                : idx === 1
                ? 'bg-[#80A1D4] dark:bg-[#7692FF] text-white'
                : 'navy-card'
            }`}
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
        ))}
      </div>

      {/* Decorative Character Chibi Card */}
      <div className="mt-6 p-4 rounded-3xl navy-card flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#75C9C8] to-[#80A1D4] dark:from-[#1B2CC1] dark:to-[#7692FF] text-white flex items-center justify-center text-2xl shadow-md border border-white/20">
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
