'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import styles from './ProjectCard.module.scss';

export default function ProjectCard({ project, sizeClass = '' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      className={`${styles.card} ${sizeClass}`}
      style={{ '--project-accent': project.accent || 'var(--accent)' }}
      aria-label={`${project.title} — ${project.category}`}
    >
      <img
        src={project.image}
        alt=""
        aria-hidden="true"
        className={styles.image}
        onLoad={() => setLoaded(true)}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div className={styles.placeholder} aria-hidden="true">
        <span className={styles.placeholderLabel}>{project.category}</span>
        <span className={styles.placeholderTitle}>{project.title}</span>
      </div>

      <div className={styles.gradient} aria-hidden="true" />

      <div className={styles.arrow}>
        <ArrowUpRight size={22} />
      </div>

      <div className={styles.overlay}>
        <p>{project.shortDescription}</p>
      </div>

      <div className={styles.bottom}>
        <div className={styles.tags}>
          {project.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
        <span className={styles.category}>{project.category}</span>
        <h3 className={styles.name}>{project.title}</h3>
      </div>

      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <Link
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ghBtn}
          aria-label={`${project.title} on GitHub`}
        >
          <Github size={14} />
        </Link>
      </div>
    </a>
  );
}
