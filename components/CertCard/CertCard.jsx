import { Award, ExternalLink } from 'lucide-react';
import styles from './CertCard.module.scss';

const certs = [
  {
    title: 'IT Specialist: Python',
    issuer: 'Certiport',
    score: '720 / 1000',
    year: '2025',
    pdf: '/diplomas/Python.pdf',
    accentColor: '#3776AB',
  },
  {
    title: 'IT Specialist: Databases',
    issuer: 'Certiport',
    score: '743 / 1000',
    year: '2025',
    pdf: '/diplomas/Databases.pdf',
    accentColor: '#336791',
  },
  {
    title: 'IT Specialist: Networking',
    issuer: 'Certiport',
    score: '920 / 1000',
    year: '2025',
    pdf: '/diplomas/Networking.pdf',
    accentColor: '#00BCF2',
  },
];

export default function CertCard() {
  return (
    <div className={styles.grid}>
      {certs.map((cert) => (
        <div
          key={cert.title}
          className={styles.card}
          style={{ '--c': cert.accentColor }}
        >
          <div className={styles.iconWrap}>
            <Award size={22} strokeWidth={1.75} />
          </div>

          <div className={styles.info}>
            <span className={styles.meta}>
              {cert.issuer} · {cert.year}
            </span>
            <h3 className={styles.title}>{cert.title}</h3>
            <span className={styles.score}>Score: {cert.score}</span>
          </div>

          <a
            href={cert.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            View Certificate <ExternalLink size={13} />
          </a>
        </div>
      ))}
    </div>
  );
}
