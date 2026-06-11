// scripts/smoke-contact.mjs
//
// Throwaway smoke test for POST /api/contact against the LOCAL dev server.
// Usage:
//   1) Terminal A:  $env:CONTACT_RATE_LIMIT_MAX='3'; npm run dev
//   2) Terminal B:  $env:CONTACT_RATE_LIMIT_MAX='3'; node scripts/smoke-contact.mjs
//
// Optional args/env:
//   node scripts/smoke-contact.mjs [baseUrl]   (default http://localhost:3000)
//   CONTACT_TO_EMAIL        owner inbox (default grozavradustefan@gmail.com)
//   CONTACT_RATE_LIMIT_MAX  must match the dev server value (default 5)
//
// NOTE: the valid-request cases send REAL emails via Resend to the account-owner
// inbox. That is intentional while the project is still on the Resend sandbox
// sender (onboarding@resend.dev) - it proves the full owner + client delivery
// path. See RESEND-SETUP.md to go live on radusca.dev.

const BASE = process.argv[2] || process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const ENDPOINT = `${BASE}/api/contact`;
const OWNER_EMAIL = process.env.CONTACT_TO_EMAIL || 'grozavradustefan@gmail.com';
const RATE_MAX = Math.max(1, Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5);
const REFERENCE_RE = /^RD-\d{8}-[A-Z0-9]{6}$/;

let passed = 0;
let failed = 0;

function record(name, ok, detail) {
  if (ok) passed++; else failed++;
  console.log(`[${ok ? 'PASS' : 'FAIL'}] ${name}`);
  if (detail) console.log(`        ${detail}`);
}

async function post(body) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  let json = null;
  try { json = await res.json(); } catch { /* non-JSON response */ }
  return { status: res.status, json };
}

const validBase = {
  name: 'Smoke Test',
  projectType: 'Landing Page',
  domain: 'Web Development',
  budget: '$300-500',
  timeline: '1 week',
  description: 'Automated smoke test request. Safe to ignore.',
  source: 'contact',
};

async function waitForServer(timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      });
      if (res.status > 0) return true; // server is answering
    } catch { /* not ready yet */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  console.log(`Smoke testing ${ENDPOINT}`);
  console.log(`Owner inbox: ${OWNER_EMAIL} | CONTACT_RATE_LIMIT_MAX: ${RATE_MAX}\n`);

  if (!(await waitForServer())) {
    console.error(`Dev server not reachable at ${ENDPOINT}. Start it with "npm run dev".`);
    process.exit(2);
  }

  // a) Missing email -> 400 "Email required"
  {
    const { status, json } = await post({ ...validBase, email: undefined });
    record(
      'a) Missing email -> 400 "Email required"',
      status === 400 && json?.error === 'Email required',
      `status=${status} body=${JSON.stringify(json)}`,
    );
  }

  // b) Invalid email -> 400 "Enter a valid email address."
  {
    const { status, json } = await post({ ...validBase, email: 'not-an-email' });
    record(
      'b) Invalid email -> 400 "Enter a valid email address."',
      status === 400 && json?.error === 'Enter a valid email address.',
      `status=${status} body=${JSON.stringify(json)}`,
    );
  }

  // c) Missing / invalid service -> 400
  {
    const miss = await post({ ...validBase, email: 'c1@example.com', projectType: '' });
    record(
      'c1) Missing service -> 400',
      miss.status === 400 && /service/i.test(miss.json?.error || ''),
      `status=${miss.status} body=${JSON.stringify(miss.json)}`,
    );

    const bad = await post({ ...validBase, email: 'c2@example.com', projectType: 'Totally Fake Service' });
    record(
      'c2) Invalid service -> 400',
      bad.status === 400 && /service/i.test(bad.json?.error || ''),
      `status=${bad.status} body=${JSON.stringify(bad.json)}`,
    );
  }

  // d) Honeypot (companyUrl) filled -> 200 success, ignored, no email sent
  {
    const { status, json } = await post({
      ...validBase,
      email: 'spambot@example.com',
      companyUrl: 'http://spam.example',
    });
    record(
      'd) Honeypot filled -> 200 ignored, no email sent',
      status === 200 && json?.success === true
        && json?.ownerDelivered === false && json?.clientDelivered === false,
      `status=${status} body=${JSON.stringify(json)}`,
    );
  }

  // e1) Valid request (owner email) -> 200, reference, owner + client delivered.
  //     This is the real end-to-end proof: sandbox allows delivery to the owner
  //     inbox, so BOTH the owner notification and client confirmation arrive.
  let realReference = null;
  {
    const { status, json } = await post({
      ...validBase,
      email: OWNER_EMAIL,
      description: 'E2E smoke: owner + client confirmation to account-owner inbox.',
    });
    realReference = json?.reference || null;
    record(
      'e1) Valid (owner email) -> 200, RD-reference, owner + client delivered',
      status === 200 && json?.success === true
        && REFERENCE_RE.test(json?.reference || '')
        && json?.ownerDelivered === true && json?.clientDelivered === true,
      `status=${status} body=${JSON.stringify(json)}`,
    );
  }

  // e2) Valid request (non-owner client email) -> 200, owner delivered, client
  //     confirmation skipped with a documented sandbox warning.
  {
    const { status, json } = await post({
      ...validBase,
      email: 'real-client@example.com',
      description: 'E2E smoke: non-owner client (sandbox should skip client confirmation).',
    });
    record(
      'e2) Valid (non-owner email) -> 200, owner delivered, client warning (sandbox)',
      status === 200 && json?.success === true
        && REFERENCE_RE.test(json?.reference || '')
        && json?.ownerDelivered === true && json?.clientDelivered === false
        && typeof json?.warning === 'string',
      `status=${status} body=${JSON.stringify(json)}`,
    );
  }

  // f) Rate limit -> more than CONTACT_RATE_LIMIT_MAX rapid requests -> 429
  {
    const burst = RATE_MAX + 5;
    const statuses = [];
    for (let i = 0; i < burst; i++) {
      const { status } = await post({
        ...validBase,
        email: `burst-${i}-${Date.now()}@example.com`,
        description: 'Rate-limit burst.',
      });
      statuses.push(status);
    }
    const got429 = statuses.includes(429);
    const last = statuses[statuses.length - 1];
    record(
      'f) Rate limit -> 429 after exceeding CONTACT_RATE_LIMIT_MAX',
      got429 && last === 429,
      `statuses=[${statuses.join(',')}]`,
    );
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (realReference) {
    console.log(`Real e2e reference (check ${OWNER_EMAIL} for owner + client mail): ${realReference}`);
  }
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('Smoke runner crashed:', err);
  process.exit(3);
});
