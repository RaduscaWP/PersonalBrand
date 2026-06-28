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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listboxId = useId();

  const normalizedOptions = useMemo(() => options.map(normalizeOption), [options]);
  const selected = normalizedOptions.find((option) => option.value === value);
  const selectedIndex = normalizedOptions.findIndex((option) => option.value === value);
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

  const chooseOption = useCallback((option) => {
    onChange(option.value);
    closeMenu(true);
  }, [closeMenu, onChange]);

  useEffect(() => {
    if (open) {
      setRenderMenu(true);
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      return undefined;
    }

    if (!renderMenu) return undefined;

    const timeout = window.setTimeout(() => setRenderMenu(false), 180);
    return () => window.clearTimeout(timeout);
  }, [open, renderMenu, selectedIndex]);

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

  const handleKeyDown = (event) => {
    if (disabled) return;

    const lastIndex = normalizedOptions.length - 1;
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

      const next = normalizedOptions[highlightedIndex >= 0 ? highlightedIndex : selectedIndex];
      if (next) chooseOption(next);
    }
  };

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
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={label}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open && highlightedIndex >= 0 ? `${listboxId}-${highlightedIndex}` : undefined}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        data-invalid={invalid || undefined}
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
          {normalizedOptions.map((option, index) => {
            const active = option.value === value;
            const highlighted = highlightedIndex === index;

            return (
              <button
                id={`${listboxId}-${index}`}
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                tabIndex={-1}
                className={`${styles.option} ${active ? styles.optionActive : ''} ${highlighted ? styles.optionHighlighted : ''}`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => {
                  chooseOption(option);
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
