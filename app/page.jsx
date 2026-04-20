import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Hero from '@/components/Hero/Hero';
import StatsBar from '@/components/StatsBar/StatsBar';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Marquee from '@/components/Marquee/Marquee';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { techStack } from '@/data/stack';
import { testimonials } from '@/data/testimonials';
import styles from './page.module.scss';

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    body: 'You tell me what you need, what already exists, and what the project has to achieve.',
  },
  {
    step: '02',
    title: 'Scope',
    body: 'I turn that into a clear package, timeline, and quote before any build work starts.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'The project is built with regular progress, focused revisions, and a clean handoff in mind.',
  },
  {
    step: '04',
    title: 'Launch',
    body: 'We polish the last details, deploy cleanly, and make sure the result is ready to use.',
  },
];

const trustBadges = [
  'Available now',
  'Replies in 24h',
  '4 live projects',
  '3 certifications',
  'Public GitHub',
  'Vercel deployed',
];

export default function HomePage() {
  const previewServices = services.filter((service) => service.availability === 'now').slice(0, 4);
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <>
      <Hero />
      <StatsBar />

      <SectionReveal>
        <section className={styles.aboutTeaser}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ About</span>
            <h2 className={styles.sectionTitle}>
              Young, but already <span className={styles.accent}>serious</span> about the craft.
            </h2>
          </div>

          <div className={styles.aboutBody}>
            <p>
              I&apos;m Radu-Stefan - <span className={styles.hl}>Radusca</span>, 18, building websites
              from Chisinau. Six years as a national-level water polo goalkeeper taught me
              discipline. I&apos;m now applying the same focus to code: Next.js, React, SCSS,
              Python, and the security mindset that keeps modern products alive.
            </p>
            <p>
              Three Certiport certifications in Python, Databases, and Networking. Four shipped
              projects and counting. I don&apos;t publish half-done work.
            </p>

            <div className={styles.aboutActions}>
              <MagneticButton href="/about" variant="secondary">
                Read the full story <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.servicesPreview}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ Services</span>
            <h2 className={styles.sectionTitle}>What I build for clients.</h2>
            <p className={styles.sectionLede}>
              Six services live today. More shipping through 2026-2027 as my skill set grows.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {previewServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className={styles.sectionFooter}>
            <Link href="/services" className={styles.textLink}>
              See all 10 services <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.processSection}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ How I Work</span>
            <h2 className={styles.sectionTitle}>Clear process, calm collaboration.</h2>
            <p className={styles.sectionLede}>
              You should know how a project moves before you hire me. The workflow stays simple,
              transparent, and easy to trust.
            </p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((item) => (
              <article key={item.step} className={styles.processStep}>
                <span className={styles.processNumber}>{item.step}</span>
                <h3 className={styles.processTitle}>{item.title}</h3>
                <p className={styles.processBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.projectsPreview}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ Featured Work</span>
            <h2 className={styles.sectionTitle}>Selected projects.</h2>
            <p className={styles.sectionLede}>
              A snapshot of the work already live. The full page now goes deeper into the case
              studies behind it.
            </p>
          </div>

          <div className={styles.featuredGrid}>
            {featured.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                sizeClass={index === 0 ? styles.featuredLarge : ''}
              />
            ))}
          </div>

          <div className={styles.sectionFooter}>
            <Link href="/projects" className={styles.textLink}>
              View all projects <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </SectionReveal>

      <section className={styles.stackSection}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>/ Tech Stack</span>
          <h2 className={styles.sectionTitle}>The tools I reach for.</h2>
        </div>
        <Marquee items={techStack} />
      </section>

      <SectionReveal>
        <section className={styles.testimonials}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ Proof</span>
            <h2 className={styles.sectionTitle}>
              Real proof first. <span className={styles.accent}>Testimonials can come later.</span>
            </h2>
            <p className={styles.sectionLede}>
              Until paid client quotes arrive, the strongest thing I can show is work that is
              already public, technical foundations that are verifiable, and a process that feels
              clear from the first message.
            </p>
          </div>

          <div className={styles.trustBadgeRow}>
            {trustBadges.map((badge) => (
              <span key={badge} className={styles.trustBadge}>
                {badge}
              </span>
            ))}
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((item) => (
              <article key={item.id} className={styles.testimonialCard}>
                <span className={styles.testimonialBadge}>{item.badge}</span>
                <p className={styles.testimonialQuote}>{item.quote}</p>

                <div className={styles.testimonialMeta}>
                  <span className={styles.testimonialName}>{item.author}</span>
                  <span className={styles.testimonialRole}>{item.role}</span>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.testimonialsFooter}>
            <Link href="/projects" className={styles.textLink}>
              Review the case studies <ArrowUpRight size={14} />
            </Link>
            <a
              href="https://github.com/RaduscaWP"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              Open GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.finalCta}>
          <div className={styles.ctaCard}>
            <span className={styles.eyebrowCentered}>/ Let&apos;s work</span>
            <h2 className={styles.ctaTitle}>
              Have a project in mind? <br />
              <span className={styles.accent}>I&apos;m ready to build it.</span>
            </h2>
            <p className={styles.ctaLede}>
              Open for freelance work worldwide. Typical response under 24 hours.
            </p>
            <div className={styles.ctaButtons}>
              <MagneticButton href="/contact" variant="primary">
                Start a project
              </MagneticButton>
              <MagneticButton href="/pricing" variant="secondary">
                See pricing
              </MagneticButton>
            </div>
          </div>
        </section>
      </SectionReveal>
    </>
  );
}
