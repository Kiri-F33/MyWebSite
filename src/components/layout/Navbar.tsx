'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { useSiteCustomization } from '@/context/SiteCustomizationContext';
import ThemeToggle from '../common/ThemeToggle';

interface NavbarProps {
  onOpenAddModal?: () => void;
}

export default function Navbar({ onOpenAddModal }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { customization } = useSiteCustomization();
  const nav = customization.navbar;

  const navLinks = nav.links.filter(l => l.visible);

  return (
    <header className="sticky top-3 z-40 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Floating ThemeToggle in Top-Right Corner */}
      <ThemeToggle />


      <div className="glass-pill-nav-navy py-3.5 px-6 sm:px-10 flex items-center justify-between shadow-[0_8px_0px_rgba(35,14,77,0.15)] border-3 border-[#230E4D] dark:border-[#B64FFB]">
        {/* Left Zone: Brand Logo */}
        <div className="flex items-center gap-3 pr-4">
          <a
            href="#hero"
            className="w-10 h-10 rounded-2xl border-2 border-[#230E4D] flex items-center justify-center font-bold text-base transition-transform hover:scale-110 hover:rotate-3 shadow-md bg-[#F4FFE9]"
            title={nav.logoText || SITE_CONFIG.brand.name}
          >
            {nav.logoEmoji || '🎨'}
          </a>
        </div>

        {/* Center Zone: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-xs font-extrabold uppercase tracking-wider flex-1 px-6 border-x"
          style={{ borderColor: 'var(--border-card)' }}
        >
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActiveTab(link.id)}
              className="py-1 relative transition-all duration-200 hover:scale-105"
              style={{
                color: activeTab === link.id ? 'var(--text-accent)' : 'var(--text-body)',
                fontWeight: activeTab === link.id ? 800 : 700,
                borderBottom: activeTab === link.id ? '3px solid var(--text-accent)' : '3px solid transparent',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Zone: Action Buttons (+ Adicionar, Instagram, Encomendas) */}
        <div className="flex items-center gap-3 pl-4">
          <button
            onClick={onOpenAddModal}
            className="cartoon-btn-magenta hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase"
            title={SITE_CONFIG.hero.btnAddArt}
          >
            <span>+</span>
            <span>Arte</span>
          </button>

          {nav.showInstagramLink && (
            <a
              href={SITE_CONFIG.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex px-4 py-2 rounded-full border-2 border-[#230E4D] dark:border-white/40 text-xs font-extrabold transition-all hover:scale-105"
              style={{
                color: 'var(--text-title)',
              }}
            >
              📷 Instagram
            </a>
          )}

          {nav.showCommissionsBtn && (
            <a
              href="#encomendas"
              className="cartoon-btn-clay px-5 py-2 text-xs uppercase"
            >
              Encomendas ✨
            </a>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-2xl flex items-center justify-center border-2 border-[#230E4D] font-bold text-sm"
            style={{ color: 'var(--text-title)' }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 navy-card p-4 rounded-3xl shadow-2xl space-y-2 border-3 border-[#230E4D]">
          <button
            onClick={() => { onOpenAddModal?.(); setMobileOpen(false); }}
            className="cartoon-btn-magenta w-full py-2.5 px-4 text-xs uppercase flex items-center justify-center gap-2 mb-2"
          >
            <span>+</span>
            <span>Adicionar Arte</span>
          </button>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => { setActiveTab(link.id); setMobileOpen(false); }}
              className="block py-2.5 px-4 rounded-2xl text-xs font-bold uppercase transition-colors"
              style={{
                background: activeTab === link.id ? 'var(--text-accent)' : 'transparent',
                color: activeTab === link.id ? '#FFFFFF' : 'var(--text-title)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

