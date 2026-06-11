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
    "Services available from Radu-Stefan: websites, React apps, automation scripts, API integrations, email workflows, UI/UX, and SEO.",
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
          Software services with clear outcomes, <strong>not vague freelancing language.</strong>
        </h1>
        <p className="page-lede">
          Websites are still a core offer, but the work now covers the larger software layer too:
          automations, scripts, integrations, internal tools, and AI-assisted delivery.
        </p>
      </header>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Available Now</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  The website-facing offers <strong>ready to sell today.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                These stay at the top because they are easiest for clients to recognize quickly:
                pages, websites, Figma implementation, and interface design.
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
                <span className="section-kicker">Software & Automation</span>
                <h2 className="section-title">
                  Scripts, integrations, and tools <strong>below the web layer.</strong>
                </h2>
              </div>
              <p className="section-lede">
                This is where the portfolio expands from web design into software development:
                business automation, API connections, email flows, and internal systems.
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
