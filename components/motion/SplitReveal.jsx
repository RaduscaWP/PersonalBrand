'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import { useMotion } from './MotionProvider';
import styles from './MotionPrimitives.module.scss';

export default function SplitReveal({
  as: Component = 'h2',
  children,
  className = '',
  trigger = 'scroll',
  delay = 0,
}) {
  const root = useRef(null);
  const { reduceMotion, introComplete } = useMotion();

  useGSAP(
    () => {
      if (!root.current || reduceMotion || !introComplete) {
        gsap.set(root.current, { clearProps: 'all' });
        return undefined;
      }

      const split = SplitText.create(root.current, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        onSplit(instance) {
          return gsap.from(instance.lines, {
            yPercent: 105,
            autoAlpha: 0,
            duration: motion.duration.reveal,
            delay,
            stagger: motion.stagger.lines,
            ease: motion.ease.strongOut,
            scrollTrigger:
              trigger === 'scroll'
                ? { trigger: root.current, start: 'top 84%', once: true }
                : undefined,
          });
        },
      });

      return () => split.revert();
    },
    {
      scope: root,
      dependencies: [delay, introComplete, reduceMotion, trigger],
      revertOnUpdate: true,
    },
  );

  return (
    <Component ref={root} className={`${styles.split} ${className}`}>
      {children}
    </Component>
  );
}
