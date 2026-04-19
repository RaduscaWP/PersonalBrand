import { Suspense } from 'react';
import { Mail, Github, Instagram, MapPin, Clock } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import ContactForm from '@/components/ContactForm/ContactForm';
import styles from './contact.module.scss';

export const metadata = {
  title: 'Contact',
  description:
    'Get in touch with Radu-Stefan for freelance work, collaborations, or questions. Response within 24 hours.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>/ Contact</span>
        <h1 className={styles.title}>
          Let&rsquo;s build <span className={styles.accent}>something good.</span>
        </h1>
        <p className={styles.lede}>
          Tell me about your project. I usually reply within 24 hours. No automated replies, no
          sales funnels — just me.
        </p>
      </header>

      <SectionReveal>
        <div className={styles.grid}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarBlock}>
              <span className={styles.sideLabel}>Email</span>
              <a href="mailto:grozavradustefan@gmail.com" className={styles.sideValue}>
                <Mail size={14} /> grozavradustefan@gmail.com
              </a>
            </div>

            <div className={styles.sidebarBlock}>
              <span className={styles.sideLabel}>Elsewhere</span>
              <a
                href="https://github.com/RaduscaWP"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sideValue}
              >
                <Github size={14} /> github.com/RaduscaWP
              </a>
              <a
                href="https://www.instagram.com/radusca_?igsh=MXNkc3lreTQ5cXd5cA=="
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sideValue}
              >
                <Instagram size={14} /> @radusca_
              </a>
            </div>

            <div className={styles.sidebarBlock}>
              <span className={styles.sideLabel}>Based in</span>
              <span className={styles.sideValueStatic}>
                <MapPin size={14} /> Chisinau, Moldova (EET / GMT+2)
              </span>
            </div>

            <div className={styles.sidebarBlock}>
              <span className={styles.sideLabel}>Response time</span>
              <span className={styles.sideValueStatic}>
                <Clock size={14} /> Usually under 24h
              </span>
            </div>

            <div className={styles.availability}>
              <span className={styles.dot} />
              <span>Available for new projects</span>
            </div>
          </aside>

          <Suspense fallback={<div className={styles.formFallback}>Loading form…</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </SectionReveal>
    </div>
  );
}
