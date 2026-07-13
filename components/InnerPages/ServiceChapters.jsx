'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { services } from '@/data/services';
import { trackEvent } from '@/lib/analytics';
import styles from './ServiceChapters.module.scss';

const serviceById = new Map(services.map((service) => [service.id, service]));

const chapters = [
  {
    id: 'web',
    number: '01',
    title: 'Web',
    eyebrow: 'Public-facing experiences',
    intro:
      'From a focused landing page to a complete website, the job is to make the offer clear, credible, and easy to act on.',
    serviceIds: ['landing-page', 'full-website', 'figma-to-code', 'uiux-design', 'seo'],
    outcomes: [
      'A clear path from first impression to enquiry',
      'Responsive delivery across common screen sizes',
      'SEO, forms, and deployment handled as one release',
    ],
    constraint:
      'Best when the offer and content owner are clear. Custom copy, motion, and integrations are scoped before the quote.',
    proof:
      'Fly With Derek is real client work: a production aviation advisory website built with React, TypeScript, Resend, and security hardening.',
    proofHref: 'https://flywithderek.com/',
    proofLabel: 'Visit flywithderek.com',
    ctaLabel: 'Brief a website',
    primaryService: 'full-website',
    visual: {
      type: 'image',
      src: '/images/projects/flywithderek-live.png',
      alt: 'Fly With Derek aviation advisory website shown in a desktop browser',
      label: 'Real client website',
      caption: 'Live production work · React + TypeScript + Resend',
    },
  },
  {
    id: 'automation',
    number: '02',
    title: 'Automation',
    eyebrow: 'Repeatable business flows',
    intro:
      'Bounded automations connect the tools a team already uses, remove repetitive hand-offs, and keep the flow understandable.',
    serviceIds: [
      'automation-scripts',
      'api-integrations',
      'workflow-automation',
      'email-workflows',
    ],
    outcomes: [
      'Fewer manual transfers between tools',
      'Consistent routing for forms, data, and notifications',
      'Visible integration points that can be maintained',
    ],
    constraint:
      'Best for a documented, repeatable workflow with known inputs. Enterprise RPA and unsupported scraping are not presented as ready-now offers.',
    proof:
      'The Fly With Derek contact path uses a server-side Next.js route and Resend so a website enquiry becomes a delivered email workflow.',
    proofHref: 'https://github.com/RaduscaWP/DerekMonti',
    proofLabel: 'Inspect the implementation',
    ctaLabel: 'Map an automation',
    primaryService: 'workflow-automation',
    visual: {
      type: 'flow',
      label: 'A shipped email flow',
      caption: 'Form → server route → Resend → inbox',
      steps: ['Website form', 'Next.js route', 'Resend API', 'Client inbox'],
    },
  },
  {
    id: 'internal-software',
    number: '03',
    title: 'Internal software',
    eyebrow: 'Focused operational tools',
    intro:
      'Dashboards and internal tools turn scattered information into one working surface built around the task, not a generic template.',
    serviceIds: ['web-app', 'internal-tools', 'ai-assisted-development'],
    outcomes: [
      'One interface for a specific operational workflow',
      'Clear data, status, and action hierarchy',
      'Maintainable React or Next.js structure',
    ],
    constraint:
      'Best for focused dashboards and admin workflows. Authentication, roles, integrations, and data depth are reviewed before pricing.',
    proof:
      'CryptoTrack is a live product interface that turns REST API market data into a responsive dashboard with prices, charts, and clear states.',
    proofHref: 'https://crypto-track-rho.vercel.app/',
    proofLabel: 'Open the live dashboard',
    ctaLabel: 'Scope an internal tool',
    primaryService: 'internal-tools',
    visual: {
      type: 'image',
      src: '/images/projects/cryptotrack-live.png',
      alt: 'CryptoTrack cryptocurrency market dashboard',
      label: 'Live data product',
      caption: 'REST API data · responsive dashboard UI',
    },
  },
];

function ChapterVisual({ chapter }) {
  if (chapter.visual.type === 'flow') {
    return (
      <figure className={`${styles.visual} ${styles.flowVisual}`}>
        <div className={styles.visualMeta}>
          <span>{chapter.visual.label}</span>
          <span>{chapter.visual.caption}</span>
        </div>
        <ol className={styles.flow} aria-label={chapter.visual.caption}>
          {chapter.visual.steps.map((step, index) => (
            <li key={step}>
              <span className={styles.flowNumber}>{String(index + 1).padStart(2, '0')}</span>
              <span>{step}</span>
              {index < chapter.visual.steps.length - 1 ? (
                <ChevronRight size={18} aria-hidden="true" />
              ) : null}
            </li>
          ))}
        </ol>
      </figure>
    );
  }

  return (
    <figure className={styles.visual}>
      <div className={styles.visualMeta}>
        <span>{chapter.visual.label}</span>
        <span>{chapter.visual.caption}</span>
      </div>
      <div className={styles.imageWrap}>
        <Image
          src={chapter.visual.src}
          alt={chapter.visual.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 760px"
          className={styles.image}
        />
      </div>
    </figure>
  );
}

export default function ServiceChapters() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const targets = chapters
      .map((chapter) => document.getElementById(`service-chapter-${chapter.id}`))
      .filter(Boolean);

    if (!targets.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.dataset.chapterId);
        }
      },
      {
        rootMargin: '-18% 0px -52% 0px',
        threshold: [0, 0.2, 0.45, 0.7],
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const jumpToChapter = (id) => {
    const target = document.getElementById(`service-chapter-${id}`);
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setActiveId(id);
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const moveRailFocus = (event, index) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = chapters.length - 1;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % chapters.length;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + chapters.length) % chapters.length;
    }

    buttonRefs.current[nextIndex]?.focus();
  };

  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);

  return (
    <div className={styles.storyLayout}>
      <div className={styles.rail}>
        <span className={styles.railKicker}>Choose a chapter</span>
        <nav className={styles.chapterNav} aria-label="Ready-now service chapters">
          <span
            className={`${styles.railIndicator} ${styles[`indicator${activeIndex}`]}`}
            aria-hidden="true"
          />
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              className={`${styles.chapterButton} ${
                chapter.id === activeId ? styles.chapterButtonActive : ''
              }`}
              aria-current={chapter.id === activeId ? 'step' : undefined}
              onClick={() => jumpToChapter(chapter.id)}
              onKeyDown={(event) => moveRailFocus(event, index)}
            >
              <span>{chapter.number}</span>
              <strong>{chapter.title}</strong>
            </button>
          ))}
        </nav>
        <p className={styles.railNote}>
          Everything in these three chapters is available to scope now.
        </p>
      </div>

      <div className={styles.chapters}>
        {chapters.map((chapter) => {
          const chapterServices = chapter.serviceIds
            .map((id) => serviceById.get(id))
            .filter(Boolean);

          return (
            <article
              key={chapter.id}
              id={`service-chapter-${chapter.id}`}
              data-chapter-id={chapter.id}
              className={styles.chapter}
              aria-labelledby={`service-chapter-title-${chapter.id}`}
            >
              <header className={styles.chapterHeader}>
                <div>
                  <span className={styles.chapterEyebrow}>
                    {chapter.number} · {chapter.eyebrow}
                  </span>
                  <h3 id={`service-chapter-title-${chapter.id}`}>{chapter.title}</h3>
                </div>
                <p>{chapter.intro}</p>
              </header>

              <ChapterVisual chapter={chapter} />

              <div className={styles.chapterBody}>
                <div>
                  <span className={styles.detailLabel}>Ready-now services</span>
                  <div className={styles.serviceList}>
                    {chapterServices.map((service) => (
                      <details key={service.id} className={styles.serviceItem}>
                        <summary>
                          <span className={styles.serviceBadge}>{service.badge}</span>
                          <strong>{service.title}</strong>
                          <span className={styles.servicePlus} aria-hidden="true">
                            +
                          </span>
                        </summary>
                        <p>{service.description}</p>
                      </details>
                    ))}
                  </div>
                </div>

                <div className={styles.outcomeColumn}>
                  <span className={styles.detailLabel}>What this should improve</span>
                  <ul className={styles.outcomes}>
                    {chapter.outcomes.map((outcome) => (
                      <li key={outcome}>
                        <Check size={16} aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.constraint}>
                    <span>Scope boundary</span>
                    <p>{chapter.constraint}</p>
                  </div>
                </div>
              </div>

              <footer className={styles.chapterFooter}>
                <div className={styles.proof}>
                  <span>Real proof</span>
                  <p>{chapter.proof}</p>
                  <a href={chapter.proofHref} target="_blank" rel="noopener noreferrer">
                    {chapter.proofLabel} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
                <Link
                  href={`/contact?service=${chapter.primaryService}`}
                  className={styles.chapterCta}
                  onClick={() =>
                    trackEvent('service_selected', {
                      service: chapter.primaryService,
                      source: 'services',
                    })
                  }
                >
                  {chapter.ctaLabel} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
