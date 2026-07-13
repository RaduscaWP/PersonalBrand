'use client';

import MagneticButton from '@/components/MagneticButton/MagneticButton';
import HoverSwapText from '@/components/motion/HoverSwapText';
import { useMotion } from '@/components/motion/MotionProvider';

export default function CtaSection() {
  const { pointer, reduceMotion } = useMotion();

  const moveSpotlight = (event) => {
    if (!pointer.enhanced || reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--cta-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--cta-y', `${event.clientY - bounds.top}px`);
    event.currentTarget.style.setProperty('--cta-spot-opacity', '1');
  };

  const resetSpotlight = (event) => {
    event.currentTarget.style.setProperty('--cta-spot-opacity', '0');
  };

  return (
    <section className="section-shell section-shell--dark" data-story-act="action">
      <div
        className="page-cta-band page-cta-band--photo"
        onPointerMove={moveSpotlight}
        onPointerLeave={resetSpotlight}
      >
        <span className="section-kicker">Act 06 / Action</span>
        <h2>
          Need a site that looks sharp, communicates clearly, and feels ready to ship?
        </h2>
        <p>
          Send the brief. If the scope is right, the next step is a focused quote and a build plan
          with no agency theater attached to it.
        </p>
        <div className="page-cta-actions">
          <MagneticButton href="/contact" variant="primary">
            <HoverSwapText alternate="Send the brief">Start a project</HoverSwapText>
          </MagneticButton>
          <MagneticButton href="/pricing" variant="secondary">
            See pricing
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
