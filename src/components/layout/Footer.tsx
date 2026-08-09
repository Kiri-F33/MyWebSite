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
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialItems = [
    { ...socials.instagram, emoji: '📷' },
    { ...socials.artstation, emoji: '🎨' },
    { ...socials.behance, emoji: '💼' },
    { ...socials.youtube, emoji: '▶️' },
  ];

  return (
    <footer id="rodape" className="w-full flex flex-col justify-between pt-14 pb-10 mt-6 transition-colors border-t-4 border-[#230E4D] dark:border-[#B64FFB]"
      style={{ background: 'var(--bg-nav)' }}
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#B64FFB] text-white flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-[#230E4D]">
                🎨
              </div>
              <span className="font-serif text-2xl font-extrabold" style={{ color: 'var(--text-title)' }}>{brand.name}</span>
            </div>
            <p className="text-xs font-medium max-w-sm leading-relaxed font-sans" style={{ color: 'var(--text-body)' }}>
              {footer.description}
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold mb-3" style={{ color: 'var(--text-title)' }}>
              ✦ Redes Sociais
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {socialItems.map((social, idx) => (
                <a key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-2xl border-2 border-[#230E4D]/30 dark:border-white/20 transition-all hover:scale-105 hover:-rotate-1 bg-white/40 dark:bg-black/20 shadow-sm"
                  style={{ color: 'var(--text-title)' }}
                >
                  <span className="text-lg">{social.emoji}</span>
                  <div>
                    <span className="font-extrabold block text-xs">{social.name}</span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{social.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold" style={{ color: 'var(--text-title)' }}>
              ✦ {footer.newsletterTitle}
            </h4>
            <p className="text-xs font-medium" style={{ color: 'var(--text-body)' }}>
              {footer.newsletterDescription}
            </p>

            {subscribed ? (
              <p className="text-xs font-mono py-2 font-bold text-[#B64FFB] dark:text-[#E4ED73]">
                ✓ Inscrição realizada com sucesso! 🎉
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input type="email" required placeholder="Seu melhor e-mail"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 text-xs focus:outline-none font-medium"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
                />
                <button type="submit"
                  className="cartoon-btn-magenta px-5 py-2.5 text-xs uppercase shrink-0"
                >
                  Assinar ✨
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold"
          style={{ borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
        >
          <p>{brand.copyright}</p>
          <button onClick={scrollToTop} className="cartoon-sticker-badge bg-[#E4ED73] text-[#230E4D] cursor-pointer">
            <span>Voltar ao Topo</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

