# Final Security Audit Report

Date: 2026-05-28

## Summary

The repository was audited and hardened defensively. No visual design changes were made.

## Vulnerabilities Found

- Critical/high dependency advisories in `next@14.2.15`.
- High dev-tooling advisory through `eslint-config-next`.
- Missing security headers and CSP.
- Contact API rate limiter was in-memory only.
- Contact API allowed localhost origins in production.
- Contact API body-size protection started after full body read.
- Raw email provider errors were logged server-side.
- Client forms lacked non-visual length caps.

## Vulnerabilities Fixed

- Upgraded Next.js to 16.2.6.
- Upgraded ESLint tooling and migrated to flat config.
- Overrode PostCSS to 8.5.10 to clear the transitive advisory.
- Added global security headers and API no-store caching.
- Added optional Upstash Redis REST durable rate limiting.
- Added production-safe origin handling.
- Added pre-read body-size rejection.
- Sanitized server error logging.
- Added invisible form `maxLength` limits.

## Files Modified

- `.eslintrc.json` removed.
- `eslint.config.mjs` added.
- `.gitignore`
- `package.json`
- `package-lock.json`
- `.env.local.example`
- `next.config.js`
- `app/api/contact/route.js`
- `components/ContactForm/ContactForm.jsx`
- `components/Hero/HeroForm.jsx`
- Security report markdown files in the repository root.

## Verification

- `npm install`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm run typecheck`: missing script, documented.
- `npm audit --json`: 0 vulnerabilities.
- `npm audit --omit=dev --json`: 0 vulnerabilities.
- `npm ls --depth=0 --json`: clean after pruning stale extraneous local module.
- `npm outdated --json`: non-security updates remain available.
- Playwright screenshot baseline and post-change captures completed.
- Playwright smoke test: 2 passed.

## Remaining Risks

- Durable rate limiting requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in production. Without them, the fallback limiter is in-memory.
- `npm audit signatures` could not complete because Sigstore DNS resolution failed in this environment.
- Some packages have newer non-security versions available, but were left unchanged to avoid unnecessary regression risk.

## Design Confirmation

No visual design changes were made. CSS, layout, animation, colors, spacing, visible text, images, icons, and responsive behavior were not intentionally changed.
