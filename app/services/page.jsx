import Link from 'next/link';
import { ArrowUpRight, FlaskConical } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import ServiceChapters from '@/components/InnerPages/ServiceChapters';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { services } from '@/data/services';
import { createMetadata } from '@/lib/metadata';
import styles from './services.module.scss';

export const metadata = createMetadata({
  title: 'Services',
  description:
    'Websites, web applications, Figma-to-code, automation, API integrations, and UI implementation delivered by Radu-Stefan.',
  path: '/services',
  image: '/images/hero-website.jpg',
  imageAlt: 'Website and software development services by Radu-Stefan',
});

export default function ServicesPage() {
  const roadmap = services.filter((service) => service.availability !== 'now');

  return (
    <div className={`page-wrap ${styles.page}`}>
      <header className={`page-hero page-hero--center page-hero--photo ${styles.hero}`}>
        <span className="page-kicker">Services</span>
        <h1 className="page-title">
          Software services with clear outcomes, <strong>not vague freelancing language.</strong>
        </h1>
        <p className="page-lede">
          Websites are still a core offer, but the work now covers the larger software layer too:
          automations, scripts, integrations, internal tools, and AI-assisted delivery.
        </p>
      </header>

      <section className={`section-shell section-shell--dark ${styles.chapterSection}`}>
        <div className="section-inner">
          <div className="section-head">
            <div>
              <span className="section-kicker">Available Now</span>
              <h2 className="section-title">
                Three ways to turn a business problem <strong>into working software.</strong>
              </h2>
            </div>
            <p className="section-lede">
              Follow the chapter closest to the outcome you need. Each one shows the exact offers,
              a real proof point, and the boundary I would clarify before quoting.
            </p>
          </div>

          <ServiceChapters />
        </div>
      </section>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Roadmap</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  Learning in public, <strong>not selling ahead of proof.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                These capabilities are still being developed. They are shown as direction only and
                are not currently offered as standalone commercial services.
              </p>
            </div>

            <div className={styles.roadmapNotice}>
              <FlaskConical size={18} aria-hidden="true" />
              <span>Learning roadmap · Not currently bookable</span>
            </div>

            <div
              className={styles.roadmapTimeline}
              role="list"
              aria-label="Learning roadmap, not currently bookable"
            >
              {roadmap.map((service) => (
                <article key={service.id} className={styles.roadmapCard} role="listitem">
                  <span className={styles.roadmapDot} aria-hidden="true" />
                  <span className={styles.roadmapMeta}>{service.label}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>

            <div className={styles.actions}>
              <MagneticButton href="/contact" variant="primary">
                Get a recommendation
              </MagneticButton>
              <Link href="/pricing" className={`text-link ${styles.lightLink}`}>
                See pricing <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
