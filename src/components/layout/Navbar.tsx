'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import ThemeToggle from '../common/ThemeToggle';

interface NavbarProps {
  onOpenAddModal?: () => void;
}

export default function Navbar({ onOpenAddModal }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('home');
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
        {/* Left Zone: Brand Logo */}
        <div className="flex items-center gap-3 pr-4">
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
        </div>

        {/* Center Zone: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-semibold flex-1 px-6 border-x"
          style={{ borderColor: 'var(--border-card)' }}
        >
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

        {/* Right Zone: Action Buttons (+ Adicionar, Instagram, Encomendas) */}
        <div className="flex items-center gap-3 pl-4">
          <button
            onClick={onOpenAddModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#B64FFB] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all active:scale-95 border border-white/30"
            title={SITE_CONFIG.hero.btnAddArt}
          >
            <span>+</span>
            <span>Arte</span>
          </button>

          <a
            href={SITE_CONFIG.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex px-4 py-2 rounded-full border-2 text-xs font-bold transition-all hover:bg-white/10"
            style={{
              borderColor: 'var(--border-card)',
              color: 'var(--text-title)',
            }}
          >
            Instagram
          </a>

          <a
            href="#encomendas"
            className="px-5 py-2 rounded-full bg-[#FDB767] hover:brightness-110 text-[#230E4D] text-xs font-bold shadow-lg transition-all active:scale-95 border-2 border-white/30"
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
          <button
            onClick={() => { onOpenAddModal?.(); setMobileOpen(false); }}
            className="w-full py-2.5 px-4 rounded-2xl text-sm font-bold bg-[#B64FFB] text-white flex items-center justify-center gap-2 mb-2"
          >
            <span>+</span>
            <span>Adicionar Arte</span>
          </button>
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
