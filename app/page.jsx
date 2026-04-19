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
import styles from './page.module.scss';

const proofPoints = [
  {
    value: '4',
    label: 'Shipped projects',
    body: 'Live portfolio work you can open right now without waiting for a sales call.',
  },
  {
    value: '3',
    label: 'Certiport certifications',
    body: 'Python, Databases, and Networking credentials earned in 2025.',
  },
  {
    value: 'Public',
    label: 'Code and process',
    body: 'The GitHub footprint is visible, which matters more than invented praise.',
  },
];

export default function HomePage() {
  const previewServices = services.filter((s) => s.availability === 'now').slice(0, 4);
  const featured = projects.filter((p) => p.featured).slice(0, 3);

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
              I&rsquo;m Radu-Stefan — <span className={styles.hl}>Radusca</span>, 18, building websites
              from Chisinau. Six years as a national-level water polo goalkeeper taught me
              discipline. I&rsquo;m now applying the same focus to code: Next.js, React, SCSS,
              Python, and the security mindset that keeps modern products alive.
            </p>
            <p>
              Three Certiport certifications in Python, Databases, and Networking. Four shipped
              projects and counting. I don&rsquo;t publish half-done work.
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
              Six services live today. More shipping through 2026–2027 as my skill set grows.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {previewServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
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
        <section className={styles.projectsPreview}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ Featured Work</span>
            <h2 className={styles.sectionTitle}>Selected projects.</h2>
            <p className={styles.sectionLede}>
              A snapshot. The full catalogue lives on the projects page.
            </p>
          </div>

          <div className={styles.featuredGrid}>
            {featured.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                sizeClass={i === 0 ? styles.featuredLarge : ''}
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
            <span className={styles.eyebrow}>/ Testimonials</span>
            <h2 className={styles.sectionTitle}>
              No fake reviews. <span className={styles.accent}>Only public proof.</span>
            </h2>
            <p className={styles.sectionLede}>
              I am not filling this portfolio with invented praise. As client work stacks up, this
              section will earn real feedback. Until then, the work, the certifications, and the
              code stay public.
            </p>
          </div>

          <div className={styles.proofGrid}>
            {proofPoints.map((point) => (
              <article key={point.label} className={styles.proofCard}>
                <span className={styles.proofValue}>{point.value}</span>
                <h3 className={styles.proofLabel}>{point.label}</h3>
                <p className={styles.proofBody}>{point.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.testimonialsFooter}>
            <Link href="/projects" className={styles.textLink}>
              Review the work <ArrowUpRight size={14} />
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
            <span className={styles.eyebrowCentered}>/ Let&rsquo;s work</span>
            <h2 className={styles.ctaTitle}>
              Have a project in mind? <br />
              <span className={styles.accent}>I&rsquo;m ready to build it.</span>
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
