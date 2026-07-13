'use client';

import { useRef } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import styles from '@/app/about/about.module.scss';

export default function TimelineStory({ items }) {
  const rootRef = useRef(null);
  const { reduceMotion } = useMotion();

  useGSAP(
    () => {
      const itemsInView = gsap.utils.toArray('[data-timeline-item]');
      const progress = rootRef.current?.querySelector('[data-timeline-progress]');

      if (reduceMotion) {
        gsap.set(progress, { scaleY: 1 });
        gsap.set(itemsInView, { clearProps: 'all' });
        return undefined;
      }

      const animations = [];
      animations.push(gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 78%',
            end: 'bottom 38%',
            scrub: 0.35,
          },
        },
      ));

      itemsInView.forEach((item) => {
        animations.push(gsap.fromTo(
          item,
          { x: motion.distance.reveal, autoAlpha: 0.48 },
          {
            x: 0,
            autoAlpha: 1,
            duration: motion.duration.reveal,
            ease: motion.ease.out,
            scrollTrigger: { trigger: item, start: 'top 84%', once: true },
          },
        ));
      });

      return () => animations.forEach((animation) => animation.kill());
    },
    { scope: rootRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className={styles.timelineMotion}>
      <span className={styles.timelineProgress} data-timeline-progress aria-hidden="true" />
      <ol className={styles.timeline}>
        {items.map((item) => (
          <li key={item.year} className={styles.timelineItem} data-timeline-item>
            <span className={styles.timelineYear}>{item.year}</span>
            <div className={styles.timelineBody}>
              <span className={styles.timelineStage}>{item.stage}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
