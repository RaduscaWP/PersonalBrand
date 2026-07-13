'use client';

import { useRef, useState } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import styles from './HomeSections.module.scss';

const steps = [
  {
    number: '01',
    title: 'Clarify the scope',
    body: 'You send the goal, references, timeline, and what already exists. I translate that into a buildable scope instead of rushing into code.',
    signal: 'INPUT',
    visualTitle: 'A brief with edges',
    visualBody: 'Goal, audience, constraints, references, and a definition of done.',
    checks: ['Outcome', 'Constraints', 'Known unknowns'],
  },
  {
    number: '02',
    title: 'Lock the direction',
    body: 'We agree on structure, visual direction, and the outcome the build has to achieve before time gets wasted on rework.',
    signal: 'DECISION',
    visualTitle: 'Direction before decoration',
    visualBody: 'Content hierarchy, interaction standard, and the decisions that control the build.',
    checks: ['Structure', 'Visual system', 'Success condition'],
  },
  {
    number: '03',
    title: 'Build with feedback',
    body: 'The project gets built in stages with clean progress updates, working previews, and revisions focused on what improves the result.',
    signal: 'PROOF',
    visualTitle: 'Working software, early',
    visualBody: 'Real previews replace vague updates, with responsive and functional checks throughout.',
    checks: ['Preview', 'Validate', 'Refine'],
  },
  {
    number: '04',
    title: 'Launch ready',
    body: 'Delivery includes responsive polish, deployment prep, and a handoff that makes the project usable, not merely technically complete.',
    signal: 'OUTPUT',
    visualTitle: 'A clean finish line',
    visualBody: 'Deployment, final QA, and a handoff with the context needed to keep moving.',
    checks: ['Responsive', 'Deploy', 'Handoff'],
  },
];

export default function HowIWork() {
  const rootRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reduceMotion } = useMotion();
  const active = steps[activeIndex];

  useGSAP(
    () => {
      if (reduceMotion) return undefined;
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (hover: hover) and (pointer: fine)', () => {
        const select = gsap.utils.selector(rootRef.current);
        const items = select('[data-process-step]');
        const [progress] = select('[data-process-progress]');
        const triggers = items.map((item, index) =>
          ScrollTrigger.create({
            trigger: item,
            start: 'top 58%',
            end: 'bottom 42%',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          }),
        );

        const progressTween = gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: items[0],
              endTrigger: items.at(-1),
              start: 'top 58%',
              end: 'bottom 42%',
              scrub: 0.35,
            },
          },
        );

        return () => {
          triggers.forEach((trigger) => trigger.kill());
          progressTween.kill();
        };
      });

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (reduceMotion) return undefined;
      return gsap.fromTo(
        '[data-process-visual-content]',
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: motion.duration.control, ease: motion.ease.out },
      );
    },
    { scope: rootRef, dependencies: [activeIndex, reduceMotion], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="section-shell section-shell--dark" data-story-act="method">
      <div className="section-inner">
        <div className={styles.processShell}>
          <div className={styles.processIntro}>
            <span className="section-kicker">Act 04 / Method</span>
            <h2 className="section-title">
              Clear process. <strong>Less client guesswork.</strong>
            </h2>
            <p className="section-lede">
              Four checkpoints keep the project calm, transparent, and easy to trust from the
              first message through launch.
            </p>

            <div className={styles.processVisual} aria-live="polite">
              <div className={styles.processPhotoWrap}>
                <span className={styles.processGlow} aria-hidden="true" />
                <span className={styles.processOrb} aria-hidden="true" />
                <div className={styles.processMockPanel} data-process-visual-content key={active.number}>
                  <div className={styles.processVisualTopline}>
                    <span>{active.number} / 04</span>
                    <span>{active.signal}</span>
                  </div>
                  <h3>{active.visualTitle}</h3>
                  <p>{active.visualBody}</p>
                  <ul>
                    {active.checks.map((check) => <li key={check}>{check}</li>)}
                  </ul>
                </div>
              </div>

              <div className={styles.processInsight}>
                <span className={styles.processInsightKicker}>Current checkpoint</span>
                <h3>{active.title}</h3>
                <p>{active.body}</p>
              </div>
            </div>
          </div>

          <div className={styles.processRail}>
            <span className={styles.processProgress} data-process-progress aria-hidden="true" />
            <ol className={styles.processList}>
              {steps.map((step, index) => (
                <li
                  key={step.number}
                  className={`${styles.processItem} ${index === activeIndex ? styles.processItemActive : ''}`}
                  data-process-step
                >
                  <span className={styles.processNumber}>{step.number}</span>
                  <div className={styles.processCopy}>
                    <span className={styles.processSignal}>{step.signal}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <ul className={styles.processMobileChecks}>
                      {step.checks.map((check) => <li key={check}>{check}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
