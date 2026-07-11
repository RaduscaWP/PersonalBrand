# Personal Brand UI/UX Improvement Progress

Last updated: 2026-07-11T21:14:12+03:00

## Continuation status

This run continued from commit `6edbf04` and the completed mobile optimization report. It did not repeat the previous audit. Seven read-only audit tracks covered architecture, mobile, desktop, visual consistency, accessibility/UX, performance/loading, and frontend robustness before implementation started.

No P0 issue was found. The confirmed P1 failures were a clipped mobile menu, unreadable secondary pricing CTAs, reduced-motion route transitions that still animated, stale production metadata, a missing Open Graph asset reference, and the missing requested Hero text-loading effect.

## Consolidated audit findings

| Severity | Issue | Route / component | Root cause | Status |
|---|---|---|---|---|
| P1 | Mobile menu collapsed to a 56px strip | Global `Navbar` at 320-430px | `backdrop-filter` on the fixed nav made the fixed menu resolve against the nav instead of the viewport | Fixed and browser-verified |
| P1 | Non-featured pricing CTAs were nearly invisible | `/pricing`, `PricingCard` | Dark-surface secondary button reused on paper cards | Fixed with a paper-surface variant |
| P1 | Reduced-motion route changes still faded to near-zero opacity | Global `PageTransition` | Hardcoded Framer Motion entrance/exit plus `mode="wait"` | Fixed without hydration mismatch |
| P1 | Production metadata used a dead domain and missing OG file | Metadata, robots, sitemap, contact config | Duplicated stale production URL and `/og-image.jpg` reference | Fixed and centralized on `https://www.radusca.dev` |
| P1 | Required premium Hero text loading was absent | `/`, `HeroSection` | Only a generic whole-block GSAP reveal existed | Fixed with a reserved-space, session-aware typing sequence |
| P1 | Project proof used generic generated UI shells | `/`, `/projects` | Real project screenshot data was not rendered | Fixed for the four live featured projects |
| P2 | Keyboard focus escaped the mobile overlay | Global `Navbar` | No focus containment or inert background | Fixed |
| P2 | Closed Hero dropdowns intercepted Escape | `/`, `HeroDropdown` | Global listener remained registered while closed | Fixed |
| P2 | Hero form focus was visually weak | `/`, `HeroForm` | Local `outline: none` overrode global focus treatment | Fixed |
| P2 | About introduction and Home CTA appeared too late on small phones | `/about`, `/` | Mobile ordering and redundant Hero chips consumed the first viewport | Fixed with mobile reordering and short-height composition |
| P2 | Long blog title overran 320px | `/blog/[slug]` | Desktop title minimum was retained on narrow phones | Fixed |
| P2 | Draft articles were included in sitemap | Sitemap/blog metadata | Sitemap filtered only `published` | Fixed; drafts now use `noindex` and stay out of sitemap |
| P2 | No route loading/error UI | Global App Router | Missing `loading.jsx` and `error.jsx` | Fixed with restrained states |
| P2 | Three.js was eagerly bundled from the Hero component | `/`, `HeroSection` | Static import despite desktop-only execution | Fixed with conditional dynamic import |

## Implemented batch

- Moved the navbar blur onto a pseudo-layer so the mobile overlay remains viewport-sized.
- Added focus containment, inert background content, outside-background close, active-link semantics, and a skip link.
- Added a light/paper button variant and a balanced three-column desktop pricing grid.
- Rebuilt route transitions to avoid navigation delay, honor reduced motion, focus the new page heading, and remain hydration-safe.
- Added `HeroTitle`, a natural-timing typing sequence with a blinking/fading cursor, immediate semantic text, reserved final dimensions, one-session playback, and reduced-motion bypass.
- Tightened short-phone Hero typography and removed low-priority chips only on short narrow viewports so the primary CTA appears in the first screen.
- Reordered the About mobile Hero so the introduction precedes the portrait.
- Added real screenshots for COSMOS, Fly With Derek, Arca AI, and CryptoTrack and rendered them in project cards/case studies.
- Replaced generic GitHub profile links with repository-specific links and disabled the dead Grozav Bank live URL.
- Added posters/preload metadata for the Hero video and dynamically loaded Three.js only on eligible desktops.
- Fixed the certificate icon class mismatch and improved small-link hit areas.
- Centralized the canonical site URL, fixed robots/sitemap/OG metadata, updated example deployment origins, and excluded draft posts from search indexing.
- Added restrained loading and recoverable error states.
- Removed 21 accidentally committed Playwright YAML snapshots and ignored future `.playwright-cli` artifacts without rewriting Git history.

## Verification completed

- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; all 16 static/dynamic route outputs generated successfully.
- Real Chrome regression matrix: 117 route/viewport combinations passed with no overflow, wrong HTTP status, missing H1, or missing main landmark.
- Routes checked: `/`, `/about`, `/projects`, `/services`, `/pricing`, `/blog`, `/blog/cybersecurity-alongside-webdev`, `/contact`, and `/nonexistent`.
- Viewports checked: 320x667, 360x800, 375x812, 390x844, 430x932, 768x1024, 820x1180, 1024x768, 1280x800, 1366x768, 1440x900, 1600x900, and 1920x1080.
- Mobile menu after fix: 565px client height at 320x667, all links and CTA visible, focus loop contained, main/footer inert.
- Pricing paper CTA: dark text, visible border/background, 51.25px target height.
- Hero typing: title height remained 144.19px from empty state through completion; no layout shift.
- Reduced motion: route wrapper remained `opacity: 1` with `transform: none`; fresh-session hydration check reported zero errors.
- Project screenshot images loaded with valid natural dimensions.
- Final representative screenshots were captured and visually inspected at phone, tablet, laptop, and desktop sizes. The only console error in the full matrix was the intentional 404 resource response for `/nonexistent`.

## Remaining work for later continuations

- Re-encode the five Hero MP4 files and add Save-Data/mobile poster-first behavior; the current set is still about 24 MB total.
- Replace JetBrains Mono's CSS `@import` with `next/font` and replace Lucide namespace imports with explicit icon registries.
- Suspend custom-cursor and particle RAF loops when their page/section is hidden.
- Consolidate `HeroDropdown` with `CustomSelect` and share contact submission state between Hero and Contact forms.
- Normalize remaining card radii/surfaces and raise small muted/category text contrast tokens.
- Simplify duplicated footer navigation and finish the remaining 44px hit-area sweep.
- Replace draft blog outlines with complete articles before marking them indexable.
- Add a dedicated 1200x630 branded Open Graph asset; the current metadata uses the valid 1920x1080 Hero poster.
- Validate real Mobile Safari safe areas, software keyboard behavior, and hardware performance on physical devices.
