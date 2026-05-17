'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { defaultHero, heroServices } from '@/data/heroServices';
import { initParticles } from '@/lib/threeParticles';
import HeroDropdown from './HeroDropdown';
import HeroForm from './HeroForm';
import styles from './Hero.module.scss';

const fitLabels = ['Founders', 'Personal brands', 'Agencies', 'Small teams'];
const HERO_VIDEO_OPACITY = 0.64;
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HeroSection() {
  const [selected, setSelected] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const bodyRef = useRef(null);
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);

  const active = selected ?? defaultHero;

  useEffect(() => {
    if (!canvasRef.current || window.innerWidth < 768 || prefersReducedMotion()) return undefined;
    cleanupRef.current = initParticles(canvasRef.current);
    return () => cleanupRef.current?.();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.08 });
      timeline
        .from('.hero-badge', { y: 24, opacity: 0, duration: 0.45 })
        .from('.hero-title', { y: 42, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.15')
        .from('.hero-copy', { y: 26, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35')
        .from('.hero-chips', { y: 22, opacity: 0, duration: 0.45 }, '-=0.32')
        .from('.hero-actions', { y: 20, opacity: 0, duration: 0.45 }, '-=0.28')
        .from('.hero-panel', { x: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
    });

    return () => ctx.revert();
  }, []);

  const handleSelect = (service) => {
    const video = videoRef.current;
    const body = bodyRef.current;

    if (!video || prefersReducedMotion()) {
      if (video) {
        setVideoReady(false);
        video.src = service.video;
        video.load();
        video.play().catch(() => {});
      }
      setSelected(service);
      return;
    }

    gsap.to(video, {
      opacity: 0,
      duration: 0.24,
      onComplete: () => {
        setVideoReady(false);
        video.src = service.video;
        video.load();
        video.play().catch(() => {});
      },
    });

    if (!body) {
      setSelected(service);
      return;
    }

    gsap.to(body, {
      y: -10,
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        setSelected(service);
        gsap.to(body, { y: 0, opacity: 1, duration: 0.3 });
      },
    });
  };

  return (
    <section className={styles.hero} style={{ '--hero-video-opacity': HERO_VIDEO_OPACITY }}>
      <video
        ref={videoRef}
        className={`${styles.videoBg} ${videoReady ? styles.videoReady : ''}`}
        src={defaultHero.video}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
      />
      <div className={styles.videoFallback} aria-hidden="true" />
      <div className={styles.overlay} />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.copy}>
          <div className={`${styles.badge} hero-badge`}>
            <span className={styles.dot} />
            Freelance developer for conversion-focused web work
          </div>

          <h1 className={`${styles.title} hero-title`}>
            Websites that look sharp and earn trust fast.
          </h1>

          <p className={`${styles.lede} hero-copy`}>
            Landing pages, full websites, Figma-to-code builds, and UI systems for clients who
            need cleaner execution, stronger first impressions, and a process that feels easy to
            trust.
          </p>

          <div className={`${styles.chips} hero-chips`}>
            {fitLabels.map((label) => (
              <span key={label} className={styles.chip}>
                {label}
              </span>
            ))}
          </div>

          <div className={`${styles.actions} hero-actions`}>
            <MagneticButton href="/contact" variant="primary">
              Start a project
            </MagneticButton>
            <Link href="/projects" className="text-link">
              See live work <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <aside className={`${styles.panel} hero-panel`}>
          <div className={styles.panelTop}>
            <div>
              <span className={styles.panelKicker}>Interactive brief</span>
              <h2 className={styles.panelTitle}>Pick the build and the page adapts.</h2>
            </div>
            <div className={styles.statusBadge}>
              <span className={styles.greenDot} />
              Available now
            </div>
          </div>

          <HeroDropdown services={heroServices} selected={selected} onSelect={handleSelect} />

          <p ref={bodyRef} className={styles.panelBody}>
            {active.subtext}
          </p>

          <div className={styles.panelNote}>
            The dropdown changes the hero video and keeps the form aligned with the service from
            the first message.
          </div>

          <div className={styles.formWrap}>
            <HeroForm selected={active === defaultHero ? null : selected} />
          </div>

          <p className={styles.microTrust}>
            Response target: under 24 hours. Scope gets clarified before code starts moving.
          </p>
        </aside>
      </div>
    </section>
  );
}
