'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { BlogPost } from '@/types';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogPostModal({ post, onClose }: BlogPostModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
      />

      {/* Reader Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] navy-card rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto border border-white/20">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-black/5 dark:bg-black/40">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#1B2CC1] text-[#ABD2FA] font-semibold border border-white/20">
              {post.category}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{post.readTime}</span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 text-var(--text-title) flex items-center justify-center transition-colors font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          {/* Article Title */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--text-title)' }}>
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-3 py-3 border-y border-black/5 dark:border-white/10">
            <div className="w-10 h-10 rounded-full bg-[#1B2CC1] text-white font-serif text-sm font-bold flex items-center justify-center">
              É
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-title)' }}>{post.author.name}</p>
              <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{post.author.role} • {post.date}</p>
            </div>
          </div>

          {/* Cover image / placeholder */}
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900/10 my-6">
            <ArtworkPlaceholder title={post.title} category={post.category} />
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 leading-relaxed text-sm sm:text-base" style={{ color: 'var(--text-body)' }}>
            {post.content.map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="font-serif text-xl font-bold mt-6 mb-2" style={{ color: 'var(--text-title)' }}>
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags Footer */}
          <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 text-xs rounded-lg bg-black/5 dark:bg-white/10 font-mono" style={{ color: 'var(--text-body)' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
