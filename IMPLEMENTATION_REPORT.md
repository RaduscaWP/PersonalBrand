# Business-Class Storytelling Implementation Report

Date: 2026-07-13

## Outcome

The portfolio now presents one coherent client journey instead of a collection of repeated sections. The homepage follows six acts: Promise, Adaptation, Proof, Method, Trust, and Action. The flagship Hero brief narrows a visitor from domain to service, goal, and delivery lane, then carries that context safely into the Contact form.

The existing dark/violet identity, typography, content truthfulness, project proof, and server-side email architecture were preserved. No production deployment was performed.

## Main implementation

- Rebuilt the homepage around a six-act narrative and removed the redundant proof block.
- Added a domain-first interactive Hero brief with accessible select-only combobox behavior, keyboard control, touch alternatives, live summary, and safe Contact prefill.
- Added a real first-visit loader driven by font/Hero readiness, capped by a 2.1 second failsafe, and stored once per browser session.
- Rebuilt route transitions with GSAP cleanup, rapid-navigation protection, history handling, scroll/focus restoration, and a server-rendered content path outside the motion boundary.
- Replaced the old ad-hoc motion helpers with reusable motion tokens, centralized plugin registration, scoped `useGSAP()` cleanup, and capability hooks.
- Added a capability-aware custom cursor, magnetic actions, split reveals, image reveals, count-up behavior, hover text swaps, and static fallbacks.
- Hardened Three.js so it loads only for eligible Hero sessions, pauses offscreen/when hidden, handles context loss, and fails to the static Hero without repeated errors.
- Rebuilt the Method section as a desktop sticky narrative and a natural, unpinned mobile sequence.
- Reworked Projects into one real-client-first case-study narrative without the duplicated gallery.
- Reworked Services into Web, Automation, and Internal Software chapters while keeping roadmap skills visibly non-bookable.
- Added a filterable Pricing explorer and concise comparison while leaving all price facts unchanged.
- Reframed Blog as Notes / Lab; all outline posts remain clearly marked draft, `noindex, follow`, and excluded from the sitemap.
- Added the About timeline story and kept certificates as new-tab PDF links.
- Rebuilt Contact validation, focusable error summary, autocomplete, server-failure recovery, honeypot behavior, and hard double-submit protection.
- Changed confirmation-email failure semantics so an already-delivered owner notification returns success with a warning instead of inviting a duplicate retry.
- Added privacy-safe analytics events for Hero, brief, service, project, pricing, and Contact actions. No names, emails, or project descriptions are sent.

## Motion foundation

New/refactored motion surfaces include:

- `lib/motion/register.js` — central GSAP/plugin registration.
- `lib/motion/tokens.js` and `lib/motion/presets.js` — shared durations, distances, staggers, and eases.
- `lib/motion/webgl.js`, `lib/motion/flip.js`, and `lib/motion/session.js` — focused helpers.
- `hooks/useMediaQuery.js`, `usePointerCapabilities.js`, and `usePrefersReducedMotion.js`.
- `components/motion/MotionProvider`, `MotionBoundary`, `FirstVisitLoader`, `SplitReveal`, `HoverSwapText`, `CountUp`, `ImageReveal`, and `MagneticAction`.
- `SectionReveal`, `PageTransition`, `CustomCursor`, `MagneticButton`, Hero, Method, Stats, Project cards, CTA, and marquees now use the shared system.

## Dependency changes

- Added `@gsap/react` for scoped React lifecycle cleanup.
- Standardized `gsap` on the public 3.15 package already resolved by the lockfile.
- Removed `framer-motion`; route and section motion now use one GSAP foundation.
- Kept the repository's existing Next.js 16.2.6 and React 18.3.1 baseline; no risky framework downgrade was introduced.

## Fallback behavior

- Reduced motion: loader exits immediately, video and custom cursor are disabled, marquees become static, sticky pinning is removed, and all content is immediately visible.
- Coarse/touch input: custom cursor and mobile Hero video are disabled; navigation and interactive brief remain keyboard/touch operable.
- Save-Data: heavy Hero media is skipped.
- WebGL unavailable: one capability failure is recorded, the canvas enhancement stops, and the static/video Hero remains intact.
- Video failure: the video remains transparent while the local gradient/poster fallback stays visible.
- Route-motion failure: the actual page content is outside the transition error boundary and remains readable.

## Accessibility and UX

- Valid combobox/listbox semantics for Hero and Contact selectors.
- Mobile menu focus containment, inert background, Escape close, focus restoration, and current-page semantics.
- Focus-visible treatments and keyboard-pause behavior for both moving marquees.
- Accessible inline form errors, focused summary links, `aria-invalid`, `aria-describedby`, status announcements, and autocomplete.
- Decorative duplicate marquee content is hidden from assistive technology.
- All visible links/buttons in the required viewport matrix meet the 44px target check.
- Nested complementary landmark violations were removed.
- Axe WCAG A/AA sweep: zero violations on Home (dropdown open), Services, Projects, Pricing, Contact validation, and the open mobile menu.

## SEO and structured data

- Unique titles, descriptions, absolute canonicals, Open Graph data, Twitter large-card data, and relevant local images across public routes.
- Factual `Person`, `WebSite`, and `ProfessionalService` schema globally.
- `BreadcrumbList` on Notes entries and the Projects case-study route.
- `Article` schema only when an article is complete.
- Draft Notes remain absent from the public sitemap.
- `robots.txt` points to the canonical sitemap and host.

## Verification

### Static checks

- `npm.cmd run lint` — passed with zero warnings/errors.
- `npm.cmd run build` — passed; Next generated all 16 route outputs.
- Next build TypeScript phase — passed. There is no separate `typecheck` script.
- No unit/integration test script exists in `package.json`; browser integration paths were exercised directly.
- `git diff --check` — passed.

### Lighthouse before and after

| Profile | Metric | Baseline | Final |
|---|---:|---:|---:|
| Mobile | Performance | 65 | 70 |
| Mobile | Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| Mobile | LCP | 6.0 s | 4.4 s |
| Mobile | TBT | 500 ms | 410 ms |
| Mobile | CLS | 0.001 | 0.001 |
| Desktop | Performance | 96 | 94 |
| Desktop | Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| Desktop | LCP | 1.4 s | 0.8 s |
| Desktop | TBT | 60 ms | 50 ms |
| Desktop | CLS | 0.001 | 0.09 |

Desktop CLS remains inside the good threshold; the recorded shifts are attributed to the required `font-display: swap` web-font replacement. The final mobile trace transferred about 593 KiB total: 274.9 KiB JavaScript and 35.4 KiB CSS, including prefetched internal routes.

### Browser and capability matrix

- Chrome: all required viewport sizes passed — 360x800, 390x844, 430x932, 768x1024, 1024x768, 1280x800, 1440x900, and 1920x1080.
- Edge and Firefox: all seven public routes plus 390px mobile reflow passed with visible H1s, correct titles, no horizontal overflow, and no runtime errors.
- Chrome iPhone emulation: coarse pointer detected, custom cursor off, Hero video off, menu keyboard flow passed, and the interactive brief successfully prefilled Contact.
- 200% zoom-equivalent reflow at 720 CSS pixels: no horizontal overflow; mobile navigation activated correctly.
- Reduced motion, WebGL unavailable, video failure, wheel scrolling, refresh, back/forward, and route cleanup checks passed.
- Contact: invalid focus/ARIA, exactly-one-request double submit, success lock, and editable preserved state after mocked 503 failure all passed.

### Link check

- 21 unique internal routes/query links/PDFs returned 200.
- 10 of 11 external HTTP links returned 200.
- The Instagram URL could not be resolved by the local DNS during the check; the link syntax is unchanged and should be rechecked from a normal network.

### Screenshots and traces

- Required viewport screenshots: `output/playwright/final-home-{width}x{height}.png`.
- Desktop full page: `output/playwright/final-home-1440x900-full.png`.
- Mobile navigation and brief: `output/playwright/final-mobile-menu-open.png`, `final-mobile-brief-complete.png`.
- Reduced motion and WebGL fallback: `final-home-reduced-1440x900.png`, `final-home-webgl-fallback.png`.
- Lighthouse JSON: `lighthouse-final-home-mobile.json`, `lighthouse-final-home-desktop-rerun.json`.

## Remaining optional work

- Run physical Safari/iOS and Android hardware checks. Playwright WebKit could not be installed because its CDN failed DNS resolution twice in this Windows environment.
- Publish the three Notes articles only after replacing their intentionally retained draft outlines with complete writing.
- Recheck the Instagram link from a network that resolves Instagram.
- Decide whether to use a paid Vercel Analytics plan or another privacy-safe endpoint for custom-event reporting; Vercel custom events are plan-gated.
- Monitor desktop font-swap CLS on the deployed CDN and revisit font loading only if real-user data shows a problem.
- Review the one moderate, development-only `js-yaml` advisory inherited through ESLint when the upstream toolchain updates; no high or critical vulnerabilities were reported.

## Deployment

No deployment, production configuration change, email send, or external publication was performed.
