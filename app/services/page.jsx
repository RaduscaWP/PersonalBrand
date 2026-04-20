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
  const available = services.filter((service) => service.availability === 'now');
  const upcoming = services.filter((service) => service.availability !== 'now');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>/ Services</span>
        <h1 className={styles.title}>
          What I build, <span className={styles.accent}>today and next.</span>
        </h1>
        <p className={styles.lede}>
          Six services are ready now, with four more on a public roadmap through 2027. If you are
          hiring today, this page shows exactly what is live, what is not, and where I can help
          right away.
        </p>
      </header>

      <SectionReveal>
        <section>
          <div className={styles.rowHead}>
            <span className={styles.rowTag}>
              <span className={`${styles.dot} ${styles.dotGreen}`} />
              Available now
            </span>
            <span className={styles.rowCount}>{available.length} services</span>
          </div>
          <div className={styles.grid}>
            {available.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section>
          <div className={styles.rowHead}>
            <span className={styles.rowTag}>
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              Roadmap
            </span>
            <span className={styles.rowCount}>{upcoming.length} coming</span>
          </div>
          <div className={styles.grid}>
            {upcoming.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Not sure which service fits your project?</h2>
          <p className={styles.ctaLede}>
            Send me what you want to build. I&apos;ll point you toward the right package honestly,
            even if that means starting smaller.
          </p>
          <div className={styles.ctaRow}>
            <MagneticButton href="/contact" variant="primary">
              Get a recommendation
            </MagneticButton>
            <Link href="/pricing" className={styles.textLink}>
              See pricing <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}
