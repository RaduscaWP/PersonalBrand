'use client';

import MagneticAction from '@/components/motion/MagneticAction';
import styles from './MagneticButton.module.scss';

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`;

  return (
    <MagneticAction
      href={href}
      type={type}
      className={cls}
      onClick={onClick}
      {...props}
    >
      {children}
    </MagneticAction>
  );
}
