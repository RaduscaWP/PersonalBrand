'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import { useMotion } from './MotionProvider';
import styles from './MotionPrimitives.module.scss';

export default function ImageReveal({ children, className = '' }) {
  const root = useRef(null);
  const { reduceMotion } = useMotion();

  useGSAP(
    () => {
      if (!root.current || reduceMotion) return undefined;

      return gsap.from(root.current, {
        clipPath: 'inset(0 100% 0 0 round 24px)',
        duration: motion.duration.hero,
        ease: motion.ease.strongOut,
        scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
      });
    },
    { scope: root, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={`${styles.imageReveal} ${className}`}>
      {children}
    </div>
  );
}
