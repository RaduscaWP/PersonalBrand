'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { defaultHero, heroServiceDomains } from '@/data/heroServices';
import HeroDropdown from './HeroDropdown';
import HeroForm from './HeroForm';
import HeroTitle from './HeroTitle';
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
  const [reduceMotion, setReduceMotion] = useState(false);
  const videoRef = useRef(null);
  const bodyRef = useRef(null);
  const canvasRef = useRef(null);

  const domainServices = selectedDomain?.services ?? [];
  const active = selected ?? selectedDomain ?? defaultHero;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener?.('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!reduceMotion) return;
    videoRef.current?.pause();
    setVideoReady(false);
  }, [reduceMotion]);

  useEffect(() => {
    if (!canvasRef.current || window.innerWidth < 768 || reduceMotion || prefersReducedMotion()) {
      return undefined;
    }
    let disposed = false;
    let cleanup;

    import('@/lib/threeParticles').then(({ initParticles }) => {
      if (disposed || !canvasRef.current) return;
      cleanup = initParticles(canvasRef.current);
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.08 });
      timeline
        .from('.hero-badge', { y: 18, opacity: 0, duration: 0.32 })
        .from('.hero-title', { y: 20, opacity: 0, duration: 0.38, ease: 'power3.out' }, '-=0.14')
        .from('.hero-copy', { y: 18, opacity: 0, duration: 0.34, ease: 'power3.out' }, '-=0.22')
        .from('.hero-chips', { y: 14, opacity: 0, duration: 0.28 }, '-=0.2')
        .from('.hero-actions', { y: 12, opacity: 0, duration: 0.28 }, '-=0.18')
        .from('.hero-panel', { x: 28, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.34');
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  const updateHeroMedia = (item, onCommit) => {
    const video = videoRef.current;
    const body = bodyRef.current;

    if (!video || reduceMotion || prefersReducedMotion()) {
      if (video) {
        video.pause();
        setVideoReady(false);
        video.src = item.video;
        video.load();
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
        if (!reduceMotion) video.play().catch(() => {});
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
        className={`${styles.videoBg} ${videoReady ? styles.videoReady : ''} ${reduceMotion ? styles.videoReduced : ''}`}
        src={defaultHero.video}
        autoPlay={!reduceMotion}
        muted
        loop={!reduceMotion}
        playsInline
        preload="metadata"
        poster={active.fallbackImage || defaultHero.fallbackImage}
        aria-hidden="true"
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

          <HeroTitle reduceMotion={reduceMotion} />

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
