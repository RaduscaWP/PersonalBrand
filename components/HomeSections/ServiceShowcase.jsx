'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard/ServiceCard';
import { services } from '@/data/services';
import styles from './HomeSections.module.scss';

export default function ServiceShowcase() {
  const previewServices = useMemo(
    () =>
      services
        .filter((service) => service.availability === 'now' && service.previewOrder)
        .sort((left, right) => left.previewOrder - right.previewOrder),
    [],
  );

  const defaultActive = previewServices.find((service) => service.featured)?.id ?? previewServices[0]?.id;
  const [activeId, setActiveId] = useState(defaultActive);
  const gridRef = useRef(null);

  const activate = (id) => {
    setActiveId((current) => {
      if (current === id && id !== defaultActive) return defaultActive;
      return id;
    });
  };

  const resetIfFocusLeaves = (event) => {
    if (!gridRef.current?.contains(event.relatedTarget)) {
      setActiveId(defaultActive);
    }
  };

  return (
    <section className="section-shell section-shell--light">
      <div className="section-inner">
        <div className="section-head--center">
          <span className="section-kicker">Services</span>
          <h2 className={`section-title ${styles.lightTitle}`}>
            Four web offers built to <strong>get hired quickly.</strong>
          </h2>
          <p className={`${styles.lightCopy} section-lede ${styles.centeredLede}`}>
            These are the fastest services for a client to recognize. The full services page also
            includes automation scripts, API integrations, and internal tools.
          </p>
        </div>

        <div
          ref={gridRef}
          className={styles.serviceGrid}
          onMouseLeave={() => setActiveId(defaultActive)}
          onBlurCapture={resetIfFocusLeaves}
          role="group"
          aria-label="Signature service previews"
        >
          {previewServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              active={service.id === activeId}
              interactive
              onActivate={() => activate(service.id)}
            />
          ))}
        </div>

        <div className={styles.serviceFooter}>
          <Link href="/services" className={`text-link ${styles.lightLink}`}>
            Explore the full service page <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
