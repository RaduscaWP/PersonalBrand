import MagneticButton from '@/components/MagneticButton/MagneticButton';

export default function CtaSection() {
  return (
    <section className="section-shell section-shell--dark">
      <div className="page-cta-band page-cta-band--photo">
        <h2>
          Need a site that looks sharp, communicates clearly, and feels ready to ship?
        </h2>
        <p>
          Send the brief. If the scope is right, the next step is a focused quote and a build plan
          with no agency theater attached to it.
        </p>
        <div className="page-cta-actions">
          <MagneticButton href="/contact" variant="primary">
            Start a project
          </MagneticButton>
          <MagneticButton href="/pricing" variant="secondary">
            See pricing
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
