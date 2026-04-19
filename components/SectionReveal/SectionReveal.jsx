'use client';
import { useEffect, useRef } from 'react';
import styles from './SectionReveal.module.scss';

export default function SectionReveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => el.classList.add(styles.visible), delay);
          obs.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={`${styles.reveal} ${className}`}>
      {children}
    </Tag>
  );
}
