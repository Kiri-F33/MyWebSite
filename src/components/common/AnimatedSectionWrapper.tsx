'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionWrapperProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'zoom-in' | 'slide-left' | 'slide-right' | 'flip-up';
  delayMs?: number;
  className?: string;
  id?: string;
}

export default function AnimatedSectionWrapper({
  children,
  animation = 'fade-up',
  delayMs = 0,
  className = '',
  id,
}: AnimatedSectionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bi-directional observer with threshold for smooth enter & exit transitions
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getAnimationClasses = () => {
    if (!isVisible) {
      switch (animation) {
        case 'zoom-in':
          return 'opacity-0 scale-85 translate-y-16 blur-md';
        case 'slide-left':
          return 'opacity-0 -translate-x-24 translate-y-8 blur-md';
        case 'slide-right':
          return 'opacity-0 translate-x-24 translate-y-8 blur-md';
        case 'flip-up':
          return 'opacity-0 translate-y-20 scale-90 blur-lg';
        case 'fade-up':
        default:
          return 'opacity-0 translate-y-20 scale-95 blur-md';
      }
    }

    return 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-none';
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform section-transition ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
