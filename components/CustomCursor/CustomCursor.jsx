'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/motion/register';
import { useMotion } from '@/components/motion/MotionProvider';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const { reduceMotion } = useMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const enabled = hasFinePointer && !reduceMotion;

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setHasFinePointer(media.matches);

    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useGSAP(
    () => {
      if (!enabled || !dotRef.current || !ringRef.current) return undefined;

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

    // Keep the system cursor available until we have coordinates for the custom
    // one. Otherwise a page can hide both cursors immediately after hydration.
    document.documentElement.dataset.customCursor = 'false';
    let cursorActivated = false;

    const activateCursor = () => {
      if (cursorActivated) return;
      cursorActivated = true;
      document.documentElement.dataset.customCursor = 'true';
    };

    const setVisible = (visible) => {
      gsap.to([dotRef.current, ringRef.current], {
        autoAlpha: visible ? 1 : 0,
        duration: 0.16,
        overwrite: 'auto',
      });
    };

    const onMove = (event) => {
      if (document.hidden) return;
      gsap.set(dotRef.current, { x: event.clientX - 3.5, y: event.clientY - 3.5 });
      gsap.to(ringRef.current, {
        x: event.clientX - 17,
        y: event.clientY - 17,
        duration: 0.24,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      activateCursor();
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
