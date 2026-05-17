import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, Instagram, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.scss';

const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.identity}>
            <Image
              src="/images/profile.jpg"
              alt="Radu-Stefan"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div>
              <strong>Radu-Stefan</strong>
              <span>Developer portfolio</span>
            </div>
          </div>

          <p>
            Fast, modern web experiences from Chisinau, Moldova. Built for founders, personal
            brands, and teams that want clean execution without agency noise.
          </p>

          <div className={styles.brandLinks}>
            <a
              href="https://github.com/RaduscaWP"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.instagram.com/radusca_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a href="mailto:grozavradustefan@gmail.com" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <h2>Navigate</h2>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.column}>
          <h2>Elsewhere</h2>
          <a href="https://github.com/RaduscaWP" target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
          <a href="https://www.instagram.com/radusca_/" target="_blank" rel="noopener noreferrer">
            Instagram <ArrowUpRight size={13} />
          </a>
          <a href="mailto:grozavradustefan@gmail.com">
            Email <ArrowUpRight size={13} />
          </a>
        </div>

        <div className={styles.status}>
          <h2>Status</h2>
          <p className={styles.statusRow}>
            <span className={styles.dot} />
            Open for freelance projects
          </p>
          <p className={styles.location}>
            <MapPin size={14} />
            Chisinau, Moldova
          </p>
          <span className={styles.note}>Typical reply target: under 24 hours.</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; 2026 Radu-Stefan. All rights reserved.</span>
        <div className={styles.bottomLinks}>
          <Link href="/projects">Live work</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Start a project</Link>
        </div>
      </div>
    </footer>
  );
}
