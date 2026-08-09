'use client';

import { useAdmin } from '@/context/AdminContext';

interface AdminSectionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSectionManagerModal({ isOpen, onClose }: AdminSectionManagerModalProps) {
  const { hiddenSections, sectionOrder, toggleSectionVisibility, moveSectionUp, moveSectionDown, resetAllDefaults } = useAdmin();

  if (!isOpen) return null;

  const sectionsMap: Record<string, { name: string; icon: string }> = {
    hero: { name: '01. Banner Principal (Hero)', icon: '☁️' },
    categorias: { name: '02. Categorias & O que encontrar', icon: '🎨' },
    'galeria-bolhas': { name: '03. Galeria em Bolhas Flutuantes', icon: '🫧' },
    acervo: { name: '04. Acervo & Galeria Completa', icon: '🖼️' },
    processo: { name: '05. Bastidores (Antes vs Depois)', icon: '✍️' },
    blog: { name: '06. Blog & Diário do Ateliê', icon: '📰' },
    sobre: { name: '07. Sobre o Artista & Atelier', icon: '✨' },
    encomendas: { name: '08. Formulário de Encomendas', icon: '💌' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="navy-card w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] border-3 border-[#230E4D] dark:border-[#B64FFB] shadow-[0_12px_0px_#230E4D] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#E4ED73] text-[#230E4D] font-bold text-xs flex items-center justify-center border border-[#230E4D] shadow-sm hover:scale-110"
        >
          ✕
        </button>

        <div className="cartoon-sticker-badge bg-[#B64FFB] text-white mb-2">
          <span>⚙️</span>
          <span>Painel de Controle ADM</span>
        </div>

        <h3 className="font-serif text-2xl font-extrabold mb-1" style={{ color: 'var(--text-title)' }}>
          Organizador de Seções & Ordem
        </h3>
        <p className="text-xs font-medium mb-6" style={{ color: 'var(--text-body)' }}>
          Mova seções para cima/baixo ou oculte qualquer bloco do site instantaneamente.
        </p>

        <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
          {sectionOrder.map((secId, idx) => {
            const sec = sectionsMap[secId] || { name: secId, icon: '📦' };
            const isHidden = hiddenSections[secId];

            return (
              <div
                key={secId}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  isHidden
                    ? 'bg-red-500/10 border-red-400/40 opacity-70'
                    : 'bg-emerald-500/10 border-emerald-400/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* Up / Down Move Controls */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveSectionUp(secId)}
                      className="w-6 h-5 rounded-md bg-white/40 dark:bg-black/40 text-[10px] font-bold disabled:opacity-30 hover:bg-[#B64FFB] hover:text-white transition-colors"
                      title="Mover para cima"
                    >
                      ▲
                    </button>
                    <button
                      disabled={idx === sectionOrder.length - 1}
                      onClick={() => moveSectionDown(secId)}
                      className="w-6 h-5 rounded-md bg-white/40 dark:bg-black/40 text-[10px] font-bold disabled:opacity-30 hover:bg-[#B64FFB] hover:text-white transition-colors"
                      title="Mover para baixo"
                    >
                      ▼
                    </button>
                  </div>

                  <span className="text-base">{sec.icon}</span>
                  <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-title)' }}>
                    {sec.name}
                  </span>
                </div>

                <button
                  onClick={() => toggleSectionVisibility(secId)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase transition-all ${
                    isHidden
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {isHidden ? 'Ocultado ✕' : 'Visível ✓'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t-2 flex items-center justify-between gap-3" style={{ borderColor: 'var(--border-card)' }}>
          <button
            onClick={() => {
              if (confirm('Deseja restaurar todas as configurações originais do site?')) {
                resetAllDefaults();
                alert('Restaurado com sucesso!');
              }
            }}
            className="text-[11px] font-mono text-red-400 font-bold hover:underline"
          >
            🔄 Restaurar Padrões
          </button>

          <button
            onClick={onClose}
            className="cartoon-btn-magenta px-6 py-2.5 text-xs uppercase"
          >
            Concluído ✨
          </button>
        </div>
      </div>
    </div>
  );
}
