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
  disabled = false,
  invalid = false,
  describedBy,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listboxId = useId();

  const normalizedOptions = useMemo(() => options.map(normalizeOption), [options]);
  const selected = normalizedOptions.find((option) => option.value === value);
  const isControlled = typeof controlledOpen === 'boolean';
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback((nextOpen) => {
    if (disabled) {
      if (!isControlled) setInternalOpen(false);
      onOpenChange?.(false);
      return;
    }

    const resolvedOpen = typeof nextOpen === 'function' ? nextOpen(open) : nextOpen;
    if (!isControlled) setInternalOpen(resolvedOpen);
    onOpenChange?.(resolvedOpen);
  }, [disabled, isControlled, onOpenChange, open]);

  const closeMenu = useCallback((restoreFocus = false) => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
    if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, [isControlled, onOpenChange]);

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
      if (!rootRef.current?.contains(event.target)) closeMenu(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, open]);

  useEffect(() => {
    if (disabled && open) closeMenu(false);
  }, [closeMenu, disabled, open]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles[theme]} ${styles[menuPlacement]} ${open ? styles.open : ''} ${className}`}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={`${styles.trigger} ${!selected ? styles.placeholder : ''}`}
        onClick={() => setOpen((current) => !current)}
        disabled={disabled}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-describedby={describedBy}
        data-invalid={invalid || undefined}
      >
        <span className={styles.value}>{selected?.label ?? placeholder}</span>
        <ChevronDown size={18} className={styles.chevron} />
      </button>

      {renderMenu ? (
        <div
          id={listboxId}
          className={`${styles.menu} ${open ? styles.menuOpen : styles.menuClosing}`}
          role="menu"
          aria-label={label}
          aria-hidden={!open}
        >
          {normalizedOptions.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                aria-current={active ? 'true' : undefined}
                tabIndex={open && !disabled ? 0 : -1}
                className={`${styles.option} ${active ? styles.optionActive : ''}`}
                onClick={() => {
                  onChange(option.value);
                  closeMenu(true);
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
