import styles from './Hero.module.scss';

const TITLE = 'Software that looks sharp and removes manual work.';

export default function HeroTitle() {
  return (
    <h1 className={`${styles.title} hero-title`} aria-label={TITLE}>
      <span className={styles.titleLine} aria-hidden="true">
        <span data-hero-line>Software that looks sharp</span>
      </span>
      <span className={styles.titleLine} aria-hidden="true">
        <span data-hero-line>
          and removes <em>manual work.</em>
        </span>
      </span>
    </h1>
  );
}
