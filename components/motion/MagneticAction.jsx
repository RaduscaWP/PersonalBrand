'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/register';
import { useMotion } from './MotionProvider';

export default function MagneticAction({
  children,
  href,
  className = '',
  onClick,
  strength = 8,
  ...props
}) {
  const root = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const { pointer, reduceMotion } = useMotion();
  const enabled = pointer.enhanced && !reduceMotion;

  useGSAP(
    () => {
      if (!root.current || !enabled) return undefined;
      xTo.current = gsap.quickTo(root.current, 'x', { duration: 0.28, ease: 'power3.out' });
      yTo.current = gsap.quickTo(root.current, 'y', { duration: 0.28, ease: 'power3.out' });
      return () => gsap.set(root.current, { clearProps: 'transform' });
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );

  const move = (event) => {
    if (!enabled || !root.current) return;
    const bounds = root.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * strength * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * strength * 2;
    xTo.current?.(x);
    yTo.current?.(y);
  };

  const reset = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  const common = {
    ...props,
    ref: root,
    className,
    onClick,
    onPointerMove: move,
    onPointerLeave: reset,
    onBlur: reset,
  };

  return href ? (
    <Link href={href} {...common}>
      {children}
    </Link>
  ) : (
    <button type="button" {...common}>
      {children}
    </button>
  );
}
