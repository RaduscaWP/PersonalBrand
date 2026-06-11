# Resend Email Setup — Contact Form

This portfolio sends **two** emails on every valid contact submission:

1. **Owner notification** → `grozavradustefan@gmail.com` ("a client requested X").
2. **Client confirmation** → the visitor ("Request received, reply within 24h").

Both are built in [`lib/contactEmails.js`](lib/contactEmails.js) and sent from
[`app/api/contact/route.js`](app/api/contact/route.js).

---

## Why the client confirmation isn't reaching real clients yet

The sender is currently the Resend **sandbox** address `onboarding@resend.dev`.

In sandbox mode Resend will only deliver to the **account-owner inbox**
(`grozavradustefan@gmail.com`). For any other recipient the send is rejected.
Because of that, `route.js` deliberately **skips** the client confirmation for
non-owner recipients (the `isSandboxSender()` branch) and returns a `warning`
instead of failing the request. That is exactly why the **owner** email arrives
but a **real client's** confirmation does not.

The application code is already correct: as soon as a **verified sender domain**
is configured, both emails deliver through the normal path. **No code change is
required — this is purely configuration.**

---

## Go live in 3 steps (domain: `radusca.dev`)

`radusca.dev` has already been **added** to the Resend account
(domain id `dd528698-6dea-4708-8b53-87ee288fa8d1`, region `us-east-1`,
status `not_started`). You only need to add its DNS records and verify.

### Step 1 — Add the DNS records in Vercel

`radusca.dev` is managed by Vercel, so add these in
**Vercel → Domains → radusca.dev → DNS Records**. Enter the **Name** exactly as
shown (Vercel treats it as a subdomain of `radusca.dev`).

| Type | Name (host)         | Value                                                                 | Priority | TTL  |
|------|---------------------|-----------------------------------------------------------------------|----------|------|
| TXT  | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/NI2ULOXdjQKElZr/gdPL4Ty5pkGJLuNl9YmW9tPx5uWZyUtN69nH4NYva5UpMzIVj6DUbAPaUzClv2d8F2gIpO8ggI0lsLzn2N6OQg0/0npHwdQWT/koMQzg32QOSN0Z+cLfK0Gx5fJop96RP9DaW9+zZlTckmVnq/9vcbqKDQIDAQAB` | —        | Auto |
| MX   | `send`              | `feedback-smtp.us-east-1.amazonses.com`                               | 10       | 60   |
| TXT  | `send`              | `v=spf1 include:amazonses.com ~all`                                   | —        | 60   |

> Optional but recommended (improves deliverability / avoids spam folder):
> add a DMARC record — **TXT** `_dmarc` → `v=DMARC1; p=none;`.

After saving, open **Resend → Domains → radusca.dev** and click **Verify**
(DNS can take a few minutes to a few hours to propagate). Wait until the status
shows **Verified**. You can also re-check from the CLI:

```powershell
# Lists domains + status (key read from .env.local, never printed)
$key = (Get-Content .env.local | Where-Object { $_ -match '^RESEND_API_KEY=' }) -replace '^RESEND_API_KEY=',''
Invoke-RestMethod -Uri "https://api.resend.com/domains" -Headers @{ Authorization = "Bearer $($key.Trim())" } | ConvertTo-Json -Depth 6
```

### Step 2 — Set `CONTACT_FROM_EMAIL` to the verified domain

**Local** — in `.env.local`, comment the sandbox line and uncomment the live one:

```env
# CONTACT_FROM_EMAIL=onboarding@resend.dev
CONTACT_FROM_EMAIL=hello@radusca.dev
```

**Production (Vercel)** — set these Environment Variables under
**Vercel → Project → Settings → Environment Variables** (Production + Preview):

| Variable             | Value                          |
|----------------------|--------------------------------|
| `RESEND_API_KEY`     | your Resend API key (`re_…`)    |
| `CONTACT_FROM_EMAIL` | `hello@radusca.dev`            |
| `CONTACT_FROM_NAME`  | `Radu Portfolio`               |
| `CONTACT_TO_EMAIL`   | `grozavradustefan@gmail.com`   |

(Any mailbox on the verified domain works — `hello@`, `portfolio@`, etc.
The mailbox does not need to exist to *send* from it.)

### Step 3 — Redeploy and test

- Redeploy on Vercel so the new env vars take effect.
- Submit a real request from the live site using a **different** email address
  than the owner's. Confirm **both** inboxes receive mail:
  - owner inbox gets the notification,
  - the visitor's inbox gets the confirmation.

That's it — once the domain is verified and `CONTACT_FROM_EMAIL` points at it,
the existing `else` branch in `route.js` sends both emails for every client.

---

## Local smoke testing (no domain required)

While still on the sandbox sender you can prove the full path locally:

```powershell
# Terminal 1 — start the dev server (low rate limit keeps the test inbox quiet)
$env:CONTACT_RATE_LIMIT_MAX = '3'; npm run dev

# Terminal 2 — run the smoke tests against http://localhost:3000
$env:CONTACT_RATE_LIMIT_MAX = '3'; node scripts/smoke-contact.mjs
```

The valid-request case sends a real owner **and** client confirmation to the
account-owner inbox (the only recipient sandbox allows), proving the template
and delivery wiring end to end. See [`scripts/smoke-contact.mjs`](scripts/smoke-contact.mjs).
