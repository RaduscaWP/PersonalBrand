import { randomBytes } from 'crypto';
import { Resend } from 'resend';
import {
  buildClientConfirmationEmail,
  buildOwnerNotificationEmail,
} from '@/lib/contactEmails';
import { heroServices } from '@/data/heroServices';
import { services } from '@/data/services';

export const runtime = 'nodejs';

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'grozavradustefan@gmail.com';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
const CONTACT_FROM_NAME = process.env.CONTACT_FROM_NAME || 'Radu Portfolio';
const CONTACT_FROM = `${CONTACT_FROM_NAME} <${CONTACT_FROM_EMAIL}>`;
const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://personal-brand-phi-tan.vercel.app';
const RATE_LIMIT_MAX = Math.max(1, Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5);
const RATE_LIMIT_WINDOW_SECONDS = Math.max(30, Number(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS) || 3600);
const MAX_BODY_LENGTH = 8000;

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const SOURCE_VALUES = new Set(['hero', 'contact']);
const SERVICE_VALUES = new Set([
  'General Inquiry',
  ...services.filter((service) => service.availability === 'now').map((service) => service.title),
  ...heroServices.map((service) => service.label),
]);
const BUDGET_VALUES = new Set([
  '',
  'Not sure yet',
  '$300-500',
  '$500-1000',
  '$1000-2000',
  '$2000+',
  '$300-700',
  '$700-1200',
  '$1200-2500',
  '$2500+',
  ...heroServices.flatMap((service) => service.budgets || []),
]);
const TIMELINE_VALUES = new Set([
  '',
  'ASAP',
  '1-2 weeks',
  '2-4 weeks',
  'Flexible',
  ...heroServices.flatMap((service) => service.timelines || []),
]);
const store = globalThis.__portfolioContactRateStore || new Map();
globalThis.__portfolioContactRateStore = store;

function cleanText(value, maxLength) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, maxLength);
}

function cleanLine(value, maxLength) {
  return cleanText(value, maxLength).replace(/\s+/g, ' ');
}

function makeReference(now = new Date()) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const code = Array.from(randomBytes(6), (byte) => alphabet[byte % alphabet.length]).join('');
  const date = now.toISOString().slice(0, 10).replaceAll('-', '');
  return `RD-${date}-${code}`;
}

function normalizeRequest(body) {
  const email = cleanLine(body.email, 254).toLowerCase();
  const projectType = cleanLine(body.projectType, 90);

  if (!email) return { error: 'Email required' };
  if (!EMAIL_PATTERN.test(email)) return { error: 'Enter a valid email address.' };
  if (!projectType) return { error: 'Service required' };

  const source = cleanLine(body.source, 30);

  return {
    value: {
      name: cleanLine(body.name, 90),
      email,
      projectType,
      budget: cleanLine(body.budget, 70),
      timeline: cleanLine(body.timeline, 70),
      description: cleanText(body.description, 2400),
      source: SOURCE_VALUES.has(source) ? source : 'unknown',
    },
  };
}

function cleanSubject(value) {
  return cleanLine(value, 90);
}

function normalizeOrigin(value) {
  if (!value) return '';
  try {
    return new URL(value).origin;
  } catch {
    return String(value).replace(/\/$/, '');
  }
}

function getAllowedOrigins() {
  const configured = (process.env.CONTACT_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => normalizeOrigin(origin.trim()))
    .filter(Boolean);

  return new Set([
    normalizeOrigin(SITE_URL),
    'http://localhost:3000',
    'http://localhost:3055',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3055',
    ...configured,
  ].filter(Boolean));
}

function isOriginAllowed(req) {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  return getAllowedOrigins().has(normalizeOrigin(origin));
}

function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(key) {
  const now = Date.now();
  const windowMs = RATE_LIMIT_WINDOW_SECONDS * 1000;
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false };
  }

  existing.count += 1;

  if (existing.count > RATE_LIMIT_MAX) {
    return {
      limited: true,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  return { limited: false };
}

function pruneRateStore() {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) store.delete(key);
  }
}

function isSandboxSender() {
  return CONTACT_FROM_EMAIL.toLowerCase() === 'onboarding@resend.dev';
}

function sameEmail(left, right) {
  return String(left || '').trim().toLowerCase() === String(right || '').trim().toLowerCase();
}

function isSandboxRecipientError(error) {
  const message = String(error?.message || error?.name || '').toLowerCase();
  return message.includes('resend.dev') || message.includes('verify a domain') || message.includes('testing emails');
}

export async function POST(req) {
  try {
    let body;

    if (!isOriginAllowed(req)) {
      return Response.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return Response.json({ error: 'Content-Type must be application/json.' }, { status: 415 });
    }

    try {
      const rawBody = await req.text();
      if (rawBody.length > MAX_BODY_LENGTH) {
        return Response.json({ error: 'Request body is too large.' }, { status: 413 });
      }
      body = JSON.parse(rawBody);
    } catch {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (cleanLine(body?.website, 200)) {
      return Response.json({
        success: true,
        reference: null,
        ownerDelivered: false,
        clientDelivered: false,
        warning: 'Request ignored.',
      });
    }

    const normalized = normalizeRequest(body && typeof body === 'object' ? body : {});
    if (normalized.error) {
      return Response.json({ error: normalized.error }, { status: 400 });
    }

    if (!SERVICE_VALUES.has(normalized.value.projectType)) {
      return Response.json({ error: 'Service option is invalid.' }, { status: 400 });
    }

    if (!BUDGET_VALUES.has(normalized.value.budget)) {
      return Response.json({ error: 'Budget option is invalid.' }, { status: 400 });
    }

    if (!TIMELINE_VALUES.has(normalized.value.timeline)) {
      return Response.json({ error: 'Timeline option is invalid.' }, { status: 400 });
    }

    pruneRateStore();
    const ipLimit = checkRateLimit(`ip:${getClientIp(req)}`);
    const emailLimit = checkRateLimit(`email:${normalized.value.email}`);
    if (ipLimit.limited || emailLimit.limited) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(ipLimit.retryAfter || emailLimit.retryAfter || RATE_LIMIT_WINDOW_SECONDS),
          },
        }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: 'Email delivery is not configured yet. Add a Resend API key first.' },
        { status: 503 }
      );
    }

    const reference = makeReference();
    const submittedAt = new Date().toISOString();
    const request = {
      ...normalized.value,
      reference,
      submittedAt,
      replyEmail: CONTACT_TO_EMAIL,
      siteUrl: SITE_URL,
    };

    const resend = new Resend(process.env.RESEND_API_KEY);
    const ownerEmail = buildOwnerNotificationEmail(request);
    const clientEmail = buildClientConfirmationEmail(request);
    const service = cleanSubject(request.projectType);

    const ownerNotification = await resend.emails.send(
      {
        from: CONTACT_FROM,
        to: CONTACT_TO_EMAIL,
        reply_to: request.email,
        subject: `New portfolio request: ${service} - ${reference}`,
        html: ownerEmail.html,
        text: ownerEmail.text,
        tags: [
          { name: 'type', value: 'owner_notification' },
          { name: 'source', value: request.source },
          { name: 'reference', value: reference },
        ],
      },
      { idempotencyKey: `portfolio-owner/${reference}` }
    );

    if (ownerNotification.error) {
      throw new Error(ownerNotification.error.message || 'Failed to send owner notification');
    }

    let clientDelivered = false;
    let warning;

    if (isSandboxSender() && !sameEmail(request.email, CONTACT_TO_EMAIL)) {
      warning = 'Client confirmation skipped until a verified sender domain is configured.';
    } else {
      const clientConfirmation = await resend.emails.send(
        {
          from: CONTACT_FROM,
          to: request.email,
          reply_to: CONTACT_TO_EMAIL,
          subject: `Request received - ${reference}`,
          html: clientEmail.html,
          text: clientEmail.text,
          tags: [
            { name: 'type', value: 'client_confirmation' },
            { name: 'source', value: request.source },
            { name: 'reference', value: reference },
          ],
        },
        { idempotencyKey: `portfolio-client/${reference}` }
      );

      if (clientConfirmation.error) {
        if (isSandboxRecipientError(clientConfirmation.error)) {
          warning = 'Client confirmation skipped until a verified sender domain is configured.';
        } else {
          throw new Error(clientConfirmation.error.message || 'Failed to send confirmation email');
        }
      } else {
        clientDelivered = true;
      }
    }

    return Response.json({
      success: true,
      reference,
      ownerDelivered: true,
      clientDelivered,
      ...(warning ? { warning } : {}),
    });
  } catch (err) {
    console.error('Resend error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
