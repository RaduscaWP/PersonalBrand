import * as Icons from 'lucide-react';
import styles from './ServiceCard.module.scss';

export default function ServiceCard({
  service,
  active = false,
  interactive = false,
  onActivate,
  className = '',
}) {
  const Icon = Icons[service.icon] || Icons.Sparkles;
  const Tag = interactive ? 'button' : 'article';

  const interactiveProps = interactive
    ? {
        type: 'button',
        onMouseEnter: onActivate,
        onFocus: onActivate,
        onClick: onActivate,
        'aria-pressed': active,
      }
    : {};

  return (
    <Tag
      className={`${styles.card} ${interactive ? styles.interactive : ''} ${active ? styles.active : ''} ${className}`}
      {...interactiveProps}
    >
      <span className={styles.badge}>{service.badge}</span>

      <div className={styles.iconWrap}>
        <Icon size={32} strokeWidth={1.9} />
      </div>

      <div className={styles.copy}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.desc}>{service.description}</p>
        {interactive && active ? (
          <span className={styles.returnHint}>Tap or hover to return</span>
        ) : null}
      </div>
    </Tag>
  );
}
