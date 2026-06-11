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
  const listboxId = useId();

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
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
        type="button"
        className={`${styles.dropdownTrigger} ${open ? styles.dropdownOpen : ''}`}
        onClick={() => setOpen((value) => !value)}
        disabled={disabled}
        aria-expanded={open && !disabled}
        aria-haspopup="listbox"
        aria-controls={listboxId}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown size={18} className={styles.chevron} />
      </button>

      {open && !disabled ? (
        <div id={listboxId} className={styles.dropdown} role="listbox" aria-label={ariaLabel}>
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className={`${styles.option} ${selected?.id === service.id ? styles.optionActive : ''}`}
              role="option"
              aria-selected={selected?.id === service.id}
              onClick={() => {
                onSelect(service);
                setOpen(false);
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
