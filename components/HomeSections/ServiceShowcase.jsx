'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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

  const [activeId, setActiveId] = useState(null);
  const gridRef = useRef(null);

  const activate = (id) => {
    setActiveId(id);
  };

  const toggle = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  const deactivate = (id) => {
    setActiveId((current) => (current === id ? null : current));
  };

  useEffect(() => {
    const resetFromOutsideTap = (event) => {
      if (
        event.pointerType === 'touch' &&
        gridRef.current &&
        !gridRef.current.contains(event.target)
      ) {
        setActiveId(null);
      }
    };

    document.addEventListener('pointerdown', resetFromOutsideTap);
    return () => document.removeEventListener('pointerdown', resetFromOutsideTap);
  }, []);

  const resetIfFocusLeaves = (event) => {
    if (!gridRef.current?.contains(event.relatedTarget)) {
      setActiveId(null);
    }
  };

  const resetIfPointerLeaves = () => {
    const focusedElement = document.activeElement;
    const hasKeyboardFocus =
      gridRef.current?.contains(focusedElement) && focusedElement?.matches?.(':focus-visible');

    if (!hasKeyboardFocus) {
      setActiveId(null);
    }
  };

  return (
    <section className="section-shell section-shell--light" data-story-act="adaptation">
      <div className="section-inner">
        <div className="section-head--center">
          <span className="section-kicker">Act 02 / Adaptation</span>
          <h2 className={`section-title ${styles.lightTitle}`}>
            Start with the problem. <strong>Then choose the right build.</strong>
          </h2>
          <p className={`${styles.lightCopy} section-lede ${styles.centeredLede}`}>
            Four clear entry points make the work easy to recognize. The full service system also
            covers automation, API integrations, and internal software.
          </p>
        </div>

        <div
          ref={gridRef}
          className={styles.serviceGrid}
          onMouseLeave={resetIfPointerLeaves}
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
              onToggle={() => toggle(service.id)}
              onDeactivate={() => deactivate(service.id)}
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
