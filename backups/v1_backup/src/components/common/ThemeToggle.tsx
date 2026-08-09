'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const applyTheme = (targetTheme: 'dark' | 'light') => {
      setTheme(targetTheme);
      document.documentElement.setAttribute('data-theme', targetTheme);
    };

    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem('dudu_theme') as 'dark' | 'light' | null;

    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Use OS System Preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // Listen to OS system preference changes dynamically
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('dudu_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('dudu_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-var(--text-title) border border-white/20 flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm"
      title={`Tema atual: ${theme === 'dark' ? 'Escuro' : 'Claro'} (Clique para alternar ou siga o sistema)`}
      aria-label="Alternar Tema"
    >
      {theme === 'dark' ? (
        // Sun icon for Light mode switch
        <svg className="w-5 h-5 text-amber-300 fill-amber-300" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        // Moon icon for Dark mode switch
        <svg className="w-5 h-5 text-indigo-600 fill-indigo-600" viewBox="0 0 24 24">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
