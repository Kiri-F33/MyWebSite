'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionWrapperProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'zoom-in' | 'slide-left' | 'slide-right';
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
          // Once animated, keep visible
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
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
          return 'opacity-0 scale-95 translate-y-6';
        case 'slide-left':
          return 'opacity-0 -translate-x-12';
        case 'slide-right':
          return 'opacity-0 translate-x-12';
        case 'fade-up':
        default:
          return 'opacity-0 translate-y-10';
      }
    }

    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out transform ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
