'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import styles from './CustomSelect.module.scss';

function normalizeOption(option) {
  if (typeof option === 'string') {
    return { value: option, label: option };
  }

  return option;
}

export default function CustomSelect({
  id,
  value,
  placeholder,
  options,
  onChange,
  label,
  theme = 'light',
  menuPlacement = 'overlay',
  open: controlledOpen,
  onOpenChange,
  className = '',
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);
  const rootRef = useRef(null);
  const listboxId = useId();

  const normalizedOptions = useMemo(() => options.map(normalizeOption), [options]);
  const selected = normalizedOptions.find((option) => option.value === value);
  const isControlled = typeof controlledOpen === 'boolean';
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback((nextOpen) => {
    const resolvedOpen = typeof nextOpen === 'function' ? nextOpen(open) : nextOpen;
    if (!isControlled) setInternalOpen(resolvedOpen);
    onOpenChange?.(resolvedOpen);
  }, [isControlled, onOpenChange, open]);

  useEffect(() => {
    if (open) {
      setRenderMenu(true);
      return undefined;
    }

    if (!renderMenu) return undefined;

    const timeout = window.setTimeout(() => setRenderMenu(false), 180);
    return () => window.clearTimeout(timeout);
  }, [open, renderMenu]);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles[theme]} ${styles[menuPlacement]} ${open ? styles.open : ''} ${className}`}
    >
      <button
        id={id}
        type="button"
        className={`${styles.trigger} ${!selected ? styles.placeholder : ''}`}
        onClick={() => setOpen((current) => !current)}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
      >
        <span className={styles.value}>{selected?.label ?? placeholder}</span>
        <ChevronDown size={18} className={styles.chevron} />
      </button>

      {renderMenu ? (
        <div
          id={listboxId}
          className={`${styles.menu} ${open ? styles.menuOpen : styles.menuClosing}`}
          role="listbox"
          aria-label={label}
          aria-hidden={!open}
        >
          {normalizedOptions.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                tabIndex={open ? 0 : -1}
                className={`${styles.option} ${active ? styles.optionActive : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {active ? <Check size={15} className={styles.check} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
