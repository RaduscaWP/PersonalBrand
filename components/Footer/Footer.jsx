import Link from 'next/link';
import Image from 'next/image';
import { Github, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.scss';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/pricing',  label: 'Pricing' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandRow}>
            <span className={styles.avatar}>
              <Image
                src="/images/profile.jpg"
                alt="Radu"
                width={32}
                height={32}
                style={{ objectFit: 'cover' }}
              />
            </span>
            <div>
              <span className={styles.brandName}>Radu-Stefan</span>
              <span className={styles.brandRole}>Full-Stack Developer</span>
            </div>
          </Link>
          <p className={styles.blurb}>
            Building fast, modern web experiences from Chisinau, Moldova. Available for freelance
            work worldwide.
          </p>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Navigate</span>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Elsewhere</span>
          <ul>
            <li>
              <a href="https://github.com/RaduscaWP" target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/radusca_?igsh=MXNkc3lreTQ5cXd5cA=="
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <a href="mailto:grozavradustefan@gmail.com">
                Email <ArrowUpRight size={12} />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Status</span>
          <div className={styles.status}>
            <span className={styles.dot} />
            <span>Open for freelance projects</span>
          </div>
          <p className={styles.location}>📍 Chisinau, Moldova</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>© {year} Radu-Stefan. All rights reserved.</span>
        <div className={styles.socials}>
          <a
            href="https://github.com/RaduscaWP"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.instagram.com/radusca_?igsh=MXNkc3lreTQ5cXd5cA=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a href="mailto:grozavradustefan@gmail.com" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
