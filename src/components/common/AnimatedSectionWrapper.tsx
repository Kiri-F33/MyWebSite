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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
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
          return 'opacity-0 scale-90 translate-y-8';
        case 'slide-left':
          return 'opacity-0 -translate-x-16 translate-y-4';
        case 'slide-right':
          return 'opacity-0 translate-x-16 translate-y-4';
        case 'flip-up':
          return 'opacity-0 rotate-x-12 translate-y-12 scale-95';
        case 'fade-up':
        default:
          return 'opacity-0 translate-y-12';
      }
    }

    return 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-x-0';
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) transform section-transition ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
