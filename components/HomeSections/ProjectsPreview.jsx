import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import { projects } from '@/data/projects';
import styles from './HomeSections.module.scss';

export default function ProjectsPreview() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section className="section-shell section-shell--dark">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <span className="section-kicker">Selected Work</span>
            <h2 className="section-title">
              Work that already <strong>proves the point.</strong>
            </h2>
          </div>
          <p className="section-lede">
            Live projects across client delivery, education, AI product positioning, and dashboards.
            The goal is not to show everything, only the work that helps a client trust the next
            build.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              sizeClass={index === 0 ? styles.projectCardLarge : ''}
            />
          ))}
        </div>

        <div className={styles.sectionActions}>
          <MagneticButton href="/contact" variant="primary">
            Start a project
          </MagneticButton>
          <Link href="/projects" className="text-link">
            View all projects <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
