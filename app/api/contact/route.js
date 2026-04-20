import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
const hits = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const record = hits.get(ip) ?? { count: 0, reset: now + WINDOW_MS };
  if (now > record.reset) {
    record.count = 0;
    record.reset = now + WINDOW_MS;
  }
  record.count += 1;
  hits.set(ip, record);
  return record.count <= MAX_REQUESTS;
}

function getIp(req) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function sanitize(value, max) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (body?.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = sanitize(body?.name, 120);
  const email = sanitize(body?.email, 254);
  const budget = sanitize(body?.budget, 40);
  const message = sanitize(body?.message, 4000);

  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Please include your name.' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Please use a valid email address.' }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: 'Tell me a little more about the project.' }, { status: 400 });
  }

  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a minute.' },
      { status: 429 }
    );
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.info('[contact] EmailJS not configured — received:', { name, email, budget });
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        note: 'Received, but email delivery is not configured yet.',
      },
      { status: 202 }
    );
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          from_name: name,
          from_email: email,
          budget: budget || 'not specified',
          message,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[contact] EmailJS error:', response.status, text);
      return NextResponse.json(
        { error: 'Email service rejected the request. Try again or email me directly.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Network error:', err);
    return NextResponse.json(
      { error: 'Network error while sending. Try again in a moment.' },
      { status: 502 }
    );
  }
}
