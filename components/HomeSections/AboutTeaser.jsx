import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, TimerReset, Workflow } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import styles from './HomeSections.module.scss';

const proofItems = [
  {
    icon: ShieldCheck,
    label: 'Clean delivery',
    value: 'Scope first, then build',
  },
  {
    icon: TimerReset,
    label: 'Fast communication',
    value: 'Replies usually inside 24h',
  },
  {
    icon: Workflow,
    label: 'Client-friendly process',
    value: 'Design, build, deploy, handoff',
  },
];

export default function AboutTeaser() {
  return (
    <section className="section-shell section-shell--light">
      <div className="section-inner">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutIntro}>
            <span className="section-kicker">About</span>
            <h2 className={`section-title ${styles.lightTitle}`}>
              Young on paper. <strong>Reliable in practice.</strong>
            </h2>
            <p className={`${styles.lightCopy} section-lede`}>
              I help founders, personal brands, and small teams ship websites, automations, and
              software workflows that feel considered from the first screen to the handoff.
            </p>

            <div className={styles.aboutProofs}>
              {proofItems.map(({ icon: Icon, label, value }) => (
                <article key={label} className={styles.aboutProofCard}>
                  <div className={styles.aboutProofIcon}>
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className={styles.aboutProofLabel}>{label}</p>
                    <p className={styles.aboutProofValue}>{value}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.aboutBody}>
            <p className={styles.lightCopy}>
              I am Radu-Stefan, an 18-year-old developer in Chisinau building with Next.js, React,
              TypeScript, SCSS, automation scripts, and AI-assisted coding workflows. The pitch is
              simple: clean execution, direct communication, and no half-finished work.
            </p>
            <p className={styles.lightCopy}>
              Six years as a national-level water polo goalkeeper shaped the part clients care
              about most: composure under pressure, consistency, and attention to the details that
              stop a project from feeling amateur.
            </p>

            <ul className={styles.aboutList}>
              <li>Responsive from line one, not fixed at the end.</li>
              <li>Scope gets clarified before code starts moving.</li>
              <li>Every build is prepared for deployment, validation, and clean handoff.</li>
            </ul>

            <div className={styles.sectionActions}>
              <MagneticButton href="/about" variant="primary">
                Read the full story
              </MagneticButton>
              <Link href="/projects" className={`text-link ${styles.lightLink}`}>
                See live work <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
