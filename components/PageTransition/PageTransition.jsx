'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import { useMotion } from '@/components/motion/MotionProvider';
import styles from './PageTransition.module.scss';

const routeLabels = {
  '/': 'HOME',
  '/about': 'ABOUT',
  '/projects': 'PROJECTS',
  '/services': 'SERVICES',
  '/pricing': 'PRICING',
  '/blog': 'NOTES',
  '/contact': 'CONTACT',
};

function routeLabel(pathname) {
  if (routeLabels[pathname]) return routeLabels[pathname];
  const segment = pathname.split('/').filter(Boolean).at(-1) || 'PAGE';
  return segment.replaceAll('-', ' ').toUpperCase();
}

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const { reduceMotion } = useMotion();
  const root = useRef(null);
  const panel = useRef(null);
  const label = useRef(null);
  const previousPathname = useRef(pathname);
  const transitioning = useRef(false);
  const keyboardNavigation = useRef(false);
  const historyNavigation = useRef(false);
  const failsafe = useRef(null);
  const reveal = useCallback(() => {
    window.clearTimeout(failsafe.current);

    if (reduceMotion) {
      gsap.set(root.current, { autoAlpha: 0 });
      gsap.set(panel.current, { yPercent: 100 });
    } else {
      gsap.to(panel.current, {
        yPercent: -102,
        duration: motion.duration.route,
        ease: motion.ease.strongOut,
        onComplete: () => {
          gsap.set(root.current, { autoAlpha: 0 });
          gsap.set(panel.current, { yPercent: 100 });
        },
      });
    }

    document.body.setAttribute('data-route-transition', 'false');
    transitioning.current = false;

    if (keyboardNavigation.current) {
      window.requestAnimationFrame(() => {
        const heading = document.querySelector('#main-content h1');
        if (!heading) return;
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      });
    }

    keyboardNavigation.current = false;
    historyNavigation.current = false;
  }, [reduceMotion]);

  const coverAndNavigate = useCallback((destination, nextLabel, fromKeyboard) => {
    if (transitioning.current) return;
    transitioning.current = true;
    keyboardNavigation.current = fromKeyboard;
    document.body.setAttribute('data-route-transition', 'true');
    label.current.textContent = nextLabel;

    gsap.killTweensOf([root.current, panel.current]);
    gsap.set(root.current, { autoAlpha: 1 });

    const navigate = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      router.push(destination);
      failsafe.current = window.setTimeout(reveal, 2800);
    };

    if (reduceMotion) {
      gsap.set(panel.current, { yPercent: 0 });
      navigate();
      return;
    }

    gsap.fromTo(
      panel.current,
      { yPercent: 102 },
      {
        yPercent: 0,
        duration: motion.duration.control,
        ease: motion.ease.strongOut,
        onComplete: navigate,
      },
    );
  }, [reduceMotion, reveal, router]);

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest?.('a');
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        anchor.dataset.noTransition === 'true'
      ) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      event.preventDefault();
      coverAndNavigate(
        `${url.pathname}${url.search}${url.hash}`,
        routeLabel(url.pathname),
        event.detail === 0,
      );
    };

    const onPopState = () => {
      historyNavigation.current = true;
      document.body.setAttribute('data-route-transition', 'true');
      if (label.current) label.current.textContent = routeLabel(window.location.pathname);
      gsap.set(root.current, { autoAlpha: 1 });
      gsap.set(panel.current, { yPercent: 0 });
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
      window.clearTimeout(failsafe.current);
      document.body.setAttribute('data-route-transition', 'false');
    };
  }, [coverAndNavigate]);

  useEffect(() => {
    if (previousPathname.current === pathname) return undefined;

    previousPathname.current = pathname;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!historyNavigation.current && !window.location.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
        reveal();
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, reveal]);

  return (
    <div ref={root} className={styles.transition} aria-hidden="true">
      <div ref={panel} className={styles.panel}>
        <span ref={label} className={styles.label}>PAGE</span>
      </div>
    </div>
  );
}
