'use client';

import { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { BlogPost } from '@/types';
import { compressImage } from '@/utils/imageCompressor';

interface AddBlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBlogPostModal({ isOpen, onClose }: AddBlogPostModalProps) {
  const { addBlogPost } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Processo Criativo');
  const [coverImage, setCoverImage] = useState('');

  if (!isOpen) return null;

  const handleFileChange = async (file: File) => {
    if (!file) return;

    try {
      const { dataUrl } = await compressImage(file, 1200, 1200, 0.8);
      setCoverImage(dataUrl);
    } catch {
      alert('Erro ao carregar e comprimir capa.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content) return;

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      summary,
      content: content.split('\n\n').filter(p => p.trim() !== ''),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      readTime: `${Math.max(3, Math.ceil(content.split(' ').length / 150))} min de leitura`,
      category,
      coverImage: coverImage || '',
      author: {
        name: 'Kiri',
        avatar: '',
        role: 'Ilustrador & Criador'
      },
      tags: [category, 'Atelier', 'Blog']
    };

    addBlogPost(newPost);
    setTitle('');
    setSummary('');
    setContent('');
    setCoverImage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="navy-card w-full max-w-xl p-6 sm:p-8 rounded-[2.5rem] border-3 border-[#230E4D] dark:border-[#B64FFB] shadow-[0_12px_0px_#230E4D] relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#E4ED73] text-[#230E4D] font-bold text-xs flex items-center justify-center border border-[#230E4D] shadow-sm hover:scale-110"
        >
          ✕
        </button>

        <div className="cartoon-sticker-badge bg-[#B64FFB] text-white mb-2">
          <span>📰</span>
          <span>Modo ADM</span>
        </div>

        <h3 className="font-serif text-2xl font-extrabold mb-1" style={{ color: 'var(--text-title)' }}>
          Adicionar Post no Blog
        </h3>
        <p className="text-xs font-medium mb-6" style={{ color: 'var(--text-body)' }}>
          Crie um novo artigo para o Diário de Ateliê com capa personalizada.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
              Título do Post *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Como escolher papéis para aquarela"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
              style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
                Categoria
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              >
                <option value="Processo Criativo">Processo Criativo</option>
                <option value="Materiais & Equipamentos">Materiais & Equipamentos</option>
                <option value="Reflexões & Rotina">Reflexões & Rotina</option>
                <option value="Novidades do Atelier">Novidades do Atelier</option>
              </select>
            </div>

            <div>
              <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
                Resumo Curto *
              </label>
              <input
                type="text"
                required
                placeholder="Breve descrição em 1 frase..."
                value={summary}
                onChange={e => setSummary(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              />
            </div>
          </div>

          {/* Cover Image File Upload */}
          <div>
            <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
              Upload da Capa do Artigo (Opcional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-2xl border-2 border-dashed border-[#230E4D]/30 dark:border-white/30 cursor-pointer text-center hover:border-[#B64FFB] transition-all bg-white/20 dark:bg-black/10 flex items-center justify-center gap-3"
            >
              {coverImage ? (
                <div className="flex items-center gap-3">
                  <img src={coverImage} alt="Capa" className="w-12 h-12 rounded-xl object-cover border" />
                  <span className="text-xs font-mono font-bold text-[#B64FFB]">✓ Capa carregada! Clique para trocar.</span>
                </div>
              ) : (
                <span className="font-mono text-xs text-slate-400 font-bold">
                  📁 Clique para selecionar uma imagem de capa do seu dispositivo
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>
              Conteúdo Completo *
            </label>
            <textarea
              rows={5}
              required
              placeholder="Escreva aqui o artigo..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none resize-none font-medium"
              style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cartoon-btn-clay px-5 py-2.5 text-xs uppercase"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cartoon-btn-magenta px-6 py-2.5 text-xs uppercase"
            >
              Publicar Post ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

