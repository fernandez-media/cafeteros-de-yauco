import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

type Variant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'slideUp';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

const getVariants = (variant: Variant, distance: number) => {
  const base = { opacity: 0 };
  const visible = { opacity: 1 };

  switch (variant) {
    case 'up':
      return {
        hidden: { ...base, y: distance },
        visible: { ...visible, y: 0 },
      };
    case 'down':
      return {
        hidden: { ...base, y: -distance },
        visible: { ...visible, y: 0 },
      };
    case 'left':
      return {
        hidden: { ...base, x: -distance },
        visible: { ...visible, x: 0 },
      };
    case 'right':
      return {
        hidden: { ...base, x: distance },
        visible: { ...visible, x: 0 },
      };
    case 'scale':
      return {
        hidden: { ...base, scale: 0.85 },
        visible: { ...visible, scale: 1 },
      };
    case 'blur':
      return {
        hidden: { ...base, y: distance * 0.5, filter: 'blur(12px)' },
        visible: { ...visible, y: 0, filter: 'blur(0px)' },
      };
    case 'slideUp':
      return {
        hidden: { ...base, y: distance * 1.5, scale: 0.95 },
        visible: { ...visible, y: 0, scale: 1 },
      };
    default:
      return {
        hidden: { ...base, y: distance },
        visible: { ...visible, y: 0 },
      };
  }
};

const ScrollReveal = ({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  duration = 1.2,
  distance = 50,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-120px 0px' });
  const variants = getVariants(variant, distance);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
