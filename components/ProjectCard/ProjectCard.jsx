import Image from 'next/image';
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
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            loading={project.id === 1 ? 'eager' : 'lazy'}
            className={styles.projectImage}
          />
        ) : (
          <ProjectMediaShell />
        )}
      </div>

      <div className={styles.gradient} aria-hidden="true" />

      <div className={styles.topBar}>
        <span className={styles.category}>{project.category}</span>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.arrow}
            aria-label={`${project.title} live site`}
          >
            <ArrowUpRight size={18} />
          </a>
        ) : null}
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
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Live site <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className={styles.unavailable}>Concept preview</span>
          )}
        </div>
      </div>
    </article>
  );
}
