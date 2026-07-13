import styles from './MotionPrimitives.module.scss';

export default function HoverSwapText({ children, alternate }) {
  const second = alternate || children;

  return (
    <>
      <span className={styles.swap} aria-hidden="true">
        <span className={styles.swapTrack}>
          <span className={styles.swapLabel}>{children}</span>
          <span className={`${styles.swapLabel} ${styles.swapLabelAlt}`}>{second}</span>
        </span>
      </span>
      <span className="sr-only">{children}</span>
    </>
  );
}
