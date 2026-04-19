import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import BentoGrid from '@/components/BentoGrid/BentoGrid';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { projects } from '@/data/projects';
import styles from './projects.module.scss';

export const metadata = {
  title: 'Projects',
  description:
    'Selected projects by Radu-Stefan: COSMOS (Three.js educational), Arca AI, CryptoTrack, Grozav Bank.',
};

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>/ Projects</span>
        <h1 className={styles.title}>
          What I&rsquo;ve <span className={styles.accent}>built.</span>
        </h1>
        <p className={styles.lede}>
          Four shipped projects — live and deployed. Each one pushed something: 3D rendering,
          API integration, financial dashboards, or a polished product concept. Hover a card and
          click through to the live site.
        </p>
      </header>

      <SectionReveal>
        <div className={styles.gridWrap}>
          <BentoGrid projects={projects} />
        </div>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.caseGrid}>
          {projects.map((p) => (
            <article key={p.id} className={styles.caseCard}>
              <div className={styles.caseHead}>
                <span className={styles.caseMeta}>{p.category}</span>
                <h2 className={styles.caseTitle}>{p.title}</h2>
              </div>
              <p className={styles.caseDesc}>{p.shortDescription}</p>
              <div className={styles.caseTags}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.caseLinks}>
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.caseLink}
                >
                  Live site <ArrowUpRight size={14} />
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.caseLinkMuted}
                >
                  GitHub <ArrowUpRight size={12} />
                </a>
              </div>
            </article>
          ))}
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Want your project next?</h2>
          <MagneticButton href="/contact" variant="primary">
            Start a project
          </MagneticButton>
        </section>
      </SectionReveal>
    </div>
  );
}
