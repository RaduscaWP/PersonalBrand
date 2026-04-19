import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, GraduationCap, Calendar, Mail } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import CertCard from '@/components/CertCard/CertCard';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { techStack } from '@/data/stack';
import styles from './about.module.scss';

export const metadata = {
  title: 'About',
  description:
    'Radu-Stefan — 18-year-old full-stack developer from Chisinau, Moldova. Six years of water polo, three Certiport certifications, shipped projects.',
};

const timeline = [
  {
    year: '2017',
    title: 'Started water polo',
    body: 'Joined a serious team. Goalkeeper. Started learning what discipline actually costs.',
  },
  {
    year: '2020',
    title: 'First lines of code',
    body: 'HTML, CSS, JavaScript. The internet stopped being magic and started being buildable.',
  },
  {
    year: '2023',
    title: 'Team disbanded',
    body:
      'Six years of water polo ended abruptly. I redirected every bit of that training energy into development.',
  },
  {
    year: '2025',
    title: 'Certiport × 3',
    body:
      'Passed IT Specialist certifications in Python (720), Databases (743), and Networking (920/1000).',
  },
  {
    year: '2026',
    title: 'Freelance, seriously',
    body:
      'Four shipped projects, moving to Next.js and React full-time, opening for freelance clients.',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.portrait}>
            <div className={styles.portraitFrame}>
              <Image
                src="/images/profile.jpg"
                alt="Radu-Stefan"
                width={480}
                height={480}
                priority
                className={styles.portraitImg}
              />
            </div>
            <div className={styles.portraitMeta}>
              <span className={styles.monoRow}>
                <MapPin size={13} /> Chisinau, Moldova
              </span>
              <span className={styles.monoRow}>
                <GraduationCap size={13} /> Step IT Academy
              </span>
              <span className={styles.monoRow}>
                <Calendar size={13} /> 18 y/o · Since 2020
              </span>
            </div>
          </div>

          <div className={styles.intro}>
            <span className={styles.eyebrow}>/ About</span>
            <h1 className={styles.title}>
              Goalkeeper turned <span className={styles.accent}>developer.</span>
            </h1>

            <div className={styles.bio}>
              <p>
                I&rsquo;m <strong>Radu-Stefan</strong> — online, just Radusca. 18, based in Chisinau,
                Moldova. I build web experiences with Next.js, React, and a strong bias for clean
                CSS.
              </p>
              <p>
                For six years I played water polo at national level as a goalkeeper. When my team
                disbanded in 2023, the athletic discipline didn&rsquo;t go anywhere — it shifted
                into code. Show up every day, respect the reps, hold your position under pressure.
              </p>
              <p>
                I&rsquo;m now studying full-stack development at Step IT Academy while shipping
                freelance projects. I&rsquo;m learning cybersecurity alongside web work because a
                developer who understands attack surface ships safer products.
              </p>
            </div>

            <div className={styles.introActions}>
              <MagneticButton href="/contact" variant="primary">
                Get in touch <Mail size={14} />
              </MagneticButton>
              <MagneticButton
                href="https://github.com/RaduscaWP"
                variant="secondary"
                external
              >
                GitHub <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ Education & Certifications</span>
            <h2 className={styles.sectionTitle}>Three Certiport certifications.</h2>
            <p className={styles.sectionLede}>
              IT Specialist credentials, earned in 2025. View the original PDFs.
            </p>
          </div>
          <CertCard />
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ Timeline</span>
            <h2 className={styles.sectionTitle}>How I got here.</h2>
          </div>

          <ol className={styles.timeline}>
            {timeline.map((item) => (
              <li key={item.year} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{item.year}</span>
                <div className={styles.timelineBody}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ Tech Stack</span>
            <h2 className={styles.sectionTitle}>What I work with.</h2>
            <p className={styles.sectionLede}>
              Tools I use in production. The list grows as I ship.
            </p>
          </div>
          <div className={styles.stackGrid}>
            {techStack.map((t) => (
              <div key={t.name} className={styles.stackItem}>
                <span className={styles.stackName}>{t.name}</span>
              </div>
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.finalCta}>
          <h2 className={styles.ctaTitle}>Want the short version? Hire me.</h2>
          <div className={styles.ctaRow}>
            <MagneticButton href="/contact" variant="primary">
              Start a project
            </MagneticButton>
            <Link href="/projects" className={styles.textLink}>
              See my work <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}
