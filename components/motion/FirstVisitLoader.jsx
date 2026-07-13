'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import { INTRO_SESSION_KEY } from '@/lib/motion/session';
import { useMotion } from './MotionProvider';
import styles from './FirstVisitLoader.module.scss';

function announceIntroComplete(markIntroComplete) {
  document.documentElement.dataset.intro = 'complete';
  document.body.dataset.introActive = 'false';
  markIntroComplete();
  window.dispatchEvent(new CustomEvent('radusca:intro-complete'));
}

export default function FirstVisitLoader() {
  const root = useRef(null);
  const label = useRef(null);
  const counter = useRef(null);
  const line = useRef(null);
  const [mounted, setMounted] = useState(true);
  const { markIntroComplete, reduceMotion } = useMotion();

  useEffect(() => {
    const rootElement = root.current;
    const labelElement = label.current;
    const counterElement = counter.current;
    const lineElement = line.current;

    if (document.documentElement.dataset.intro !== 'pending') {
      setMounted(false);
      announceIntroComplete(markIntroComplete);
      return undefined;
    }

    if (reduceMotion) {
      try {
        window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
      } catch {
        // Storage can be disabled; the current view still remains usable.
      }
      announceIntroComplete(markIntroComplete);
      setMounted(false);
      return undefined;
    }

    document.body.dataset.introActive = 'true';

    let cancelled = false;
    let frame;
    let current = 0;
    let target = 22;
    let fontsReady = false;
    let viewReady = window.location.pathname !== '/';
    let finishing = false;
    const startedAt = performance.now();
    const minimumMs = 620;

    const draw = () => {
      current += Math.max(0.32, (target - current) * 0.085);
      current = Math.min(current, target);
      const rounded = Math.min(100, Math.round(current));
      if (counterElement) counterElement.textContent = String(rounded).padStart(3, '0');
      if (lineElement) lineElement.style.transform = `scaleX(${rounded / 100})`;

      if (!cancelled && (!finishing || rounded < 100)) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const exit = () => {
      if (cancelled || finishing) return;
      finishing = true;
      target = 100;

      const waitForCounter = () => {
        if (cancelled) return;
        if (current < 99.4) {
          window.requestAnimationFrame(waitForCounter);
          return;
        }

        try {
          window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
        } catch {
          // Session storage is an enhancement, never a content dependency.
        }

        gsap
          .timeline({
            defaults: { ease: motion.ease.strongOut },
            onComplete: () => {
              announceIntroComplete(markIntroComplete);
              setMounted(false);
            },
          })
          .to(labelElement, { y: -10, autoAlpha: 0, duration: motion.duration.micro }, 0)
          .to(
            rootElement?.querySelectorAll('[data-loader-panel]') || [],
            {
              xPercent: (index) => (index === 0 ? -102 : 102),
              duration: motion.duration.route,
              stagger: 0.035,
            },
            0.06,
          )
          .set(rootElement, { autoAlpha: 0 });
      };

      waitForCounter();
    };

    const maybeFinish = () => {
      if (!fontsReady || !viewReady || finishing) return;
      target = 96;
      const remaining = Math.max(0, minimumMs - (performance.now() - startedAt));
      window.setTimeout(exit, remaining);
    };

    const onViewReady = () => {
      viewReady = true;
      target = Math.max(target, 92);
      maybeFinish();
    };

    window.addEventListener('radusca:hero-ready', onViewReady, { once: true });
    Promise.resolve(document.fonts?.ready)
      .catch(() => undefined)
      .then(() => {
        if (cancelled) return;
        fontsReady = true;
        target = Math.max(target, 72);
        maybeFinish();
      });

    const hardTimeout = window.setTimeout(() => {
      fontsReady = true;
      viewReady = true;
      exit();
    }, 2100);

    draw();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hardTimeout);
      window.removeEventListener('radusca:hero-ready', onViewReady);
      gsap.killTweensOf(rootElement);
      document.body.dataset.introActive = 'false';
    };
  }, [markIntroComplete, reduceMotion]);

  if (!mounted) return null;

  return (
    <div
      ref={root}
      className={`${styles.loader} first-visit-loader`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className={styles.panel} data-loader-panel />
      <div className={`${styles.panel} ${styles.panelRight}`} data-loader-panel />
      <div ref={label} className={styles.content} aria-hidden="true">
        <span className={styles.wordmark}>RADU / STEFAN</span>
        <span ref={counter} className={styles.counter}>000</span>
        <span className={styles.progress}>
          <span ref={line} />
        </span>
      </div>
    </div>
  );
}
