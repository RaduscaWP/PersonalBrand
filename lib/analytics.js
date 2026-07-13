'use client';

import { track } from '@vercel/analytics';

const allowedEvents = new Set([
  'hero_start_project_click',
  'interactive_brief_started',
  'interactive_brief_completed',
  'service_selected',
  'project_live_click',
  'project_github_click',
  'pricing_package_click',
  'contact_form_started',
  'contact_form_validation_error',
  'contact_form_submit_success',
  'contact_form_submit_failure',
]);

export function trackEvent(name, data = {}) {
  if (!allowedEvents.has(name) || typeof window === 'undefined') return;

  const safeData = Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value))
      .map(([key, value]) => [String(key).slice(0, 64), typeof value === 'string' ? value.slice(0, 120) : value]),
  );

  try {
    track(name, safeData);
  } catch {
    // Analytics must never become an interaction dependency.
  }
}
