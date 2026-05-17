'use client';

import { ArrowUpRight, Github } from 'lucide-react';
import styles from './ProjectCard.module.scss';

function ProjectMediaShell() {
  return (
    <>
      <div className={styles.shellGlow} />
      <div className={styles.shellWindow}>
        <div className={styles.shellChrome}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.shellBody}>
          <div className={styles.shellRail}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.shellCanvas}>
            <div className={styles.shellHero} />
            <div className={styles.shellStats}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.shellGrid}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.orbit} />
      <div className={`${styles.orbit} ${styles.orbitSecondary}`} />
    </>
  );
}

export default function ProjectCard({ project, sizeClass = '' }) {
  return (
    <article
      className={`${styles.card} ${sizeClass}`}
      style={{ '--project-accent': project.accent || 'var(--accent)' }}
    >
      <div className={styles.media} aria-hidden="true">
        <ProjectMediaShell />
      </div>

      <div className={styles.gradient} aria-hidden="true" />

      <div className={styles.topBar}>
        <span className={styles.category}>{project.category}</span>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.arrow}
          aria-label={`${project.title} live site`}
        >
          <ArrowUpRight size={18} />
        </a>
      </div>

      <div className={styles.bottom}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className={styles.name}>{project.title}</h3>
        <p className={styles.description}>{project.shortDescription}</p>

        <div className={styles.actions}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghost}
            aria-label={`${project.title} GitHub repository`}
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            Live site <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
