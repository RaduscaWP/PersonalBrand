import { Check, Clock } from 'lucide-react';
import MagneticButton from '../MagneticButton/MagneticButton';
import styles from './PricingCard.module.scss';

export default function PricingCard({ plan }) {
  return (
    <article className={`${styles.card} ${plan.highlight ? styles.highlight : ''}`}>
      {plan.highlight && <span className={styles.ribbon}>Most Popular</span>}

      <header className={styles.head}>
        <h3 className={styles.title}>{plan.service}</h3>
        <p className={styles.desc}>{plan.description}</p>
      </header>

      <div className={styles.priceRow}>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>{plan.billingLabel}</span>
          <span className={styles.price}>{plan.priceRange}</span>
        </div>
        <span className={styles.turnaround}>
          <Clock size={13} /> {plan.turnaround}
        </span>
      </div>

      <ul className={styles.features}>
        {plan.includes.map((item) => (
          <li key={item}>
            <Check size={15} className={styles.check} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className={styles.cta}>
        <MagneticButton
          href={`/contact?service=${plan.id}`}
          variant={plan.highlight ? 'primary' : 'secondary'}
        >
          Start a project
        </MagneticButton>
      </div>
    </article>
  );
}
