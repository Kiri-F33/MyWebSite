'use client';

import { useState } from 'react';
import { Artwork, ArtworkCategory } from '@/types';

interface AddArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddArtwork: (artwork: Artwork) => void;
}

export default function AddArtworkModal({ isOpen, onClose, onAddArtwork }: AddArtworkModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'digital' as ArtworkCategory,
    categoryName: 'Arte Digital',
    year: new Date().getFullYear(),
    medium: 'Pintura Digital',
    dimensions: '3000 x 4000 px',
    description: '',
    story: '',
    imageUrl: '',
    tags: 'Digital, Ilustração, Portfólio'
  });

  if (!isOpen) return null;

  const handleCategoryChange = (cat: ArtworkCategory) => {
    const names: Record<ArtworkCategory, string> = {
      all: 'Todas',
      digital: 'Arte Digital',
      traditional: 'Arte Tradicional',
      sketchbook: 'Caderno de Esboços',
      concept: 'Concept Art'
    };
    setFormData({ ...formData, category: cat, categoryName: names[cat] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newArtwork: Artwork = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      categoryName: formData.categoryName,
      year: Number(formData.year),
      medium: formData.medium,
      dimensions: formData.dimensions,
      description: formData.description || 'Nova arte adicionada ao acervo.',
      story: formData.story || 'Criado no atelier.',
      imageUrl: formData.imageUrl,
      featured: false,
      tags: formData.tags.split(',').map(t => t.trim())
    };

    onAddArtwork(newArtwork);
    onClose();
  };

  const inputStyle = {
    background: 'var(--bg-input)',
    borderColor: 'var(--border-card)',
    color: 'var(--text-title)',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div onClick={onClose} className="absolute inset-0 backdrop-blur-md cursor-pointer" style={{ background: 'rgba(0,0,0,0.6)' }} />

      <div className="relative z-10 w-full max-w-2xl navy-card rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] border"
        style={{ borderColor: 'var(--border-card)' }}
      >
        <div className="flex items-center justify-between pb-4 border-b mb-6" style={{ borderColor: 'var(--border-card)' }}>
          <div>
            <h3 className="font-serif text-2xl font-bold" style={{ color: 'var(--text-title)' }}>✨ Adicionar Nova Arte</h3>
            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Adicione um novo desenho ou ilustração para visualizar na galeria</p>
          </div>
          <button onClick={onClose} className="p-2 font-bold" style={{ color: 'var(--text-muted)' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block font-mono mb-1 font-semibold" style={{ color: 'var(--text-title)' }}>Título do Desenho *</label>
            <input type="text" required placeholder="Ex: Retrato de Verão"
              value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border outline-none" style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono mb-1 font-semibold" style={{ color: 'var(--text-title)' }}>Categoria *</label>
              <select value={formData.category} onChange={e => handleCategoryChange(e.target.value as ArtworkCategory)}
                className="w-full px-4 py-2.5 rounded-xl border outline-none" style={inputStyle}
              >
                <option value="digital">Arte Digital</option>
                <option value="traditional">Tradicional (Grafite/Carvão)</option>
                <option value="sketchbook">Caderno de Esboços</option>
                <option value="concept">Concept Art</option>
              </select>
            </div>
            <div>
              <label className="block font-mono mb-1 font-semibold" style={{ color: 'var(--text-title)' }}>Ano de Criação</label>
              <input type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border outline-none" style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block font-mono mb-1 font-semibold" style={{ color: 'var(--text-title)' }}>Link ou Caminho da Imagem (Opcional)</label>
            <input type="text" placeholder="Ex: /images/meu_desenho.png"
              value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border outline-none" style={inputStyle}
            />
            <span className="text-[10px] mt-1 block" style={{ color: 'var(--text-muted)' }}>
              Se deixar em branco, o site exibirá o placeholder automaticamente.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono mb-1 font-semibold" style={{ color: 'var(--text-title)' }}>Mídia / Materiais</label>
              <input type="text" placeholder="Ex: Procreate / Carvão 6B"
                value={formData.medium} onChange={e => setFormData({ ...formData, medium: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border outline-none" style={inputStyle}
              />
            </div>
            <div>
              <label className="block font-mono mb-1 font-semibold" style={{ color: 'var(--text-title)' }}>Dimensões</label>
              <input type="text" placeholder="Ex: A3 (29x42 cm)"
                value={formData.dimensions} onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border outline-none" style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block font-mono mb-1 font-semibold" style={{ color: 'var(--text-title)' }}>Breve Descrição</label>
            <textarea rows={2} placeholder="Resumo sobre o desenho..."
              value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border outline-none resize-none" style={inputStyle}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose}
              className="w-1/3 py-3 rounded-xl font-semibold border"
              style={{ background: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
            >
              Cancelar
            </button>
            <button type="submit"
              className="w-2/3 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold uppercase tracking-wider shadow-md"
            >
              Adicionar à Galeria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
