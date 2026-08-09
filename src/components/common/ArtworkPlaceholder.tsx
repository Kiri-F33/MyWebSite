'use client';

interface ArtworkPlaceholderProps {
  title?: string;
  category?: string;
  className?: string;
}

export default function ArtworkPlaceholder({ title = 'Novo Desenho', category = 'Ilustração', className = '' }: ArtworkPlaceholderProps) {
  return (
    <div className={`relative w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(128,161,212,0.2) 40%, rgba(52,211,153,0.1) 100%), var(--bg-card)',
      }}
    >
      {/* Background Decorative Floating Bubbles */}
      <div className="absolute top-4 left-5 w-6 h-6 rounded-full animate-float-slow pointer-events-none"
        style={{ background: 'var(--mint-green)', opacity: 0.15 }}
      />
      <div className="absolute bottom-6 right-5 w-10 h-10 rounded-full animate-float-fast pointer-events-none"
        style={{ background: 'var(--sky-blue)', opacity: 0.12 }}
      />
      <div className="absolute top-1/3 right-8 w-4 h-4 rounded-full animate-float-slow pointer-events-none"
        style={{ background: 'var(--coral-pink)', opacity: 0.15 }}
      />

      {/* Center Icon */}
      <div className="w-14 h-14 rounded-2xl backdrop-blur-md shadow-lg flex items-center justify-center text-2xl mb-3 border transition-transform hover:scale-110"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border-card)',
        }}
      >
        🎨
      </div>

      <span className="text-[11px] font-mono uppercase tracking-widest font-semibold mb-1"
        style={{ color: 'var(--text-accent)' }}
      >
        {category}
      </span>
      <h4 className="text-sm font-bold line-clamp-1"
        style={{ color: 'var(--text-title)' }}
      >
        {title}
      </h4>
      <p className="text-[10px] mt-1 font-mono"
        style={{ color: 'var(--text-muted)' }}
      >
        (Imagem pendente)
      </p>
    </div>
  );
}
