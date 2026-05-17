import styles from './AnnouncementBar.module.scss';

const ITEMS = [
  'OPEN FOR FREELANCE',
  'LANDING PAGES',
  'FIGMA TO CODE',
  'UI/UX DESIGN',
  'FULL WEBSITES',
  'REPLIES IN 24H',
];

const LOOPS = 4;

export default function AnnouncementBar() {
  return (
    <div className={styles.bar} aria-label="Freelance availability ticker">
      <div className={styles.track}>
        {Array.from({ length: LOOPS }).map((_, index) => (
          <div
            key={`announcement-loop-${index}`}
            className={styles.segment}
            aria-hidden={index > 0 ? 'true' : undefined}
          >
            {ITEMS.map((item) => (
              <span key={`${index}-${item}`} className={styles.item}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
