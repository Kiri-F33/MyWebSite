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
import AddArtworkModal from '@/components/gallery/AddArtworkModal';
import InteractiveBubbleOverlay from '@/components/common/InteractiveBubbleOverlay';
import AnimatedSectionWrapper from '@/components/common/AnimatedSectionWrapper';
import SectionDivider from '@/components/common/SectionDivider';
import SideDotNav from '@/components/common/SideDotNav';
import AdminLoginModal from '@/components/admin/AdminLoginModal';
import AddCustomTextBlockModal from '@/components/admin/AddCustomTextBlockModal';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { ARTWORKS_DATA } from '@/data/artworks';
import { Artwork } from '@/types';

function MainSiteContent() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddTextModalOpen, setIsAddTextModalOpen] = useState(false);

  const { isAdmin, customBlocks, deleteCustomBlock } = useAdmin();

  return (
    <div className="h-screen w-screen overflow-y-auto snap-y snap-mandatory scroll-smooth theme-bg-gradient transition-colors duration-300 flex flex-col relative">
      {/* Interactive Poppable Floating Bubbles Overlay */}
      <InteractiveBubbleOverlay />

      {/* Floating Side Dot Navigation */}
      <SideDotNav />

      {/* Discrete ADM Login Trigger & Status Widget */}
      <AdminLoginModal />

      {/* Floating ADM Action Bar when logged in */}
      {isAdmin && (
        <div className="fixed top-20 right-6 z-40 flex flex-col gap-2 animate-in fade-in">
          <button
            onClick={() => setIsAddTextModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-[#B64FFB] text-white font-bold text-xs shadow-xl border-2 border-white/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>✍️</span>
            <span>+ Nova Caixa de Texto</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-[#FDB767] text-[#230E4D] font-bold text-xs shadow-xl border-2 border-white/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>🎨</span>
            <span>+ Adicionar Desenho</span>
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Main Snap Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section 01: Hero Banner (Full Screen Viewport Snap) */}
        <section id="hero" className="min-h-screen w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 pt-12 pb-6">
          <AnimatedSectionWrapper animation="zoom-in">
            <CloudHeroBanner onOpenAddModal={() => setIsAddModalOpen(true)} />
          </AnimatedSectionWrapper>
        </section>

        {/* Dynamic ADM Custom Text Blocks (If added by ADM) */}
        {customBlocks.length > 0 && (
          <section className="min-h-[50vh] w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 py-6">
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
                          ✕
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

        {/* Section 02: 3 Category Pill Cards (Transition: Fade Up) */}
        <section id="categorias" className="min-h-screen w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 py-6">
          <AnimatedSectionWrapper animation="fade-up" delayMs={50}>
            <CategoryPillCards />
          </AnimatedSectionWrapper>
          <SectionDivider icon="🌱" label="Mundo de Ilustrações" />
        </section>

        {/* Section 03: Circular Bubble Gallery (Transition: Zoom In) */}
        <section id="galeria-bolhas" className="min-h-screen w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 py-6">
          <AnimatedSectionWrapper animation="zoom-in" delayMs={50}>
            <BubbleGallery
              artworks={ARTWORKS_DATA}
              onSelectArtwork={art => setSelectedArtwork(art)}
            />
          </AnimatedSectionWrapper>
          <SectionDivider icon="🎨" label="Acervo Completo" />
        </section>

        {/* Section 04: Standard Gallery Grid Dashboard (Transition: Slide Left) */}
        <section id="acervo" className="min-h-screen w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 py-6">
          <AnimatedSectionWrapper animation="slide-left" delayMs={50}>
            <ArtworkGrid
              artworks={ARTWORKS_DATA}
              onSelectArtwork={art => setSelectedArtwork(art)}
            />
          </AnimatedSectionWrapper>
          <SectionDivider icon="✦" label="Bastidores & Processo" />
        </section>

        {/* Section 05: Process Comparison Slider (Transition: Slide Right) */}
        <section id="processo" className="min-h-screen w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 py-6">
          <AnimatedSectionWrapper animation="slide-right" delayMs={50}>
            <ProcessSlider />
          </AnimatedSectionWrapper>
          <SectionDivider icon="✍️" label="Diário de Ateliê" />
        </section>

        {/* Section 06: Blog & Articles Section (Transition: Fade Up) */}
        <section id="blog" className="min-h-screen w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 py-6">
          <AnimatedSectionWrapper animation="fade-up" delayMs={50}>
            <BlogSection />
          </AnimatedSectionWrapper>
          <SectionDivider icon="✨" label="Sobre o Atelier" />
        </section>

        {/* Section 07: About Section (Transition: Slide Left) */}
        <section id="sobre" className="min-h-screen w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 py-6">
          <AnimatedSectionWrapper animation="slide-left" delayMs={50}>
            <AboutSection />
          </AnimatedSectionWrapper>
          <SectionDivider icon="💌" label="Encomendas Personalizadas" />
        </section>

        {/* Section 08: Commission Form Section (Transition: Zoom In) */}
        <section id="encomendas" className="min-h-screen w-full snap-start snap-always flex flex-col justify-center px-4 sm:px-6 py-6">
          <AnimatedSectionWrapper animation="zoom-in" delayMs={50}>
            <CommissionSection />
          </AnimatedSectionWrapper>
        </section>
      </main>

      {/* Artwork Lightbox Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />

      {/* Quick Add Artwork Modal */}
      <AddArtworkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddArtwork={newArt => {
          ARTWORKS_DATA.unshift(newArt);
        }}
      />

      {/* ADM Add Custom Text Block Modal */}
      <AddCustomTextBlockModal
        isOpen={isAddTextModalOpen}
        onClose={() => setIsAddTextModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <AdminProvider>
      <MainSiteContent />
    </AdminProvider>
  );
}
