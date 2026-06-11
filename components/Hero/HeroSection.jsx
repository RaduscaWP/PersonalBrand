'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { defaultHero, heroServiceDomains } from '@/data/heroServices';
import { initParticles } from '@/lib/threeParticles';
import HeroDropdown from './HeroDropdown';
import HeroForm from './HeroForm';
import styles from './Hero.module.scss';

const fitLabels = ['Software developer', 'Web apps', 'Automations', 'AI-assisted workflow'];
const HERO_VIDEO_OPACITY = 0.64;
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HeroSection() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selected, setSelected] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const bodyRef = useRef(null);
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);

  const domainServices = selectedDomain?.services ?? [];
  const active = selected ?? selectedDomain ?? defaultHero;

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

  const updateHeroMedia = (item, onCommit) => {
    const video = videoRef.current;
    const body = bodyRef.current;

    if (!video || prefersReducedMotion()) {
      if (video) {
        setVideoReady(false);
        video.src = item.video;
        video.load();
        video.play().catch(() => {});
      }
      onCommit();
      return;
    }

    gsap.to(video, {
      opacity: 0,
      duration: 0.24,
      onComplete: () => {
        setVideoReady(false);
        video.src = item.video;
        video.load();
        video.play().catch(() => {});
      },
    });

    if (!body) {
      onCommit();
      return;
    }

    gsap.to(body, {
      y: -10,
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        onCommit();
        gsap.to(body, { y: 0, opacity: 1, duration: 0.3 });
      },
    });
  };

  const handleDomainSelect = (domain) => {
    updateHeroMedia(domain, () => {
      setSelectedDomain(domain);
      setSelected(null);
    });
  };

  const handleSelect = (service) => {
    updateHeroMedia(service, () =>
      setSelected({
        ...service,
        domainId: selectedDomain?.id || '',
        domainLabel: selectedDomain?.label || '',
      }),
    );
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
            Software developer for web, automation, and AI-assisted delivery
          </div>

          <h1 className={`${styles.title} hero-title`}>
            Software that looks sharp and removes manual work.
          </h1>

          <p className={`${styles.lede} hero-copy`}>
            Websites, web apps, automation scripts, API integrations, and AI-assisted build
            workflows for clients who need clean execution without losing control of the details.
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
              <h2 className={styles.panelTitle}>Pick the domain, then the build adapts.</h2>
            </div>
            <div className={styles.statusBadge}>
              <span className={styles.greenDot} />
              Available now
            </div>
          </div>

          <div className={styles.dropdownStack}>
            <HeroDropdown
              services={heroServiceDomains}
              selected={selectedDomain}
              onSelect={handleDomainSelect}
              label="Domain"
              placeholder="Choose a domain"
              ariaLabel="Service domains"
            />
            {selectedDomain ? (
              <HeroDropdown
                services={domainServices}
                selected={selected}
                onSelect={handleSelect}
                label="Service"
                placeholder="Choose a service"
                ariaLabel="Services"
              />
            ) : null}
          </div>

          <p ref={bodyRef} className={styles.panelBody}>
            {active.subtext}
          </p>

          {selected ? (
            <>
              <div className={styles.panelNote}>
                The first choice narrows the work category. The second choice aligns the video,
                budget, timeline, and first message with the exact service.
              </div>

              <div className={styles.formWrap}>
                <HeroForm selected={selected} />
              </div>

              <p className={styles.microTrust}>
                Response target: under 24 hours. Scope gets clarified before code starts moving.
              </p>
            </>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
