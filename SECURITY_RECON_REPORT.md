# Security Recon Report

Date: 2026-05-28

## Scope

Repository-wide defensive review of the Next.js portfolio in this workspace.

## Stack

- Framework: Next.js App Router, upgraded from 14.2.15 to 16.2.6 during remediation.
- UI: React 18.3.1, SCSS Modules, global SCSS.
- Animation/media: GSAP, Framer Motion, Three.js hero particles, local video/image assets.
- Backend surface: one API route, `POST /api/contact`.
- Email provider: Resend, server-side only.
- Deployment target: Vercel.

## Sensitive Surfaces

- Forms: home hero request form and contact page form.
- API: `app/api/contact/route.js`.
- Environment variables: `RESEND_API_KEY`, contact email config, rate-limit config, site URL/origin config.
- Third-party runtime: Vercel Analytics and Speed Insights only when `process.env.VERCEL === '1'`.
- Public documents: diplomas served as static PDFs and opened in new tabs only.

## Not Present

- No authentication.
- No authorization model.
- No payments.
- No file uploads.
- No database.
- No middleware.
- No external scripts embedded directly in page code.

## Findings

| Severity | Finding | Status |
| --- | --- | --- |
| Critical | Vulnerable Next.js 14.2.15 advisory cluster | Fixed by upgrading to Next.js 16.2.6 |
| High | Vulnerable eslint-config-next transitive glob advisory | Fixed by upgrading eslint-config-next to 16.2.6 |
| Medium | Missing HTTP security headers | Fixed in `next.config.js` |
| Medium | Contact API rate limiting was in-memory only | Improved with optional Upstash Redis REST limiter and memory fallback |
| Low | Production origin allowlist included localhost implicitly | Fixed; dev origins are non-production only |
| Low | Request body size check happened after full body read | Fixed with `Content-Length` precheck |
| Low | Raw provider error object was logged | Fixed with sanitized server logging |

## Design Impact

No visual design, layout, animation, color, spacing, image, icon, or visible copy changes were made.
