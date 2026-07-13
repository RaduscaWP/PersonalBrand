'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { useMotion } from '@/components/motion/MotionProvider';
import { trackEvent } from '@/lib/analytics';
import styles from './ProjectNarrative.module.scss';

export default function ProjectNarrative({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const { reduceMotion } = useMotion();
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;

    const steps = [...root.querySelectorAll('[data-project-step]')];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible[0]) setActiveIndex(Number(visible[0].target.dataset.projectStep));
      },
      {
        rootMargin: '-26% 0px -46% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const jumpToProject = (event, project, index) => {
    setActiveIndex(index);
    const section = document.getElementById(`project-${project.slug}`);
    if (!section) return;

    section.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    if (event.detail === 0) {
      window.requestAnimationFrame(() => {
        section.querySelector('h2')?.focus({ preventScroll: true });
      });
    }
  };

  if (!activeProject) return null;

  const progress = projects.length > 1 ? (activeIndex / (projects.length - 1)) * 100 : 100;

  return (
    <div ref={rootRef} className={styles.root}>
      <nav className={styles.chapterNav} aria-label="Project chapters">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className={`${styles.chapterButton} ${index === activeIndex ? styles.chapterActive : ''}`}
            aria-current={index === activeIndex ? 'step' : undefined}
            onClick={(event) => jumpToProject(event, project, index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {project.title}
          </button>
        ))}
      </nav>

      <div className={styles.narrativeGrid}>
        <aside className={styles.mediaColumn} aria-hidden="true">
          <div className={styles.mediaSticky}>
            <div className={styles.mediaViewport} data-cursor="VIEW CASE">
              {activeProject.image ? (
                <Image
                  key={activeProject.id}
                  src={activeProject.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 0px, 52vw"
                  className={styles.activeImage}
                />
              ) : (
                <div className={styles.mediaUnavailable}>Preview unavailable</div>
              )}
              <div className={styles.mediaShade} />
              <div className={styles.mediaCaption}>
                <span>{activeProject.type}</span>
                <strong>{activeProject.title}</strong>
                <small>{activeProject.status}</small>
              </div>
            </div>

            <div className={styles.progressTrack}>
              <span style={{ '--project-progress': `${progress}%` }} />
            </div>
          </div>
        </aside>

        <div className={styles.storyColumn}>
          {projects.map((project, index) => {
            const active = index === activeIndex;

            return (
              <article
                key={project.id}
                id={`project-${project.slug}`}
                className={`${styles.story} ${active ? styles.storyActive : ''}`}
                data-project-step={index}
              >
                <div className={styles.mobileMedia}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(max-width: 1023px) 100vw, 0px"
                      className={styles.mobileImage}
                    />
                  ) : (
                    <div className={styles.mediaUnavailable}>Preview unavailable</div>
                  )}
                </div>

                <div className={styles.storyHeading}>
                  <span className={styles.storyIndex}>
                    {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                  <span className={styles.status}>{project.status}</span>
                </div>

                <p className={styles.eyebrow}>{project.type}</p>
                <h2 tabIndex={-1}>{project.title}</h2>
                <p className={styles.summary}>{project.shortDescription}</p>

                <dl className={styles.caseDetails}>
                  <div>
                    <dt>Problem</dt>
                    <dd>{project.problem}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>What I built</dt>
                    <dd>{project.whatBuilt}</dd>
                  </div>
                  <div>
                    <dt>Key decision</dt>
                    <dd>{project.keyDecision}</dd>
                  </div>
                </dl>

                <div className={styles.stack} aria-label={`${project.title} technology stack`}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.actions}>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_live_click', { project: project.slug })}
                    >
                      View {project.title} live <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <span className={styles.noLive}>Concept source only</span>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('project_github_click', { project: project.slug })}
                  >
                    <Github size={15} /> {project.title} on GitHub
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
