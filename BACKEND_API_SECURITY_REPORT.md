# Backend/API Security Report

Date: 2026-05-28

## Scope

Reviewed `app/api/contact/route.js`, `lib/contactEmails.js`, form payloads, origin handling, request limits, rate limiting, and email delivery errors.

## Existing Controls

- Server-side `RESEND_API_KEY` only.
- JSON content-type enforcement.
- Request body size limit.
- Server-side trimming and length normalization.
- Email format validation.
- Allowlisted service, budget, and timeline values.
- Honeypot spam field.
- Generic client-facing failures.
- HTML email escaping for user-controlled content.

## Fixes Applied

- Added `Content-Length` precheck before reading the body.
- Changed production origin handling so localhost is not implicitly allowed in production.
- Added optional durable rate limiting through:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
- Kept the current in-memory limiter as local/fallback behavior.
- Hashes durable limiter keys before sending them to Redis to avoid storing raw IP/email key material.
- Replaced raw `console.error(err)` with sanitized error metadata.
- Made the public 503 API message generic.

## Remaining Risk

Durable rate limiting requires Upstash Redis REST credentials in production. Without them, the app falls back to in-memory rate limiting, which is weaker on serverless multi-instance deployments.

## Design Impact

No UI or request payload shape changes.
