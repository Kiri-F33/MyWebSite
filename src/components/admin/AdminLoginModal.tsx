'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLoginModal() {
  const { isAdmin, login, logout } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('adm');
  const [password, setPassword] = useState('123');
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      setIsOpen(false);
    } else {
      setError('Usuário ou senha incorretos! (Dica: adm / 123)');
    }
  };

  return (
    <>
      {/* Discrete Floating ADM Button in Bottom-Left Corner */}
      <div className="fixed bottom-4 left-4 z-50 select-none">
        {isAdmin ? (
          <div className="flex items-center gap-2 bg-[#B64FFB] text-white px-3 py-1.5 rounded-full text-xs font-mono font-bold shadow-xl border border-white/30 animate-in fade-in">
            <span>⚡ Modo ADM Ativo</span>
            <button
              onClick={logout}
              className="ml-1 text-[10px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full"
              title="Sair do Modo ADM"
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-md text-white/70 hover:text-white hover:bg-slate-900 border border-white/20 flex items-center justify-center text-xs shadow-md transition-all hover:scale-110 active:scale-95"
            title="Acesso ADM (Discreto)"
          >
            🔒
          </button>
        )}
      </div>

      {/* Discrete Login Modal */}
      {isOpen && !isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div onClick={() => setIsOpen(false)} className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs cursor-pointer" />

          <div className="relative z-10 w-full max-w-sm rounded-3xl p-6 shadow-2xl border text-left"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔐</span>
                <h3 className="font-serif text-lg font-bold" style={{ color: 'var(--text-title)' }}>
                  Acesso Administrador
                </h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-xs opacity-70 hover:opacity-100">✕</button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] font-mono">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Usuário</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="ex: adm"
                  className="w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
                />
              </div>

              <div>
                <label className="block font-mono mb-1" style={{ color: 'var(--text-title)' }}>Senha</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="ex: 123"
                  className="w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border-card)', color: 'var(--text-title)' }}
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-1/2 py-2 rounded-xl border font-bold text-xs"
                  style={{ borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl bg-[#B64FFB] text-white font-bold text-xs shadow-md hover:brightness-110"
                >
                  Entrar
                </button>
              </div>

              <p className="text-[10px] text-center font-mono opacity-60 pt-1" style={{ color: 'var(--text-muted)' }}>
                Credenciais padrão: <strong>adm</strong> / <strong>123</strong>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
