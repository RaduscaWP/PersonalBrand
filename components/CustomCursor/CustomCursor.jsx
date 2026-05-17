'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const addHover = () => ringRef.current?.classList.add(styles.hovered);
    const removeHover = () => ringRef.current?.classList.remove(styles.hovered);

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    const targets = document.querySelectorAll('a, button, input, textarea, select');
    targets.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });
    tick();

    return () => {
      document.removeEventListener('mousemove', onMove);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
