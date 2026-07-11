'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useSyncExternalStore } from 'react';

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return undefined;

    previousPathname.current = pathname;
    const frame = window.requestAnimationFrame(() => {
      const heading = document.querySelector('#main-content h1');
      if (!heading) return;
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: false });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const animateRoute = hydrated && !reduceMotion;

  return (
    <motion.div
      key={pathname}
      initial={animateRoute ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: animateRoute ? 0.28 : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ minHeight: '100svh' }}
    >
      {children}
    </motion.div>
  );
}
