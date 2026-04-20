import { ArrowUpRight } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import BentoGrid from '@/components/BentoGrid/BentoGrid';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { projects } from '@/data/projects';
import styles from './projects.module.scss';

export const metadata = {
  title: 'Projects',
  description:
    'Selected projects by Radu-Stefan: COSMOS, Arca AI, CryptoTrack, and Grozav Bank, now with deeper case-study context.',
};

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>/ Projects</span>
        <h1 className={styles.title}>
          Work that already <span className={styles.accent}>proves the point.</span>
        </h1>
        <p className={styles.lede}>
          Four shipped projects, each showing a different strength: storytelling, product
          positioning, live data, or polished fintech presentation. The grid gives the snapshot.
          The case studies show the thinking behind it.
        </p>
      </header>

      <SectionReveal>
        <div className={styles.gridWrap}>
          <BentoGrid projects={projects} />
        </div>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.studyList}>
          {projects.map((project) => (
            <article key={project.id} className={styles.studyCard}>
              <div className={styles.studyIntro}>
                <div className={styles.studyHead}>
                  <span className={styles.studyMeta}>{project.category}</span>
                  <h2 className={styles.studyTitle}>{project.title}</h2>
                </div>

                <p className={styles.studySummary}>{project.shortDescription}</p>

                <div className={styles.studyTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.studyLinks}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.caseLink}
                  >
                    Live site <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.caseLinkMuted}
                  >
                    GitHub <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              <div className={styles.studyBody}>
                <div className={styles.studyGrid}>
                  <div className={styles.studyBlock}>
                    <span className={styles.blockLabel}>Problem</span>
                    <p>{project.problem}</p>
                  </div>

                  <div className={styles.studyBlock}>
                    <span className={styles.blockLabel}>Solution</span>
                    <p>{project.solution}</p>
                  </div>

                  <div className={`${styles.studyBlock} ${styles.studyBlockWide}`}>
                    <span className={styles.blockLabel}>Outcome</span>
                    <p>{project.outcome}</p>
                  </div>
                </div>

                <div className={styles.highlightBlock}>
                  <span className={styles.blockLabel}>Result highlights</span>
                  <ul className={styles.highlightList}>
                    {project.resultHighlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Want your project to be the next case study?</h2>
          <p className={styles.ctaLede}>
            If you already know what you need, send the brief. If you do not, I can help shape the
            right scope first.
          </p>
          <MagneticButton href="/contact" variant="primary">
            Start a project
          </MagneticButton>
        </section>
      </SectionReveal>
    </div>
  );
}
