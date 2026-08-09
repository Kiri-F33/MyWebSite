'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const { brand, footer, socials } = SITE_CONFIG;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/5 dark:border-[#7692FF]/20 bg-[var(--bg-nav)] pt-14 pb-10 text-slate-300 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#75C9C8] dark:bg-[#1B2CC1] text-white dark:text-[#ABD2FA] flex items-center justify-center font-bold font-serif shadow-md border border-white/20">
                É
              </div>
              <span className="font-serif text-2xl font-bold" style={{ color: 'var(--text-title)' }}>{brand.name}</span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed font-sans" style={{ color: 'var(--text-body)' }}>
              {footer.description}
            </p>
          </div>

          {/* Social Links List */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold mb-3" style={{ color: 'var(--text-title)' }}>
              Redes Sociais
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-2xl bg-black/5 dark:bg-[#3D518C]/20 border border-black/5 dark:border-[#7692FF]/20 hover:border-[#75C9C8] transition-all"
                style={{ color: 'var(--text-title)' }}
              >
                <span>📷</span>
                <div>
                  <span className="font-bold block">{socials.instagram.name}</span>
                  <span className="text-[10px] opacity-70">{socials.instagram.handle}</span>
                </div>
              </a>

              <a
                href={socials.artstation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-2xl bg-black/5 dark:bg-[#3D518C]/20 border border-black/5 dark:border-[#7692FF]/20 hover:border-[#75C9C8] transition-all"
                style={{ color: 'var(--text-title)' }}
              >
                <span>🎨</span>
                <div>
                  <span className="font-bold block">{socials.artstation.name}</span>
                  <span className="text-[10px] opacity-70">{socials.artstation.handle}</span>
                </div>
              </a>

              <a
                href={socials.behance.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-2xl bg-black/5 dark:bg-[#3D518C]/20 border border-black/5 dark:border-[#7692FF]/20 hover:border-[#75C9C8] transition-all"
                style={{ color: 'var(--text-title)' }}
              >
                <span>💼</span>
                <div>
                  <span className="font-bold block">{socials.behance.name}</span>
                  <span className="text-[10px] opacity-70">{socials.behance.handle}</span>
                </div>
              </a>

              <a
                href={socials.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-2xl bg-black/5 dark:bg-[#3D518C]/20 border border-black/5 dark:border-[#7692FF]/20 hover:border-[#75C9C8] transition-all"
                style={{ color: 'var(--text-title)' }}
              >
                <span>▶️</span>
                <div>
                  <span className="font-bold block">{socials.youtube.name}</span>
                  <span className="text-[10px] opacity-70">{socials.youtube.handle}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--text-title)' }}>
              {footer.newsletterTitle}
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-body)' }}>
              {footer.newsletterDescription}
            </p>

            {subscribed ? (
              <p className="text-xs font-mono py-1 font-bold" style={{ color: 'var(--text-accent)' }}>
                ✓ Inscrição realizada com sucesso!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-black/5 dark:bg-[#091540] border border-black/10 dark:border-[#7692FF]/30 text-xs focus:outline-none"
                  style={{ color: 'var(--text-title)' }}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#75C9C8] dark:bg-[#1B2CC1] text-white font-bold text-xs hover:brightness-110 shrink-0 border border-white/20 shadow-md"
                >
                  Assinar
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          <p>{brand.copyright}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-title)' }}
          >
            <span>Voltar ao Topo</span>
            <span>&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
