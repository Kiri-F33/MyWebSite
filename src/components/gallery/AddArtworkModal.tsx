'use client';

import { useState, useRef } from 'react';
import { Artwork, ArtworkCategory } from '@/types';
import { compressImage } from '@/utils/imageCompressor';

interface AddArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddArtwork: (artwork: Artwork) => void;
}

export default function AddArtworkModal({ isOpen, onClose, onAddArtwork }: AddArtworkModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'digital' as ArtworkCategory,
    categoryName: 'Arte Digital',
    year: new Date().getFullYear(),
    medium: 'Pintura Digital',
    dimensions: '3000 x 4000 px',
    aspectRatio: 'portrait' as 'portrait' | 'landscape' | 'square' | 'auto',
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

  const handleFileChange = async (file: File) => {
    if (!file) return;

    try {
      const { dataUrl, width: w, height: h } = await compressImage(file, 1400, 1400, 0.82);

      let detectedRatio: 'portrait' | 'landscape' | 'square' = 'portrait';
      if (w > h * 1.1) detectedRatio = 'landscape';
      else if (h > w * 1.1) detectedRatio = 'portrait';
      else detectedRatio = 'square';

      setFormData((prev) => ({
        ...prev,
        imageUrl: dataUrl,
        dimensions: `${w} x ${h} px`,
        aspectRatio: detectedRatio,
      }));
    } catch {
      alert('Erro ao carregar e comprimir imagem.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
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
      dimensions: formData.dimensions || 'Resolução Automática',
      aspectRatio: formData.aspectRatio,
      description: formData.description || 'Nova arte adicionada ao acervo.',
      story: formData.story || 'Criado no atelier.',
      imageUrl: formData.imageUrl,
      featured: false,
      tags: formData.tags.split(',').map(t => t.trim())
    };

    onAddArtwork(newArtwork);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="navy-card w-full max-w-2xl p-6 sm:p-8 rounded-[2.5rem] border-3 border-[#230E4D] dark:border-[#B64FFB] shadow-[0_12px_0px_#230E4D] relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#E4ED73] text-[#230E4D] font-bold text-xs flex items-center justify-center border border-[#230E4D] shadow-sm hover:scale-110"
        >
          ✕
        </button>

        <div className="cartoon-sticker-badge bg-[#B64FFB] text-white mb-2">
          <span>✨</span>
          <span>Adicionar Desenho</span>
        </div>

        <h3 className="font-serif text-2xl font-extrabold mb-1" style={{ color: 'var(--text-title)' }}>
          Adicionar Nova Arte
        </h3>
        <p className="text-xs font-medium mb-6" style={{ color: 'var(--text-body)' }}>
          Faça upload da sua ilustração ou informe o caminho para publicar na galeria.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {/* Title */}
          <div>
            <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
              Título do Desenho *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Retrato de Verão"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
              style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
            />
          </div>

          {/* Category & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
                Categoria *
              </label>
              <select
                value={formData.category}
                onChange={e => handleCategoryChange(e.target.value as ArtworkCategory)}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              >
                <option value="digital">Arte Digital</option>
                <option value="traditional">Tradicional (Grafite/Carvão)</option>
                <option value="sketchbook">Caderno de Esboços</option>
                <option value="concept">Concept Art</option>
              </select>
            </div>
            <div>
              <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
                Ano de Criação
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              />
            </div>
          </div>

          {/* Image Upload Area (File Picker + Drag & Drop) */}
          <div>
            <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
              Upload da Imagem do Desenho (PNG, JPG, WEBP, GIF, SVG, AVIF, HEIC) *
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml, image/avif, image/heic, image/heif, image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 rounded-2xl border-3 border-dashed cursor-pointer text-center transition-all flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-[#B64FFB] bg-[#B64FFB]/15 scale-[1.01]'
                  : 'border-[#230E4D]/40 dark:border-white/30 hover:border-[#B64FFB] bg-white/30 dark:bg-black/20'
              }`}
            >
              {formData.imageUrl ? (
                <div className="relative group w-full flex flex-col items-center gap-2">
                  <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-[#230E4D] shadow-md">
                    <img
                      src={formData.imageUrl}
                      alt="Pré-visualização"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#B64FFB]">
                    ✓ Imagem selecionada! Clique para trocar a imagem.
                  </span>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#E4ED73] text-[#230E4D] flex items-center justify-center text-xl font-extrabold border-2 border-[#230E4D] shadow-sm">
                    📁
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-extrabold text-xs" style={{ color: 'var(--text-title)' }}>
                      Arraste e solte o arquivo aqui ou <span className="text-[#B64FFB] underline">Clique para Navegar</span>
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      Suporta PNG, JPG, WEBP, GIF, SVG, AVIF, HEIC/HEIF e outros formatos de imagem.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Optional Direct URL Input */}
            <div className="mt-2">
              <input
                type="text"
                placeholder="Ou cole a URL direta da imagem (ex: https://...)"
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-[#230E4D]/20 text-[11px] font-mono focus:outline-none"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              />
            </div>
          </div>

          {/* Medium, Dimensions & Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
                Mídia / Materiais
              </label>
              <input
                type="text"
                placeholder="Ex: Procreate / Carvão 6B"
                value={formData.medium}
                onChange={e => setFormData({ ...formData, medium: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              />
            </div>
            <div>
              <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
                Dimensões (Auto)
              </label>
              <input
                type="text"
                placeholder="Auto-detectado ao enviar..."
                value={formData.dimensions}
                onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              />
            </div>
            <div>
              <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
                Formato do Card
              </label>
              <select
                value={formData.aspectRatio}
                onChange={e => setFormData({ ...formData, aspectRatio: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              >
                <option value="portrait">📱 Retrato (3:4)</option>
                <option value="landscape">🖥️ Paisagem (4:3)</option>
                <option value="square">🔲 Quadrado (1:1)</option>
                <option value="auto">🖼️ Adaptativo (Auto)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
              Breve Descrição
            </label>
            <textarea
              rows={2}
              placeholder="Resumo sobre o desenho..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none resize-none font-medium"
              style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
            />
          </div>

          <div className="pt-3 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cartoon-btn-clay px-5 py-2.5 text-xs uppercase"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cartoon-btn-lime px-6 py-2.5 text-xs uppercase"
            >
              Adicionar à Galeria ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

