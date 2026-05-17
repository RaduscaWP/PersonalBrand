import { Award, BadgeCheck, Clock3, Rocket } from 'lucide-react';
import styles from './HomeSections.module.scss';

const items = [
  {
    icon: BadgeCheck,
    title: 'Live work first',
    body: 'The portfolio is built around shipped projects, not invented client stories or fake testimonial filler.',
  },
  {
    icon: Award,
    title: 'Three certifications',
    body: 'Python, Databases, and Networking score reports are already in the repo and surfaced as real proof.',
  },
  {
    icon: Rocket,
    title: 'Launch-minded builds',
    body: 'Projects are structured for deployment, responsive polish, and a handoff a client can actually use.',
  },
  {
    icon: Clock3,
    title: 'Fast communication',
    body: 'Response expectations are clear upfront. The site consistently positions contact as direct and human.',
  },
];

export default function ProofSection() {
  return (
    <section className="section-shell section-shell--light">
      <div className="section-inner">
        <div className="section-head">
          <div>
            <span className="section-kicker">Proof</span>
            <h2 className={`section-title ${styles.lightTitle}`}>
              The trust layer is simple. <strong>Show the evidence.</strong>
            </h2>
          </div>
          <p className={`${styles.lightCopy} section-lede`}>
            This section answers the question a client actually has: &quot;Why should I believe
            this person can handle the job?&quot; The answer comes from proof, not inflated
            wording.
          </p>
        </div>

        <div className={styles.proofGrid}>
          {items.map(({ icon: Icon, title, body }) => (
            <article key={title} className={styles.proofCard}>
              <div className={styles.proofIcon}>
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
