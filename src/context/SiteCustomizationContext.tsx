'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';

// ─── Theme Tokens ─────────────────────────────────────────────────────────────
export interface ThemeTokens {
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  colorBgDark: string;
  colorBgCard: string;
  colorText: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: string;
  animationSpeed: 'fast' | 'normal' | 'slow';
}

// ─── Hero Settings ────────────────────────────────────────────────────────────
export interface HeroSettings {
  badge: string;
  title: string;
  subtitle: string;
  btnExplore: string;
  btnAddArt: string;
  placeholderTitle: string;
  placeholderSubtitle: string;
  showBubbles: boolean;
  showSparkles: boolean;
  heroImageUrl: string;
}

// ─── Navbar Settings ──────────────────────────────────────────────────────────
export interface NavbarSettings {
  logoEmoji: string;
  logoText: string;
  showInstagramLink: boolean;
  showCommissionsBtn: boolean;
  links: Array<{ id: string; label: string; href: string; visible: boolean }>;
}

// ─── Social Links ─────────────────────────────────────────────────────────────
export interface SocialLinks {
  instagram: { url: string; handle: string; visible: boolean };
  github: { url: string; handle: string; visible: boolean };
  artstation: { url: string; handle: string; visible: boolean };
  behance: { url: string; handle: string; visible: boolean };
  youtube: { url: string; handle: string; visible: boolean };
  tiktok: { url: string; handle: string; visible: boolean };
}

// ─── Section Texts ────────────────────────────────────────────────────────────
export interface SectionTexts {
  categorias: { title: string; description: string };
  gallery: { sectionBadge: string; sectionTitle: string; description: string };
  bubbleGallery: { sectionBadge: string; sectionTitle: string; description: string };
  process: { sectionBadge: string; sectionTitle: string; description: string; badgeBefore: string; badgeAfter: string };
  blog: { sectionBadge: string; sectionTitle: string; description: string };
  about: { sectionBadge: string; title: string; bioParagraph1: string; bioParagraph2: string };
  commissions: { sectionBadge: string; sectionTitle: string; description: string };
  footer: { locationTitle: string; locationDesc: string; description: string; newsletterTitle: string; newsletterDescription: string };
}

// ─── Brand Settings ───────────────────────────────────────────────────────────
export interface BrandSettings {
  name: string;
  artistName: string;
  role: string;
  tagline: string;
  email: string;
}

// ─── Full Customization Config ─────────────────────────────────────────────────
export interface SiteCustomization {
  theme: ThemeTokens;
  hero: HeroSettings;
  navbar: NavbarSettings;
  socials: SocialLinks;
  sections: SectionTexts;
  brand: BrandSettings;
}

export const DEFAULT_CUSTOMIZATION: SiteCustomization = {
  theme: {
    colorPrimary: '#B64FFB',
    colorSecondary: '#FDB767',
    colorAccent: '#E4ED73',
    colorBgDark: '#230E4D',
    colorBgCard: '#1E0A40',
    colorText: '#F4FFE9',
    fontHeading: 'Playfair Display',
    fontBody: 'Inter',
    borderRadius: '1.5rem',
    animationSpeed: 'normal',
  },
  hero: {
    badge: SITE_CONFIG.hero.badge,
    title: SITE_CONFIG.hero.title,
    subtitle: SITE_CONFIG.hero.subtitle,
    btnExplore: SITE_CONFIG.hero.btnExplore,
    btnAddArt: SITE_CONFIG.hero.btnAddArt,
    placeholderTitle: SITE_CONFIG.hero.placeholderTitle,
    placeholderSubtitle: SITE_CONFIG.hero.placeholderSubtitle,
    showBubbles: true,
    showSparkles: true,
    heroImageUrl: '',
  },
  navbar: {
    logoEmoji: '🎨',
    logoText: SITE_CONFIG.brand.name,
    showInstagramLink: true,
    showCommissionsBtn: true,
    links: [
      { id: 'hero', label: 'Home', href: '#hero', visible: true },
      { id: 'galeria-bolhas', label: 'Galeria', href: '#galeria-bolhas', visible: true },
      { id: 'blog', label: 'Blog', href: '#blog', visible: true },
      { id: 'sobre', label: 'Sobre', href: '#sobre', visible: true },
      { id: 'encomendas', label: 'Encomendas', href: '#encomendas', visible: true },
    ],
  },
  socials: {
    instagram: { url: SITE_CONFIG.socials.instagram.url, handle: SITE_CONFIG.socials.instagram.handle, visible: true },
    github: { url: SITE_CONFIG.socials.github.url, handle: SITE_CONFIG.socials.github.handle, visible: true },
    artstation: { url: SITE_CONFIG.socials.artstation.url, handle: SITE_CONFIG.socials.artstation.handle, visible: false },
    behance: { url: SITE_CONFIG.socials.behance.url, handle: SITE_CONFIG.socials.behance.handle, visible: false },
    youtube: { url: SITE_CONFIG.socials.youtube.url, handle: SITE_CONFIG.socials.youtube.handle, visible: false },
    tiktok: { url: SITE_CONFIG.socials.tiktok.url, handle: SITE_CONFIG.socials.tiktok.handle, visible: false },
  },
  sections: {
    categorias: { title: SITE_CONFIG.categoriesSection.title, description: SITE_CONFIG.categoriesSection.description },
    gallery: { sectionBadge: SITE_CONFIG.gallery.sectionBadge, sectionTitle: SITE_CONFIG.gallery.sectionTitle, description: SITE_CONFIG.gallery.description },
    bubbleGallery: { sectionBadge: SITE_CONFIG.bubbleGallery.sectionBadge, sectionTitle: SITE_CONFIG.bubbleGallery.sectionTitle, description: SITE_CONFIG.bubbleGallery.description },
    process: { sectionBadge: SITE_CONFIG.process.sectionBadge, sectionTitle: SITE_CONFIG.process.sectionTitle, description: SITE_CONFIG.process.description, badgeBefore: SITE_CONFIG.process.badgeBefore, badgeAfter: SITE_CONFIG.process.badgeAfter },
    blog: { sectionBadge: SITE_CONFIG.blog.sectionBadge, sectionTitle: SITE_CONFIG.blog.sectionTitle, description: SITE_CONFIG.blog.description },
    about: { sectionBadge: SITE_CONFIG.about.sectionBadge, title: SITE_CONFIG.about.title, bioParagraph1: SITE_CONFIG.about.bioParagraph1, bioParagraph2: SITE_CONFIG.about.bioParagraph2 },
    commissions: { sectionBadge: SITE_CONFIG.commissions.sectionBadge, sectionTitle: SITE_CONFIG.commissions.sectionTitle, description: SITE_CONFIG.commissions.description },
    footer: { locationTitle: SITE_CONFIG.footer.locationTitle, locationDesc: SITE_CONFIG.footer.locationDesc, description: SITE_CONFIG.footer.description, newsletterTitle: SITE_CONFIG.footer.newsletterTitle, newsletterDescription: SITE_CONFIG.footer.newsletterDescription },
  },
  brand: {
    name: SITE_CONFIG.brand.name,
    artistName: SITE_CONFIG.brand.artistName,
    role: SITE_CONFIG.brand.role,
    tagline: SITE_CONFIG.brand.tagline,
    email: SITE_CONFIG.brand.email,
  },
};

// ─── Context Type ─────────────────────────────────────────────────────────────
interface SiteCustomizationContextType {
  customization: SiteCustomization;
  updateTheme: (patch: Partial<ThemeTokens>) => void;
  updateHero: (patch: Partial<HeroSettings>) => void;
  updateNavbar: (patch: Partial<NavbarSettings>) => void;
  updateSocials: (patch: Partial<SocialLinks>) => void;
  updateSections: (patch: Partial<SectionTexts>) => void;
  updateBrand: (patch: Partial<BrandSettings>) => void;
  resetCustomization: () => void;
}

const SiteCustomizationContext = createContext<SiteCustomizationContextType | undefined>(undefined);
const STORAGE_KEY = 'kiri_site_customization';

function deepMerge(defaults: SiteCustomization, saved: Partial<SiteCustomization>): SiteCustomization {
  return {
    theme: { ...defaults.theme, ...(saved.theme ?? {}) },
    hero: { ...defaults.hero, ...(saved.hero ?? {}) },
    navbar: { ...defaults.navbar, ...(saved.navbar ?? {}) },
    socials: {
      instagram: { ...defaults.socials.instagram, ...(saved.socials?.instagram ?? {}) },
      github: { ...defaults.socials.github, ...(saved.socials?.github ?? {}) },
      artstation: { ...defaults.socials.artstation, ...(saved.socials?.artstation ?? {}) },
      behance: { ...defaults.socials.behance, ...(saved.socials?.behance ?? {}) },
      youtube: { ...defaults.socials.youtube, ...(saved.socials?.youtube ?? {}) },
      tiktok: { ...defaults.socials.tiktok, ...(saved.socials?.tiktok ?? {}) },
    },
    sections: {
      categorias: { ...defaults.sections.categorias, ...(saved.sections?.categorias ?? {}) },
      gallery: { ...defaults.sections.gallery, ...(saved.sections?.gallery ?? {}) },
      bubbleGallery: { ...defaults.sections.bubbleGallery, ...(saved.sections?.bubbleGallery ?? {}) },
      process: { ...defaults.sections.process, ...(saved.sections?.process ?? {}) },
      blog: { ...defaults.sections.blog, ...(saved.sections?.blog ?? {}) },
      about: { ...defaults.sections.about, ...(saved.sections?.about ?? {}) },
      commissions: { ...defaults.sections.commissions, ...(saved.sections?.commissions ?? {}) },
      footer: { ...defaults.sections.footer, ...(saved.sections?.footer ?? {}) },
    },
    brand: { ...defaults.brand, ...(saved.brand ?? {}) },
  };
}

import { safeLocalStorageSet } from '@/utils/imageCompressor';

export function SiteCustomizationProvider({ children }: { children: ReactNode }) {
  const [customization, setCustomization] = useState<SiteCustomization>(DEFAULT_CUSTOMIZATION);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCustomization(deepMerge(DEFAULT_CUSTOMIZATION, JSON.parse(saved)));
    } catch { /* keep defaults */ }
  }, []);

  const save = (next: SiteCustomization) => {
    setCustomization(next);
    safeLocalStorageSet(STORAGE_KEY, JSON.stringify(next));
  };

  const updateTheme = useCallback((patch: Partial<ThemeTokens>) => {
    setCustomization(prev => { const n = { ...prev, theme: { ...prev.theme, ...patch } }; safeLocalStorageSet(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateHero = useCallback((patch: Partial<HeroSettings>) => {
    setCustomization(prev => { const n = { ...prev, hero: { ...prev.hero, ...patch } }; safeLocalStorageSet(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateNavbar = useCallback((patch: Partial<NavbarSettings>) => {
    setCustomization(prev => { const n = { ...prev, navbar: { ...prev.navbar, ...patch } }; safeLocalStorageSet(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const updateSocials = useCallback((patch: Partial<SocialLinks>) => {
    setCustomization(prev => {
      const n = { ...prev, socials: { ...prev.socials, ...patch } };
      safeLocalStorageSet(STORAGE_KEY, JSON.stringify(n));
      return n;
    });
  }, []);

  const updateSections = useCallback((patch: Partial<SectionTexts>) => {
    setCustomization(prev => {
      const n = { ...prev, sections: { ...prev.sections, ...patch } };
      safeLocalStorageSet(STORAGE_KEY, JSON.stringify(n));
      return n;
    });
  }, []);

  const updateBrand = useCallback((patch: Partial<BrandSettings>) => {
    setCustomization(prev => { const n = { ...prev, brand: { ...prev.brand, ...patch } }; safeLocalStorageSet(STORAGE_KEY, JSON.stringify(n)); return n; });
  }, []);

  const resetCustomization = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    save(DEFAULT_CUSTOMIZATION);
  }, []);

  return (
    <SiteCustomizationContext.Provider value={{ customization, updateTheme, updateHero, updateNavbar, updateSocials, updateSections, updateBrand, resetCustomization }}>
      {children}
    </SiteCustomizationContext.Provider>
  );
}

export function useSiteCustomization() {
  const ctx = useContext(SiteCustomizationContext);
  if (!ctx) throw new Error('useSiteCustomization must be used within SiteCustomizationProvider');
  return ctx;
}
