import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton/MagneticButton';

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: 'calc(var(--space-24) + 4rem) var(--content-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        textAlign: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        justifyContent: 'center',
      }}
    >
      <span
        className="label-mono"
        style={{
          color: 'var(--accent-light)',
          fontSize: 'var(--fs-xs)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        / 404
      </span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
        Page not found.
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 480 }}>
        The page you&rsquo;re looking for doesn&rsquo;t exist. It may have been moved, or maybe it
        never did.
      </p>
      <MagneticButton href="/" variant="primary">
        <ArrowLeft size={14} /> Back home
      </MagneticButton>
    </div>
  );
}
