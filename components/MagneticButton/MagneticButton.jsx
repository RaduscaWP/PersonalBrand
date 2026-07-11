'use client';

import Link from 'next/link';
import { useRef } from 'react';
import styles from './MagneticButton.module.scss';

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.14;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.14;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} ref={ref} className={cls} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={cls}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}
