import Image from 'next/image';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import ProjectNarrative from '@/components/InnerPages/ProjectNarrative';
import { projects } from '@/data/projects';
import { createMetadata } from '@/lib/metadata';
import { createBreadcrumbStructuredData, serializeStructuredData } from '@/lib/structuredData';
import styles from './projects.module.scss';

export const metadata = createMetadata({
  title: 'Projects',
  description:
    'Explore Radu-Stefan’s selected client and product work, including Fly With Derek, COSMOS, Arca AI, CryptoTrack, and Grozav Bank.',
  path: '/projects',
  image: '/images/projects/flywithderek-live.png',
  imageWidth: 1440,
  imageHeight: 900,
  imageAlt: 'Fly With Derek client website built by Radu-Stefan',
});

const breadcrumbStructuredData = createBreadcrumbStructuredData([
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
]);

export default function ProjectsPage() {
  return (
    <div className={`page-wrap ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumbStructuredData) }}
      />
      <header className={`page-hero ${styles.hero}`}>
        <div className={styles.heroMedia} aria-hidden="true">
          <Image
            src="/images/projects/flywithderek-live.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className={styles.heroImage}
          />
        </div>
        <span className="page-kicker">Projects</span>
        <h1 className="page-title">
          The work, the decisions, and <strong>what each build proves.</strong>
        </h1>
        <p className="page-lede">
          Start with a shipped client website, then move through technical depth, product data,
          positioning, and clearly labelled concept work. No invented metrics and no duplicate
          gallery.
        </p>
      </header>

      <section className="section-shell section-shell--light">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="section-kicker">Case study narrative</span>
              <h2 className={`section-title ${styles.lightTitle}`}>
                Real client work first. <strong>Every chapter earns its place.</strong>
              </h2>
            </div>
            <p className={`${styles.lightCopy} section-lede`}>
              Each chapter names the problem, my role, the build, and one decision that shaped the
              result. Media stays fixed on desktop and returns to a natural reading order on touch
              devices.
            </p>
          </div>

          <ProjectNarrative projects={projects} />
        </div>
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
