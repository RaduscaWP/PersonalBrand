# Dependency Audit Report

Date: 2026-05-28

## Commands

- `npm install`
- `npm audit --json`
- `npm audit --omit=dev --json`
- `npm outdated --json`
- `npm ls --depth=0 --json`
- `npm audit signatures`

## Changes

- Upgraded `next` from `14.2.15` to `16.2.6`.
- Upgraded `eslint-config-next` from `14.2.15` to `16.2.6`.
- Upgraded `eslint` from `8.57.x` to `9.39.2`.
- Added `@playwright/test@1.57.0` as a dev-only QA dependency.
- Added `overrides.postcss = 8.5.10` to remove the transitive PostCSS advisory from Next.js.
- Kept `react` and `react-dom` at `18.3.1` to reduce visual regression risk.

## Results

- Final `npm audit --json`: 0 vulnerabilities.
- Final `npm audit --omit=dev --json`: 0 vulnerabilities.
- Final `npm ls --depth=0 --json`: clean after removing one stale extraneous module from `node_modules`.
- `npm audit signatures`: failed because `tuf-repo-cdn.sigstore.dev` could not resolve in DNS. This was an environment/network failure, not a reported package signature failure.

## Outdated Packages

`npm outdated --json` still reports newer major/minor versions for non-security upgrades such as `react`, `react-dom`, `framer-motion`, `lucide-react`, `resend`, `sass`, `three`, and `eslint`. These were not upgraded because `npm audit` is clean and further major upgrades increase regression risk.

## Design Impact

No visual changes. Dependency changes are build/runtime/security tooling only.
