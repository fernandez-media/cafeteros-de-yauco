import { useRef, useEffect, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'scale';
  delay?: number;
}

const ScrollReveal = ({
  children,
  className = '',
  variant = 'up',
  delay = 0,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const baseClass = variant === 'scale' ? 'reveal-scale' : 'reveal';

  return (
    <div
      ref={ref}
      className={`${baseClass} ${className}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
