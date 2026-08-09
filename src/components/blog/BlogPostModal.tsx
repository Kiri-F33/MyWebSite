'use client';

import { useEffect } from 'react';
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
      <div onClick={onClose} className="absolute inset-0 backdrop-blur-md cursor-pointer" style={{ background: 'rgba(0,0,0,0.6)' }} />

      {/* Reader Modal Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto border"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border-card)', background: 'rgba(0,0,0,0.03)' }}
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono rounded-full font-semibold text-white border-0"
              style={{ background: 'var(--text-accent)' }}
            >
              {post.category}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{post.readTime}</span>
          </div>

          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors font-bold border"
            style={{ background: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight" style={{ color: 'var(--text-title)' }}>
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-3 py-3 border-y" style={{ borderColor: 'var(--border-card)' }}>
            <div className="w-10 h-10 rounded-full bg-[#10B981] text-white font-serif text-sm font-bold flex items-center justify-center">
              A
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-title)' }}>{post.author.name}</p>
              <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{post.author.role} • {post.date}</p>
            </div>
          </div>

          {/* Cover placeholder */}
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden my-6 border" style={{ borderColor: 'var(--border-card)' }}>
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
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Tags Footer */}
          <div className="pt-6 border-t flex flex-wrap gap-2" style={{ borderColor: 'var(--border-card)' }}>
            {post.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 text-xs rounded-lg font-mono border"
                style={{ background: 'rgba(52,211,153,0.1)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
