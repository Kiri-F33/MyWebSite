'use client';

interface SectionDividerProps {
  label?: string;
  icon?: string;
}

export default function SectionDivider({ label, icon = '✦' }: SectionDividerProps) {
  return (
    <div className="py-3 my-1 max-w-5xl mx-auto px-4 flex items-center justify-center gap-4 relative select-none">
      {/* Left Line */}
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#B64FFB]/40 to-transparent dark:via-[#E4ED73]/40" />

      {/* Center Sparkle Badge */}
      <div className="cartoon-sticker-badge bg-[#F4FFE9] text-[#230E4D] text-[11px] shadow-sm">
        <span className="text-xs">{icon}</span>
        {label && <span>{label}</span>}
      </div>

      {/* Right Line */}
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#B64FFB]/40 to-transparent dark:via-[#E4ED73]/40" />
    </div>
  );
}

