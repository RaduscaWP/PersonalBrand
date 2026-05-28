# Headers Security Report

Date: 2026-05-28

## Scope

Reviewed `next.config.js`, deployment config, middleware presence, CSP needs, Vercel observability, local media assets, and API caching.

## Fixes Applied

- Disabled `X-Powered-By` with `poweredByHeader: false`.
- Added global security headers:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
  - `Strict-Transport-Security`
- Added `Cache-Control: no-store, max-age=0` for `/api/:path*`.
- Set `outputFileTracingRoot` to the project directory to avoid Next 16 selecting a parent workspace root.

## CSP Notes

The CSP allows current project needs: local assets, data URLs for the noise texture, local videos/images, Google font CSS/font hosts, and Vercel observability endpoints. It also blocks object embedding and frame ancestors.

## Verification

Playwright smoke checks confirmed all public routes return the required security headers.

## Design Impact

Header and config only. No visual change.
