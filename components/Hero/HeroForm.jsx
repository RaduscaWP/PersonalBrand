'use client';

import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import styles from './Hero.module.scss';

function getFriendlyError(status, payload) {
  if (status === 400) return payload?.error || 'Check the form details and try again.';
  if (status === 429) return 'Too many requests. Please wait a bit before trying again.';
  if (status === 503) return payload?.error || 'Email delivery is being configured. Email me directly if this is urgent.';
  return 'Something went wrong. Email me directly if this keeps failing.';
}

export default function HeroForm({ selected }) {
  const [form, setForm] = useState({ budget: '', timeline: '', email: '', description: '', companyUrl: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reference, setReference] = useState('');
  const [activeSelect, setActiveSelect] = useState(null);

  const budgets = selected?.budgets ?? ['$300-500', '$500-1000', '$1000-2000', '$2000+'];
  const timelines = selected?.timelines ?? ['1 week', '2 weeks', '3 weeks', 'Flexible'];
  const placeholder =
    selected?.formPlaceholder ??
    'Describe the project, the audience, the references you like, and what the build needs to achieve.';

  useEffect(() => {
    setStatus('idle');
    setErrorMessage('');
    setReference('');
    setActiveSelect(null);
    setForm((current) => ({
      ...current,
      budget: '',
      timeline: '',
      description: current.description,
    }));
  }, [selected?.id]);

  const updateField = (key, value) => {
    setStatus('idle');
    setErrorMessage('');
    setReference('');
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email) return;
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: selected?.label ?? 'General Inquiry',
          domain: selected?.domainLabel || '',
          source: 'hero',
          ...form,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setErrorMessage(getFriendlyError(response.status, payload));
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

  if (status === 'sent') {
    return (
      <div className={styles.formSuccess}>
        Request received. I will reply within 24 hours.
        {reference ? <> Reference: <strong>{reference}</strong>.</> : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} aria-busy={status === 'sending'}>
      <div className={styles.formCluster}>
        <div className={styles.formControls}>
          <div className={`${styles.formField} ${styles.fieldBudget}`}>
            <span className={styles.fieldLabel}>Budget</span>
            <CustomSelect
              id="hero-budget"
              value={form.budget}
              onChange={(value) => updateField('budget', value)}
              className={styles.inlineSelect}
              label="Budget"
              theme="darkInline"
              menuPlacement="fieldOverlay"
              open={activeSelect === 'budget'}
              onOpenChange={(open) => setActiveSelect(open ? 'budget' : null)}
              placeholder="Select budget"
              options={budgets}
              disabled={status === 'sending'}
            />
          </div>

          <div className={`${styles.formField} ${styles.fieldTimeline}`}>
            <span className={styles.fieldLabel}>Timeline</span>
            <CustomSelect
              id="hero-timeline"
              value={form.timeline}
              onChange={(value) => updateField('timeline', value)}
              className={styles.inlineSelect}
              label="Timeline"
              theme="darkInline"
              menuPlacement="fieldOverlay"
              open={activeSelect === 'timeline'}
              onOpenChange={(open) => setActiveSelect(open ? 'timeline' : null)}
              placeholder="Select timeline"
              options={timelines}
              disabled={status === 'sending'}
            />
          </div>
        </div>

        <div className={styles.formContactRow}>
          <label className={`${styles.formField} ${styles.fieldEmail}`} htmlFor="hero-email">
            <span className={styles.fieldLabel}>Email</span>
            <input
              id="hero-email"
              type="email"
              required
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              maxLength={254}
              placeholder="you@company.com"
              className={styles.input}
              disabled={status === 'sending'}
            />
          </label>

          <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
            {status === 'sending' ? '...' : <Send size={18} />}
          </button>
        </div>
      </div>

      <textarea
        rows={4}
        value={form.description}
        onChange={(event) => updateField('description', event.target.value)}
        maxLength={2400}
        placeholder={placeholder}
        className={styles.textarea}
        disabled={status === 'sending'}
        />

      <label className={styles.honeypot} aria-hidden="true">
        Company URL
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          maxLength={200}
          value={form.companyUrl}
          onChange={(event) => updateField('companyUrl', event.target.value)}
          disabled={status === 'sending'}
        />
      </label>

      {status === 'error' ? (
        <p className={styles.formError} role="alert">{errorMessage || 'Something went wrong. Email me directly if this keeps failing.'}</p>
      ) : null}
    </form>
  );
}
