import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Calendar, GraduationCap, MapPin } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import CertCard from '@/components/CertCard/CertCard';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { aiCodingSkills } from '@/data/aiSkills';
import { techStack } from '@/data/stack';
import styles from './about.module.scss';

export const metadata = {
  title: 'About',
  description:
    'Radu-Stefan, 18-year-old software developer from Chisinau, Moldova. Three Certiport certifications, AI-assisted coding workflows, and shipped projects.',
};

const timeline = [
  {
    year: '2017',
    title: 'Started water polo',
    body: 'Discipline, repetition, and pressure tolerance started there long before I wrote production code.',
  },
  {
    year: '2020',
    title: 'Started learning front-end',
    body: 'HTML, CSS, and JavaScript turned the web from something I used into something I could shape.',
  },
  {
    year: '2023',
    title: 'Shifted the focus fully',
    body: 'The same training mindset moved into development: show up consistently, improve the details, ship finished work.',
  },
  {
    year: '2025',
    title: 'Certiport x3',
    body: 'Python, Databases, and Networking certifications added formal proof to the self-directed work.',
  },
  {
    year: '2026',
    title: 'Freelance-ready portfolio',
    body: 'The site becomes a client-facing system: live work, clearer offers, and a process designed to convert trust into projects.',
  },
];

export default function AboutPage() {
  return (
    <div className={`page-wrap ${styles.page}`}>
      <section className={`page-hero ${styles.hero}`}>
        <div className={`page-hero--split ${styles.heroInner}`}>
          <div className={styles.portraitColumn}>
            <div className={styles.portraitFrame}>
              <Image
                src="/images/profile.jpg"
                alt="Radu - Software Developer"
                width={400}
                height={400}
                priority
                className={styles.portraitImg}
              />
            </div>

            <div className={styles.metaCard}>
              <span className={styles.metaRow}>
                <MapPin size={14} /> Chisinau, Moldova
              </span>
              <span className={styles.metaRow}>
                <GraduationCap size={14} /> Step IT Academy
              </span>
              <span className={styles.metaRow}>
                <Calendar size={14} /> 18 y/o - building seriously since 2020
              </span>
            </div>
          </div>

          <div className={styles.copy}>
            <span className="page-kicker">About</span>
            <h1 className={`page-title ${styles.title}`}>
              Goalkeeper turned <strong>developer.</strong>
            </h1>
            <p className="page-lede">
              I build websites, interfaces, automations, and software workflows with the part
              clients care about most already wired in: discipline, clarity, responsiveness, and
              the instinct to finish the details properly before calling something done.
            </p>

            <div className={styles.bio}>
              <p>
                I am Radu-Stefan, based in Chisinau, Moldova, building with Next.js, React,
                TypeScript, SCSS, Python, APIs, and a steadily developing cybersecurity mindset.
              </p>
              <p>
                Three certifications, shipped public work, and real client delivery matter, but the
                real differentiator is how I approach the work itself: direct communication, calm
                process, and client trust earned through the result.
              </p>
            </div>

            <div className={styles.actions}>
              <MagneticButton href="/contact" variant="primary">
                Start a project
              </MagneticButton>
              <Link href="/projects" className="text-link">
                See live work <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Certifications</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  Real documents, <strong>not borrowed credibility.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                The certifications stay in their lane: they support the work, they do not replace
                it. Each PDF opens directly from the portfolio.
              </p>
            </div>
            <CertCard />
          </div>
        </SectionReveal>
      </section>

      <section className="section-shell section-shell--dark">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Timeline</span>
                <h2 className="section-title">
                  The path was short. <strong>The focus was not.</strong>
                </h2>
              </div>
              <p className="section-lede">
                The portfolio is young, but the working habits behind it are not impulsive. This is
                the progression that shaped how the work gets done.
              </p>
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
          </div>
        </SectionReveal>
      </section>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Stack</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  The tools behind the <strong>delivery standard.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                The stack stays intentionally focused. Claude Code and Codex are part of the
                delivery system, but every project is still reviewed, tested, and delivered by me.
              </p>
            </div>

            <div className={styles.stackGrid}>
              {techStack.map((item) => (
                <div key={item.name} className={styles.stackItem}>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            <div className={styles.aiSkillGrid}>
              {aiCodingSkills.map((item) => (
                <article key={item.tool} className={styles.aiSkillCard}>
                  <span className={styles.aiSkillLevel}>{item.level}</span>
                  <h3>{item.tool}</h3>
                  <p>{item.body}</p>
                  <div className={styles.aiSkillTags}>
                    {item.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="section-shell section-shell--dark">
        <div className="page-cta-band page-cta-band--photo">
          <h2>Need the short version? Hire the person who respects the details.</h2>
          <p>
            If the work needs to look clean, communicate clearly, and get deployed without drama,
            the next step is a brief.
          </p>
          <div className="page-cta-actions">
            <MagneticButton href="/contact" variant="primary">
              Start a project
            </MagneticButton>
            <MagneticButton href="/services" variant="secondary">
              See services
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
