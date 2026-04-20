'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, ChevronDown } from 'lucide-react';
import MagneticButton from '../MagneticButton/MagneticButton';
import { services } from '@/data/services';
import styles from './ContactForm.module.scss';

const CONTACT_EMAIL = 'grozavradustefan@gmail.com';
const serviceOptions = services.filter((service) => service.availability === 'now');
const budgetOptions = [
  { value: '< $300', label: '< $300' },
  { value: '$300-$700', label: '$300-$700' },
  { value: '$700-$1,200', label: '$700-$1,200' },
  { value: '$1,200-$2,500', label: '$1,200-$2,500' },
  { value: '$2,500+', label: '$2,500+' },
  { value: 'Not sure yet', label: 'Not sure yet' },
];
const timelineOptions = [
  { value: 'ASAP', label: 'ASAP' },
  { value: '1-2 weeks', label: '1-2 weeks' },
  { value: '2-4 weeks', label: '2-4 weeks' },
  { value: '1-2 months', label: '1-2 months' },
  { value: 'Flexible', label: 'Flexible' },
];

function buildInitialValues(prefillService = '') {
  const matched = serviceOptions.find((service) => service.id === prefillService);

  return {
    name: '',
    email: '',
    service: matched?.title || '',
    budget: '',
    timeline: '',
    projectGoals: '',
    projectDetails: matched
      ? `Hi Radu, I'd like to talk about the ${matched.title} service.\n\n`
      : '',
  };
}

function buildMailtoHref(values) {
  const subject = `Project brief - ${values.service || 'New inquiry'}`;
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Service: ${values.service || 'Not specified'}`,
    `Budget: ${values.budget || 'Not specified'}`,
    `Timeline: ${values.timeline || 'Not specified'}`,
    `Project goals: ${values.projectGoals || 'Not specified'}`,
    '',
    'Project details:',
    values.projectDetails || 'Not provided',
  ].join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ChoiceField({
  label,
  value,
  placeholder,
  options,
  isOpen,
  onToggle,
  onClose,
  onSelect,
  invalid = false,
}) {
  const fieldId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isOpen) {
        onToggle();
      }
    }
  };

  const handleOptionSelect = (nextValue) => {
    onSelect(nextValue);
    onClose();
    triggerRef.current?.focus();
  };

  return (
    <div className={styles.field}>
      <span className={styles.label} id={`${fieldId}-label`}>
        {label}
      </span>

      <div
        ref={rootRef}
        className={[
          styles.choice,
          isOpen ? styles.choiceOpen : '',
          invalid ? styles.choiceInvalid : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <button
          ref={triggerRef}
          type="button"
          className={styles.choiceTrigger}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${fieldId}-label ${fieldId}-value`}
          onClick={onToggle}
          onKeyDown={handleTriggerKeyDown}
        >
          <span
            id={`${fieldId}-value`}
            className={value ? styles.choiceValue : styles.choicePlaceholder}
          >
            {value || placeholder}
          </span>

          <ChevronDown size={16} className={styles.choiceChevron} />
        </button>

        {isOpen && (
          <div className={styles.choiceMenu} role="listbox" aria-labelledby={`${fieldId}-label`}>
            <button
              type="button"
              role="option"
              aria-selected={!value}
              className={[
                styles.choiceOption,
                styles.choicePlaceholderOption,
                !value ? styles.choiceOptionSelected : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleOptionSelect('')}
            >
              {placeholder}
            </button>

            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    styles.choiceOption,
                    isSelected ? styles.choiceOptionSelected : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const prefillService = params?.get('service') || '';

  const [values, setValues] = useState(() => buildInitialValues(prefillService));
  const [openChoice, setOpenChoice] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!prefillService) return;

    const nextValues = buildInitialValues(prefillService);

    setValues((current) => ({
      ...current,
      ...nextValues,
      name: current.name,
      email: current.email,
      budget: current.budget,
      timeline: current.timeline,
      projectGoals: current.projectGoals,
      projectDetails: current.projectDetails || nextValues.projectDetails,
    }));

    setErrorMessage('');
  }, [prefillService]);

  const onChange = (e) => {
    setValues((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const onChoiceChange = (name, nextValue) => {
    setValues((current) => ({ ...current, [name]: nextValue }));

    if (name === 'service' && nextValue) {
      setErrorMessage('');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setOpenChoice(null);

    if (!e.currentTarget.reportValidity()) return;

    if (!values.service) {
      setStatus('idle');
      setErrorMessage('Choose a service before opening the email draft.');
      return;
    }

    setErrorMessage('');
    setStatus('opened');
    window.location.href = buildMailtoHref(values);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>Your name</span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={onChange}
            required
            autoComplete="name"
            placeholder="Jane Doe"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            required
            autoComplete="email"
            placeholder="jane@company.com"
          />
        </label>
      </div>

      <div className={styles.grid}>
        <ChoiceField
          label="Service"
          value={values.service}
          placeholder="Select a service..."
          options={serviceOptions.map((service) => ({ value: service.title, label: service.title }))}
          isOpen={openChoice === 'service'}
          onToggle={() => setOpenChoice((current) => (current === 'service' ? null : 'service'))}
          onClose={() => setOpenChoice(null)}
          onSelect={(nextValue) => onChoiceChange('service', nextValue)}
          invalid={Boolean(errorMessage && !values.service)}
        />

        <ChoiceField
          label="Budget"
          value={values.budget}
          placeholder="Select a range..."
          options={budgetOptions}
          isOpen={openChoice === 'budget'}
          onToggle={() => setOpenChoice((current) => (current === 'budget' ? null : 'budget'))}
          onClose={() => setOpenChoice(null)}
          onSelect={(nextValue) => onChoiceChange('budget', nextValue)}
        />
      </div>

      <div className={styles.grid}>
        <ChoiceField
          label="Timeline"
          value={values.timeline}
          placeholder="Select a timeline..."
          options={timelineOptions}
          isOpen={openChoice === 'timeline'}
          onToggle={() => setOpenChoice((current) => (current === 'timeline' ? null : 'timeline'))}
          onClose={() => setOpenChoice(null)}
          onSelect={(nextValue) => onChoiceChange('timeline', nextValue)}
        />

        <label className={styles.field}>
          <span className={styles.label}>Project goals</span>
          <input
            type="text"
            name="projectGoals"
            value={values.projectGoals}
            onChange={onChange}
            required
            placeholder="Launch, get leads, improve trust, ship an MVP..."
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Project details</span>
        <textarea
          name="projectDetails"
          value={values.projectDetails}
          onChange={onChange}
          required
          rows={7}
          placeholder="Tell me what you want to build, what already exists, and anything I should know before quoting."
        />
      </label>

      <div className={styles.actions}>
        <MagneticButton type="submit" variant="primary">
          <>
            Open email draft <Send size={15} />
          </>
        </MagneticButton>

        <span className={styles.note}>
          This opens your email app with the full brief prefilled, or email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </span>
      </div>

      {status === 'opened' && (
        <div className={`${styles.feedback} ${styles.ok}`}>
          <CheckCircle2 size={18} />
          <span>Your email app should open with the project brief already filled in.</span>
        </div>
      )}

      {errorMessage && (
        <div className={`${styles.feedback} ${styles.err}`}>
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
}
