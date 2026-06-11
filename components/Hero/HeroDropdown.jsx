'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Hero.module.scss';

export default function HeroDropdown({
  services,
  selected,
  onSelect,
  label = 'Service',
  placeholder = 'Choose a service',
  ariaLabel = 'Services',
  disabled = false,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const listboxId = useId();

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setOpen(false);
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`${styles.dropdownWrap} ${className}`}>
      <span className={styles.fieldLabel}>{label}</span>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.dropdownTrigger} ${open ? styles.dropdownOpen : ''}`}
        onClick={() => setOpen((value) => !value)}
        disabled={disabled}
        aria-expanded={open && !disabled}
        aria-haspopup="menu"
        aria-controls={listboxId}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown size={18} className={styles.chevron} />
      </button>

      {open && !disabled ? (
        <div id={listboxId} className={styles.dropdown} role="menu" aria-label={ariaLabel}>
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className={`${styles.option} ${selected?.id === service.id ? styles.optionActive : ''}`}
              role="menuitem"
              aria-current={selected?.id === service.id ? 'true' : undefined}
              onClick={() => {
                onSelect(service);
                setOpen(false);
                window.requestAnimationFrame(() => triggerRef.current?.focus());
              }}
            >
              <span>{service.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
