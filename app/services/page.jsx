import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { services } from '@/data/services';
import styles from './services.module.scss';

export const metadata = {
  title: 'Services',
  description:
    "Services available from Radu-Stefan: landing pages, Figma-to-code, UI/UX, full websites, web apps, SEO. Plus a roadmap of what's coming.",
};

export default function ServicesPage() {
  const signature = services
    .filter((service) => service.availability === 'now' && service.previewOrder)
    .sort((left, right) => left.previewOrder - right.previewOrder);
  const supporting = services.filter(
    (service) => service.availability === 'now' && !service.previewOrder,
  );
  const roadmap = services.filter((service) => service.availability !== 'now');

  return (
    <div className={`page-wrap ${styles.page}`}>
      <header className={`page-hero page-hero--center page-hero--photo ${styles.hero}`}>
        <span className="page-kicker">Services</span>
        <h1 className="page-title">
          Clear offers, clear outcomes, <strong>no vague freelancing language.</strong>
        </h1>
        <p className="page-lede">
          The service list is designed to help a client self-identify the right offer quickly. What
          is available now is separated from what is still on the roadmap.
        </p>
      </header>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Available Now</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  The four flagship offers <strong>ready to sell today.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                These are the offers that should carry the portfolio. They are concrete, visual, and
                easy for a client to understand without extra explanation.
              </p>
            </div>

            <div className={styles.signatureGrid}>
              {signature.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  active={service.featured}
                />
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="section-shell section-shell--dark">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Supporting Work</span>
                <h2 className="section-title">
                  Extra capability without <strong>muddying the offer.</strong>
                </h2>
              </div>
              <p className="section-lede">
                These are still available for the right project, but they should not compete with
                the main conversion-focused homepage offers.
              </p>
            </div>

            <div className={styles.capabilityGrid}>
              {supporting.map((service) => (
                <article key={service.id} className={styles.capabilityCard}>
                  <span className={styles.capabilityLabel}>{service.label}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Roadmap</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  Publicly honest about <strong>what is not for sale yet.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                The roadmap signals ambition without pretending the skill is already commercially
                mature. That honesty improves trust rather than reducing it.
              </p>
            </div>

            <div className={styles.roadmapGrid}>
              {roadmap.map((service) => (
                <article key={service.id} className={styles.roadmapCard}>
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
