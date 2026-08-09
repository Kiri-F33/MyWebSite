'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import ThemeToggle from '../common/ThemeToggle';

interface NavbarProps {
  onOpenAddModal?: () => void;
}

export default function Navbar({ onOpenAddModal }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'galeria-bolhas', label: 'Galeria', href: '#galeria-bolhas' },
    { id: 'blog', label: 'Blog & Redes', href: '#blog' },
    { id: 'sobre', label: 'Sobre', href: '#sobre' },
  ];

  return (
    <header className="sticky top-3 z-40 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Floating ThemeToggle in Top-Right Corner */}
      <ThemeToggle />

      <div className="glass-pill-nav-navy py-3 px-6 sm:px-8 flex items-center justify-between shadow-2xl border-2 border-white/30">
        {/* Left: Brand Logo & Add Button with generous spacing */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="w-10 h-10 rounded-2xl border-2 flex items-center justify-center font-bold text-base transition-transform hover:scale-105 shadow-sm"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-card)',
              color: 'var(--text-title)',
            }}
            title={SITE_CONFIG.brand.name}
          >
            🎨
          </a>

          <button
            onClick={onOpenAddModal}
            className="w-10 h-10 rounded-2xl bg-[#B64FFB] hover:brightness-110 text-white flex items-center justify-center font-bold text-lg shadow-md transition-all active:scale-95 border-2 border-white/30"
            title={SITE_CONFIG.hero.btnAddArt}
          >
            +
          </button>
        </div>

        {/* Center: Clean Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActiveTab(link.id)}
              className="py-1 relative transition-all duration-200"
              style={{
                color: activeTab === link.id ? 'var(--text-accent)' : 'var(--text-body)',
                fontWeight: activeTab === link.id ? 700 : 600,
                borderBottom: activeTab === link.id ? '2.5px solid var(--text-accent)' : '2.5px solid transparent',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Instagram + Encomendas CTA */}
        <div className="flex items-center gap-3">
          <a
            href={SITE_CONFIG.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-4 py-2 rounded-full border-2 text-xs font-bold transition-all hover:bg-white/10"
            style={{
              borderColor: 'var(--border-card)',
              color: 'var(--text-title)',
            }}
          >
            Instagram
          </a>

          <a
            href="#encomendas"
            className="px-5 py-2.5 rounded-full bg-[#FDB767] hover:brightness-110 text-[#230E4D] text-xs font-bold shadow-lg transition-all active:scale-95 border-2 border-white/30"
          >
            Encomendas
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-colors"
            style={{ borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 navy-card p-4 rounded-3xl shadow-2xl space-y-2 border-2 border-white/30">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => { setActiveTab(link.id); setMobileOpen(false); }}
              className="block py-2.5 px-4 rounded-2xl text-sm font-semibold transition-colors"
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
