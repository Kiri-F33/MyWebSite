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
    <section id="encomendas" className="py-8 max-w-[1700px] mx-auto px-4 sm:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="cartoon-sticker-badge mb-3 bg-[#FDB767] text-[#230E4D] px-4 py-1.5 text-xs font-mono">
          <span>💌</span>
          <span>{commissions.sectionBadge}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-3" style={{ color: 'var(--text-title)' }}>
          {commissions.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: 'var(--text-body)' }}>
          {commissions.description}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {COMMISSION_PACKAGES.map(pkg => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`relative cursor-pointer rounded-[3rem] p-8 lg:p-10 transition-all duration-300 flex flex-col justify-between navy-card border-4 ${
              selectedPackage === pkg.id 
                ? 'border-[#B64FFB] shadow-[0_14px_0px_#230E4D] scale-[1.02]' 
                : 'border-[#230E4D]/30 shadow-[0_8px_0px_rgba(35,14,77,0.1)] opacity-90 hover:opacity-100'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 cartoon-sticker-badge bg-[#B64FFB] text-white border-2 border-[#230E4D] shadow-md text-[10px]">
                ✨ Mais Solicitado
              </div>
            )}

            <div>
              <h3 className="font-serif text-xl font-extrabold mb-2" style={{ color: 'var(--text-title)' }}>{pkg.title}</h3>
              <p className="text-xs font-medium leading-relaxed mb-4" style={{ color: 'var(--text-body)' }}>{pkg.description}</p>

              <div className="mb-4 pb-4 border-b-2" style={{ borderColor: 'var(--border-card)' }}>
                <span className="text-[11px] font-mono font-bold block" style={{ color: 'var(--text-muted)' }}>A partir de</span>
                <span className="font-serif text-3xl font-extrabold text-[#B64FFB] dark:text-[#E4ED73]">{pkg.startingPrice}</span>
                <span className="text-[11px] font-mono font-bold block mt-0.5" style={{ color: 'var(--text-muted)' }}>⏱️ Prazo: {pkg.deliveryTime}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="text-xs font-medium flex items-start gap-2" style={{ color: 'var(--text-body)' }}>
                    <span className="font-bold text-[#B64FFB]">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedPackage(pkg.id)}
              className={`w-full py-3 text-xs uppercase tracking-wider ${
                selectedPackage === pkg.id ? 'cartoon-btn-magenta' : 'cartoon-btn-clay'
              }`}
            >
              {selectedPackage === pkg.id ? '✓ Selecionado' : 'Escolher Pacote'}
            </button>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="navy-card p-8 sm:p-10 rounded-[2.5rem] max-w-2xl mx-auto border-3 border-[#230E4D] dark:border-[#B64FFB] shadow-[0_10px_0px_rgba(35,14,77,0.15)]">
        <h3 className="font-serif text-xl font-extrabold mb-1 text-center" style={{ color: 'var(--text-title)' }}>
          {commissions.formTitle}
        </h3>
        <p className="text-xs font-medium text-center mb-6" style={{ color: 'var(--text-body)' }}>
          {commissions.formSubtitle}
        </p>

        {submitted ? (
          <div className="p-6 rounded-3xl border-3 border-[#B64FFB] text-center space-y-2 bg-[#F4FFE9]/20"
          >
            <div className="w-12 h-12 rounded-full bg-[#B64FFB] text-white font-extrabold text-xl flex items-center justify-center mx-auto border-2 border-[#230E4D] shadow-md">
              ✓
            </div>
            <h4 className="font-serif text-lg font-extrabold" style={{ color: 'var(--text-title)' }}>Solicitação Enviada! 🎉</h4>
            <p className="text-xs font-medium" style={{ color: 'var(--text-body)' }}>
              Obrigado, <strong>{formData.name}</strong>! Responderei em breve no seu e-mail.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>Seu Nome *</label>
                <input type="text" required placeholder="Seu nome"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
                />
              </div>
              <div>
                <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>Seu E-mail *</label>
                <input type="email" required placeholder="seuemail@exemplo.com"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none font-medium"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
                />
              </div>
            </div>
            <div>
              <label className="block font-mono font-bold mb-1" style={{ color: 'var(--text-title)' }}>Descrição da Ideia</label>
              <textarea rows={3} placeholder="Conte sobre o personagem, pose ou estilo..."
                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-[#230E4D]/30 focus:border-[#B64FFB] focus:outline-none resize-none font-medium"
                style={{ background: 'var(--bg-input)', color: 'var(--text-title)' }}
              />
            </div>
            <button type="submit"
              className="cartoon-btn-magenta w-full py-3.5 text-xs uppercase tracking-wider block"
            >
              Enviar Solicitação ✨
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

