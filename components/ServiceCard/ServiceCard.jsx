import * as Icons from 'lucide-react';
import styles from './ServiceCard.module.scss';

const availabilityToStatus = {
  now:           { key: 'green',  label: 'Available Now' },
  'summer-2026': { key: 'yellow', label: 'Summer 2026' },
  'fall-2026':   { key: 'orange', label: 'Fall 2026' },
  'summer-2027': { key: 'red',    label: 'Summer 2027' },
};

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Sparkles;
  const status = availabilityToStatus[service.availability] || availabilityToStatus.now;
  const isComingSoon = service.availability !== 'now';

  return (
    <article
      className={`${styles.card} ${isComingSoon ? styles.soon : ''}`}
      data-status={status.key}
    >
      <div className={styles.iconWrap}>
        <Icon size={22} strokeWidth={1.75} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.desc}>{service.description}</p>
      </div>

      <span className={styles.badge}>
        <span className={styles.dot} />
        {service.availableLabel || status.label}
      </span>
    </article>
  );
}
