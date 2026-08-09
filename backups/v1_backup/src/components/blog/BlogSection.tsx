'use client';

import { useState } from 'react';
import { BLOG_POSTS_DATA } from '@/data/blogPosts';
import { BlogPost } from '@/types';
import BlogPostModal from './BlogPostModal';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#75C9C8]/20 dark:bg-[#1B2CC1] text-[#2B9392] dark:text-[#ABD2FA] font-mono text-xs font-semibold uppercase tracking-wider inline-block mb-2 border border-white/10">
            ✦ Diário de Ateliê
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-title)' }}>
            Blog, Dicas & Processo Criativo
          </h2>
        </div>
        <p className="text-xs sm:text-sm max-w-md" style={{ color: 'var(--text-body)' }}>
          Artigos sobre o processo de ilustração, hábitos de desenho diário e análises detalhadas de materiais.
        </p>
      </div>

      {/* Grid of Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_POSTS_DATA.map((post, idx) => {
          const isFeatured = idx === 0;

          return (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`group cursor-pointer rounded-3xl navy-card overflow-hidden transition-all duration-300 hover:border-[#7692FF]/50 hover:-translate-y-1 flex flex-col justify-between ${
                isFeatured ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                {/* Cover Placeholder / Graphic */}
                <div className={`relative w-full overflow-hidden ${isFeatured ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}>
                  <ArtworkPlaceholder title={post.title} category={post.category} />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-slate-900/80 backdrop-blur-md text-[#ABD2FA] border border-white/20 shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3
                    className={`font-serif font-bold group-hover:text-[#7692FF] transition-colors leading-snug ${
                      isFeatured ? 'text-2xl mb-2' : 'text-lg mb-2'
                    }`}
                    style={{ color: 'var(--text-title)' }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs line-clamp-2 leading-relaxed font-sans mb-4" style={{ color: 'var(--text-body)' }}>
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Footer info */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-black/5 dark:border-white/10 mt-auto">
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded-full bg-[#1B2CC1] text-white font-serif text-xs font-bold flex items-center justify-center">
                    É
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-body)' }}>{post.author.name}</span>
                </div>

                <span className="text-xs font-bold group-hover:translate-x-1 transition-transform mt-3 flex items-center gap-1" style={{ color: 'var(--text-accent)' }}>
                  Ler Artigo &rarr;
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Reader Modal */}
      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </section>
  );
}
