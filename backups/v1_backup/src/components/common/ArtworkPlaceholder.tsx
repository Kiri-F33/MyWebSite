'use client';

interface ArtworkPlaceholderProps {
  title?: string;
  category?: string;
  className?: string;
}

export default function ArtworkPlaceholder({ title = 'Novo Desenho', category = 'Ilustração', className = '' }: ArtworkPlaceholderProps) {
  return (
    <div className={`relative w-full h-full min-h-[220px] bg-gradient-to-br from-[#091540] via-[#1B2CC1]/40 to-[#3D518C]/60 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden ${className}`}>
      {/* Background Decorative Sparkles */}
      <div className="absolute top-4 left-4 text-xl opacity-40 text-[#ABD2FA]">✦</div>
      <div className="absolute bottom-4 right-4 text-xl opacity-40 text-[#7692FF]">✦</div>
      <div className="absolute top-1/2 right-6 text-sm opacity-30 text-[#ABD2FA]">✨</div>

      {/* Center Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#091540]/80 backdrop-blur-md shadow-lg border border-[#7692FF]/40 flex items-center justify-center text-2xl text-[#ABD2FA] mb-3 transform hover:scale-110 transition-transform">
        🎨
      </div>

      <span className="text-[11px] font-mono uppercase tracking-widest text-[#7692FF] font-semibold mb-1">
        {category}
      </span>
      <h4 className="text-sm font-bold text-[#ABD2FA] line-clamp-1">
        {title}
      </h4>
      <p className="text-[10px] text-slate-400 mt-1 font-mono">
        (Imagem pendente)
      </p>
    </div>
  );
}
