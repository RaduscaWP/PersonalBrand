'use client';
import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animFrame;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      animFrame = requestAnimationFrame(animate);
    };

    const addHover = () => ringRef.current?.classList.add(styles.hovered);
    const rmHover = () => ringRef.current?.classList.remove(styles.hovered);
    const addView = () => ringRef.current?.classList.add(styles.viewing);
    const rmView = () => ringRef.current?.classList.remove(styles.viewing);

    const syncCursorState = (target) => {
      if (!(target instanceof Element)) {
        rmHover();
        rmView();
        return;
      }

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor]');
      const viewTarget = target.closest('[data-cursor="view"]');

      if (!interactive) {
        rmHover();
        rmView();
        return;
      }

      if (viewTarget) {
        rmHover();
        addView();
        return;
      }

      rmView();
      addHover();
    };

    const onMouseOver = (e) => syncCursorState(e.target);
    const onMouseOut = (e) => syncCursorState(e.relatedTarget);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
