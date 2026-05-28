# Security Fix Plan

Date: 2026-05-28

| Problem | Severity | Files | Fix | Regression Risk | Design Impact |
| --- | --- | --- | --- | --- | --- |
| Vulnerable Next.js 14 dependency cluster | Critical/High | `package.json`, `package-lock.json` | Upgrade to Next.js 16.2.6 | Medium | None |
| Vulnerable lint tooling transitive deps | High | `package.json`, `eslint.config.mjs` | Upgrade ESLint tooling and migrate flat config | Low | None |
| Missing HTTP security headers | Medium | `next.config.js` | Add CSP, frame, nosniff, referrer, permissions, HSTS | Low | None |
| API responses cacheable by default | Low | `next.config.js` | Add no-store API cache header | Low | None |
| Serverless rate limit not durable | Medium | `app/api/contact/route.js` | Add optional Upstash Redis REST limiter | Low | None |
| Localhost allowed in production origin list | Low | `app/api/contact/route.js` | Gate dev origins outside production | Low | None |
| Body-size check after full read | Low | `app/api/contact/route.js` | Add content-length precheck | Low | None |
| Raw provider error logging | Low | `app/api/contact/route.js` | Log sanitized error metadata | Low | None |
| Client fields missing length caps | Info | form components | Add non-visual `maxLength` attributes | Low | None |

Fix order: dependencies, headers, API hardening, form hardening, verification, final report.
