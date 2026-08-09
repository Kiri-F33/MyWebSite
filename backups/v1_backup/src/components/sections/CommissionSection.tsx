'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { COMMISSION_PACKAGES } from '@/data/blogPosts';

export default function CommissionSection() {
  const [selectedPackage, setSelectedPackage] = useState('corpo-inteiro');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    artworkType: 'Digital',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const { commissions } = SITE_CONFIG;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="encomendas" className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3 py-1 rounded-full bg-[#75C9C8]/20 dark:bg-[#1B2CC1] text-[#2B9392] dark:text-[#ABD2FA] font-mono text-xs font-semibold uppercase tracking-wider inline-block mb-3 border border-white/10">
          {commissions.sectionBadge}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-title)' }}>
          {commissions.sectionTitle}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
          {commissions.description}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {COMMISSION_PACKAGES.map(pkg => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`relative cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
              selectedPackage === pkg.id
                ? 'navy-card border-2 border-[#75C9C8] dark:border-[#7692FF] shadow-xl scale-102'
                : 'navy-card opacity-90 hover:opacity-100'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#75C9C8] dark:bg-[#1B2CC1] text-white text-[10px] font-bold font-mono uppercase tracking-wider shadow-sm">
                Mais Solicitado
              </div>
            )}

            <div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: 'var(--text-title)' }}>{pkg.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-body)' }}>{pkg.description}</p>

              <div className="mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                <span className="text-[11px] font-mono opacity-60 block">A partir de</span>
                <span className="font-serif text-3xl font-bold" style={{ color: 'var(--text-accent)' }}>{pkg.startingPrice}</span>
                <span className="text-[11px] font-mono opacity-60 block mt-0.5">Prazo: {pkg.deliveryTime}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-body)' }}>
                    <span className="text-[#75C9C8] dark:text-[#7692FF] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedPackage(pkg.id)}
              className={`w-full py-2.5 rounded-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                selectedPackage === pkg.id
                  ? 'bg-[#75C9C8] dark:bg-gradient-to-r dark:from-[#1B2CC1] dark:to-[#7692FF] text-white shadow-md'
                  : 'bg-black/5 dark:bg-[#3D518C]/30 hover:opacity-100'
              }`}
            >
              {selectedPackage === pkg.id ? 'Selecionado' : 'Escolher Pacote'}
            </button>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="navy-card p-8 sm:p-10 rounded-3xl max-w-2xl mx-auto">
        <h3 className="font-serif text-xl font-bold mb-1 text-center" style={{ color: 'var(--text-title)' }}>
          {commissions.formTitle}
        </h3>
        <p className="text-xs text-center mb-6" style={{ color: 'var(--text-body)' }}>
          {commissions.formSubtitle}
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-[#75C9C8]/10 dark:bg-[#1B2CC1]/20 border border-[#75C9C8]/30 dark:border-[#7692FF]/40 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#75C9C8] dark:bg-[#1B2CC1] text-white font-bold text-lg flex items-center justify-center mx-auto">
              ✓
            </div>
            <h4 className="font-serif text-lg font-bold" style={{ color: 'var(--text-title)' }}>Solicitação Enviada!</h4>
            <p className="text-xs" style={{ color: 'var(--text-body)' }}>
              Obrigado, <strong>{formData.name}</strong>! Responderei em breve no seu e-mail.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Seu Nome *</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-[#091540]/80 border border-black/10 dark:border-[#7692FF]/30 focus:outline-none"
                  style={{ color: 'var(--text-title)' }}
                />
              </div>

              <div>
                <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Seu E-mail *</label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-[#091540]/80 border border-black/10 dark:border-[#7692FF]/30 focus:outline-none"
                  style={{ color: 'var(--text-title)' }}
                />
              </div>
            </div>

            <div>
              <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Descrição da Ideia</label>
              <textarea
                rows={3}
                placeholder="Conte sobre o personagem, pose ou estilo..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-[#091540]/80 border border-black/10 dark:border-[#7692FF]/30 focus:outline-none resize-none"
                style={{ color: 'var(--text-title)' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#75C9C8] dark:bg-gradient-to-r dark:from-[#1B2CC1] dark:to-[#7692FF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-98 transition-all"
            >
              Enviar Solicitação
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
