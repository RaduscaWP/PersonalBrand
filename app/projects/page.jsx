import { ArrowUpRight } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import BentoGrid from '@/components/BentoGrid/BentoGrid';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { projects } from '@/data/projects';
import styles from './projects.module.scss';

export const metadata = {
  title: 'Projects',
  description:
    'Selected projects by Radu-Stefan: COSMOS, Arca AI, CryptoTrack, and Grozav Bank.',
};

function ProjectStudyShell({ variant }) {
  return (
    <div className={styles.studyShell} data-variant={variant} aria-hidden="true">
      <div className={styles.studyShellGlow} />
      <div className={styles.studyShellFrame}>
        <div className={styles.studyShellChrome}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.studyShellBody}>
          <div className={styles.studyShellSidebar}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={styles.studyShellMain}>
            <div className={styles.studyShellHero} />
            <div className={styles.studyShellRow}>
              <span />
              <span />
            </div>
            <div className={styles.studyShellMetrics}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.studyShellFloat} />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className={`page-wrap ${styles.page}`}>
      <header className={`page-hero ${styles.hero}`}>
        <span className="page-kicker">Projects</span>
        <h1 className="page-title">
          Live work that makes the hiring decision <strong>easier.</strong>
        </h1>
        <p className="page-lede">
          These projects show range without drifting away from the same standard: stronger
          structure, clearer interfaces, and a finish that feels usable instead of something that
          is almost there.
        </p>
      </header>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Featured Grid</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  Three primary case studies, <strong>one supporting concept.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                The bento layout keeps the most useful proof visible first: visual judgment, product
                taste, and the ability to ship something coherent in public.
              </p>
            </div>

            <div className={styles.gridWrap}>
              <BentoGrid projects={projects} />
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="section-shell section-shell--dark">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Case Notes</span>
                <h2 className="section-title">
                  What each build is <strong>actually proving.</strong>
                </h2>
              </div>
              <p className="section-lede">
                A strong portfolio should explain why the work matters, not just display it. Each
                summary below frames the real value behind the visuals.
              </p>
            </div>

            <div className={styles.studyList}>
              {projects.map((project, index) => (
                <article key={project.id} className={styles.studyCard}>
                  <div className={styles.studyIntro}>
                    <span className={styles.studyMeta}>{project.category}</span>
                    <h2 className={styles.studyTitle}>{project.title}</h2>
                    <p className={styles.studySummary}>{project.shortDescription}</p>

                    <div className={styles.studyTags}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.studyActions}>
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

                  <div className={styles.studyMedia}>
                    <ProjectStudyShell variant={(index % 4) + 1} />
                    <div className={styles.studyMediaOverlay} aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="section-shell section-shell--dark">
        <div className={`page-cta-band ${styles.ctaBand}`}>
          <h2>Want your project to be the next case study?</h2>
          <p>
            If the brief is clear already, send it. If it is not, I can help shape the right scope
            first and then build from there.
          </p>
          <div className="page-cta-actions">
            <MagneticButton href="/contact" variant="primary">
              Start a project
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
