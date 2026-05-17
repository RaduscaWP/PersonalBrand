'use client';

import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import styles from './Hero.module.scss';

export default function HeroForm({ selected }) {
  const [form, setForm] = useState({ budget: '', timeline: '', email: '', description: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const budgets = selected?.budgets ?? ['$300-500', '$500-1000', '$1000-2000', '$2000+'];
  const timelines = selected?.timelines ?? ['1 week', '2 weeks', '3 weeks', 'Flexible'];
  const placeholder =
    selected?.formPlaceholder ??
    'Describe the project, the audience, the references you like, and what the build needs to achieve.';

  useEffect(() => {
    setStatus('idle');
    setErrorMessage('');
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
          ...form,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setErrorMessage(payload?.error || 'Something went wrong. Email me directly if this keeps failing.');
        setStatus('error');
        return;
      }

      setStatus('sent');
    } catch {
      setErrorMessage('Network error. Please try again or email me directly.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return <div className={styles.formSuccess}>Request received. I will reply within 24 hours.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
              placeholder="Select budget"
              options={budgets}
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
              placeholder="Select timeline"
              options={timelines}
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
              placeholder="you@company.com"
              className={styles.input}
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
        placeholder={placeholder}
        className={styles.textarea}
      />

      {status === 'error' ? (
        <p className={styles.formError}>{errorMessage || 'Something went wrong. Email me directly if this keeps failing.'}</p>
      ) : null}
    </form>
  );
}
