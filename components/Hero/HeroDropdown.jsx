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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const listboxId = useId();
  const selectedIndex = services.findIndex((service) => service.id === selected?.id);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      } else if (event.key === 'Tab') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, selectedIndex]);

  const chooseService = (service) => {
    onSelect(service);
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleKeyDown = (event) => {
    if (disabled) return;
    const lastIndex = services.length - 1;
    if (lastIndex < 0) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : event.key === 'ArrowDown' ? 0 : lastIndex);
        return;
      }

      setHighlightedIndex((current) => {
        const fallback = selectedIndex >= 0 ? selectedIndex : 0;
        const next = current < 0 ? fallback : current + (event.key === 'ArrowDown' ? 1 : -1);
        if (next < 0) return lastIndex;
        if (next > lastIndex) return 0;
        return next;
      });
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      if (!open) setOpen(true);
      setHighlightedIndex(event.key === 'Home' ? 0 : lastIndex);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }

      const next = services[highlightedIndex >= 0 ? highlightedIndex : selectedIndex];
      if (next) chooseService(next);
    }
  };

  return (
    <div ref={wrapRef} className={`${styles.dropdownWrap} ${className}`}>
      <span className={styles.fieldLabel}>{label}</span>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.dropdownTrigger} ${open ? styles.dropdownOpen : ''}`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open && !disabled}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={open && highlightedIndex >= 0 ? `${listboxId}-${highlightedIndex}` : undefined}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown size={18} className={styles.chevron} />
      </button>

      {open && !disabled ? (
        <div id={listboxId} className={styles.dropdown} role="listbox" aria-label={ariaLabel}>
          {services.map((service, index) => (
            <button
              id={`${listboxId}-${index}`}
              key={service.id}
              type="button"
              className={`${styles.option} ${selected?.id === service.id ? styles.optionActive : ''} ${highlightedIndex === index ? styles.optionHighlighted : ''}`}
              role="option"
              aria-selected={selected?.id === service.id}
              tabIndex={-1}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => {
                chooseService(service);
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
