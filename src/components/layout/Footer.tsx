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

  const socialItems = [
    { ...socials.instagram, emoji: '📷' },
    { ...socials.artstation, emoji: '🎨' },
    { ...socials.behance, emoji: '💼' },
    { ...socials.youtube, emoji: '▶️' },
  ];

  return (
    <footer className="pt-14 pb-10 mt-12 transition-colors border-t"
      style={{ background: 'var(--bg-nav)', borderColor: 'var(--border-card)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-bold text-lg shadow-md border border-white/20">
                🎨
              </div>
              <span className="font-serif text-2xl font-bold" style={{ color: 'var(--text-title)' }}>{brand.name}</span>
            </div>
            <p className="text-xs max-w-sm leading-relaxed font-sans" style={{ color: 'var(--text-body)' }}>
              {footer.description}
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold mb-3" style={{ color: 'var(--text-title)' }}>
              Redes Sociais
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {socialItems.map((social, idx) => (
                <a key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-2xl border transition-all"
                  style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
                >
                  <span>{social.emoji}</span>
                  <div>
                    <span className="font-bold block">{social.name}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{social.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
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
                <input type="email" required placeholder="Seu melhor e-mail"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border text-xs focus:outline-none"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
                />
                <button type="submit"
                  className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shrink-0 border border-white/20 shadow-md"
                >
                  Assinar
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono"
          style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
        >
          <p>{brand.copyright}</p>
          <button onClick={scrollToTop} className="flex items-center gap-2 transition-opacity" style={{ color: 'var(--text-title)' }}>
            <span>Voltar ao Topo</span>
            <span>&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
