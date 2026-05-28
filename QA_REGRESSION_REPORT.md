# QA Regression Report

Date: 2026-05-28

## Commands

- `npm install`
- `npm run lint`
- `npm run build`
- `npm run typecheck`
- `npm audit --json`
- `npm audit --omit=dev --json`
- `npm outdated --json`
- `npm ls --depth=0 --json`
- `npx playwright screenshot ...`
- `npx playwright test output/playwright/security-smoke.spec.js --reporter=line --workers=1 --browser=chromium`

## Results

- `npm run lint`: passed.
- `npm run build`: passed with Next.js 16.2.6 using Webpack.
- `npm run typecheck`: failed because no `typecheck` script exists.
- `npm audit --json`: 0 vulnerabilities.
- `npm audit --omit=dev --json`: 0 vulnerabilities.
- `npm ls --depth=0 --json`: clean after pruning one stale extraneous module from `node_modules`.
- Playwright smoke test: 2 passed.
- `npm audit signatures`: blocked by DNS failure resolving Sigstore infrastructure.
- `npx playwright install chromium`: blocked by DNS failure resolving Playwright download hosts; smoke test used an existing local Chromium executable.

## Visual Regression

Baseline and post-change screenshots were captured for home, about, projects, services, pricing, blog, and contact at desktop and mobile widths.

Pixel comparison summary:

- All screenshot dimensions matched before and after.
- Differences were very small, ranging from 0.07% to 1.25% changed pixels.
- The highest variance was on the animated/video-heavy home page.
- No intentional design, layout, spacing, color, typography, animation, image, or copy changes were made.

## QA Artifacts

Artifacts are under `output/playwright/`.
