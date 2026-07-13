'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { Flip, gsap } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import { useMotion } from '@/components/motion/MotionProvider';
import { trackEvent } from '@/lib/analytics';
import styles from './Hero.module.scss';

const goals = [
  'Launch something new',
  'Improve an existing build',
  'Remove manual work',
  'Connect existing tools',
];

function makeDeliveryOptions(selected) {
  const budgets = selected?.budgets || [];
  const timelines = selected?.timelines || [];
  return [
    {
      id: 'focused',
      label: 'Focused start',
      budget: budgets[0] || 'Not sure yet',
      timeline: timelines[0] || 'Flexible',
    },
    {
      id: 'balanced',
      label: 'Balanced scope',
      budget: budgets[1] || budgets[0] || 'Not sure yet',
      timeline: timelines[1] || timelines[0] || 'Flexible',
    },
    {
      id: 'flexible',
      label: 'Scope together',
      budget: 'Not sure yet',
      timeline: 'Flexible',
    },
  ];
}

export default function HeroForm({ selected }) {
  const rootRef = useRef(null);
  const previousLayout = useRef(null);
  const completionTracked = useRef(false);
  const [goal, setGoal] = useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const { reduceMotion } = useMotion();
  const deliveryOptions = useMemo(() => makeDeliveryOptions(selected), [selected]);
  const delivery = deliveryOptions.find((item) => item.id === deliveryId);
  const complete = Boolean(goal && delivery);

  useEffect(() => {
    setGoal('');
    setDeliveryId('');
    completionTracked.current = false;
  }, [selected?.id]);

  useEffect(() => {
    if (!previousLayout.current || !rootRef.current || reduceMotion) return;
    const animation = Flip.from(previousLayout.current, {
      targets: rootRef.current.querySelectorAll('[data-brief-layout]'),
      duration: motion.duration.control,
      ease: motion.ease.out,
      nested: true,
      prune: true,
    });
    previousLayout.current = null;
    return () => animation?.kill();
  }, [deliveryId, goal, reduceMotion]);

  const captureLayout = () => {
    if (!rootRef.current || reduceMotion) return;
    previousLayout.current = Flip.getState(rootRef.current.querySelectorAll('[data-brief-layout]'));
  };

  const selectGoal = (nextGoal) => {
    captureLayout();
    setGoal(nextGoal);
  };

  const selectDelivery = (nextDelivery) => {
    captureLayout();
    setDeliveryId(nextDelivery);
  };

  const href = useMemo(() => {
    if (!complete) return '/contact';
    const query = new URLSearchParams({
      domain: selected.domainId,
      service: selected.id,
      goal,
      budget: delivery.budget,
      timeline: delivery.timeline,
    });
    return `/contact?${query.toString()}`;
  }, [complete, delivery, goal, selected]);

  useEffect(() => {
    if (!complete) return undefined;
    if (!completionTracked.current) {
      completionTracked.current = true;
      trackEvent('interactive_brief_completed', { service: selected.id });
    }
    if (reduceMotion || !rootRef.current) return undefined;
    const summary = rootRef.current.querySelector('[data-brief-summary]');
    gsap.fromTo(
      summary,
      { y: 8, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: motion.duration.control, ease: motion.ease.out },
    );
    return () => gsap.killTweensOf(summary);
  }, [complete, reduceMotion, selected.id]);

  return (
    <div ref={rootRef} className={styles.briefFlow}>
      <ol className={styles.briefProgress} aria-label="Brief progress">
        {['Scope', 'Outcome', 'Delivery'].map((label, index) => {
          const done = index === 0 || (index === 1 && goal) || (index === 2 && complete);
          const active = (index === 1 && !goal) || (index === 2 && goal && !complete);
          return (
            <li key={label} className={`${done ? styles.briefStepDone : ''} ${active ? styles.briefStepActive : ''}`}>
              <span>{done ? <Check size={12} /> : index + 1}</span>
              {label}
            </li>
          );
        })}
      </ol>

      <fieldset className={styles.briefFieldset} data-brief-layout>
        <legend>What should this project achieve?</legend>
        <div className={styles.briefChoices} role="group" aria-label="Project goal">
          {goals.map((item) => (
            <button
              key={item}
              type="button"
              className={goal === item ? styles.briefChoiceActive : ''}
              aria-pressed={goal === item}
              onClick={() => selectGoal(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      {goal ? (
        <fieldset className={styles.briefFieldset} data-brief-layout>
          <legend>Choose the planning lane</legend>
          <div className={styles.deliveryChoices} role="group" aria-label="Budget and timeline lane">
            {deliveryOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                className={deliveryId === item.id ? styles.deliveryChoiceActive : ''}
                aria-pressed={deliveryId === item.id}
                onClick={() => selectDelivery(item.id)}
              >
                <strong>{item.label}</strong>
                <span>{item.budget} / {item.timeline}</span>
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {complete ? (
        <div className={styles.briefSummary} data-brief-layout data-brief-summary aria-live="polite">
          <span className={styles.briefSummaryLabel}>Mini brief ready</span>
          <p>
            <strong>{selected.label}</strong> to {goal.toLowerCase()}, planned around{' '}
            <strong>{delivery.budget}</strong> and <strong>{delivery.timeline}</strong>.
          </p>
          <MagneticButton href={href} variant="primary" data-cursor="SEND">
            Continue with this brief <ArrowRight size={15} />
          </MagneticButton>
        </div>
      ) : (
        <p className={styles.briefHint} data-brief-layout>
          Two quick choices create a safe, prefilled contact brief. You can edit everything there.
        </p>
      )}
    </div>
  );
}
