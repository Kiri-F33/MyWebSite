'use client';

import { useState } from 'react';
import { playPopSound } from '@/utils/popSound';

interface PoppableBubbleProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  respawnTimeMs?: number;
  pitchMultiplier?: number;
  onClick?: (e: React.MouseEvent) => void;
}

export default function PoppableBubble({
  className = '',
  style = {},
  children,
  respawnTimeMs = 3000,
  pitchMultiplier = 1.0,
  onClick,
}: PoppableBubbleProps) {
  const [isPopping, setIsPopping] = useState(false);
  const [isPopped, setIsPopped] = useState(false);

  const handlePop = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPopping || isPopped) return;

    // Play Pop sound
    playPopSound(pitchMultiplier);

    // Trigger visual pop animation
    setIsPopping(true);

    if (onClick) onClick(e);

    setTimeout(() => {
      setIsPopping(false);
      setIsPopped(true);

      // Respawn bubble after timer
      if (respawnTimeMs > 0) {
        setTimeout(() => {
          setIsPopped(false);
        }, respawnTimeMs);
      }
    }, 280);
  };

  if (isPopped) {
    return null;
  }

  return (
    <div
      onClick={handlePop}
      className={`poppable-bubble ${isPopping ? 'animate-pop' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
