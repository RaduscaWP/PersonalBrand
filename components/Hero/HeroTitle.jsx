'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';

const TITLE = 'Software that looks sharp and removes manual work.';
const SESSION_KEY = 'radusca-hero-intro-played';

function typingDelay(character, index) {
  const rhythm = 16 + ((index * 11) % 15);
  if (character === ' ') return rhythm + 8;
  if (/[.,!?]/.test(character)) return rhythm + 70;
  return rhythm;
}

export default function HeroTitle({ reduceMotion }) {
  const [visibleText, setVisibleText] = useState('');
  const [phase, setPhase] = useState('typing');
  const timeoutRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let alreadyPlayed = false;

    try {
      alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      alreadyPlayed = false;
    }

    if (reduceMotion || alreadyPlayed) {
      setVisibleText(TITLE);
      setPhase('done');
      return undefined;
    }

    let index = 0;
    setVisibleText('');
    setPhase('typing');

    const typeNext = () => {
      if (cancelled) return;
      index += 1;
      setVisibleText(TITLE.slice(0, index));

      if (index === 1) {
        try {
          window.sessionStorage.setItem(SESSION_KEY, 'true');
        } catch {
          // The intro can still run when storage is unavailable.
        }
      }

      if (index >= TITLE.length) {
        setPhase('settling');
        timeoutRef.current = window.setTimeout(() => setPhase('done'), 420);
        return;
      }

      timeoutRef.current = window.setTimeout(
        typeNext,
        typingDelay(TITLE[index], index),
      );
    };

    timeoutRef.current = window.setTimeout(typeNext, 120);

    return () => {
      cancelled = true;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [reduceMotion]);

  return (
    <h1 className={`${styles.title} hero-title`} aria-label={TITLE}>
      <span className={styles.typedFrame}>
        {phase === 'done' ? (
          <span className={styles.typedFinal} aria-hidden="true">
            {TITLE}
          </span>
        ) : (
          <>
            <span className={styles.typedMeasure} aria-hidden="true">
              {TITLE}
            </span>
            <span className={styles.typedVisible} aria-hidden="true">
              {visibleText}
              <span className={styles.typedCursor} data-phase={phase} />
            </span>
          </>
        )}
      </span>
    </h1>
  );
}
