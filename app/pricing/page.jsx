import Link from 'next/link';
import { Info, ArrowUpRight } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import PricingCard from '@/components/PricingCard/PricingCard';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { pricing, pricingAddOns } from '@/data/pricing';
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
  { label: 'Best fit', value: 'Early-stage and small business' },
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
    a: 'Yes. Once final payment clears, the code is 100% yours - MIT-licensed or proprietary, your call.',
  },
  {
    q: 'Can you work with my existing codebase?',
    a: "Yes, provided it's in a supported stack (React, Next.js, vanilla HTML/CSS/JS). I review the codebase first, then quote from there.",
  },
];

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>/ Pricing</span>
        <h1 className={styles.title}>
          Clear pricing. <span className={styles.accent}>Starter-friendly by design.</span>
        </h1>
        <p className={styles.lede}>
          These are entry-level public ranges built for founders, personal brands, and small
          businesses that need strong work without agency-sized pricing. Once the scope is clear,
          you get a fixed quote before any build starts.
        </p>

        <div className={styles.notice}>
          <Info size={16} />
          <span>
            Extra pages, CMS setup, heavier animation, or faster timelines can shift the final
            quote. Nothing moves without approval first.
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

      <SectionReveal>
        <section className={styles.grid}>
          {pricing.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.addOns}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ Add-ons</span>
            <h2 className={styles.sectionTitle}>Useful extras when the scope grows.</h2>
            <p className={styles.sectionLede}>
              A compact menu of common additions so the quote stays predictable even when the build
              expands.
            </p>
          </div>

          <div className={styles.addOnGrid}>
            {pricingAddOns.map((item) => (
              <article key={item.id} className={styles.addOnCard}>
                <div className={styles.addOnHead}>
                  <h3 className={styles.addOnTitle}>{item.label}</h3>
                  <span className={styles.addOnPrice}>{item.priceRange}</span>
                </div>
                <p className={styles.addOnBody}>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.faq}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>/ FAQ</span>
            <h2 className={styles.sectionTitle}>Things clients usually ask.</h2>
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
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Ready for a real quote?</h2>
          <div className={styles.ctaRow}>
            <MagneticButton href="/contact" variant="primary">
              Start a project
            </MagneticButton>
            <Link href="/services" className={styles.textLink}>
              See what&apos;s included <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}
