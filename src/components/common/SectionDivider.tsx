'use client';

interface SectionDividerProps {
  label?: string;
  icon?: string;
}

export default function SectionDivider({ label, icon = '✦' }: SectionDividerProps) {
  return (
    <div className="py-8 my-4 max-w-5xl mx-auto px-4 flex items-center justify-center gap-4 relative select-none">
      {/* Left Line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#34D399]/40 to-transparent dark:via-[#7692FF]/40" />

      {/* Center Sparkle Badge */}
      <div className="px-4 py-1.5 rounded-full navy-card border border-white/20 shadow-md text-xs font-mono font-semibold flex items-center gap-2"
        style={{ background: 'var(--bg-card)', color: 'var(--text-accent)' }}
      >
        <span className="text-sm animate-pulse">{icon}</span>
        {label && <span style={{ color: 'var(--text-title)' }}>{label}</span>}
      </div>

      {/* Right Line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#34D399]/40 to-transparent dark:via-[#7692FF]/40" />
    </div>
  );
}
