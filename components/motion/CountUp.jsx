'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import { useMotion } from './MotionProvider';
import styles from './MotionPrimitives.module.scss';

export default function CountUp({ value, prefix = '', suffix = '', className = '' }) {
  const visual = useRef(null);
  const { reduceMotion } = useMotion();
  const finalValue = `${prefix}${value}${suffix}`;

  useGSAP(
    () => {
      if (!visual.current) return undefined;
      if (reduceMotion) {
        visual.current.textContent = finalValue;
        return undefined;
      }

      const state = { value: 0 };
      visual.current.textContent = `${prefix}0${suffix}`;
      const tween = gsap.to(state, {
        value,
        duration: 1.12,
        ease: motion.ease.out,
        snap: { value: 1 },
        scrollTrigger: {
          trigger: visual.current,
          start: 'top 72%',
          once: true,
        },
        onUpdate: () => {
          visual.current.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
        },
        onComplete: () => {
          visual.current.textContent = finalValue;
        },
      });

      return () => tween.scrollTrigger?.kill();
    },
    {
      scope: visual,
      dependencies: [finalValue, prefix, reduceMotion, suffix, value],
      revertOnUpdate: true,
    },
  );

  return (
    <span className={`${styles.count} ${className}`}>
      <span className="sr-only">{finalValue}</span>
      <span ref={visual} aria-hidden="true">
        {finalValue}
      </span>
    </span>
  );
}
