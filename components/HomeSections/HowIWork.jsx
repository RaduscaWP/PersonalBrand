import styles from './HomeSections.module.scss';

const steps = [
  {
    number: '01',
    title: 'Clarify the scope',
    body: 'You send the goal, references, timeline, and what already exists. I translate that into a buildable scope instead of rushing into code.',
  },
  {
    number: '02',
    title: 'Lock the direction',
    body: 'We agree on the structure, the visual direction, and the outcome the page has to achieve before time gets wasted on rework.',
  },
  {
    number: '03',
    title: 'Build with feedback',
    body: 'The project gets built in stages with clean progress updates, working previews, and revisions focused on what improves the result.',
  },
  {
    number: '04',
    title: 'Launch ready',
    body: 'Delivery includes responsive polish, deployment prep, and a handoff that makes the project feel usable, not just technically complete.',
  },
];

export default function HowIWork() {
  return (
    <section className="section-shell section-shell--dark">
      <div className="section-inner">
        <div className={styles.processShell}>
          <div className={styles.processIntro}>
            <span className="section-kicker">How I Work</span>
            <h2 className="section-title">
              Clear process. <strong>Less client guesswork.</strong>
            </h2>
            <p className="section-lede">
              The workflow is built to keep the project calm, transparent, and easy to trust from
              the first message through launch.
            </p>

            <div className={styles.processVisual}>
              <div className={styles.processPhotoWrap} aria-hidden="true">
                <span className={styles.processGlow} />
                <span className={styles.processOrb} />
                <div className={styles.processMockPanel}>
                  <span className={styles.processMockLineLg} />
                  <span className={styles.processMockLineMd} />
                  <div className={styles.processMockGrid}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>

              <div className={styles.processInsight}>
                <span className={styles.processInsightKicker}>What this should feel like</span>
                <h3>Structured, visual, and calm from the first message.</h3>
                <p>
                  The same TBC-style confidence comes from real media and clear framing, not empty
                  dark space.
                </p>
              </div>
            </div>
          </div>

          <ol className={styles.processList}>
            {steps.map((step) => (
              <li key={step.number} className={styles.processItem}>
                <span className={styles.processNumber}>{step.number}</span>
                <div className={styles.processCopy}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
