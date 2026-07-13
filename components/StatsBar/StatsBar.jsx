import { stats } from '@/data/stats';
import CountUp from '@/components/motion/CountUp';
import styles from './StatsBar.module.scss';

export default function StatsBar() {
  return (
    <section className={styles.bar} aria-label="Proof stats">
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <div key={stat.label} className={styles.item}>
            <span className={styles.num}>
              <CountUp value={stat.value} suffix={stat.suffix} />
            </span>
            <span className={styles.label}>{stat.label}</span>
            {index < stats.length - 1 && <span className={styles.sep} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}
