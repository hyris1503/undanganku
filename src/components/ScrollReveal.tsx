import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number; // duration in milliseconds
  distance?: number; // distance in pixels
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 750,
  distance = 32,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = domRef.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  // Determine initial transform based on direction
  let initialTransform = 'translate3d(0, 0, 0)';
  if (!isVisible) {
    switch (direction) {
      case 'up':
        initialTransform = `translate3d(0, ${distance}px, 0)`;
        break;
      case 'down':
        initialTransform = `translate3d(0, -${distance}px, 0)`;
        break;
      case 'left':
        initialTransform = `translate3d(${distance}px, 0, 0)`;
        break;
      case 'right':
        initialTransform = `translate3d(-${distance}px, 0, 0)`;
        break;
      case 'none':
        initialTransform = 'scale(0.96)';
        break;
    }
  }

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : initialTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  baseDelay?: number;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function StaggerItem({
  children,
  className = '',
  index,
  baseDelay = 0,
  staggerDelay = 120,
  direction = 'up',
}: StaggerItemProps) {
  return (
    <ScrollReveal
      delay={baseDelay + index * staggerDelay}
      direction={direction}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
}
