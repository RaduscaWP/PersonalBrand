'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import MagneticButton from '../MagneticButton/MagneticButton';
import { useMotion } from '@/components/motion/MotionProvider';
import { Flip, gsap, useGSAP } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import styles from './Navbar.module.scss';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const indicatorRef = useRef(null);
  const burgerRef = useRef(null);
  const firstLinkRef = useRef(null);
  const { reduceMotion } = useMotion();

  useGSAP(
    () => {
      const indicator = indicatorRef.current;
      const menu = menuRef.current;
      const activeLink = menu?.querySelector('[aria-current="page"]');
      if (!indicator || !menu || !activeLink) return undefined;

      const placeIndicator = (animate = true) => {
        if (window.matchMedia('(max-width: 900px)').matches) return;
        const menuBounds = menu.getBoundingClientRect();
        const activeBounds = activeLink.getBoundingClientRect();
        const hadPosition = indicator.dataset.ready === 'true';
        const state = hadPosition && animate && !reduceMotion ? Flip.getState(indicator) : null;

        gsap.set(indicator, {
          x: activeBounds.left - menuBounds.left + 14,
          width: Math.max(16, activeBounds.width - 28),
          autoAlpha: 1,
        });
        indicator.dataset.ready = 'true';

        if (state) {
          Flip.from(state, {
            duration: motion.duration.control,
            ease: motion.ease.strongOut,
            absolute: false,
          });
        }
      };

      placeIndicator();
      const observer = new ResizeObserver(() => placeIndicator(false));
      observer.observe(menu);
      return () => observer.disconnect();
    },
    { scope: navRef, dependencies: [pathname, reduceMotion], revertOnUpdate: true },
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.dataset.menuOpen = open ? 'true' : 'false';
    const inertTargets = [
      document.querySelector('main.site-main'),
      document.querySelector('footer'),
    ].filter(Boolean);

    inertTargets.forEach((target) => {
      target.inert = open;
    });

    return () => {
      document.body.dataset.menuOpen = 'false';
      inertTargets.forEach((target) => {
        target.inert = false;
      });
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const focusFrame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        window.requestAnimationFrame(() => burgerRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = [...(navRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [])]
        .filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const solid = !isHome || scrolled || open;

  return (
    <nav ref={navRef} className={`${styles.nav} ${solid ? styles.solid : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Radu-Stefan home">
          <span>Radu</span>
          <span>Stefan</span>
        </Link>

        <ul
          ref={menuRef}
          id="primary-nav"
          className={`${styles.links} ${open ? styles.open : ''}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <li ref={indicatorRef} className={styles.activeIndicator} aria-hidden="true" />
          {links.map(({ href, label }, index) => (
            <li key={href}>
              <Link
                ref={index === 0 ? firstLinkRef : undefined}
                href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}

          <li className={styles.mobileStatus}>
            <span className={styles.statusDot} />
            Available for freelance work
          </li>
          <li className={styles.mobileCta}>
            <MagneticButton href="/contact" variant="primary">
              Start project
            </MagneticButton>
          </li>
        </ul>

        <div className={styles.desktopCta}>
          <MagneticButton href="/contact" variant="primary">
            Start project
          </MagneticButton>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="primary-nav"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
