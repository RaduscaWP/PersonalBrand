'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { useMotion } from '@/components/motion/MotionProvider';
import { defaultHero, heroServiceDomains } from '@/data/heroServices';
import useMediaQuery from '@/hooks/useMediaQuery';
import { gsap, useGSAP } from '@/lib/motion/register';
import { motion } from '@/lib/motion/tokens';
import { canUseWebGL, reportWebGLFallback } from '@/lib/motion/webgl';
import { trackEvent } from '@/lib/analytics';
import HeroDropdown from './HeroDropdown';
import HeroForm from './HeroForm';
import HeroTitle from './HeroTitle';
import styles from './Hero.module.scss';

const fitLabels = ['Software developer', 'Web apps', 'Automations', 'AI-assisted workflow'];
const HERO_VIDEO_OPACITY = 0.64;

export default function HeroSection() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selected, setSelected] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSource, setVideoSource] = useState(defaultHero.video);
  const { introComplete, pointer, reduceMotion, saveData } = useMotion();
  const compactViewport = useMediaQuery('(max-width: 767px)', true);
  const allowVideo = !reduceMotion && !saveData && !compactViewport && !pointer.coarse;
  const allowParticles = introComplete && pointer.enhanced && allowVideo;
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const bodyRef = useRef(null);
  const canvasRef = useRef(null);
  const heroReadyRef = useRef(false);
  const briefStartedRef = useRef(false);

  const domainServices = selectedDomain?.services ?? [];
  const active = selected ?? selectedDomain ?? defaultHero;

  const signalHeroReady = useCallback(() => {
    if (heroReadyRef.current) return;
    heroReadyRef.current = true;
    window.dispatchEvent(new CustomEvent('radusca:hero-ready'));
  }, []);

  useEffect(() => {
    let secondFrame;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(signalHeroReady);
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [signalHeroReady]);

  useEffect(() => {
    if (allowVideo) return;
    videoRef.current?.pause();
    setVideoReady(false);
  }, [allowVideo]);

  useEffect(() => {
    if (!canvasRef.current || !allowParticles) {
      return undefined;
    }

    if (!canUseWebGL()) {
      reportWebGLFallback('hero-capability-check');
      return undefined;
    }

    let disposed = false;
    let cleanup;
    let idleId;

    const initialize = () => {
      import('@/lib/threeParticles')
        .then(({ initParticles }) => {
          if (disposed || !canvasRef.current) return;
          cleanup = initParticles(canvasRef.current);
        })
        .catch(() => reportWebGLFallback('dynamic-import'));
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(initialize, { timeout: 900 });
    } else {
      idleId = window.setTimeout(initialize, 260);
    }

    return () => {
      disposed = true;
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      cleanup?.();
    };
  }, [allowParticles]);

  useGSAP(
    () => {
      if (!rootRef.current || !introComplete) return undefined;

      const targets = rootRef.current.querySelectorAll(
        '.hero-badge, [data-hero-line], .hero-copy, .hero-chips, .hero-actions, .hero-panel',
      );
      if (reduceMotion) {
        gsap.set(targets, { clearProps: 'all' });
        return undefined;
      }

      const timeline = gsap.timeline({ defaults: { ease: motion.ease.strongOut } });
      timeline
        .from('.hero-badge', {
          y: motion.distance.reveal,
          autoAlpha: 0,
          duration: motion.duration.control,
        })
        .from(
          '[data-hero-line]',
          {
            yPercent: 105,
            autoAlpha: 0,
            duration: motion.duration.hero,
            stagger: motion.stagger.lines,
          },
          0.08,
        )
        .from(
          '.hero-copy',
          { y: 18, autoAlpha: 0, duration: motion.duration.reveal },
          0.32,
        )
        .from(
          '.hero-chips > *',
          {
            y: 10,
            autoAlpha: 0,
            duration: motion.duration.control,
            stagger: 0.05,
          },
          0.45,
        )
        .from(
          '.hero-actions',
          { y: 14, autoAlpha: 0, duration: motion.duration.control },
          0.54,
        )
        .from(
          '.hero-panel',
          {
            y: 24,
            scale: 0.985,
            autoAlpha: 0,
            duration: motion.duration.reveal,
          },
          0.6,
        );

      return timeline;
    },
    {
      scope: rootRef,
      dependencies: [introComplete, reduceMotion],
      revertOnUpdate: true,
    },
  );

  const updateHeroMedia = useCallback((item, onCommit) => {
    const video = videoRef.current;
    const body = bodyRef.current;
    const commit = () => {
      onCommit();
      setVideoSource(item.video);
      setVideoReady(false);
    };

    if (!video || !allowVideo) {
      commit();
      return;
    }

    gsap.killTweensOf([video, body]);
    gsap.to(video, {
      opacity: 0,
      duration: motion.duration.micro,
      onComplete: () => {
        commit();
        if (body) {
          window.requestAnimationFrame(() => {
            gsap.to(body, {
              y: 0,
              autoAlpha: 1,
              duration: motion.duration.control,
              ease: motion.ease.out,
            });
          });
        }
      },
    });

    if (!body) {
      return;
    }

    gsap.to(body, {
      y: -10,
      autoAlpha: 0,
      duration: motion.duration.instant,
    });
  }, [allowVideo]);

  const onVideoReady = useCallback(() => {
    if (!allowVideo || !videoRef.current) return;
    setVideoReady(true);
    videoRef.current.play().catch(() => undefined);
    gsap.to(videoRef.current, {
      opacity: HERO_VIDEO_OPACITY,
      duration: motion.duration.reveal,
      ease: motion.ease.out,
      overwrite: true,
    });
  }, [allowVideo]);

  const handleDomainSelect = (domain) => {
    if (!briefStartedRef.current) {
      briefStartedRef.current = true;
      trackEvent('interactive_brief_started', { domain: domain.id });
    }
    updateHeroMedia(domain, () => {
      setSelectedDomain(domain);
      setSelected(null);
    });
  };

  const handleSelect = (service) => {
    trackEvent('service_selected', {
      domain: selectedDomain?.id || '',
      service: service.id,
    });
    updateHeroMedia(service, () =>
      setSelected({
        ...service,
        domainId: selectedDomain?.id || '',
        domainLabel: selectedDomain?.label || '',
      }),
    );
  };

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      data-story-act="promise"
      style={{ '--hero-video-opacity': HERO_VIDEO_OPACITY }}
    >
      <video
        ref={videoRef}
        className={`${styles.videoBg} ${videoReady ? styles.videoReady : ''} ${!allowVideo ? styles.videoReduced : ''}`}
        src={allowVideo ? videoSource : undefined}
        autoPlay={allowVideo}
        muted
        loop={allowVideo}
        playsInline
        preload={allowVideo ? 'metadata' : 'none'}
        poster={active.fallbackImage || defaultHero.fallbackImage}
        aria-hidden="true"
        onLoadedData={onVideoReady}
        onCanPlay={onVideoReady}
        onError={() => setVideoReady(false)}
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

          <HeroTitle />

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
            <MagneticButton
              href="/contact"
              variant="primary"
              onClick={() => trackEvent('hero_start_project_click')}
            >
              Start a project
            </MagneticButton>
            <Link href="/projects" className="text-link" data-cursor="VIEW">
              See live work <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className={`${styles.panel} hero-panel`} data-story-act="adaptation">
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
        </div>
      </div>
    </section>
  );
}
