'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';

interface AddCustomTextBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCustomTextBlockModal({ isOpen, onClose }: AddCustomTextBlockModalProps) {
  const { addCustomBlock } = useAdmin();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Novidades');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addCustomBlock({
      title,
      content,
      category,
    });

    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs cursor-pointer" />

      <div className="relative z-10 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border text-left"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <h3 className="font-serif text-xl font-bold" style={{ color: 'var(--text-title)' }}>
              Criar Nova Caixa de Texto (ADM)
            </h3>
          </div>
          <button onClick={onClose} className="text-xs opacity-70 hover:opacity-100">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Título da Caixa *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="ex: Novo Estudo de Ilustração"
              className="w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none"
              style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
            />
          </div>

          <div>
            <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Categoria / Etiqueta</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none"
              style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
            >
              <option value="Novidades">Novidades</option>
              <option value="Aviso">Aviso de Ateliê</option>
              <option value="Dica">Dica de Arte</option>
              <option value="Nota">Nota Pessoal</option>
            </select>
          </div>

          <div>
            <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Conteúdo do Texto *</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Escreva a mensagem ou nota que ficará visível no site..."
              className="w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none resize-none"
              style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border font-bold text-xs"
              style={{ borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl bg-[#B64FFB] text-white font-bold text-xs shadow-md hover:brightness-110"
            >
              + Adicionar Caixa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
