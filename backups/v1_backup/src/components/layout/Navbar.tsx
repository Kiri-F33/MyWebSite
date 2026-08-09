'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import ThemeToggle from '../common/ThemeToggle';

interface NavbarProps {
  onOpenAddModal?: () => void;
}

export default function Navbar({ onOpenAddModal }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="glass-pill-nav-navy py-2.5 px-4 sm:px-6 flex items-center justify-between shadow-xl">
        {/* Left Profile Avatar & Plus Action Button */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-var(--text-title) hover:bg-white/20 transition-colors font-bold font-serif"
            title={SITE_CONFIG.brand.name}
          >
            É
          </a>

          {/* Plus Add Artwork Button */}
          <button
            onClick={onOpenAddModal}
            className="w-10 h-10 rounded-xl bg-[#75C9C8] dark:bg-[#1B2CC1] hover:brightness-110 text-white flex items-center justify-center font-bold text-lg shadow-md transition-transform active:scale-95"
            title={SITE_CONFIG.hero.btnAddArt}
          >
            +
          </button>
        </div>

        {/* Center Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <a
            href="#"
            onClick={() => setActiveTab('Home')}
            className={`py-1 relative transition-colors ${
              activeTab === 'Home' ? 'text-[#75C9C8] dark:text-[#ABD2FA] font-bold border-b-2 border-current' : 'opacity-70 hover:opacity-100'
            }`}
          >
            Home
          </a>
          <a
            href="#galeria"
            onClick={() => setActiveTab('Search')}
            className={`py-1 relative transition-colors ${
              activeTab === 'Search' ? 'text-[#75C9C8] dark:text-[#ABD2FA] font-bold border-b-2 border-current' : 'opacity-70 hover:opacity-100'
            }`}
          >
            Galeria & Buscar
          </a>
          <a
            href="#blog"
            onClick={() => setActiveTab('Message')}
            className={`py-1 relative transition-colors ${
              activeTab === 'Message' ? 'text-[#75C9C8] dark:text-[#ABD2FA] font-bold border-b-2 border-current' : 'opacity-70 hover:opacity-100'
            }`}
          >
            Blog & Redes
          </a>
        </nav>

        {/* Right Buttons: Theme Switcher + Instagram + Encomendas */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Switcher */}
          <ThemeToggle />

          <a
            href={SITE_CONFIG.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-white/20 text-xs font-bold hover:bg-white/10 transition-all"
          >
            Instagram
          </a>
          <a
            href="#encomendas"
            className="px-5 py-2 rounded-full bg-[#75C9C8] dark:bg-gradient-to-r dark:from-[#1B2CC1] dark:to-[#7692FF] text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all active:scale-95"
          >
            Encomendas
          </a>
        </div>
      </div>
    </header>
  );
}
