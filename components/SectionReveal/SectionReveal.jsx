'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import { useMotion } from '@/components/motion/MotionProvider';

export default function SectionReveal({
  children,
  y = motion.distance.reveal,
  delay = 0,
  duration = motion.duration.reveal,
  stagger = 0,
  selector,
  as: Component = 'div',
  className = '',
}) {
  const ref = useRef(null);
  const { reduceMotion } = useMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return undefined;

      const targets = selector ? root.querySelectorAll(selector) : root;
      if (reduceMotion) {
        gsap.set(targets, { clearProps: 'all' });
        return undefined;
      }

      const animation = gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        stagger,
        ease: motion.ease.out,
        scrollTrigger: {
          trigger: root,
          start: 'top 84%',
          once: true,
        },
        onComplete: () => gsap.set(targets, { clearProps: 'transform,opacity,visibility' }),
      });

      return () => animation.scrollTrigger?.kill();
    },
    {
      scope: ref,
      dependencies: [delay, duration, reduceMotion, selector, stagger, y],
      revertOnUpdate: true,
    },
  );

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
