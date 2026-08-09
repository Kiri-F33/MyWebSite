'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import AddBlogPostModal from '../blog/AddBlogPostModal';
import AdminSectionManagerModal from './AdminSectionManagerModal';
import AddCustomTextBlockModal from './AddCustomTextBlockModal';
import AddArtworkModal from '../gallery/AddArtworkModal';
import SiteCustomizerPanel from './SiteCustomizerPanel';

export default function AdminControlPanel() {
  const { isAdmin, logout, addArtwork } = useAdmin();

  const [isAddArtOpen, setIsAddArtOpen] = useState(false);
  const [isAddTextOpen, setIsAddTextOpen] = useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isSectionManagerOpen, setIsSectionManagerOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <aside
        className="fixed top-20 right-4 sm:right-6 z-40 flex flex-col gap-2 p-3 rounded-3xl bg-[#1E0A40]/95 backdrop-blur-md border-3 border-[#B64FFB] shadow-[0_10px_25px_rgba(182,79,251,0.4)] animate-in fade-in"
        aria-label="Painel de Ferramentas ADM"
      >
        <div className="flex items-center justify-between px-2 pb-1 border-b border-white/20">
          <span className="text-[10px] font-mono font-extrabold text-[#E4ED73] uppercase tracking-wider flex items-center gap-1">
            <span>⚡ Modo ADM Ativo</span>
          </span>
          <button
            onClick={logout}
            className="text-[10px] font-mono font-bold text-red-400 hover:text-red-300 ml-3"
            title="Sair do Modo ADM"
          >
            [Sair]
          </button>
        </div>

        <button
          onClick={() => setIsAddArtOpen(true)}
          className="cartoon-btn-clay px-3.5 py-2 text-[11px] uppercase tracking-wider flex items-center gap-2"
        >
          <span>🎨</span>
          <span>+ Desenho</span>
        </button>

        <button
          onClick={() => setIsAddTextOpen(true)}
          className="cartoon-btn-magenta px-3.5 py-2 text-[11px] uppercase tracking-wider flex items-center gap-2"
        >
          <span>✍️</span>
          <span>+ Aviso / Bloco</span>
        </button>

        <button
          onClick={() => setIsAddPostOpen(true)}
          className="cartoon-btn-lime px-3.5 py-2 text-[11px] uppercase tracking-wider flex items-center gap-2"
        >
          <span>📰</span>
          <span>+ Post no Blog</span>
        </button>

        <button
          onClick={() => setIsSectionManagerOpen(true)}
          className="px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-mono font-bold text-[11px] border border-white/30 transition-all flex items-center gap-2"
        >
          <span>⚙️</span>
          <span>Ocultar Seções</span>
        </button>

        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="px-3.5 py-2 rounded-full font-mono font-bold text-[11px] border transition-all flex items-center gap-2 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #B64FFB, #5525A7)', color: '#F4FFE9', borderColor: '#E4ED73', boxShadow: '0 3px 0 #230E4D' }}
        >
          <span>🛠️</span>
          <span>Personalizar Site</span>
        </button>
      </aside>

      {/* Modals */}
      <AddArtworkModal
        isOpen={isAddArtOpen}
        onClose={() => setIsAddArtOpen(false)}
        onAddArtwork={(newArt) => addArtwork(newArt)}
      />

      <AddCustomTextBlockModal
        isOpen={isAddTextOpen}
        onClose={() => setIsAddTextOpen(false)}
      />

      <AddBlogPostModal
        isOpen={isAddPostOpen}
        onClose={() => setIsAddPostOpen(false)}
      />

      <AdminSectionManagerModal
        isOpen={isSectionManagerOpen}
        onClose={() => setIsSectionManagerOpen(false)}
      />

      <SiteCustomizerPanel
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </>
  );
}
