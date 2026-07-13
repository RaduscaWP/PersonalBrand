'use client';

import { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import PricingCard from '@/components/PricingCard/PricingCard';
import styles from './PricingExplorer.module.scss';

const planContext = {
  'landing-page': {
    category: 'website',
    bestFor: 'Focused launches',
    deliverable: 'Responsive single-page build',
  },
  'figma-to-code': {
    category: 'website',
    bestFor: 'Teams with approved UI',
    deliverable: 'Responsive production frontend',
  },
  'full-website': {
    category: 'website',
    bestFor: 'Growing service businesses',
    deliverable: 'Up to six production pages',
  },
  'uiux-design': {
    category: 'product',
    bestFor: 'Teams shaping a product',
    deliverable: 'Figma system + mobile variants',
  },
  'web-app': {
    category: 'product',
    bestFor: 'Interactive workflows',
    deliverable: 'Scoped React / Next.js application',
  },
  seo: {
    category: 'ongoing',
    bestFor: 'Existing websites',
    deliverable: 'Monthly technical SEO management',
  },
};

const categories = [
  { id: 'all', label: 'All packages' },
  { id: 'website', label: 'Website' },
  { id: 'product', label: 'Product' },
  { id: 'ongoing', label: 'Ongoing' },
];

export default function PricingExplorer({ plans }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredPlans = plans.filter(
    (plan) => activeCategory === 'all' || planContext[plan.id]?.category === activeCategory,
  );
  const activeLabel = categories.find((category) => category.id === activeCategory)?.label;
  const resultsLabel = activeCategory === 'all' ? 'All pricing packages' : `${activeLabel} packages`;
  const statusLabel =
    activeCategory === 'all'
      ? 'pricing packages'
      : `${activeLabel.toLowerCase()} ${filteredPlans.length === 1 ? 'package' : 'packages'}`;

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <div>
          <span className={styles.filterLabel}>Compare by need</span>
          <div className={styles.filters} role="group" aria-label="Filter pricing packages">
            {categories.map((category) => {
              const count =
                category.id === 'all'
                  ? plans.length
                  : plans.filter((plan) => planContext[plan.id]?.category === category.id).length;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.filterButton} ${
                    activeCategory === category.id ? styles.filterButtonActive : ''
                  }`}
                  aria-pressed={activeCategory === category.id}
                  aria-controls="pricing-results"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.label}</span>
                  <span className={styles.filterCount} aria-hidden="true">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className={styles.toolbarCopy}>
          Prices stay visible as written. The selector only shortens the comparison.
        </p>
      </div>

      <p className={styles.status} role="status" aria-live="polite" aria-atomic="true">
        Showing {filteredPlans.length} {statusLabel}.
      </p>

      <section className={styles.comparison} aria-labelledby="pricing-comparison-title">
        <div className={styles.comparisonIntro}>
          <span className={styles.filterLabel}>Quick comparison</span>
          <h3 id="pricing-comparison-title">Best fit, handoff, timing, and range.</h3>
        </div>

        <ul className={styles.comparisonList}>
          {filteredPlans.map((plan) => {
            const context = planContext[plan.id];

            return (
              <li key={plan.id} className={styles.comparisonRow}>
                <div className={styles.planCell}>
                  <strong>{plan.service}</strong>
                  <a
                    href={`#package-${plan.id}`}
                    aria-label={`Jump to ${plan.service} package details`}
                  >
                    Package details <ArrowDownRight size={14} aria-hidden="true" />
                  </a>
                </div>
                <div>
                  <span>Best for</span>
                  <strong>{context.bestFor}</strong>
                </div>
                <div>
                  <span>Core deliverable</span>
                  <strong>{context.deliverable}</strong>
                </div>
                <div>
                  <span>Timeline</span>
                  <strong>{plan.turnaround}</strong>
                </div>
                <div>
                  <span>Starting range</span>
                  <strong className={styles.range}>{plan.priceRange}</strong>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div
        id="pricing-results"
        className={styles.grid}
        role="region"
        aria-label={resultsLabel}
      >
        {filteredPlans.map((plan) => (
          <div key={plan.id} id={`package-${plan.id}`} className={styles.packageAnchor}>
            <PricingCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
}
