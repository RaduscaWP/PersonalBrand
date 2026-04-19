'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import MagneticButton from '../MagneticButton/MagneticButton';
import { sendContactEmail, isEmailConfigured } from '@/lib/emailjs';
import styles from './ContactForm.module.scss';

const initial = { name: '', email: '', budget: '', message: '' };

export default function ContactForm() {
  const params = useSearchParams();
  const prefillService = params?.get('service');

  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prefillService) {
      setValues((v) => ({
        ...v,
        message: `Hi Radu, I'd like to talk about the ${prefillService.replace(/-/g, ' ')} service.\n\n`,
      }));
    }
  }, [prefillService]);

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setErrorMsg('');
    setStatus('sending');

    if (!isEmailConfigured()) {
      setStatus('error');
      setErrorMsg(
        "Email isn't configured yet. Write to grozavradustefan@gmail.com directly or set NEXT_PUBLIC_EMAILJS_* env vars."
      );
      return;
    }

    try {
      await sendContactEmail(values);
      setStatus('success');
      setValues(initial);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.text || err?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
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

      <label className={styles.field}>
        <span className={styles.label}>Budget (optional)</span>
        <select name="budget" value={values.budget} onChange={onChange}>
          <option value="">Select a range…</option>
          <option value="< $500">&lt; $500</option>
          <option value="$500 – $1k">$500 – $1k</option>
          <option value="$1k – $3k">$1k – $3k</option>
          <option value="$3k+">$3k+</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>What do you want to build?</span>
        <textarea
          name="message"
          value={values.message}
          onChange={onChange}
          required
          rows={6}
          placeholder="Tell me about the project, goals, and timeline…"
        />
      </label>

      <div className={styles.actions}>
        <MagneticButton type="submit" variant="primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : (
            <>
              Send message <Send size={15} />
            </>
          )}
        </MagneticButton>

        <span className={styles.note}>
          Or email{' '}
          <a href="mailto:grozavradustefan@gmail.com">grozavradustefan@gmail.com</a>
        </span>
      </div>

      {status === 'success' && (
        <div className={`${styles.feedback} ${styles.ok}`}>
          <CheckCircle2 size={18} />
          <span>Thanks — your message is on its way. I&rsquo;ll reply within 24h.</span>
        </div>
      )}

      {status === 'error' && (
        <div className={`${styles.feedback} ${styles.err}`}>
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}
    </form>
  );
}
