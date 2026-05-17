import * as Icons from 'lucide-react';
import styles from './TechMarquee.module.scss';

export default function TechMarquee({ items }) {
  const loop = [...items, ...items];

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {loop.map((item, index) => {
          const Icon = Icons[item.icon] || Icons.Code2;

          return (
            <span key={`${item.name}-${index}`} className={styles.item}>
              <Icon size={16} strokeWidth={1.8} />
              {item.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
