'use client';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/data/stats';
import styles from './StatsBar.module.scss';

function CountUp({ to, suffix = '', duration = 1500 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={styles.num}>
      {val}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className={styles.bar}>
      <div className={styles.grid}>
        {stats.map((s, i) => (
          <div key={s.label} className={styles.item}>
            <CountUp to={s.value} suffix={s.suffix} />
            <span className={styles.label}>{s.label}</span>
            {i < stats.length - 1 && <span className={styles.sep} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}
