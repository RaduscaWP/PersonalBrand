import Link from 'next/link';
import { ArrowUpRight, Info } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import PricingCard from '@/components/PricingCard/PricingCard';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { pricing } from '@/data/pricing';
import styles from './pricing.module.scss';

export const metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing by Radu-Stefan. Landing pages, Figma-to-code, UI/UX, full websites, web apps, SEO.',
};

const pricingFacts = [
  { label: 'Currency', value: 'USD or EUR' },
  { label: 'Deposit', value: '50% upfront' },
  { label: 'Response', value: 'Under 24 hours' },
  { label: 'Best fit', value: 'Founders and small teams' },
];

const faqs = [
  {
    q: 'How do I pay?',
    a: '50% upfront to start, 50% on delivery. Bank transfer, PayPal, or Wise. Invoiced in USD or EUR.',
  },
  {
    q: 'What if I need revisions?',
    a: 'Every package includes revision rounds. If the scope grows after approval, I confirm the extra cost before touching the work.',
  },
  {
    q: 'Do you own the code afterwards?',
    a: 'Yes. Once final payment clears, the code is yours. The handoff is part of the job, not a hidden extra.',
  },
  {
    q: 'Can you work with my existing codebase?',
    a: 'Yes, if the codebase is in a supported stack and the condition of the project makes a clean improvement path realistic.',
  },
];

export default function PricingPage() {
  return (
    <div className={`page-wrap ${styles.page}`}>
      <header className={`page-hero page-hero--photo ${styles.hero}`}>
        <span className="page-kicker">Pricing</span>
        <h1 className="page-title">
          Clear enough to trust, <strong>honest enough to keep flexible.</strong>
        </h1>
        <p className="page-lede">
          Public ranges give you a realistic starting point. Final quotes stay flexible because
          scope, content readiness, and integration depth change the work.
        </p>

        <div className={styles.notice}>
          <Info size={16} />
          <span>
            Starting ranges are shown in USD. Every project still gets a clear scope, timeline, and
            final quote before build work starts.
          </span>
        </div>

        <div className={styles.facts}>
          {pricingFacts.map((fact) => (
            <article key={fact.label} className={styles.fact}>
              <span className={styles.factLabel}>{fact.label}</span>
              <span className={styles.factValue}>{fact.value}</span>
            </article>
          ))}
        </div>
      </header>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Packages</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  Enough structure to compare. <strong>Enough honesty to trust.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                These ranges are built for market-entry freelance work: serious enough to signal
                quality, flexible enough for small teams and founders.
              </p>
            </div>

            <div className={styles.grid}>
              {pricing.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
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
                <span className="section-kicker">FAQ</span>
                <h2 className="section-title">
                  The questions clients usually ask <strong>before saying yes.</strong>
                </h2>
              </div>
              <p className="section-lede">
                This section is there to reduce hesitation: payment, revisions, ownership, and
                compatibility with an existing project.
              </p>
            </div>

            <div className={styles.faqList}>
              {faqs.map((item) => (
                <details key={item.q} className={styles.faqItem}>
                  <summary>
                    <span>{item.q}</span>
                    <span className={styles.plus} aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="section-shell section-shell--dark">
        <div className="page-cta-band page-cta-band--photo">
          <h2>Need a real quote instead of a public estimate?</h2>
          <p>
            Send the brief and I will turn it into a clear scope, timing expectation, and pricing
            path before any build work starts.
          </p>
          <div className="page-cta-actions">
            <MagneticButton href="/contact" variant="primary">
              Start a project
            </MagneticButton>
            <Link href="/services" className="text-link">
              See services <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
