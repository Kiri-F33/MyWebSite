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
    { id: 'Home', label: 'Home', href: '#' },
    { id: 'Gallery', label: 'Galeria', href: '#galeria-bolhas' },
    { id: 'Blog', label: 'Blog & Redes', href: '#blog' },
    { id: 'About', label: 'Sobre', href: '#sobre' },
  ];

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="glass-pill-nav-navy py-2.5 px-4 sm:px-6 flex items-center justify-between shadow-xl">
        {/* Left: Brand Logo & Add Button */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm transition-colors shadow-sm"
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
            className="w-10 h-10 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white flex items-center justify-center font-bold text-lg shadow-md transition-all active:scale-95"
            title={SITE_CONFIG.hero.btnAddArt}
          >
            +
          </button>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setActiveTab(link.id)}
              className="py-1 relative transition-colors"
              style={{
                color: activeTab === link.id ? 'var(--text-accent)' : 'var(--text-body)',
                fontWeight: activeTab === link.id ? 700 : 600,
                borderBottom: activeTab === link.id ? '2px solid var(--text-accent)' : '2px solid transparent',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Theme Toggle + Social + CTA */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <a
            href={SITE_CONFIG.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-4 py-2 rounded-full border text-xs font-bold transition-all"
            style={{
              borderColor: 'var(--border-card)',
              color: 'var(--text-title)',
            }}
          >
            Instagram
          </a>

          <a
            href="#encomendas"
            className="px-5 py-2 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold shadow-lg transition-all active:scale-95"
          >
            Encomendas
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border transition-colors"
            style={{ borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 navy-card p-4 rounded-2xl shadow-xl space-y-2">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => { setActiveTab(link.id); setMobileOpen(false); }}
              className="block py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors"
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
