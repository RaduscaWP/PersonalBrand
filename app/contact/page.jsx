import { Suspense } from 'react';
import { Clock, Github, Instagram, Mail, MapPin } from 'lucide-react';
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
    <div className={`page-wrap ${styles.page}`}>
      <header className={`page-hero page-hero--photo ${styles.hero}`}>
        <span className="page-kicker">Contact</span>
        <h1 className="page-title">
          Send the brief. <strong>I will handle the next step clearly.</strong>
        </h1>
        <p className="page-lede">
          The contact path is meant to feel direct and professional: no funnel language, no fake
          urgency, just a clean way to start a real project conversation.
        </p>
      </header>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
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
                    href="https://www.instagram.com/radusca_/"
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
                    <MapPin size={14} /> Chisinau, Moldova
                  </span>
                </div>

                <div className={styles.sidebarBlock}>
                  <span className={styles.sideLabel}>Response target</span>
                  <span className={styles.sideValueStatic}>
                    <Clock size={14} /> Usually inside 24 hours
                  </span>
                </div>

                <div className={styles.availability}>
                  <span className={styles.dot} />
                  <span>Available for new projects</span>
                </div>
              </aside>

              <Suspense fallback={<div className={styles.formFallback}>Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
