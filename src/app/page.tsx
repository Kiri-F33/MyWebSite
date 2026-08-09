'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import CloudHeroBanner from '@/components/hero/CloudHeroBanner';
import CategoryPillCards from '@/components/dashboard/CategoryPillCards';
import BubbleGallery from '@/components/gallery/BubbleGallery';
import ArtworkGrid from '@/components/gallery/ArtworkGrid';
import ArtworkModal from '@/components/gallery/ArtworkModal';
import ProcessSlider from '@/components/gallery/ProcessSlider';
import BlogSection from '@/components/blog/BlogSection';
import AboutSection from '@/components/sections/AboutSection';
import CommissionSection from '@/components/sections/CommissionSection';
import Footer from '@/components/layout/Footer';
import InteractiveBubbleOverlay from '@/components/common/InteractiveBubbleOverlay';
import AnimatedSectionWrapper from '@/components/common/AnimatedSectionWrapper';
import SectionDivider from '@/components/common/SectionDivider';
import SideDotNav from '@/components/common/SideDotNav';
import AdminLoginModal from '@/components/admin/AdminLoginModal';
import AdminControlPanel from '@/components/admin/AdminControlPanel';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { SiteCustomizationProvider, useSiteCustomization } from '@/context/SiteCustomizationContext';
import { Artwork } from '@/types';
import { useEffect } from 'react';

// ─── Theme Applicator — injects CSS vars from customization context ─────────────
function ThemeApplicator() {
  const { customization } = useSiteCustomization();
  const { theme } = customization;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.colorPrimary);
    root.style.setProperty('--color-secondary', theme.colorSecondary);
    root.style.setProperty('--color-accent', theme.colorAccent);
    root.style.setProperty('--color-bg-dark', theme.colorBgDark);
    root.style.setProperty('--color-bg-card', theme.colorBgCard);
    root.style.setProperty('--color-text', theme.colorText);
    root.style.setProperty('--font-heading', theme.fontHeading);
    root.style.setProperty('--font-body', theme.fontBody);
    root.style.setProperty('--border-radius', theme.borderRadius);

    // Load custom Google Fonts dynamically
    const fontIds = ['font-heading-link', 'font-body-link'];
    const fonts = [theme.fontHeading, theme.fontBody];
    fontIds.forEach((id, i) => {
      let link = document.getElementById(id) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fonts[i])}:wght@400;700;900&display=swap`;
    });
  }, [theme]);

  return null;
}

function MainSiteContent() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const { customBlocks, deleteCustomBlock, isSectionVisible, sectionOrder, isAdmin } = useAdmin();

  const renderSectionContent = (sectionId: string) => {
    if (!isSectionVisible(sectionId)) return null;

    switch (sectionId) {
      case 'hero':
        return (
          <section key="hero" id="hero" className="min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 pt-6 pb-6">
            <AnimatedSectionWrapper animation="zoom-in">
              <CloudHeroBanner />
            </AnimatedSectionWrapper>
          </section>
        );
      case 'categorias':
        return (
          <section key="categorias" id="categorias" className="w-full flex flex-col justify-center px-4 sm:px-6 py-10 lg:py-16">
            <AnimatedSectionWrapper animation="fade-up" delayMs={50}>
              <CategoryPillCards />
            </AnimatedSectionWrapper>
            <SectionDivider icon="🌱" label="Mundo de Ilustrações" />
          </section>
        );
      case 'galeria-bolhas':
        return (
          <section key="galeria-bolhas" id="galeria-bolhas" className="w-full flex flex-col justify-center px-4 sm:px-6 py-10 lg:py-16">
            <AnimatedSectionWrapper animation="zoom-in" delayMs={50}>
              <BubbleGallery onSelectArtwork={art => setSelectedArtwork(art)} />
            </AnimatedSectionWrapper>
            <SectionDivider icon="🎨" label="Acervo Completo" />
          </section>
        );
      case 'acervo':
        return (
          <section key="acervo" id="acervo" className="w-full flex flex-col justify-center px-4 sm:px-6 py-10 lg:py-16">
            <AnimatedSectionWrapper animation="slide-left" delayMs={50}>
              <ArtworkGrid onSelectArtwork={art => setSelectedArtwork(art)} />
            </AnimatedSectionWrapper>
            <SectionDivider icon="✦" label="Bastidores & Processo" />
          </section>
        );
      case 'processo':
        return (
          <section key="processo" id="processo" className="w-full flex flex-col justify-center px-4 sm:px-6 py-10 lg:py-16">
            <AnimatedSectionWrapper animation="slide-right" delayMs={50}>
              <ProcessSlider />
            </AnimatedSectionWrapper>
            <SectionDivider icon="✍️" label="Diário de Ateliê" />
          </section>
        );
      case 'blog':
        return (
          <section key="blog" id="blog" className="w-full flex flex-col justify-center px-4 sm:px-6 py-10 lg:py-16">
            <AnimatedSectionWrapper animation="fade-up" delayMs={50}>
              <BlogSection />
            </AnimatedSectionWrapper>
            <SectionDivider icon="✨" label="Sobre o Atelier" />
          </section>
        );
      case 'sobre':
        return (
          <section key="sobre" id="sobre" className="w-full flex flex-col justify-center px-4 sm:px-6 py-10 lg:py-16">
            <AnimatedSectionWrapper animation="slide-left" delayMs={50}>
              <AboutSection />
            </AnimatedSectionWrapper>
            <SectionDivider icon="💌" label="Encomendas Personalizadas" />
          </section>
        );
      case 'encomendas':
        return (
          <section key="encomendas" id="encomendas" className="w-full flex flex-col justify-center px-4 sm:px-6 py-10 lg:py-16">
            <AnimatedSectionWrapper animation="zoom-in" delayMs={50}>
              <CommissionSection />
            </AnimatedSectionWrapper>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="main-scroll-container"
      className="h-screen w-screen overflow-y-auto scroll-smooth no-scrollbar theme-bg-gradient transition-colors duration-300 flex flex-col relative"
    >
      {/* Interactive Poppable Floating Bubbles Overlay */}
      <InteractiveBubbleOverlay />

      {/* Floating Side Dot Navigation */}
      <SideDotNav />

      {/* Discrete ADM Login Trigger & Status Widget */}
      <AdminLoginModal />

      {/* Floating ADM Control Panel Bar when logged in */}
      <AdminControlPanel />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Container with Snap Sections */}
      <main className="flex-1 max-w-[1700px] mx-auto w-full relative z-10 px-2 sm:px-6 lg:px-8">
        {/* Dynamic ADM Custom Text Blocks (If added by ADM) */}
        {customBlocks.length > 0 && (
          <section className="w-full flex flex-col justify-center px-4 sm:px-6 py-8">
            <AnimatedSectionWrapper animation="fade-up">
              <div className="navy-card p-6 sm:p-8 rounded-3xl border-2 border-[#B64FFB]/40 max-w-4xl mx-auto">
                <h3 className="font-serif text-2xl font-bold mb-4 flex items-center justify-between" style={{ color: 'var(--text-title)' }}>
                  <span>📢 Avisos & Notas do Ateliê</span>
                  <span className="text-xs font-mono text-[#B64FFB]">Modo ADM</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customBlocks.map(block => (
                    <div key={block.id} className="p-4 rounded-2xl border relative bg-slate-900/10" style={{ borderColor: 'var(--border-card)' }}>
                      {isAdmin && (
                        <button
                          onClick={() => deleteCustomBlock(block.id)}
                          className="absolute top-2 right-2 text-xs opacity-60 hover:opacity-100 text-red-400 font-bold"
                          title="Excluir Bloco"
                        >
                          ✕ Excluir
                        </button>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#B64FFB]/20 text-[#B64FFB] inline-block mb-2">
                        {block.category}
                      </span>
                      <h4 className="font-serif text-base font-bold mb-1" style={{ color: 'var(--text-title)' }}>{block.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-body)' }}>{block.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSectionWrapper>
          </section>
        )}

        {/* Dynamically Render Sections in Custom ADM Order */}
        {sectionOrder.map(secId => renderSectionContent(secId))}
      </main>

      {/* Artwork Lightbox Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />

      {/* Footer */}
      {isSectionVisible('rodape') && <Footer />}
    </div>
  );
}

export default function Home() {
  return (
    <SiteCustomizationProvider>
      <AdminProvider>
        <ThemeApplicator />
        <MainSiteContent />
      </AdminProvider>
    </SiteCustomizationProvider>
  );
}
