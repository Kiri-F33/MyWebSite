'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Artwork, BlogPost } from '@/types';
import { ARTWORKS_DATA } from '@/data/artworks';
import { BLOG_POSTS_DATA } from '@/data/blogPosts';
import { safeLocalStorageSet } from '@/utils/imageCompressor';

export interface CustomTextBlock {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

interface AdminContextType {
  isAdmin: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;

  // Artworks Management
  artworks: Artwork[];
  addArtwork: (artwork: Artwork) => void;
  deleteArtwork: (id: string) => void;

  // Blog Posts Management
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;

  // Custom Text Blocks Management
  customBlocks: CustomTextBlock[];
  addCustomBlock: (block: Omit<CustomTextBlock, 'id' | 'createdAt'>) => void;
  deleteCustomBlock: (id: string) => void;

  // Section Visibility & Order Management
  hiddenSections: Record<string, boolean>;
  sectionOrder: string[];
  toggleSectionVisibility: (sectionId: string) => void;
  moveSectionUp: (sectionId: string) => void;
  moveSectionDown: (sectionId: string) => void;
  isSectionVisible: (sectionId: string) => boolean;

  // Reset to original defaults
  resetAllDefaults: () => void;
}

const DEFAULT_SECTION_ORDER = [
  'hero',
  'categorias',
  'galeria-bolhas',
  'acervo',
  'processo',
  'blog',
  'sobre',
  'encomendas',
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>(ARTWORKS_DATA);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);
  const [customBlocks, setCustomBlocks] = useState<CustomTextBlock[]>([]);
  const [hiddenSections, setHiddenSections] = useState<Record<string, boolean>>({});
  const [sectionOrder, setSectionOrder] = useState<string[]>(DEFAULT_SECTION_ORDER);

  useEffect(() => {
    // Check saved ADM session
    const savedAdmin = localStorage.getItem('kiri_adm_session');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }

    // Load saved artworks
    const savedArtworks = localStorage.getItem('kiri_artworks');
    if (savedArtworks) {
      try {
        setArtworks(JSON.parse(savedArtworks));
      } catch (err) {
        console.error('Error loading saved artworks:', err);
      }
    }

    // Load saved blog posts
    const savedPosts = localStorage.getItem('kiri_blog_posts');
    if (savedPosts) {
      try {
        setBlogPosts(JSON.parse(savedPosts));
      } catch (err) {
        console.error('Error loading saved blog posts:', err);
      }
    }

    // Load custom text blocks
    const savedBlocks = localStorage.getItem('kiri_custom_blocks');
    if (savedBlocks) {
      try {
        setCustomBlocks(JSON.parse(savedBlocks));
      } catch (err) {
        console.error('Error loading custom blocks:', err);
      }
    }

    // Load hidden sections
    const savedHidden = localStorage.getItem('kiri_hidden_sections');
    if (savedHidden) {
      try {
        setHiddenSections(JSON.parse(savedHidden));
      } catch (err) {
        console.error('Error loading hidden sections:', err);
      }
    }

    // Load section order
    const savedOrder = localStorage.getItem('kiri_section_order');
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSectionOrder(parsed);
        }
      } catch (err) {
        console.error('Error loading section order:', err);
      }
    }
  }, []);

  const login = (user: string, pass: string): boolean => {
    if ((user.toLowerCase() === 'adm' || user.toLowerCase() === 'kiri') && pass === '123') {
      setIsAdmin(true);
      localStorage.setItem('kiri_adm_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('kiri_adm_session');
  };

  // ARTWORKS
  const addArtwork = (newArt: Artwork) => {
    const updated = [newArt, ...artworks];
    setArtworks(updated);
    safeLocalStorageSet('kiri_artworks', JSON.stringify(updated));
  };

  const deleteArtwork = (id: string) => {
    const updated = artworks.filter(a => a.id !== id);
    setArtworks(updated);
    safeLocalStorageSet('kiri_artworks', JSON.stringify(updated));
  };

  // BLOG POSTS
  const addBlogPost = (newPost: BlogPost) => {
    const updated = [newPost, ...blogPosts];
    setBlogPosts(updated);
    safeLocalStorageSet('kiri_blog_posts', JSON.stringify(updated));
  };

  const deleteBlogPost = (id: string) => {
    const updated = blogPosts.filter(p => p.id !== id);
    setBlogPosts(updated);
    safeLocalStorageSet('kiri_blog_posts', JSON.stringify(updated));
  };

  // CUSTOM TEXT BLOCKS
  const addCustomBlock = (blockData: Omit<CustomTextBlock, 'id' | 'createdAt'>) => {
    const newBlock: CustomTextBlock = {
      ...blockData,
      id: `block-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    const updated = [newBlock, ...customBlocks];
    setCustomBlocks(updated);
    safeLocalStorageSet('kiri_custom_blocks', JSON.stringify(updated));
  };

  const deleteCustomBlock = (id: string) => {
    const updated = customBlocks.filter(b => b.id !== id);
    setCustomBlocks(updated);
    safeLocalStorageSet('kiri_custom_blocks', JSON.stringify(updated));
  };

  // SECTION VISIBILITY & REORDERING
  const toggleSectionVisibility = (sectionId: string) => {
    const updated = {
      ...hiddenSections,
      [sectionId]: !hiddenSections[sectionId],
    };
    setHiddenSections(updated);
    safeLocalStorageSet('kiri_hidden_sections', JSON.stringify(updated));
  };

  const moveSectionUp = (sectionId: string) => {
    const index = sectionOrder.indexOf(sectionId);
    if (index <= 0) return;
    const newOrder = [...sectionOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    setSectionOrder(newOrder);
    safeLocalStorageSet('kiri_section_order', JSON.stringify(newOrder));
  };

  const moveSectionDown = (sectionId: string) => {
    const index = sectionOrder.indexOf(sectionId);
    if (index === -1 || index >= sectionOrder.length - 1) return;
    const newOrder = [...sectionOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    setSectionOrder(newOrder);
    safeLocalStorageSet('kiri_section_order', JSON.stringify(newOrder));
  };

  const isSectionVisible = (sectionId: string): boolean => {
    return !hiddenSections[sectionId];
  };

  const resetAllDefaults = () => {
    setArtworks(ARTWORKS_DATA);
    setBlogPosts(BLOG_POSTS_DATA);
    setCustomBlocks([]);
    setHiddenSections({});
    setSectionOrder(DEFAULT_SECTION_ORDER);
    localStorage.removeItem('kiri_artworks');
    localStorage.removeItem('kiri_blog_posts');
    localStorage.removeItem('kiri_custom_blocks');
    localStorage.removeItem('kiri_hidden_sections');
    localStorage.removeItem('kiri_section_order');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        artworks,
        addArtwork,
        deleteArtwork,
        blogPosts,
        addBlogPost,
        deleteBlogPost,
        customBlocks,
        addCustomBlock,
        deleteCustomBlock,
        hiddenSections,
        sectionOrder,
        toggleSectionVisibility,
        moveSectionUp,
        moveSectionDown,
        isSectionVisible,
        resetAllDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

