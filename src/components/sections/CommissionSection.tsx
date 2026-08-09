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
        <span className="px-3 py-1 rounded-full font-mono text-xs font-semibold uppercase tracking-wider inline-block mb-3 border"
          style={{ background: 'rgba(252,165,165,0.15)', borderColor: 'rgba(252,165,165,0.3)', color: 'var(--coral-pink)' }}
        >
          {commissions.sectionBadge}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-title)' }}>
          {commissions.sectionTitle}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
          {commissions.description}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {COMMISSION_PACKAGES.map(pkg => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`relative cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between navy-card ${
              selectedPackage === pkg.id ? 'scale-[1.02]' : 'opacity-90 hover:opacity-100'
            }`}
            style={{
              borderColor: selectedPackage === pkg.id ? 'var(--text-accent)' : 'var(--border-card)',
              borderWidth: selectedPackage === pkg.id ? '2px' : '1px',
            }}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#10B981] text-white text-[10px] font-bold font-mono uppercase tracking-wider shadow-sm">
                Mais Solicitado
              </div>
            )}

            <div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: 'var(--text-title)' }}>{pkg.title}</h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-body)' }}>{pkg.description}</p>

              <div className="mb-4 pb-4 border-b" style={{ borderColor: 'var(--border-card)' }}>
                <span className="text-[11px] font-mono block" style={{ color: 'var(--text-muted)' }}>A partir de</span>
                <span className="font-serif text-3xl font-bold" style={{ color: 'var(--text-accent)' }}>{pkg.startingPrice}</span>
                <span className="text-[11px] font-mono block mt-0.5" style={{ color: 'var(--text-muted)' }}>Prazo: {pkg.deliveryTime}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-body)' }}>
                    <span style={{ color: 'var(--text-accent)' }} className="font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedPackage(pkg.id)}
              className="w-full py-2.5 rounded-2xl text-xs font-bold font-mono uppercase tracking-wider transition-all"
              style={{
                background: selectedPackage === pkg.id ? 'var(--text-accent)' : 'rgba(52,211,153,0.1)',
                color: selectedPackage === pkg.id ? '#FFFFFF' : 'var(--text-title)',
              }}
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
          <div className="p-6 rounded-2xl border text-center space-y-2"
            style={{ background: 'rgba(52,211,153,0.1)', borderColor: 'rgba(52,211,153,0.3)' }}
          >
            <div className="w-10 h-10 rounded-full bg-[#10B981] text-white font-bold text-lg flex items-center justify-center mx-auto">
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
                <input type="text" required placeholder="Seu nome"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
                />
              </div>
              <div>
                <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Seu E-mail *</label>
                <input type="email" required placeholder="seuemail@exemplo.com"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border focus:outline-none"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
                />
              </div>
            </div>
            <div>
              <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Descrição da Ideia</label>
              <textarea rows={3} placeholder="Conte sobre o personagem, pose ou estilo..."
                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border focus:outline-none resize-none"
                style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
              />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-[0.98] transition-all"
            >
              Enviar Solicitação
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
