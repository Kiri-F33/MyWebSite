'use client';

import { useState } from 'react';
import { BlogPost } from '@/types';
import { SITE_CONFIG } from '@/config/siteConfig';
import BlogPostModal from './BlogPostModal';
import ArtworkPlaceholder from '../common/ArtworkPlaceholder';
import { useAdmin } from '@/context/AdminContext';

export default function BlogSection() {
  const { isAdmin, blogPosts, deleteBlogPost } = useAdmin();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { blog } = SITE_CONFIG;

  const handleDelete = (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    if (confirm(`Deseja excluir o post "${post.title}"?`)) {
      deleteBlogPost(post.id);
    }
  };

  return (
    <section id="blog" className="py-8 max-w-[1700px] mx-auto px-4 sm:px-8">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="cartoon-sticker-badge mb-3 bg-[#E4ED73] text-[#230E4D] px-4 py-1.5 text-xs font-mono">
            <span>✍️</span>
            <span>{blog.sectionBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold" style={{ color: 'var(--text-title)' }}>
            {blog.sectionTitle}
          </h2>
        </div>
        <p className="text-sm sm:text-base font-medium max-w-lg" style={{ color: 'var(--text-body)' }}>
          {blog.description}
        </p>
      </div>

      {/* Grid of Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, idx) => {
          const isFeatured = idx === 0;

          return (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`group cursor-pointer rounded-[2.5rem] navy-card border-3 border-[#230E4D] dark:border-[#B64FFB]/40 shadow-[0_8px_0px_rgba(35,14,77,0.15)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_0px_rgba(35,14,77,0.25)] flex flex-col justify-between ${
                isFeatured ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                {/* Cover Image / Graphic */}
                <div className={`relative w-full overflow-hidden border-b-3 border-[#230E4D] dark:border-[#B64FFB]/30 ${isFeatured ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}>
                  {post.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <ArtworkPlaceholder title={post.title} category={post.category} />
                  )}
                  <div className="absolute top-3 left-3 z-10 flex gap-2 items-center">
                    <span className="cartoon-sticker-badge text-[10px] bg-[#B64FFB] text-white border-2 border-white">
                      {post.category}
                    </span>

                    {isAdmin && (
                      <button
                        onClick={(e) => handleDelete(e, post)}
                        className="px-2.5 py-0.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-mono text-[10px] font-bold shadow-md border border-white/40"
                        title="Excluir Post"
                      >
                        🗑️ Excluir
                      </button>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold mb-2" style={{ color: 'var(--text-muted)' }}>
                    <span>📅 {post.date}</span>
                    <span>•</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>

                  <h3
                    className={`font-serif font-extrabold transition-colors leading-snug ${
                      isFeatured ? 'text-2xl mb-2' : 'text-lg mb-2'
                    }`}
                    style={{ color: 'var(--text-title)' }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs line-clamp-2 leading-relaxed font-sans font-medium mb-4" style={{ color: 'var(--text-body)' }}>
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Footer info */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t mt-auto" style={{ borderColor: 'var(--border-card)' }}>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-7 h-7 rounded-full bg-[#FDB767] text-[#230E4D] border-2 border-[#230E4D] font-serif text-xs font-extrabold flex items-center justify-center shadow-sm">
                    🎨
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: 'var(--text-body)' }}>{post.author.name}</span>
                </div>

                <span className="cartoon-btn-magenta px-3 py-1 text-[10px] uppercase mt-3 inline-block">
                  Ler ✦
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

