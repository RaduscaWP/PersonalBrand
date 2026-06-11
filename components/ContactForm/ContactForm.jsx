'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send } from 'lucide-react';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { services } from '@/data/services';
import styles from './ContactForm.module.scss';

const serviceOptions = services.filter((service) => service.availability === 'now');
const budgetOptions = [
  { value: '$300-700', label: '$300-700' },
  { value: '$700-1200', label: '$700-1200' },
  { value: '$1200-2500', label: '$1200-2500' },
  { value: '$2500+', label: '$2500+' },
  { value: 'Not sure yet', label: 'Not sure yet' },
];
const timelineOptions = [
  { value: 'ASAP', label: 'ASAP' },
  { value: '1-2 weeks', label: '1-2 weeks' },
  { value: '2-4 weeks', label: '2-4 weeks' },
  { value: 'Flexible', label: 'Flexible' },
];

function getFriendlyError(status, payload) {
  if (status === 400) return payload?.error || 'Check the form details and try again.';
  if (status === 429) return 'Too many requests. Please wait a bit before trying again.';
  if (status === 503) return payload?.error || 'Email delivery is being configured. Email me directly if this is urgent.';
  return 'Something went wrong. Email me directly if this keeps happening.';
}

export default function ContactForm() {
  const params = useSearchParams();
  const prefillService = params?.get('service') || '';
  const matched = serviceOptions.find((service) => service.id === prefillService);
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: matched?.title || '',
    budget: '',
    timeline: '',
    description: matched ? `I am interested in ${matched.title}.` : '',
    companyUrl: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reference, setReference] = useState('');

  useEffect(() => {
    const next = serviceOptions.find((service) => service.id === prefillService);
    if (!next) return;
    setForm((current) => ({
      ...current,
      projectType: next.title,
      description: current.description || `I am interested in ${next.title}.`,
    }));
  }, [prefillService]);

  const update = (event) => {
    setStatus('idle');
    setErrorMessage('');
    setReference('');
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.projectType) {
      setStatus('validation');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          projectType: form.projectType || 'General Inquiry',
          budget: form.budget,
          timeline: form.timeline,
          email: form.email,
          description: form.description,
          companyUrl: form.companyUrl,
          source: 'contact',
        }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        setErrorMessage(getFriendlyError(res.status, payload));
        setStatus('error');
        return;
      }

      setReference(payload?.reference || '');
      setStatus('sent');
    } catch {
      setErrorMessage('Network error. Please try again or email me directly.');
      setStatus('error');
    }
  };

  return (
    <form className={styles.form} onSubmit={submit} aria-busy={status === 'sending'}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>Your name</span>
          <input
            name="name"
            value={form.name}
            onChange={update}
            required
            maxLength={90}
            placeholder="Jane Doe"
            disabled={status === 'sending'}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            required
            maxLength={254}
            placeholder="jane@company.com"
            disabled={status === 'sending'}
          />
        </label>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <span className={styles.label}>Service</span>
          <CustomSelect
            id="contact-service"
            value={form.projectType}
            onChange={(value) => update({ target: { name: 'projectType', value } })}
            placeholder="Select a service"
            label="Service"
            theme="light"
            options={serviceOptions.map((service) => ({ value: service.title, label: service.title }))}
            disabled={status === 'sending'}
            invalid={status === 'validation' && !form.projectType}
            describedBy={status === 'validation' ? 'contact-service-error' : undefined}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Budget</span>
          <CustomSelect
            id="contact-budget"
            value={form.budget}
            onChange={(value) => update({ target: { name: 'budget', value } })}
            placeholder="Select a range"
            label="Budget"
            theme="light"
            options={budgetOptions}
            disabled={status === 'sending'}
          />
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Timeline</span>
        <CustomSelect
          id="contact-timeline"
          value={form.timeline}
          onChange={(value) => update({ target: { name: 'timeline', value } })}
          placeholder="Select a timeline"
          label="Timeline"
          theme="light"
          options={timelineOptions}
          disabled={status === 'sending'}
        />
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Project details</span>
        <textarea
          name="description"
          value={form.description}
          onChange={update}
          required
          maxLength={2400}
          rows={7}
          placeholder="Tell me what you want to build, what already exists, and anything I should know before quoting."
          disabled={status === 'sending'}
        />
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        Company URL
        <input
          name="companyUrl"
          value={form.companyUrl}
          onChange={update}
          maxLength={200}
          tabIndex={-1}
          autoComplete="off"
          disabled={status === 'sending'}
        />
      </label>

      <button className={styles.submit} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : <>Send request <Send size={15} /></>}
      </button>

      {status === 'sent' && (
        <p className={styles.success} role="status">
          Got it - I will reply within 24 hours.
          {reference ? <> Reference: <strong>{reference}</strong>.</> : null}
        </p>
      )}
      {status === 'validation' && (
        <p id="contact-service-error" className={styles.error} role="alert">Choose a service before sending the request.</p>
      )}
      {status === 'error' && (
        <p className={styles.error} role="alert">
          {errorMessage || 'Something went wrong. Email me directly if this keeps happening.'}
        </p>
      )}
    </form>
  );
}
