'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  customBlocks: CustomTextBlock[];
  addCustomBlock: (block: Omit<CustomTextBlock, 'id' | 'createdAt'>) => void;
  deleteCustomBlock: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [customBlocks, setCustomBlocks] = useState<CustomTextBlock[]>([]);

  useEffect(() => {
    // Check saved ADM session
    const savedAdmin = localStorage.getItem('kiri_adm_session');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }

    // Load custom text blocks
    const savedBlocks = localStorage.getItem('kiri_custom_blocks');
    if (savedBlocks) {
      try {
        setCustomBlocks(JSON.parse(savedBlocks));
      } catch (err) {
        console.error('Error parsing custom blocks:', err);
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

  const addCustomBlock = (blockData: Omit<CustomTextBlock, 'id' | 'createdAt'>) => {
    const newBlock: CustomTextBlock = {
      ...blockData,
      id: `block-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    const updated = [newBlock, ...customBlocks];
    setCustomBlocks(updated);
    localStorage.setItem('kiri_custom_blocks', JSON.stringify(updated));
  };

  const deleteCustomBlock = (id: string) => {
    const updated = customBlocks.filter(b => b.id !== id);
    setCustomBlocks(updated);
    localStorage.setItem('kiri_custom_blocks', JSON.stringify(updated));
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, customBlocks, addCustomBlock, deleteCustomBlock }}>
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
