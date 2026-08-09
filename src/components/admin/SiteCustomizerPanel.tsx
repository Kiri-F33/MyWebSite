'use client';

import { useState, useRef } from 'react';
import { useSiteCustomization } from '@/context/SiteCustomizationContext';
import { compressImage } from '@/utils/imageCompressor';

// ─── Helper Components ────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-mono font-bold uppercase tracking-wider" style={{ color: '#B64FFB' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-xl border-2 border-[#B64FFB]/30 focus:border-[#B64FFB] focus:outline-none text-sm font-medium transition-colors"
      style={{ background: 'rgba(255,255,255,0.06)', color: '#F4FFE9' }}
    />
  );
}

function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2 rounded-xl border-2 border-[#B64FFB]/30 focus:border-[#B64FFB] focus:outline-none text-sm font-medium transition-colors resize-none"
      style={{ background: 'rgba(255,255,255,0.06)', color: '#F4FFE9' }}
    />
  );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl border border-[#B64FFB]/20" style={{ background: 'rgba(255,255,255,0.04)' }}>
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-10 h-10 rounded-xl border-2 border-[#B64FFB]/40 cursor-pointer flex-shrink-0"
        style={{ padding: '2px' }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5" style={{ color: '#B64FFB' }}>{label}</div>
        <div className="text-xs font-mono" style={{ color: '#F4FFE9' }}>{value}</div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 w-full p-2.5 rounded-xl transition-colors"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      <div className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${checked ? 'bg-[#B64FFB]' : 'bg-white/20'}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
      <span className="text-xs font-medium" style={{ color: '#F4FFE9' }}>{label}</span>
    </button>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border-2 border-[#B64FFB]/30 focus:border-[#B64FFB] focus:outline-none text-sm font-medium transition-colors"
        style={{ background: '#1E0A40', color: '#F4FFE9' }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </Field>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────

function ThemeTab() {
  const { customization, updateTheme } = useSiteCustomization();
  const t = customization.theme;

  const fontHeadingOptions = [
    { value: 'Playfair Display', label: '✒️ Playfair Display (Serifado Elegante)' },
    { value: 'Lobster', label: '🍭 Lobster (Cursivo Cartoon)' },
    { value: 'Pacifico', label: '🌊 Pacifico (Cursivo Suave)' },
    { value: 'Abril Fatface', label: '🏛️ Abril Fatface (Bold Serif)' },
    { value: 'Permanent Marker', label: '✏️ Permanent Marker (Manuscrito)' },
    { value: 'Righteous', label: '⚡ Righteous (Geométrico)' },
    { value: 'Press Start 2P', label: '🎮 Press Start 2P (Pixel)' },
    { value: 'Dancing Script', label: '💃 Dancing Script (Caligrafia)' },
  ];

  const fontBodyOptions = [
    { value: 'Inter', label: '📄 Inter (Moderno Sans)' },
    { value: 'Nunito', label: '🍬 Nunito (Arredondado Cartoon)' },
    { value: 'Poppins', label: '📐 Poppins (Geométrico Limpo)' },
    { value: 'Quicksand', label: '🌸 Quicksand (Suave Lúdico)' },
    { value: 'Karla', label: '📰 Karla (Humanista)' },
    { value: 'DM Sans', label: '✔️ DM Sans (Neutro Profissional)' },
  ];

  const radiusOptions = [
    { value: '0.5rem', label: '▪️ Quadrado (8px)' },
    { value: '1rem', label: '◼️ Levemente Arredondado (16px)' },
    { value: '1.5rem', label: '⬜ Arredondado (24px) — Padrão' },
    { value: '2rem', label: '⭕ Muito Arredondado (32px)' },
    { value: '9999px', label: '💊 Pílula (Máximo)' },
  ];

  const speedOptions = [
    { value: 'fast', label: '⚡ Rápido' },
    { value: 'normal', label: '🎯 Normal (Padrão)' },
    { value: 'slow', label: '🌙 Lento e Suave' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-mono font-extrabold text-sm uppercase tracking-widest mb-3" style={{ color: '#E4ED73' }}>🎨 Paleta de Cores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorPicker label="Cor Primária (Botões)" value={t.colorPrimary} onChange={v => updateTheme({ colorPrimary: v })} />
          <ColorPicker label="Cor Secundária (Acentos)" value={t.colorSecondary} onChange={v => updateTheme({ colorSecondary: v })} />
          <ColorPicker label="Cor de Destaque (Stars)" value={t.colorAccent} onChange={v => updateTheme({ colorAccent: v })} />
          <ColorPicker label="Texto Principal" value={t.colorText} onChange={v => updateTheme({ colorText: v })} />
          <ColorPicker label="Fundo Escuro (Seções)" value={t.colorBgDark} onChange={v => updateTheme({ colorBgDark: v })} />
          <ColorPicker label="Fundo dos Cards" value={t.colorBgCard} onChange={v => updateTheme({ colorBgCard: v })} />
        </div>
      </div>

      <div>
        <h3 className="font-mono font-extrabold text-sm uppercase tracking-widest mb-3" style={{ color: '#E4ED73' }}>✍️ Tipografia</h3>
        <div className="grid grid-cols-1 gap-3">
          <SelectField label="Fonte dos Títulos" value={t.fontHeading} onChange={v => updateTheme({ fontHeading: v })} options={fontHeadingOptions} />
          <SelectField label="Fonte do Corpo" value={t.fontBody} onChange={v => updateTheme({ fontBody: v })} options={fontBodyOptions} />
        </div>
      </div>

      <div>
        <h3 className="font-mono font-extrabold text-sm uppercase tracking-widest mb-3" style={{ color: '#E4ED73' }}>📐 Layout & Animações</h3>
        <div className="grid grid-cols-1 gap-3">
          <SelectField label="Arredondamento dos Cantos" value={t.borderRadius} onChange={v => updateTheme({ borderRadius: v })} options={radiusOptions} />
          <SelectField label="Velocidade das Animações" value={t.animationSpeed} onChange={v => updateTheme({ animationSpeed: v as 'fast' | 'normal' | 'slow' })} options={speedOptions} />
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-[#E4ED73]/30" style={{ background: 'rgba(228,237,115,0.05)' }}>
        <p className="text-[10px] font-mono" style={{ color: '#E4ED73' }}>
          💡 <strong>Dica:</strong> As mudanças de tema são aplicadas automaticamente ao site. Você pode experimentar diferentes combinações de cores sem perder as configurações padrão!
        </p>
      </div>
    </div>
  );
}

function BrandTab() {
  const { customization, updateBrand } = useSiteCustomization();
  const b = customization.brand;

  return (
    <div className="space-y-4">
      <h3 className="font-mono font-extrabold text-sm uppercase tracking-widest mb-3" style={{ color: '#E4ED73' }}>🏷️ Identidade da Marca</h3>
      <Field label="Nome do Atelier">
        <TextInput value={b.name} onChange={v => updateBrand({ name: v })} placeholder="Atelier de Artes" />
      </Field>
      <Field label="Nome do Artista">
        <TextInput value={b.artistName} onChange={v => updateBrand({ artistName: v })} placeholder="Kiri" />
      </Field>
      <Field label="Papel / Cargo">
        <TextInput value={b.role} onChange={v => updateBrand({ role: v })} placeholder="Ilustrador & Criador" />
      </Field>
      <Field label="Tagline / Slogan">
        <TextInput value={b.tagline} onChange={v => updateBrand({ tagline: v })} placeholder="Desenhos, Galeria em Bolhas..." />
      </Field>
      <Field label="E-mail de Contato">
        <TextInput value={b.email} onChange={v => updateBrand({ email: v })} placeholder="contato@atelier.com" />
      </Field>
    </div>
  );
}

function HeroTab() {
  const { customization, updateHero } = useSiteCustomization();
  const h = customization.hero;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    try {
      const { dataUrl } = await compressImage(file, 1200, 1200, 0.8);
      updateHero({ heroImageUrl: dataUrl });
    } catch {
      alert('Erro ao processar imagem.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-mono font-extrabold text-sm uppercase tracking-widest mb-3" style={{ color: '#E4ED73' }}>🖼️ Banner Principal (Hero)</h3>

      <Field label="Badge / Etiqueta">
        <TextInput value={h.badge} onChange={v => updateHero({ badge: v })} />
      </Field>
      <Field label="Título Principal">
        <TextInput value={h.title} onChange={v => updateHero({ title: v })} />
      </Field>
      <Field label="Subtítulo / Descrição">
        <TextArea value={h.subtitle} onChange={v => updateHero({ subtitle: v })} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Botão Principal">
          <TextInput value={h.btnExplore} onChange={v => updateHero({ btnExplore: v })} />
        </Field>
        <Field label="Botão Secundário">
          <TextInput value={h.btnAddArt} onChange={v => updateHero({ btnAddArt: v })} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Título do Frame de Arte">
          <TextInput value={h.placeholderTitle} onChange={v => updateHero({ placeholderTitle: v })} />
        </Field>
        <Field label="Subtítulo do Frame">
          <TextInput value={h.placeholderSubtitle} onChange={v => updateHero({ placeholderSubtitle: v })} />
        </Field>
      </div>

      <div>
        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider mb-2" style={{ color: '#B64FFB' }}>
          Imagem de Destaque no Hero
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-[#B64FFB]/40 cursor-pointer hover:border-[#B64FFB] transition-colors"
          style={{ background: 'rgba(182,79,251,0.05)' }}
        >
          {h.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={h.heroImageUrl} alt="Hero" className="w-16 h-16 rounded-xl object-cover border-2 border-[#B64FFB]/40" />
          ) : (
            <div className="w-16 h-16 rounded-xl border-2 border-[#B64FFB]/30 flex items-center justify-center text-2xl">🖼️</div>
          )}
          <div>
            <p className="text-xs font-bold" style={{ color: '#F4FFE9' }}>Clique para enviar imagem</p>
            <p className="text-[10px]" style={{ color: '#B64FFB' }}>PNG, JPG, WEBP, GIF, SVG, AVIF</p>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }}
        />
        {h.heroImageUrl && (
          <button onClick={() => updateHero({ heroImageUrl: '' })} className="mt-2 text-[10px] font-mono text-red-400 hover:text-red-300">
            ✕ Remover imagem
          </button>
        )}
      </div>

      <div className="space-y-2 pt-2">
        <h4 className="font-mono font-bold text-[11px] uppercase tracking-wider" style={{ color: '#E4ED73' }}>Elementos Visuais</h4>
        <Toggle checked={h.showBubbles} onChange={v => updateHero({ showBubbles: v })} label="Mostrar bolhas interativas no hero" />
        <Toggle checked={h.showSparkles} onChange={v => updateHero({ showSparkles: v })} label="Mostrar emojis e sparkles flutuantes" />
      </div>
    </div>
  );
}

function NavbarTab() {
  const { customization, updateNavbar } = useSiteCustomization();
  const n = customization.navbar;

  const updateLink = (index: number, patch: Partial<{ label: string; visible: boolean }>) => {
    const links = [...n.links];
    links[index] = { ...links[index], ...patch };
    updateNavbar({ links });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-mono font-extrabold text-sm uppercase tracking-widest mb-3" style={{ color: '#E4ED73' }}>🧭 Barra de Navegação</h3>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Emoji do Logo">
          <TextInput value={n.logoEmoji} onChange={v => updateNavbar({ logoEmoji: v })} placeholder="🎨" />
        </Field>
        <Field label="Texto do Logo">
          <TextInput value={n.logoText} onChange={v => updateNavbar({ logoText: v })} placeholder="Atelier" />
        </Field>
      </div>
      <div className="space-y-2 pt-1">
        <Toggle checked={n.showInstagramLink} onChange={v => updateNavbar({ showInstagramLink: v })} label="Mostrar link do Instagram na navbar" />
        <Toggle checked={n.showCommissionsBtn} onChange={v => updateNavbar({ showCommissionsBtn: v })} label="Mostrar botão de Encomendas na navbar" />
      </div>

      <div>
        <h4 className="font-mono font-bold text-[11px] uppercase tracking-wider mb-2" style={{ color: '#E4ED73' }}>Links de Navegação</h4>
        <div className="space-y-2">
          {n.links.map((link, i) => (
            <div key={link.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-[#B64FFB]/20" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <Toggle checked={link.visible} onChange={v => updateLink(i, { visible: v })} label="" />
              <input
                type="text"
                value={link.label}
                onChange={e => updateLink(i, { label: e.target.value })}
                className="flex-1 px-2 py-1 rounded-lg text-xs font-mono border border-[#B64FFB]/20 focus:border-[#B64FFB] focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#F4FFE9' }}
              />
              <span className="text-[9px] font-mono opacity-50" style={{ color: '#F4FFE9' }}>{link.href}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialsTab() {
  const { customization, updateSocials } = useSiteCustomization();
  const s = customization.socials;

  const socialIcons: Record<string, string> = {
    instagram: '📷',
    github: '💻',
    artstation: '🎭',
    behance: '🅱️',
    youtube: '📺',
    tiktok: '🎵',
  };

  const socialNames: Record<string, string> = {
    instagram: 'Instagram',
    github: 'GitHub',
    artstation: 'ArtStation',
    behance: 'Behance',
    youtube: 'YouTube',
    tiktok: 'TikTok',
  };

  return (
    <div className="space-y-4">
      <h3 className="font-mono font-extrabold text-sm uppercase tracking-widest mb-3" style={{ color: '#E4ED73' }}>🌐 Redes Sociais</h3>
      {(Object.keys(s) as Array<keyof typeof s>).map(key => (
        <div key={key} className="p-4 rounded-2xl border border-[#B64FFB]/20 space-y-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold flex items-center gap-2" style={{ color: '#F4FFE9' }}>
              {socialIcons[key]} {socialNames[key]}
            </span>
            <Toggle
              checked={s[key].visible}
              onChange={v => updateSocials({ [key]: { ...s[key], visible: v } } as any)}
              label=""
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Field label="URL">
              <TextInput value={s[key].url} onChange={v => updateSocials({ [key]: { ...s[key], url: v } } as any)} placeholder="https://" />
            </Field>
            <Field label="@Handle">
              <TextInput value={s[key].handle} onChange={v => updateSocials({ [key]: { ...s[key], handle: v } } as any)} placeholder="@usuario" />
            </Field>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionsTab() {
  const { customization, updateSections } = useSiteCustomization();
  const s = customization.sections;
  const [activeSection, setActiveSection] = useState<string>('gallery');

  const sectionMenu = [
    { id: 'gallery', label: '🖼️ Galeria', icon: '🖼️' },
    { id: 'bubbleGallery', label: '🫧 Bolhas', icon: '🫧' },
    { id: 'categorias', label: '🏷️ Categorias', icon: '🏷️' },
    { id: 'process', label: '⚙️ Processo', icon: '⚙️' },
    { id: 'blog', label: '📰 Blog', icon: '📰' },
    { id: 'about', label: '👤 Sobre', icon: '👤' },
    { id: 'commissions', label: '✨ Encomendas', icon: '✨' },
    { id: 'footer', label: '🦶 Rodapé', icon: '🦶' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-mono font-extrabold text-sm uppercase tracking-widest mb-3" style={{ color: '#E4ED73' }}>📝 Textos das Seções</h3>

      {/* Mini section picker */}
      <div className="flex flex-wrap gap-2">
        {sectionMenu.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold border transition-all ${activeSection === sec.id ? 'bg-[#B64FFB] border-[#B64FFB] text-white' : 'border-[#B64FFB]/30 text-[#F4FFE9] hover:border-[#B64FFB]'}`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Section-specific fields */}
      <div className="p-4 rounded-2xl border border-[#B64FFB]/20 space-y-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
        {activeSection === 'gallery' && (
          <>
            <Field label="Badge / Etiqueta"><TextInput value={s.gallery.sectionBadge} onChange={v => updateSections({ gallery: { ...s.gallery, sectionBadge: v } })} /></Field>
            <Field label="Título da Seção"><TextInput value={s.gallery.sectionTitle} onChange={v => updateSections({ gallery: { ...s.gallery, sectionTitle: v } })} /></Field>
            <Field label="Descrição"><TextArea value={s.gallery.description} onChange={v => updateSections({ gallery: { ...s.gallery, description: v } })} /></Field>
          </>
        )}
        {activeSection === 'bubbleGallery' && (
          <>
            <Field label="Badge / Etiqueta"><TextInput value={s.bubbleGallery.sectionBadge} onChange={v => updateSections({ bubbleGallery: { ...s.bubbleGallery, sectionBadge: v } })} /></Field>
            <Field label="Título da Seção"><TextInput value={s.bubbleGallery.sectionTitle} onChange={v => updateSections({ bubbleGallery: { ...s.bubbleGallery, sectionTitle: v } })} /></Field>
            <Field label="Descrição"><TextArea value={s.bubbleGallery.description} onChange={v => updateSections({ bubbleGallery: { ...s.bubbleGallery, description: v } })} /></Field>
          </>
        )}
        {activeSection === 'categorias' && (
          <>
            <Field label="Título da Seção"><TextInput value={s.categorias.title} onChange={v => updateSections({ categorias: { ...s.categorias, title: v } })} /></Field>
            <Field label="Descrição"><TextArea value={s.categorias.description} onChange={v => updateSections({ categorias: { ...s.categorias, description: v } })} /></Field>
          </>
        )}
        {activeSection === 'process' && (
          <>
            <Field label="Badge / Etiqueta"><TextInput value={s.process.sectionBadge} onChange={v => updateSections({ process: { ...s.process, sectionBadge: v } })} /></Field>
            <Field label="Título da Seção"><TextInput value={s.process.sectionTitle} onChange={v => updateSections({ process: { ...s.process, sectionTitle: v } })} /></Field>
            <Field label="Descrição"><TextArea value={s.process.description} onChange={v => updateSections({ process: { ...s.process, description: v } })} /></Field>
            <Field label="Badge: Antes"><TextInput value={s.process.badgeBefore} onChange={v => updateSections({ process: { ...s.process, badgeBefore: v } })} /></Field>
            <Field label="Badge: Depois"><TextInput value={s.process.badgeAfter} onChange={v => updateSections({ process: { ...s.process, badgeAfter: v } })} /></Field>
          </>
        )}
        {activeSection === 'blog' && (
          <>
            <Field label="Badge / Etiqueta"><TextInput value={s.blog.sectionBadge} onChange={v => updateSections({ blog: { ...s.blog, sectionBadge: v } })} /></Field>
            <Field label="Título da Seção"><TextInput value={s.blog.sectionTitle} onChange={v => updateSections({ blog: { ...s.blog, sectionTitle: v } })} /></Field>
            <Field label="Descrição"><TextArea value={s.blog.description} onChange={v => updateSections({ blog: { ...s.blog, description: v } })} /></Field>
          </>
        )}
        {activeSection === 'about' && (
          <>
            <Field label="Badge / Etiqueta"><TextInput value={s.about.sectionBadge} onChange={v => updateSections({ about: { ...s.about, sectionBadge: v } })} /></Field>
            <Field label="Título Principal"><TextInput value={s.about.title} onChange={v => updateSections({ about: { ...s.about, title: v } })} /></Field>
            <Field label="Parágrafo 1"><TextArea value={s.about.bioParagraph1} onChange={v => updateSections({ about: { ...s.about, bioParagraph1: v } })} /></Field>
            <Field label="Parágrafo 2"><TextArea value={s.about.bioParagraph2} onChange={v => updateSections({ about: { ...s.about, bioParagraph2: v } })} /></Field>
          </>
        )}
        {activeSection === 'commissions' && (
          <>
            <Field label="Badge / Etiqueta"><TextInput value={s.commissions.sectionBadge} onChange={v => updateSections({ commissions: { ...s.commissions, sectionBadge: v } })} /></Field>
            <Field label="Título da Seção"><TextInput value={s.commissions.sectionTitle} onChange={v => updateSections({ commissions: { ...s.commissions, sectionTitle: v } })} /></Field>
            <Field label="Descrição"><TextArea value={s.commissions.description} onChange={v => updateSections({ commissions: { ...s.commissions, description: v } })} /></Field>
          </>
        )}
        {activeSection === 'footer' && (
          <>
            <Field label="Título do Rodapé"><TextInput value={s.footer.locationTitle} onChange={v => updateSections({ footer: { ...s.footer, locationTitle: v } })} /></Field>
            <Field label="Descrição do Rodapé"><TextArea value={s.footer.locationDesc} onChange={v => updateSections({ footer: { ...s.footer, locationDesc: v } })} /></Field>
            <Field label="Descrição Longa"><TextArea value={s.footer.description} onChange={v => updateSections({ footer: { ...s.footer, description: v } })} /></Field>
            <Field label="Título da Newsletter"><TextInput value={s.footer.newsletterTitle} onChange={v => updateSections({ footer: { ...s.footer, newsletterTitle: v } })} /></Field>
            <Field label="Descrição da Newsletter"><TextArea value={s.footer.newsletterDescription} onChange={v => updateSections({ footer: { ...s.footer, newsletterDescription: v } })} /></Field>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────

interface SiteCustomizerPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteCustomizerPanel({ isOpen, onClose }: SiteCustomizerPanelProps) {
  const { customization, resetCustomization } = useSiteCustomization();
  const [activeTab, setActiveTab] = useState('theme');
  const importFileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const tabs = [
    { id: 'theme', label: '🎨 Tema', emoji: '🎨' },
    { id: 'brand', label: '🏷️ Marca', emoji: '🏷️' },
    { id: 'hero', label: '🖼️ Hero', emoji: '🖼️' },
    { id: 'navbar', label: '🧭 Navbar', emoji: '🧭' },
    { id: 'socials', label: '🌐 Redes', emoji: '🌐' },
    { id: 'sections', label: '📝 Seções', emoji: '📝' },
  ];

  const handleReset = () => {
    if (window.confirm('Resetar TODAS as customizações para os valores padrão?')) {
      resetCustomization();
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(customization, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `site-config-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        if (e.target?.result) {
          const parsed = JSON.parse(e.target.result as string);
          localStorage.setItem('kiri_site_customization', JSON.stringify(parsed));
          window.location.reload();
        }
      } catch (err) {
        alert('Arquivo JSON inválido!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-stretch justify-end" onClick={onClose}>
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Slide-in panel from right */}
      <aside
        className="relative w-full max-w-lg h-full flex flex-col shadow-[0_0_60px_rgba(182,79,251,0.3)] animate-in slide-in-from-right duration-300"
        style={{ background: 'linear-gradient(160deg, #1A0838 0%, #0D0520 100%)', borderLeft: '3px solid #B64FFB' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#B64FFB]/30">
          <div>
            <h2 className="font-mono font-extrabold text-base uppercase tracking-widest" style={{ color: '#E4ED73' }}>
              🛠️ Personalizador do Site
            </h2>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: '#B64FFB' }}>
              Todas as mudanças são salvas automaticamente
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 border-[#B64FFB]/40 hover:border-[#B64FFB] hover:bg-[#B64FFB]/20 transition-all"
            style={{ color: '#F4FFE9' }}
          >
            ✕
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 px-4 py-3 border-b border-[#B64FFB]/20 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-[#B64FFB] text-white shadow-lg'
                  : 'text-[#F4FFE9]/70 hover:text-[#F4FFE9] hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content (scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
          {activeTab === 'theme' && <ThemeTab />}
          {activeTab === 'brand' && <BrandTab />}
          {activeTab === 'hero' && <HeroTab />}
          {activeTab === 'navbar' && <NavbarTab />}
          {activeTab === 'socials' && <SocialsTab />}
          {activeTab === 'sections' && <SectionsTab />}
        </div>

        {/* Hidden Import File Input */}
        <input
          ref={importFileRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              handleImportJSON(e.target.files[0]);
            }
          }}
        />

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#B64FFB]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg border border-[#B64FFB]/40 hover:border-[#B64FFB] text-[#F4FFE9] transition-all"
              title="Baixar backup das configurações em JSON"
            >
              💾 Backup JSON
            </button>

            <button
              onClick={() => importFileRef.current?.click()}
              className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg border border-[#B64FFB]/40 hover:border-[#B64FFB] text-[#F4FFE9] transition-all"
              title="Carregar backup de arquivo JSON"
            >
              📂 Carregar JSON
            </button>

            <button
              onClick={handleReset}
              className="text-[10px] font-mono text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors ml-1"
            >
              🔄 Resetar
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #B64FFB, #5525A7)', color: '#F4FFE9', boxShadow: '0 4px 0 #230E4D' }}
          >
            Concluído ✦
          </button>
        </div>
      </aside>
    </div>
  );
}
