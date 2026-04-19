'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Github, Instagram, ArrowUpRight, MapPin, GraduationCap } from 'lucide-react';
import MagneticButton from '../MagneticButton/MagneticButton';
import styles from './Hero.module.scss';

export default function Hero() {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 800) return;
        const translate = y * 0.25;
        const opacity = Math.max(0, 1 - y / 500);
        el.style.transform = `translate3d(0, ${translate}px, 0)`;
        el.style.opacity = String(opacity);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div ref={contentRef} className={styles.content} data-parallax>
          <span className={`${styles.label} label-mono`}>
            <span className={styles.labelDot} />
            Full-Stack Developer & Cybersecurity Enthusiast
          </span>

          <h1 className={styles.headline}>
            <span className={styles.line} style={{ animationDelay: '0.15s' }}>
              Hi, I&rsquo;m Radu.
            </span>
            <span className={styles.line} style={{ animationDelay: '0.3s' }}>
              I build things <span className={styles.accent}>for the web.</span>
            </span>
          </h1>

          <p className={styles.lede} style={{ animationDelay: '0.5s' }}>
            18-year-old developer based in Chisinau, Moldova. I craft fast, modern digital
            experiences — from pixel-perfect landing pages to full web applications.
          </p>

          <div className={styles.ctaRow} style={{ animationDelay: '0.7s' }}>
            <MagneticButton href="/projects" variant="primary">
              View My Work <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="/contact" variant="secondary">
              Hire Me
            </MagneticButton>

            <span className={styles.divider} aria-hidden="true" />

            <a
              href="https://github.com/RaduscaWP"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={styles.social}
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.instagram.com/radusca_?igsh=MXNkc3lreTQ5cXd5cA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.social}
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <aside className={styles.card} aria-label="About Radu">
          <div className={styles.cardTop}>
            <span className={styles.statusBadge}>
              <span className={styles.statusDot} />
              Available for hire
            </span>
            <span className={styles.monoId}>/ 001</span>
          </div>

          <div className={styles.photoWrap}>
            <div className={styles.photoGlow} aria-hidden="true" />
            <Image
              src="/images/profile.jpg"
              alt="Radu — Full-Stack Developer"
              width={220}
              height={220}
              priority
              className={styles.photo}
            />
          </div>

          <div className={styles.cardInfo}>
            <h2 className={styles.cardName}>Radu</h2>
            <span className={styles.cardRole}>radusca · 18 y/o</span>

            <ul className={styles.cardMeta}>
              <li>
                <MapPin size={14} />
                Chisinau, Moldova
              </li>
              <li>
                <GraduationCap size={14} />
                Step IT Academy
              </li>
            </ul>

            <Link
              href="https://github.com/RaduscaWP"
              className={styles.cardLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/RaduscaWP
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </aside>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
