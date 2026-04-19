'use client';
import { useRef } from 'react';
import Link from 'next/link';
import styles from './MagneticButton.module.scss';

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  type,
  disabled,
  className = '',
  external = false,
  ...rest
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          {...rest}
        >
          <span className={styles.inner}>{children}</span>
        </a>
      );
    }
    return (
      <Link
        ref={ref}
        href={href}
        className={cls}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...rest}
      >
        <span className={styles.inner}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type || 'button'}
      disabled={disabled}
      onClick={onClick}
      className={cls}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      <span className={styles.inner}>{children}</span>
    </button>
  );
}
