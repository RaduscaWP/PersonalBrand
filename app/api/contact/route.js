import { createHash, randomBytes } from 'crypto';
import { Resend } from 'resend';
import {
  buildClientConfirmationEmail,
  buildOwnerNotificationEmail,
} from '@/lib/contactEmails';
import { heroServiceDomains, heroServices } from '@/data/heroServices';
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
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';
const RATE_LIMIT_KEY_PREFIX = 'portfolio:contact';

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const SOURCE_VALUES = new Set(['hero', 'contact']);
const SERVICE_OPTIONS = new Map([
  ['General Inquiry', 'General Inquiry'],
  ...services
    .filter((service) => service.availability === 'now')
    .flatMap((service) => [
      [service.id, service.title],
      [service.title, service.title],
    ]),
  ...heroServices.flatMap((service) => [
    [service.id, service.label],
    [service.label, service.label],
  ]),
]);
const DOMAIN_OPTIONS = new Map(
  heroServiceDomains.flatMap((domain) => [
    [domain.id, domain.label],
    [domain.label, domain.label],
  ]),
);
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

function normalizeOption(value, options) {
  const exact = options.get(value);
  if (exact) return exact;

  const normalized = String(value || '').trim().toLowerCase();
  for (const [key, label] of options.entries()) {
    if (String(key).toLowerCase() === normalized) return label;
  }

  return '';
}

function makeReference(now = new Date()) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const code = Array.from(randomBytes(6), (byte) => alphabet[byte % alphabet.length]).join('');
  const date = now.toISOString().slice(0, 10).replaceAll('-', '');
  return `RD-${date}-${code}`;
}

function normalizeRequest(body) {
  const email = cleanLine(body.email, 254).toLowerCase();
  const rawProjectType = cleanLine(body.projectType, 90);
  const projectType = normalizeOption(rawProjectType, SERVICE_OPTIONS);
  const rawDomain = cleanLine(body.domain || body.projectDomain, 90);

  if (!email) return { error: 'Email required' };
  if (!EMAIL_PATTERN.test(email)) return { error: 'Enter a valid email address.' };
  if (!rawProjectType) return { error: 'Service required' };
  if (!projectType) return { error: 'Service option is invalid.' };

  const source = cleanLine(body.source, 30);

  return {
    value: {
      name: cleanLine(body.name, 90),
      email,
      projectType,
      domain: normalizeOption(rawDomain, DOMAIN_OPTIONS),
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

  const devOrigins = process.env.NODE_ENV === 'production' ? [] : [
    'http://localhost:3000',
    'http://localhost:3055',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3055',
  ];

  return new Set([
    normalizeOrigin(SITE_URL),
    ...devOrigins,
    ...configured,
  ].filter(Boolean));
}

function getRequestHost(req) {
  return (req.headers.get('x-forwarded-host') || req.headers.get('host') || '').trim().toLowerCase();
}

function isSameOriginRequest(req, origin) {
  const host = getRequestHost(req);
  if (!host) return false;
  try {
    return new URL(origin).host.toLowerCase() === host;
  } catch {
    return false;
  }
}

function isOriginAllowed(req) {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  if (getAllowedOrigins().has(normalizeOrigin(origin))) return true;
  // Always allow genuine same-origin requests (Origin host === the host the
  // request actually arrived on). This lets the form work on any custom or
  // preview domain attached to the deployment (e.g. radusca.dev, www.*, and
  // *.vercel.app previews) without per-domain config, while still rejecting
  // cross-origin/CSRF requests from other sites.
  return isSameOriginRequest(req, origin);
}

function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  return forwarded.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

function hasDurableRateLimit() {
  return Boolean(UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN);
}

function hashRateLimitKey(key) {
  return createHash('sha256').update(key).digest('hex');
}

function checkMemoryRateLimit(key) {
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

async function checkDurableRateLimit(key) {
  const redisKey = `${RATE_LIMIT_KEY_PREFIX}:${hashRateLimitKey(key)}`;
  const script = [
    'local current = redis.call("INCR", KEYS[1])',
    'if current == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end',
    'local ttl = redis.call("TTL", KEYS[1])',
    'return { current, ttl }',
  ].join('\n');

  const response = await fetch(UPSTASH_REDIS_REST_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['EVAL', script, 1, redisKey, String(RATE_LIMIT_WINDOW_SECONDS)]),
  });

  if (!response.ok) {
    throw new Error(`Rate limiter unavailable: ${response.status}`);
  }

  const payload = await response.json();
  const [count, ttl] = Array.isArray(payload?.result) ? payload.result : [];
  const resolvedCount = Number(count);

  if (!Number.isFinite(resolvedCount)) {
    throw new Error('Rate limiter returned an invalid response');
  }

  return {
    limited: resolvedCount > RATE_LIMIT_MAX,
    retryAfter: Math.max(1, Number(ttl) || RATE_LIMIT_WINDOW_SECONDS),
  };
}

async function checkRateLimit(key) {
  if (hasDurableRateLimit()) {
    try {
      return await checkDurableRateLimit(key);
    } catch (error) {
      logServerError('Contact rate limiter fallback', error);
    }
  }

  return checkMemoryRateLimit(key);
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

function getResendDeliveryIssue(error) {
  const name = String(error?.name || '').toLowerCase();
  const message = String(error?.message || '').toLowerCase();

  if (name.includes('api_key') || message.includes('api key')) {
    return {
      code: 'RESEND_API_KEY_INVALID',
      error: 'Email API key is missing or invalid. Check RESEND_API_KEY in the deployment environment.',
    };
  }

  if (
    isSandboxRecipientError(error) ||
    name === 'invalid_from_address' ||
    message.includes('own email address') ||
    message.includes('from address') ||
    message.includes('sender')
  ) {
    return {
      code: 'RESEND_SENDER_NOT_VERIFIED',
      error:
        'Resend sender is still in testing mode. Verify a sender domain and set CONTACT_FROM_EMAIL to that domain, or send sandbox tests only to the Resend account email.',
    };
  }

  return null;
}

function emailDeliveryIssueResponse(label, error) {
  const issue = getResendDeliveryIssue(error);
  if (!issue) return null;

  logServerError(label, error);
  return Response.json(issue, { status: 503 });
}

function isBodyTooLarge(req) {
  const contentLength = Number(req.headers.get('content-length') || 0);
  return Number.isFinite(contentLength) && contentLength > MAX_BODY_LENGTH;
}

function logServerError(label, error) {
  console.error(label, {
    name: String(error?.name || 'Error').slice(0, 80),
    message: String(error?.message || 'Unknown server error').slice(0, 180),
  });
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

    if (isBodyTooLarge(req)) {
      return Response.json({ error: 'Request body is too large.' }, { status: 413 });
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

    if (cleanLine(body?.companyUrl, 200)) {
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

    if (!BUDGET_VALUES.has(normalized.value.budget)) {
      return Response.json({ error: 'Budget option is invalid.' }, { status: 400 });
    }

    if (!TIMELINE_VALUES.has(normalized.value.timeline)) {
      return Response.json({ error: 'Timeline option is invalid.' }, { status: 400 });
    }

    pruneRateStore();
    const ipLimit = await checkRateLimit(`ip:${getClientIp(req)}`);
    const emailLimit = await checkRateLimit(`email:${normalized.value.email}`);
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
        { error: 'Email delivery is temporarily unavailable.' },
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
      const response = emailDeliveryIssueResponse('Owner email delivery unavailable', ownerNotification.error);
      if (response) return response;
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
          const response = emailDeliveryIssueResponse('Client email delivery unavailable', clientConfirmation.error);
          if (response) return response;
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
    const response = emailDeliveryIssueResponse('Contact email delivery unavailable', err);
    if (response) return response;

    logServerError('Contact email delivery failed', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
