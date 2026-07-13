'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Send } from 'lucide-react';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { heroServiceDomains, heroServices } from '@/data/heroServices';
import { services } from '@/data/services';
import { trackEvent } from '@/lib/analytics';
import styles from './ContactForm.module.scss';

const serviceOptions = services.filter((service) => service.availability === 'now');
const baseBudgets = ['$300-700', '$700-1200', '$1200-2500', '$2500+', 'Not sure yet'];
const baseTimelines = ['ASAP', '1-2 weeks', '2-4 weeks', 'Flexible'];
const budgetOptions = [...new Set([...baseBudgets, ...heroServices.flatMap((service) => service.budgets || [])])]
  .map((value) => ({ value, label: value }));
const timelineOptions = [...new Set([...baseTimelines, ...heroServices.flatMap((service) => service.timelines || [])])]
  .map((value) => ({ value, label: value }));
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldMeta = {
  name: { id: 'contact-name', label: 'Your name' },
  email: { id: 'contact-email', label: 'Email' },
  projectType: { id: 'contact-service', label: 'Service' },
  description: { id: 'contact-description', label: 'Project details' },
};

function getFriendlyError(status, payload) {
  if (status === 400) return payload?.error || 'Check the form details and try again.';
  if (status === 429) return 'Too many requests. Please wait a bit before trying again.';
  if (status === 503) return payload?.error || 'Email delivery is being configured. Email me directly if this is urgent.';
  return 'Something went wrong. Email me directly if this keeps happening.';
}

function safeParam(params, key, maxLength = 120) {
  return String(params?.get(key) || '').trim().slice(0, maxLength);
}

function validateForm(form) {
  const nextErrors = {};
  if (form.name.trim().length < 2) nextErrors.name = 'Enter your name (at least 2 characters).';
  if (!emailPattern.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
  if (!form.projectType) nextErrors.projectType = 'Choose the service closest to your project.';
  if (form.description.trim().length < 20) {
    nextErrors.description = 'Add at least 20 characters so I can understand the request.';
  }
  return nextErrors;
}

export default function ContactForm() {
  const params = useSearchParams();
  const summaryRef = useRef(null);
  const submittingRef = useRef(false);
  const startedRef = useRef(false);
  const brief = useMemo(() => {
    const serviceId = safeParam(params, 'service');
    const domainId = safeParam(params, 'domain');
    const service = serviceOptions.find((item) => item.id === serviceId);
    const domain = heroServiceDomains.find((item) => item.id === domainId);
    const budget = safeParam(params, 'budget', 70);
    const timeline = safeParam(params, 'timeline', 70);
    const goal = safeParam(params, 'goal', 180);

    return {
      service,
      domain,
      goal,
      budget: budgetOptions.some((item) => item.value === budget) ? budget : '',
      timeline: timelineOptions.some((item) => item.value === timeline) ? timeline : '',
    };
  }, [params]);

  const briefDescription = [
    brief.service ? `I am interested in ${brief.service.title}.` : '',
    brief.goal ? `Goal: ${brief.goal}.` : '',
  ].filter(Boolean).join(' ');

  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: brief.service?.title || '',
    domain: brief.domain?.label || '',
    budget: brief.budget,
    timeline: brief.timeline,
    description: briefDescription,
    companyUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reference, setReference] = useState('');

  useEffect(() => {
    setForm((current) => ({
      ...current,
      projectType: brief.service?.title || current.projectType,
      domain: brief.domain?.label || current.domain,
      budget: brief.budget || current.budget,
      timeline: brief.timeline || current.timeline,
      description: current.description || briefDescription,
    }));
  }, [brief, briefDescription]);

  const updateField = (name, value) => {
    if (!startedRef.current && name !== 'companyUrl') {
      startedRef.current = true;
      trackEvent('contact_form_started', { source: brief.service ? 'interactive_brief' : 'contact' });
    }
    setStatus('idle');
    setErrorMessage('');
    setReference('');
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setForm((current) => ({ ...current, [name]: value }));
  };

  const update = (event) => updateField(event.target.name, event.target.value);

  const submit = async (event) => {
    event.preventDefault();
    if (submittingRef.current || status === 'sent') return;

    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus('validation');
      trackEvent('contact_form_validation_error', { count: Object.keys(nextErrors).length });
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    submittingRef.current = true;
    setStatus('sending');
    setErrorMessage('');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          projectType: form.projectType,
          domain: form.domain,
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
        trackEvent('contact_form_submit_failure', { status: res.status });
        submittingRef.current = false;
        return;
      }

      setReference(payload?.reference || '');
      setStatus('sent');
      trackEvent('contact_form_submit_success', { service: form.projectType });
    } catch {
      setErrorMessage('Network error. Please try again or email me directly.');
      setStatus('error');
      trackEvent('contact_form_submit_failure', { status: 'network' });
      submittingRef.current = false;
    }
  };

  const locked = status === 'sending' || status === 'sent';
  const errorEntries = Object.entries(errors);

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-busy={status === 'sending'}>
      {brief.service || brief.domain || brief.goal ? (
        <div className={styles.briefContext} role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          <div>
            <strong>Your interactive brief is attached.</strong>
            <span>
              {[brief.domain?.label, brief.service?.title, brief.goal].filter(Boolean).join(' / ')}
            </span>
          </div>
        </div>
      ) : null}

      {errorEntries.length ? (
        <div ref={summaryRef} className={styles.errorSummary} role="alert" tabIndex={-1}>
          <strong>Please fix {errorEntries.length === 1 ? 'this field' : 'these fields'}:</strong>
          <ul>
            {errorEntries.map(([name, message]) => (
              <li key={name}>
                <a href={`#${fieldMeta[name].id}`}>{fieldMeta[name].label}: {message}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.grid}>
        <label className={styles.field} htmlFor="contact-name">
          <span className={styles.label}>Your name</span>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={update}
            maxLength={90}
            placeholder="Jane Doe"
            disabled={locked}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name ? <span id="contact-name-error" className={styles.fieldError}>{errors.name}</span> : null}
        </label>

        <label className={styles.field} htmlFor="contact-email">
          <span className={styles.label}>Email</span>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={update}
            maxLength={254}
            placeholder="jane@company.com"
            disabled={locked}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email ? <span id="contact-email-error" className={styles.fieldError}>{errors.email}</span> : null}
        </label>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <span className={styles.label}>Service</span>
          <CustomSelect
            id="contact-service"
            value={form.projectType}
            onChange={(value) => updateField('projectType', value)}
            placeholder="Select a service"
            label="Service"
            theme="light"
            options={serviceOptions.map((service) => ({ value: service.title, label: service.title }))}
            disabled={locked}
            invalid={Boolean(errors.projectType)}
            describedBy={errors.projectType ? 'contact-service-error' : undefined}
          />
          {errors.projectType ? <span id="contact-service-error" className={styles.fieldError}>{errors.projectType}</span> : null}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Budget</span>
          <CustomSelect
            id="contact-budget"
            value={form.budget}
            onChange={(value) => updateField('budget', value)}
            placeholder="Select a range"
            label="Budget"
            theme="light"
            options={budgetOptions}
            disabled={locked}
          />
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Timeline</span>
        <CustomSelect
          id="contact-timeline"
          value={form.timeline}
          onChange={(value) => updateField('timeline', value)}
          placeholder="Select a timeline"
          label="Timeline"
          theme="light"
          options={timelineOptions}
          disabled={locked}
        />
      </div>

      <label className={styles.field} htmlFor="contact-description">
        <span className={styles.label}>Project details</span>
        <textarea
          id="contact-description"
          name="description"
          value={form.description}
          onChange={update}
          maxLength={2400}
          rows={7}
          placeholder="Tell me what you want to build, what already exists, and what the build needs to achieve."
          disabled={locked}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'contact-description-error' : undefined}
        />
        {errors.description ? <span id="contact-description-error" className={styles.fieldError}>{errors.description}</span> : null}
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
          aria-hidden="true"
          disabled={locked}
        />
      </label>

      <button className={styles.submit} type="submit" disabled={locked}>
        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Request sent' : <>Send request <Send size={15} /></>}
      </button>

      {status === 'sent' ? (
        <p className={styles.success} role="status" tabIndex={-1}>
          Got it - I will reply within 24 hours.
          {reference ? <> Reference: <strong>{reference}</strong>.</> : null}
        </p>
      ) : null}
      {status === 'error' ? (
        <p className={styles.error} role="alert">
          {errorMessage || 'Something went wrong. Email me directly if this keeps happening.'}
        </p>
      ) : null}
    </form>
  );
}
