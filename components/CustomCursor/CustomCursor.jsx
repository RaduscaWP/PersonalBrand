'use client';

import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/register';
import { useMotion } from '@/components/motion/MotionProvider';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const moveDotX = useRef(null);
  const moveDotY = useRef(null);
  const moveRingX = useRef(null);
  const moveRingY = useRef(null);
  const { pointer, reduceMotion } = useMotion();
  const enabled = pointer.enhanced && !reduceMotion;

  useGSAP(
    () => {
      if (!enabled || !dotRef.current || !ringRef.current) return undefined;

      moveDotX.current = gsap.quickTo(dotRef.current, 'x', {
        duration: 0.08,
        ease: 'power3.out',
      });
      moveDotY.current = gsap.quickTo(dotRef.current, 'y', {
        duration: 0.08,
        ease: 'power3.out',
      });
      moveRingX.current = gsap.quickTo(ringRef.current, 'x', {
        duration: 0.24,
        ease: 'power3.out',
      });
      moveRingY.current = gsap.quickTo(ringRef.current, 'y', {
        duration: 0.24,
        ease: 'power3.out',
      });
      gsap.set([dotRef.current, ringRef.current], { autoAlpha: 0 });

      return () => gsap.killTweensOf([dotRef.current, ringRef.current]);
    },
    { dependencies: [enabled], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!enabled) {
      document.documentElement.dataset.customCursor = 'false';
      return undefined;
    }

    document.documentElement.dataset.customCursor = 'true';

    const setVisible = (visible) => {
      gsap.to([dotRef.current, ringRef.current], {
        autoAlpha: visible ? 1 : 0,
        duration: 0.16,
        overwrite: true,
      });
    };

    const onMove = (event) => {
      if (document.hidden) return;
      moveDotX.current?.(event.clientX - 3.5);
      moveDotY.current?.(event.clientY - 3.5);
      moveRingX.current?.(event.clientX - 17);
      moveRingY.current?.(event.clientY - 17);
      setVisible(true);
    };

    const onPointerOver = (event) => {
      const interactive = event.target.closest?.('a, button, [role="button"], [data-cursor]');
      const formControl = event.target.closest?.('input, textarea, select, [role="combobox"]');
      const contextual = event.target.closest?.('[data-cursor]');
      const label = contextual?.dataset.cursor?.trim();

      ringRef.current?.classList.toggle(styles.hovered, Boolean(interactive));
      ringRef.current?.classList.toggle(styles.form, Boolean(formControl));
      ringRef.current?.classList.toggle(styles.contextual, Boolean(label));
      dotRef.current?.classList.toggle(styles.form, Boolean(formControl));
      if (labelRef.current) labelRef.current.textContent = label || '';
    };

    const onWindowOut = (event) => {
      if (!event.relatedTarget) setVisible(false);
    };

    const onVisibility = () => {
      if (document.hidden) setVisible(false);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerout', onWindowOut);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.documentElement.dataset.customCursor = 'false';
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerout', onWindowOut);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring}>
        <span ref={labelRef} className={styles.label} />
      </div>
    </div>
  );
}
