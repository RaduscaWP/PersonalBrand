# AGENTS.md — Personal Developer Portfolio
## VERSION 3.0 — May 2026
## SINGLE SOURCE OF TRUTH — Read every section before writing a single line of code.
## Do not improvise. Do not add unlisted sections. Do not use generic AI aesthetics.
## When in doubt — re-read this file. The answer is here.

---

## 0. LOCAL PROJECT STRUCTURE (EXISTING FILES)

```
PORTFOLIO/
├── diplomas/
│   ├── Databases.pdf     ← Certiport IT Specialist: Databases (Score: 743)
│   ├── Networking.pdf    ← Certiport IT Specialist: Networking (Score: 920)
│   └── Python.pdf        ← Certiport IT Specialist: Python (Score: 720)
├── my-image/
│   └── radu-stefan.jpg   ← Profile photo — USE THIS everywhere a photo is needed
└── AGENTS.md             ← this file
```

### 0.1 Asset Migration (run immediately after Next.js setup)

```bash
cp my-image/radu-stefan.jpg public/images/profile.jpg
mkdir -p public/diplomas
cp diplomas/Databases.pdf  public/diplomas/Databases.pdf
cp diplomas/Networking.pdf public/diplomas/Networking.pdf
cp diplomas/Python.pdf     public/diplomas/Python.pdf
mkdir -p public/videos
mkdir -p public/images/projects
```

### 0.2 Profile Photo Usage

File: `public/images/profile.jpg`

| Location | Size | Style |
|---|---|---|
| Home Hero card (right col) | 200×200 | border-radius 50%, violet glow border |
| About page | 400×400 | squircle shape, -3deg tilt |
| Footer | 32×32 | circular |

Always use Next.js `<Image>` component:
```jsx
import Image from 'next/image';
<Image src="/images/profile.jpg" alt="Radu — Full-Stack Developer" width={400} height={400} priority style={{ objectFit: 'cover' }} />
```

### 0.3 Diploma Usage

Files in `public/diplomas/` — ONLY on About page. Never embed as iframes. Open in new tab only:
```jsx
<a href="/diplomas/Python.pdf" target="_blank" rel="noopener noreferrer">View Certificate</a>
```

### 0.4 Hero Video Assets

Files needed in `public/videos/` — source from Pexels.com (free, no attribution required):

| File | Search query on Pexels | What it shows |
|---|---|---|
| `hero-default.mp4` | "coding dark screen terminal" | General dev aesthetic — dark code flowing |
| `hero-landing-page.mp4` | "website scroll modern ui" | Fast-paced UI montage |
| `hero-full-website.mp4` | "web design premium multi page" | Multi-page navigation footage |
| `hero-figma-code.mp4` | "figma design ui designer" | Figma workspace + component building |
| `hero-uiux-design.mp4` | "design system figma dark" | Design grids, component systems |

Format: .mp4, H.264, max 10MB each, 1920×1080, muted, loop.

---

## 1. PROJECT OVERVIEW

| Field | Value |
|---|---|
| Type | Personal Developer Portfolio v2.0 |
| Owner | Radu-Stefan (nickname: Radusca) |
| Age | 18 |
| Location | Chisinau, Moldova |
| Purpose | Attract freelance clients + establish professional online presence |
| Language | English only — zero Romanian anywhere on this site |
| Deployment | Vercel (free tier) |
| GitHub | https://github.com/RaduscaWP |
| Instagram | https://www.instagram.com/radusca_ |
| Email | grozavradustefan@gmail.com |

**Core concept:** Adapt travelbusinessclass.com's interactive hero mechanic for a developer portfolio.
When a visitor selects "Full Website" or "Landing Page" in the hero dropdown, the background video
crossfades and the request form pre-fills that service automatically. This is the flagship feature.

---

## 2. TECH STACK

| Layer | Technology | Version | Reason |
|---|---|---|---|
| Framework | Next.js | 14.x App Router | Routing, SEO, performance |
| UI | React | 18.x | Component model |
| Styling | SCSS Modules + global SCSS | latest | Proves CSS skill |
| Scroll Animations | GSAP 3 + ScrollTrigger | 3.12.x | Professional scroll control |
| Page Transitions | Framer Motion | 11.x | Smooth page-to-page transitions |
| 3D/Particles | Three.js | 0.160.x | Hero particles only |
| Email API | Resend | 3.x | Server-side email (contact form) |
| Icons | Lucide React | 0.383.0 | Clean, consistent |
| Fonts | next/font (Google) | built-in | Zero layout shift |
| Package Manager | npm | latest | |

**GSAP Registration (in layout.jsx or _app):**
```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

**HARD RULES — never break these:**
- NO Tailwind CSS. Not one utility class.
- NO Bootstrap, Material UI, Chakra, shadcn, or any component library.
- NO jQuery. Vanilla JS only for custom scripts.
- NO styled-components or CSS-in-JS.
- NO Three.js outside of hero section.
- Build every component from scratch with SCSS modules.
- Use Resend for ALL email sending — never client-side email libs.

---

## 3. DESIGN SYSTEM

### 3.1 Color Palette

```scss
// app/globals.scss — define as CSS custom properties in :root
:root {
  // Backgrounds
  --bg-primary:   #080808;              // main bg — never pure #000
  --bg-surface:   #111111;              // cards, elevated surfaces
  --bg-elevated:  #1A1A1A;              // modals, dropdowns
  --bg-overlay:   rgba(8, 8, 8, 0.92);  // navbar on scroll, overlays

  // Text
  --text-primary:   #F0F0F0;
  --text-secondary: #888888;
  --text-muted:     #444444;
  --text-on-accent: #FFFFFF;

  // Accent — Violet (DEFINITIVE — never change)
  --accent:       #7C3AED;
  --accent-hover: #6D28D9;
  --accent-light: #A78BFA;              // italic text, muted highlights
  --accent-dim:   rgba(124,58,237,0.15);
  --accent-glow:  rgba(124,58,237,0.25);

  // Borders
  --border:        rgba(255,255,255,0.07);
  --border-hover:  rgba(255,255,255,0.15);
  --border-accent: rgba(124,58,237,0.4);

  // Status
  --green:         #10B981;
  --green-bg:      rgba(16,185,129,0.12);
  --yellow:        #F59E0B;
  --yellow-bg:     rgba(245,158,11,0.12);
  --orange:        #F97316;
  --orange-bg:     rgba(249,115,22,0.12);
  --red:           #EF4444;
  --red-bg:        rgba(239,68,68,0.12);

  // Shadows
  --shadow-sm:     0 1px 3px rgba(0,0,0,0.4);
  --shadow-md:     0 4px 16px rgba(0,0,0,0.5);
  --shadow-lg:     0 8px 32px rgba(0,0,0,0.6);
  --shadow-accent: 0 0 32px rgba(124,58,237,0.2);

  // Spacing (8-point grid)
  --space-1: 0.25rem; --space-2: 0.5rem;  --space-4: 1rem;
  --space-6: 1.5rem;  --space-8: 2rem;    --space-12: 3rem;
  --space-16: 4rem;   --space-20: 5rem;   --space-24: 6rem;

  // Layout
  --max-width:       1200px;
  --content-padding: clamp(1.5rem, 5vw, 3rem);
  --section-gap:     clamp(4rem, 10vh, 8rem);
  --card-padding:    clamp(1.25rem, 3vw, 2rem);

  // Border radius
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-pill: 100px;
}
```

### 3.2 Typography

```jsx
// app/layout.jsx
import { Syne, DM_Sans } from 'next/font/google';

export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});
// Apply both variables to <html> or <body> className
```

```scss
// globals.scss — also @import JetBrains Mono via Google Fonts URL
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-syne), sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--text-primary);
}
body, p, span, li { font-family: var(--font-dm-sans), sans-serif; }
code, .mono       { font-family: 'JetBrains Mono', monospace; }

// Font size scale
:root {
  --fs-hero:  clamp(3.5rem, 8vw, 7rem);
  --fs-h1:    clamp(2.5rem, 5vw, 4.5rem);
  --fs-h2:    clamp(1.8rem, 3vw, 2.8rem);
  --fs-h3:    clamp(1.2rem, 2vw, 1.6rem);
  --fs-body:  1rem;
  --fs-small: 0.875rem;
  --fs-xs:    0.75rem;
  --fs-mono:  0.8rem;
}
```

### 3.3 Visual Identity Rules — Non-Negotiable

1. Background is `#080808`. Never `#000000`. Never dark gray.
2. Cards: `--bg-surface` + `1px solid var(--border)`. Hover: border → `--border-accent` + faint violet glow.
3. Accent violet is RARE — only on: primary CTAs, active nav, highlighted stats, hover glows, active states.
4. ONE radial glow behind hero: `radial-gradient(ellipse 60% 40% at 30% 50%, rgba(124,58,237,0.08), transparent)`.
5. NO color drop shadows. Only dark rgba shadows + violet glow for accents.
6. NO stock images from external URLs in components. Use local files from `/public/`.
7. Noise texture on body: `body::before { background-image: url("data:image/svg+xml,..."); opacity: 0.03; }`
8. Generous negative space. Never crowd sections.
9. Borders are barely visible: `rgba(255,255,255,0.07)`.
10. "Available for hire" dot: green (#10B981) with CSS pulse animation.
11. Italic accent text (headings): `--accent-light` (#A78BFA) — same style as "serious" and "for the web" in current site.

---

## 4. FILE STRUCTURE

```
portfolio/
│
├── app/
│   ├── layout.jsx               # Root: fonts, AnnouncementBar, Navbar, Footer, CustomCursor
│   ├── globals.scss             # CSS reset, variables, global base, noise texture
│   ├── page.jsx                 # Home page
│   ├── about/page.jsx
│   ├── projects/page.jsx
│   ├── services/page.jsx
│   ├── pricing/page.jsx
│   ├── blog/
│   │   ├── page.jsx             # Blog listing
│   │   └── [slug]/page.jsx      # Individual post
│   ├── contact/page.jsx
│   └── api/
│       └── contact/route.js     # Resend email handler
│
├── components/
│   ├── AnnouncementBar/
│   │   ├── AnnouncementBar.jsx
│   │   └── AnnouncementBar.module.scss
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.scss
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.module.scss
│   ├── CustomCursor/
│   │   ├── CustomCursor.jsx     # 'use client'
│   │   └── CustomCursor.module.scss
│   ├── MagneticButton/
│   │   ├── MagneticButton.jsx
│   │   └── MagneticButton.module.scss
│   ├── SectionReveal/
│   │   ├── SectionReveal.jsx    # GSAP ScrollTrigger wrapper
│   │   └── SectionReveal.module.scss
│   ├── Hero/
│   │   ├── HeroSection.jsx      # FLAGSHIP — video swap + dropdown + form
│   │   ├── HeroDropdown.jsx     # TBC-style service selector
│   │   ├── HeroForm.jsx         # Pill-shaped request form
│   │   └── Hero.module.scss
│   ├── StatsBar/
│   │   ├── StatsBar.jsx
│   │   └── StatsBar.module.scss
│   ├── ProjectCard/
│   │   ├── ProjectCard.jsx
│   │   └── ProjectCard.module.scss
│   ├── BentoGrid/
│   │   ├── BentoGrid.jsx
│   │   └── BentoGrid.module.scss
│   ├── ServiceCard/
│   │   ├── ServiceCard.jsx
│   │   └── ServiceCard.module.scss
│   ├── PricingCard/
│   │   ├── PricingCard.jsx
│   │   └── PricingCard.module.scss
│   ├── CertCard/
│   │   ├── CertCard.jsx         # Uses /diplomas/ PDFs — hardcoded
│   │   └── CertCard.module.scss
│   ├── BlogCard/
│   │   ├── BlogCard.jsx
│   │   └── BlogCard.module.scss
│   ├── ContactForm/
│   │   ├── ContactForm.jsx      # Resend via /api/contact
│   │   └── ContactForm.module.scss
│   └── TechMarquee/
│       ├── TechMarquee.jsx      # Infinite scrolling tech stack
│       └── TechMarquee.module.scss
│
├── data/
│   ├── heroServices.js          # NEW — dropdown services + video paths
│   ├── projects.js
│   ├── services.js
│   ├── pricing.js
│   ├── blog.js
│   ├── stack.js
│   └── stats.js
│
├── lib/
│   ├── threeParticles.js        # Three.js hero particles
│   └── gsapAnimations.js        # Reusable GSAP patterns
│
├── styles/
│   └── mixins.scss
│
├── public/
│   ├── images/
│   │   ├── profile.jpg          # ← COPY from my-image/radu-stefan.jpg
│   │   ├── og-image.jpg         # 1200×630 OG image
│   │   └── projects/
│   │       ├── cosmos.jpg
│   │       ├── arca-ai.jpg
│   │       ├── cryptotrack.jpg
│   │       └── grozav-bank.jpg
│   ├── diplomas/
│   │   ├── Databases.pdf        # ← COPY from diplomas/
│   │   ├── Networking.pdf
│   │   └── Python.pdf
│   ├── videos/
│   │   ├── hero-default.mp4
│   │   ├── hero-landing-page.mp4
│   │   ├── hero-full-website.mp4
│   │   ├── hero-figma-code.mp4
│   │   └── hero-uiux-design.mp4
│   ├── favicon.ico
│   ├── sitemap.xml
│   └── robots.txt
│
├── .env.local                   # NEVER commit — contains RESEND_API_KEY
├── .gitignore
├── next.config.js
└── package.json
```

---

## 5. DATA FILES — COMPLETE CONTENT

### 5.1 `data/heroServices.js` — NEW FLAGSHIP DATA

```js
// Powers the TBC-style hero dropdown + video swap mechanic
export const heroServices = [
  {
    id: 'landing-page',
    label: 'Landing Page',
    headlineStatic: 'I build',
    headlineDynamic: 'Landing Pages',
    subtext: 'Fast, conversion-focused single pages. Pixel-perfect, mobile-first, SEO-ready, deployed to Vercel.',
    video: '/videos/hero-landing-page.mp4',
    fallbackImage: '/images/hero-landing.jpg',
    formPlaceholder: 'Tell me about your landing page — purpose, audience, reference sites you like...',
    budgets: ['$300–500', '$500–800', '$800–1200', '$1200+'],
    timelines: ['3–5 days', '1 week', '2 weeks', 'Flexible'],
  },
  {
    id: 'full-website',
    label: 'Full Website',
    headlineStatic: 'I build',
    headlineDynamic: 'Full Websites',
    subtext: 'Multi-page websites with navigation, SEO metadata, contact forms, and professional Vercel deployment.',
    video: '/videos/hero-full-website.mp4',
    fallbackImage: '/images/hero-website.jpg',
    formPlaceholder: 'Describe your website — pages needed, goals, target audience, existing brand...',
    budgets: ['$700–1000', '$1000–1500', '$1500–2500', '$2500+'],
    timelines: ['1 week', '2 weeks', '3 weeks', 'Flexible'],
  },
  {
    id: 'figma-to-code',
    label: 'Figma to Code',
    headlineStatic: 'I turn',
    headlineDynamic: 'Figma into Code',
    subtext: 'You design it — I build it exactly. HTML/CSS/React, pixel-perfect, responsive on all screens.',
    video: '/videos/hero-figma-code.mp4',
    fallbackImage: '/images/hero-figma.jpg',
    formPlaceholder: 'Share your Figma file link or describe the screens — number of pages, components...',
    budgets: ['$200–400', '$400–700', '$700–1200', '$1200+'],
    timelines: ['2–4 days', '1 week', '2 weeks', 'Flexible'],
  },
  {
    id: 'uiux-design',
    label: 'UI/UX Design',
    headlineStatic: 'I design',
    headlineDynamic: 'UI/UX in Figma',
    subtext: 'Clean, modern interfaces designed in Figma before a single line of code is written. Component systems included.',
    video: '/videos/hero-uiux-design.mp4',
    fallbackImage: '/images/hero-design.jpg',
    formPlaceholder: 'What needs to be designed — app, website, component system? Share some inspiration...',
    budgets: ['$300–500', '$500–900', '$900–1500', '$1500+'],
    timelines: ['3–5 days', '1 week', '2 weeks', 'Flexible'],
  },
];

// Default state (nothing selected yet)
export const defaultHero = {
  headlineStatic: "Hi, I'm Radu.",
  headlineDynamic: 'I build things for the web.',
  subtext: "18-year-old developer based in Chisinau, Moldova. I craft fast, modern digital experiences — from pixel-perfect landing pages to full web applications.",
  video: '/videos/hero-default.mp4',
  fallbackImage: '/images/hero-default.jpg',
};
```

### 5.2 `data/projects.js`

```js
export const projects = [
  {
    id: 1,
    title: 'COSMOS',
    slug: 'cosmos',
    category: 'Educational Website',
    shortDescription: 'Romanian-language space & astronomy educational platform with Three.js 3D Jupiter model, scrollytelling narrative, Voyager disassembly mode, and interactive quiz system.',
    tags: ['Three.js', 'HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://space-project-orcin.vercel.app/',
    githubUrl: 'https://github.com/RaduscaWP',
    image: '/images/projects/cosmos.jpg',
    bentoSize: 'large',   // col 1-2, row 1-2
    featured: true,
  },
  {
    id: 2,
    title: 'Arca AI',
    slug: 'arca-ai',
    category: 'AI Platform',
    shortDescription: 'AI-powered product concept with a modern dark interface, sharp layout rhythm, and a clear product story.',
    tags: ['React', 'JavaScript', 'AI Integration', 'CSS'],
    liveUrl: 'https://arca-ai-rho.vercel.app/',
    githubUrl: 'https://github.com/RaduscaWP',
    image: '/images/projects/arca-ai.jpg',
    bentoSize: 'tall',    // col 3, row 1-2
    featured: true,
  },
  {
    id: 3,
    title: 'CryptoTrack',
    slug: 'cryptotrack',
    category: 'Dashboard',
    shortDescription: 'Real-time cryptocurrency dashboard with live market data, price charts, and a clean fintech-style interface.',
    tags: ['React', 'REST API', 'SCSS', 'JavaScript'],
    liveUrl: 'https://crypto-track-rho.vercel.app/',
    githubUrl: 'https://github.com/RaduscaWP',
    image: '/images/projects/cryptotrack.jpg',
    bentoSize: 'wide',    // col 1-2, row 3
    featured: true,
  },
  {
    id: 4,
    title: 'Grozav Bank',
    slug: 'grozav-bank',
    category: 'Fintech Concept',
    shortDescription: 'Crypto-focused financial platform concept with sleek fintech UI, professionally designed.',
    tags: ['React', 'JavaScript', 'SCSS', 'Figma'],
    liveUrl: 'https://grozav-bank.vercel.app/',
    githubUrl: 'https://github.com/RaduscaWP',
    image: '/images/projects/grozav-bank.jpg',
    bentoSize: 'square',  // col 3, row 3
    featured: false,
  },
];
```

### 5.3 `data/services.js`

```js
export const services = [
  // AVAILABLE NOW
  { id: 'landing-page',   title: 'Landing Page',     icon: 'Layout',    availability: 'now',         label: 'Available Now',
    description: 'Fast, conversion-focused single pages. Pixel-perfect, mobile-first, SEO-ready, deployed to Vercel.' },
  { id: 'figma-to-code',  title: 'Figma to Code',    icon: 'Figma',     availability: 'now',         label: 'Available Now',
    description: 'You design it in Figma — I build it exactly. HTML/CSS/React, pixel-perfect, responsive on all screens.' },
  { id: 'uiux-design',    title: 'UI/UX Design',     icon: 'Palette',   availability: 'now',         label: 'Available Now',
    description: 'Clean, modern Figma interfaces before a line of code is written. Component systems and mobile variants.' },
  { id: 'full-website',   title: 'Full Website',     icon: 'Globe',     availability: 'now',         label: 'Available Now',
    description: 'Multi-page websites with navigation, SEO metadata, contact forms, and Vercel deployment.' },
  { id: 'web-app',        title: 'Web Application',  icon: 'Code2',     availability: 'now',         label: 'Available Now',
    description: 'Interactive apps built with React and Next.js. SPAs, dashboards, admin panels, data-driven tools.' },
  { id: 'seo',            title: 'SEO Optimization', icon: 'Search',    availability: 'now',         label: 'Available Now',
    description: 'Technical SEO: metadata, Open Graph, sitemap, robots.txt, Core Web Vitals fixes.' },
  // COMING SOON
  { id: 'backend',        title: 'Backend Dev',      icon: 'Server',    availability: 'summer-2026', label: 'Summer 2026',
    description: 'REST APIs, database design, authentication, Node.js and Express.' },
  { id: 'cybersec-audit', title: 'Security Audit',   icon: 'Shield',    availability: 'fall-2026',   label: 'Fall 2026',
    description: 'Web application security audit: vulnerability scanning, penetration testing basics, remediation report.' },
  { id: 'mobile',         title: 'Mobile Apps',      icon: 'Smartphone',availability: 'summer-2027', label: 'Summer 2027',
    description: 'Cross-platform mobile applications (React Native).' },
  { id: 'systems',        title: 'Systems / C++',    icon: 'Cpu',       availability: 'summer-2027', label: 'Summer 2027',
    description: 'Performance-critical software in C++ and C. Systems programming and tooling.' },
];
```

### 5.4 `data/pricing.js`

```js
// NOTE: Replace all $X/$Y with real numbers before launch.
// Research Fiverr rates. Start slightly below market, raise after first 3-5 reviews.
export const pricing = [
  { id: 'landing-page',  service: 'Landing Page',     priceRange: '$X — $Y',    highlight: true,
    description: 'Perfect for startups, products, events, or personal brands.',
    includes: ['1-page fully responsive', 'SEO metadata (title, desc, OG)', 'Contact form + email delivery', 'Vercel deployment', '2 rounds of revisions', 'Delivered in 3–5 days'],
    turnaround: '3–5 days' },
  { id: 'figma-to-code', service: 'Figma to Code',    priceRange: '$X — $Y',    highlight: false,
    description: 'You provide the Figma file — I build it pixel-perfectly.',
    includes: ['Pixel-perfect HTML/CSS/React', 'Fully responsive', 'Clean commented code', 'Hover states included', '1 round of revisions', 'Delivered in 2–4 days'],
    turnaround: '2–4 days' },
  { id: 'uiux-design',   service: 'UI/UX Design',     priceRange: '$X — $Y',    highlight: false,
    description: 'Professional Figma files, yours to keep forever.',
    includes: ['Figma file — yours forever', 'Desktop + mobile variants', 'Component system', 'Annotated for developers', '2 rounds of revisions', 'Delivered in 3–6 days'],
    turnaround: '3–6 days' },
  { id: 'full-website',  service: 'Full Website',     priceRange: '$X — $Y',    highlight: false,
    description: 'Multi-page sites with everything you need to go live.',
    includes: ['Up to 6 pages', 'Responsive Navbar + Footer', 'Contact form via Resend', 'Full SEO setup', 'Vercel deployment + domain guidance', '3 rounds of revisions', 'Delivered in 1–2 weeks'],
    turnaround: '1–2 weeks' },
  { id: 'web-app',       service: 'Web Application',  priceRange: '$X — $Y',    highlight: false,
    description: 'React/Next.js apps with real interactivity.',
    includes: ['React or Next.js codebase', 'State management', 'REST API integration', 'Auth if needed', 'Vercel deployment', 'Delivered in 1–3 weeks'],
    turnaround: '1–3 weeks' },
  { id: 'seo',           service: 'SEO Package',      priceRange: '$X / month', highlight: false,
    description: 'Monthly SEO management for existing websites.',
    includes: ['Technical SEO audit', 'Metadata optimization', 'Core Web Vitals monitoring', 'Sitemap + robots.txt', 'Monthly report'],
    turnaround: 'Ongoing' },
];
```

### 5.5 `data/blog.js`

```js
export const blogPosts = [
  {
    id: 1, slug: 'cybersecurity-alongside-webdev',
    title: "Why I'm Learning Cybersecurity Alongside Web Development",
    excerpt: "Most developers wait until they're established before touching security. I think that's backwards.",
    date: '2026-04-15', category: 'Career', readTime: '5 min read',
    image: null, published: true,
    content: `[PLACEHOLDER: CEH goal, OSCP path, why security mindset makes you a better developer.]`,
  },
  {
    id: 2, slug: 'building-cosmos-threejs',
    title: 'Building COSMOS: Lessons from My First Three.js Project',
    excerpt: "I set out to build an educational space website. I ended up learning more than I planned.",
    date: '2026-03-20', category: 'Dev', readTime: '7 min read',
    image: '/images/projects/cosmos.jpg', published: true,
    content: `[PLACEHOLDER: Three.js Jupiter model, scrollytelling, Voyager disassembly, quiz system, lessons learned.]`,
  },
  {
    id: 3, slug: 'water-polo-to-code',
    title: 'From Water Polo to Code: Discipline Transfers',
    excerpt: "Six years as a national-level goalkeeper taught me things no tutorial ever could.",
    date: '2026-02-10', category: 'Personal', readTime: '6 min read',
    image: null, published: true,
    content: `[PLACEHOLDER: Water polo 2017-2023, national level, team disbandment, transition to tech, how athletic discipline applies to coding.]`,
  },
];
```

### 5.6 `data/stack.js`

```js
export const techStack = [
  { name: 'HTML5',      icon: 'html5' },
  { name: 'CSS3',       icon: 'css3' },
  { name: 'SCSS',       icon: 'sass' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'React',      icon: 'react' },
  { name: 'Next.js',    icon: 'nextjs' },
  { name: 'Node.js',    icon: 'nodejs' },
  { name: 'Python',     icon: 'python' },
  { name: 'Git',        icon: 'git' },
  { name: 'GitHub',     icon: 'github' },
  { name: 'Figma',      icon: 'figma' },
  { name: 'Vercel',     icon: 'vercel' },
  { name: 'Three.js',   icon: 'threejs' },
  { name: 'SQL',        icon: 'mysql' },
  { name: 'VS Code',    icon: 'vscode' },
  { name: 'Postman',    icon: 'postman' },
];
// Icon URL: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{icon}/{icon}-original.svg
```

### 5.7 `data/stats.js`

```js
export const stats = [
  { value: 4,  suffix: '+', label: 'Projects Delivered' },
  { value: 3,  suffix: '',  label: 'Certiport Certifications' },
  { value: 5,  suffix: '+', label: 'Technologies Mastered' },
  { value: 2,  suffix: '+', label: 'Years of Consistent Learning' },
];
```

---

## 6. COMPONENTS — FULL CODE

### 6.1 `AnnouncementBar` — NEW

```jsx
// components/AnnouncementBar/AnnouncementBar.jsx
import styles from './AnnouncementBar.module.scss';

const TEXT = 'AVAILABLE NOW · REPLIES IN 24H · 4 LIVE PROJECTS · 3 CERTIPORT CERTIFICATIONS · VERCEL DEPLOYED · OPEN FOR FREELANCE · NEXT.JS · REACT · FIGMA TO CODE · ';

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <span>{TEXT}</span><span aria-hidden="true">{TEXT}</span>
      </div>
    </div>
  );
}
```

```scss
// AnnouncementBar.module.scss
.bar {
  height: 34px;
  background: var(--accent);
  overflow: hidden;
  display: flex;
  align-items: center;
}

.track {
  display: flex;
  white-space: nowrap;
  animation: marquee 28s linear infinite;

  span {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: #fff;
    padding-right: 2rem;
  }

  &:hover { animation-play-state: paused; }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

### 6.2 `Navbar`

```jsx
// components/Navbar/Navbar.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import MagneticButton from '../MagneticButton/MagneticButton';
import styles from './Navbar.module.scss';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/pricing',  label: 'Pricing' },
  { href: '/blog',     label: 'Blog' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>R.</Link>
        <ul className={`${styles.links} ${open ? styles.open : ''}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <MagneticButton href="/contact" variant="primary">Hire Me</MagneticButton>
        <button className={styles.burger} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
```

```scss
// Navbar.module.scss
.nav {
  position: fixed; top: 34px; left: 0; right: 0; // 34px = AnnouncementBar height
  z-index: 1000;
  transition: background .3s, border-color .3s, backdrop-filter .3s;
  border-bottom: 1px solid transparent;

  &.scrolled {
    background: var(--bg-overlay);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom-color: var(--border);
  }
}

.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1.25rem var(--content-padding);
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-family: var(--font-syne); font-size: 1.5rem; font-weight: 800;
  color: var(--text-primary); text-decoration: none; margin-right: auto;
}

.links { display: flex; list-style: none; gap: .25rem; margin: 0; padding: 0; }

.link {
  display: block; padding: .5rem .75rem;
  font-size: var(--fs-small); font-weight: 500;
  color: var(--text-secondary); text-decoration: none;
  border-radius: var(--radius-sm); position: relative; transition: color .2s;

  &::after {
    content: ''; position: absolute;
    bottom: 4px; left: .75rem; right: .75rem;
    height: 1px; background: var(--accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform .3s cubic-bezier(.16,1,.3,1);
  }

  &:hover { color: var(--text-primary); &::after { transform: scaleX(1); } }
  &.active { color: var(--accent-light); &::after { transform: scaleX(1); } }
}

.burger { display: none; background: none; border: none; color: var(--text-primary); cursor: pointer; }

@media (max-width: 768px) {
  .links {
    position: fixed; inset: 0; background: var(--bg-primary);
    flex-direction: column; align-items: center; justify-content: center;
    gap: 1.5rem; opacity: 0; pointer-events: none;
    transition: opacity .3s; z-index: 999;
    &.open { opacity: 1; pointer-events: all; }
    .link { font-size: 1.5rem; }
  }
  .burger { display: block; z-index: 1001; }
}
```

---

### 6.3 `CustomCursor`

```jsx
// components/CustomCursor/CustomCursor.jsx
'use client';
import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      raf = requestAnimationFrame(tick);
    };
    const addHover = () => ringRef.current?.classList.add(styles.hovered);
    const rmHover  = () => ringRef.current?.classList.remove(styles.hovered);
    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', rmHover);
    });
    tick();
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
```

```scss
// CustomCursor.module.scss
.dot {
  position: fixed; top: 0; left: 0;
  width: 8px; height: 8px;
  background: var(--accent); border-radius: 50%;
  pointer-events: none; z-index: 9999; will-change: transform;
}
.ring {
  position: fixed; top: 0; left: 0;
  width: 32px; height: 32px;
  border: 1.5px solid var(--accent); border-radius: 50%;
  pointer-events: none; z-index: 9998; opacity: .6; will-change: transform;
  transition: width .2s, height .2s, opacity .2s, background .2s;
  &.hovered {
    width: 48px; height: 48px;
    margin: -8px 0 0 -8px;
    background: var(--accent-dim); opacity: 1;
  }
}
```

---

### 6.4 `MagneticButton`

```jsx
// components/MagneticButton/MagneticButton.jsx
'use client';
import { useRef } from 'react';
import Link from 'next/link';
import styles from './MagneticButton.module.scss';

export default function MagneticButton({ children, href, onClick, variant = 'primary' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left - r.width  / 2) * 0.25;
    const y = (e.clientY - r.top  - r.height / 2) * 0.25;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  const cls = `${styles.btn} ${styles[variant]}`;
  if (href) return <Link href={href} ref={ref} className={cls} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</Link>;
  return <button ref={ref} className={cls} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</button>;
}
```

```scss
// MagneticButton.module.scss
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .75rem 1.5rem; border-radius: var(--radius-pill);
  font-family: var(--font-dm-sans); font-size: var(--fs-small); font-weight: 600;
  text-decoration: none; border: none; cursor: none;
  transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s, background .2s;
}
.primary {
  background: var(--accent); color: #fff;
  &:hover { background: var(--accent-hover); box-shadow: var(--shadow-accent); }
}
.secondary {
  background: transparent; color: var(--text-primary); border: 1px solid var(--border-hover);
  &:hover { border-color: var(--accent); color: var(--accent-light); }
}
```

---

### 6.5 `SectionReveal` — GSAP version

```jsx
// components/SectionReveal/SectionReveal.jsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionReveal({ children, y = 50, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
        y, opacity: 0, duration: 0.75, delay,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, [y, delay]);

  return <div ref={ref} className={className}>{children}</div>;
}
```

---

### 6.6 `CertCard` — Hardcoded with real diploma files

```jsx
// components/CertCard/CertCard.jsx
import { Award, ExternalLink } from 'lucide-react';
import styles from './CertCard.module.scss';

const certs = [
  { title: 'IT Specialist: Python',     issuer: 'Certiport', score: '720 / 1000', year: '2025', pdf: '/diplomas/Python.pdf',     color: '#3776AB' },
  { title: 'IT Specialist: Databases',  issuer: 'Certiport', score: '743 / 1000', year: '2025', pdf: '/diplomas/Databases.pdf',  color: '#336791' },
  { title: 'IT Specialist: Networking', issuer: 'Certiport', score: '920 / 1000', year: '2025', pdf: '/diplomas/Networking.pdf', color: '#00BCF2' },
];

export default function CertCard() {
  return (
    <div className={styles.grid}>
      {certs.map((c) => (
        <div key={c.title} className={styles.card}>
          <div className={styles.icon} style={{ '--c': c.color }}>
            <Award size={22} />
          </div>
          <div>
            <span className={styles.meta}>{c.issuer} · {c.year}</span>
            <h3 className={styles.title}>{c.title}</h3>
            <span className={styles.score}>Score: {c.score}</span>
          </div>
          <a href={c.pdf} target="_blank" rel="noopener noreferrer" className={styles.link}>
            View Certificate <ExternalLink size={13} />
          </a>
        </div>
      ))}
    </div>
  );
}
```

---

## 7. HERO SECTION — FLAGSHIP FEATURE

### 7.1 Overview

This is the most important component. It implements the travelbusinessclass.com mechanic adapted for dev services:
- Default state: general video + "Hi, I'm Radu. I build things for the web."
- When user opens dropdown and selects a service → video crossfades, subtext updates, form pre-fills

### 7.2 `HeroSection.jsx` — Main structure

```jsx
// components/Hero/HeroSection.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import HeroDropdown from './HeroDropdown';
import HeroForm from './HeroForm';
import { heroServices, defaultHero } from '@/data/heroServices';
import { initParticles } from '@/lib/threeParticles';
import styles from './Hero.module.scss';

export default function HeroSection() {
  const [selected, setSelected] = useState(null);
  const videoRef   = useRef(null);
  const subtextRef = useRef(null);
  const canvasRef  = useRef(null);
  const cleanupRef = useRef(null);

  const active = selected ?? defaultHero;

  // Three.js particles (desktop only)
  useEffect(() => {
    if (!canvasRef.current || window.innerWidth < 768) return;
    cleanupRef.current = initParticles(canvasRef.current);
    return () => cleanupRef.current?.();
  }, []);

  // Hero entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from('.hero-badge',   { y: 20, opacity: 0, duration: 0.5 })
      .from('.hero-line-1',  { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
      .from('.hero-line-2',  { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-sub',     { y: 30, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero-form',    { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .from('.hero-profile', { x: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
      .from('.hero-scroll',  { opacity: 0, duration: 0.4 }, '-=0.2');
  }, []);

  const handleSelect = (service) => {
    // Crossfade video
    gsap.to(videoRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
      videoRef.current.src = service.video;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      gsap.to(videoRef.current, { opacity: 1, duration: 0.6 });
    }});
    // Animate subtext change
    gsap.to(subtextRef.current, { opacity: 0, y: -8, duration: 0.2, onComplete: () => {
      setSelected(service);
      gsap.to(subtextRef.current, { opacity: 1, y: 0, duration: 0.4 });
    }});
  };

  return (
    <section className={styles.hero}>
      {/* Background video */}
      <video
        ref={videoRef}
        className={styles.videoBg}
        src={defaultHero.video}
        autoPlay muted loop playsInline
        poster={defaultHero.fallbackImage}
      />
      <div className={styles.overlay} />

      {/* Three.js canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        {/* Left col */}
        <div className={styles.left}>
          <div className={`${styles.badge} hero-badge`}>
            <span className={styles.dot} />
            Full-Stack Developer &amp; Cybersecurity Enthusiast
          </div>

          <h1 className={styles.h1}>
            <span className="hero-line-1">{active.headlineStatic}</span>
            {selected ? (
              <HeroDropdown
                services={heroServices}
                selected={selected}
                onSelect={handleSelect}
                className="hero-line-2"
              />
            ) : (
              <>
                <span className={`${styles.accent} hero-line-2`}>{active.headlineDynamic}</span>
                <HeroDropdown
                  services={heroServices}
                  selected={null}
                  onSelect={handleSelect}
                  className="hero-line-2"
                  compact
                />
              </>
            )}
          </h1>

          <p ref={subtextRef} className={`${styles.subtext} hero-sub`}>
            {active.subtext}
          </p>

          <div className={`hero-form`}>
            <HeroForm selected={selected} services={heroServices} />
          </div>

          <p className={`${styles.quote} hero-scroll`}>
            "Last client saved 3 weeks of development time."
          </p>
        </div>

        {/* Right col — profile card */}
        <div className={`${styles.profileCard} hero-profile`}>
          <div className={styles.cardInner}>
            <div className={styles.statusBadge}>
              <span className={styles.greenDot} /> Available for hire
            </div>
            <div className={styles.photoWrap}>
              <Image
                src="/images/profile.jpg"
                alt="Radu — Full-Stack Developer"
                width={180}
                height={180}
                className={styles.photo}
                priority
              />
            </div>
            <p className={styles.name}>Radu</p>
            <p className={styles.handle}>radusca · 18 y/o</p>
            <div className={styles.tags}>
              <span>📍 Chisinau, Moldova</span>
              <span>🎓 Step IT Academy</span>
            </div>
            <a href="https://github.com/RaduscaWP" target="_blank" rel="noopener noreferrer" className={styles.ghLink}>
              github.com/RaduscaWP ↗
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`${styles.scrollHint} hero-scroll`}>
        <span>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
```

### 7.3 `HeroDropdown.jsx`

```jsx
// components/Hero/HeroDropdown.jsx
'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Hero.module.scss';

export default function HeroDropdown({ services, selected, onSelect, className, compact }) {
  const [open, setOpen] = useState(false);

  return (
    <span className={`${styles.dropdownWrap} ${className}`}>
      {!compact && (
        <button
          className={`${styles.dropdownTrigger} ${open ? styles.dropdownOpen : ''}`}
          onClick={() => setOpen(!open)}
        >
          {selected?.label ?? 'choose a service'}
          <ChevronDown size={18} className={styles.chevron} />
        </button>
      )}

      {compact && (
        <button className={styles.selectPrompt} onClick={() => setOpen(!open)}>
          ← select a service ↓
        </button>
      )}

      {open && (
        <div className={styles.dropdown}>
          {services.map((s) => (
            <button
              key={s.id}
              className={`${styles.option} ${selected?.id === s.id ? styles.optionActive : ''}`}
              onClick={() => { onSelect(s); setOpen(false); }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}
```

### 7.4 `HeroForm.jsx`

```jsx
// components/Hero/HeroForm.jsx
'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './Hero.module.scss';

export default function HeroForm({ selected }) {
  const [form, setForm] = useState({ budget: '', timeline: '', email: '', description: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const budgets   = selected?.budgets   ?? ['$300–500', '$500–1000', '$1000–2000', '$2000+'];
  const timelines = selected?.timelines ?? ['1 week', '2 weeks', '3 weeks', 'Flexible'];
  const placeholder = selected?.formPlaceholder ?? 'Describe your project — goals, references, timeline...';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: selected?.label ?? 'General Inquiry',
          ...form,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') return (
    <div className={styles.formSuccess}>
      ✓ Got it — I'll reply within 24 hours.
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formPill}>
        {/* Budget */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>BUDGET</label>
          <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} className={styles.select}>
            <option value="">Select budget</option>
            {budgets.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className={styles.divider} />

        {/* Timeline */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>TIMELINE</label>
          <select value={form.timeline} onChange={e => setForm(p => ({ ...p, timeline: e.target.value }))} className={styles.select}>
            <option value="">Select timeline</option>
            {timelines.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className={styles.divider} />

        {/* Email */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>EMAIL</label>
          <input
            type="email" required
            placeholder="your@email.com"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className={styles.input}
          />
        </div>

        {/* Submit */}
        <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
          {status === 'sending' ? '...' : <Send size={18} />}
        </button>
      </div>

      {/* Expandable description */}
      <textarea
        placeholder={placeholder}
        value={form.description}
        onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
        className={styles.textarea}
        rows={3}
      />
    </form>
  );
}
```

### 7.5 Hero SCSS (key styles)

```scss
// Hero.module.scss (key rules — write full file)

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.videoBg {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
}

.overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.85) 100%);
  z-index: 1;
}

.canvas {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none; z-index: 2;
}

.content {
  position: relative; z-index: 3;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 8rem var(--content-padding) 4rem;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.h1 {
  font-size: var(--fs-hero);
  line-height: 1.05;
  margin: 1.5rem 0 1.25rem;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.accent {
  color: var(--accent-light);
  font-style: italic;
}

// Dropdown trigger — TBC style
.dropdownTrigger {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .25rem 1rem .25rem 1.25rem;
  background: rgba(124,58,237,0.15);
  border: 1.5px solid rgba(124,58,237,0.5);
  border-radius: var(--radius-pill);
  color: var(--accent-light);
  font-family: var(--font-syne); font-size: inherit; font-weight: 700; font-style: italic;
  cursor: pointer;
  transition: background .2s, border-color .2s;

  &:hover, &.dropdownOpen {
    background: rgba(124,58,237,0.25);
    border-color: var(--accent);
  }
}

.chevron { transition: transform .3s; }
.dropdownOpen .chevron { transform: rotate(180deg); }

.dropdown {
  position: absolute; top: calc(100% + .5rem); left: 0;
  background: var(--bg-elevated);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  min-width: 220px; z-index: 50;
}

.option {
  display: block; width: 100%;
  padding: .85rem 1.25rem;
  text-align: left;
  background: none; border: none;
  color: var(--text-secondary);
  font-family: var(--font-syne); font-size: 1rem; font-weight: 600;
  cursor: pointer;
  transition: background .15s, color .15s;
  border-left: 3px solid transparent;

  &:hover { background: var(--accent-dim); color: var(--text-primary); border-left-color: var(--accent); }
  &.optionActive { color: var(--accent-light); border-left-color: var(--accent); background: var(--accent-dim); }
}

// Form pill — TBC style
.form { display: flex; flex-direction: column; gap: .75rem; }

.formPill {
  display: flex; align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border-hover);
  border-radius: var(--radius-pill);
  backdrop-filter: blur(12px);
  overflow: hidden;
}

.formField {
  flex: 1; padding: .75rem 1.25rem;
  display: flex; flex-direction: column; gap: .2rem;
}

.fieldLabel {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem; letter-spacing: .15em;
  color: var(--text-muted);
}

.select, .input {
  background: none; border: none; outline: none;
  color: var(--text-primary); font-size: var(--fs-small); font-weight: 500;
  cursor: pointer; width: 100%;
  option { background: var(--bg-elevated); }
}

.divider { width: 1px; height: 2.5rem; background: var(--border); flex-shrink: 0; }

.submitBtn {
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--accent); border: none;
  color: #fff; cursor: pointer; flex-shrink: 0; margin: 0 4px;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s, transform .2s;
  &:hover { background: var(--accent-hover); transform: scale(1.08); }
}

.textarea {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: .875rem 1.25rem;
  color: var(--text-primary); font-size: var(--fs-small);
  resize: none; outline: none; width: 100%;
  font-family: var(--font-dm-sans);
  transition: border-color .2s;
  &:focus { border-color: var(--border-accent); }
  &::placeholder { color: var(--text-muted); }
}

.formSuccess {
  padding: 1rem 1.5rem;
  background: var(--green-bg);
  border: 1px solid var(--green);
  border-radius: var(--radius-md);
  color: var(--green);
  font-size: var(--fs-small); font-weight: 500;
}

// Profile card
.profileCard {
  position: sticky; top: 6rem;
}

.cardInner {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  display: flex; flex-direction: column; align-items: center;
  gap: .75rem; text-align: center;
}

.statusBadge {
  display: flex; align-items: center; gap: .4rem;
  padding: .3rem .75rem;
  background: var(--green-bg);
  border: 1px solid rgba(16,185,129,0.3);
  border-radius: var(--radius-pill);
  font-family: 'JetBrains Mono', monospace; font-size: var(--fs-xs);
  color: var(--green); align-self: stretch; justify-content: center;
}

.greenDot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--green);
  animation: pulse 2s infinite;
}

@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

.photo {
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--bg-surface), 0 0 0 5px rgba(124,58,237,0.4), 0 0 32px var(--accent-glow);
  object-fit: cover;
}

// Scroll indicator
.scrollHint {
  position: absolute; bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: .5rem;
  color: var(--text-muted); font-family: 'JetBrains Mono', monospace; font-size: .65rem;
  letter-spacing: .2em; z-index: 3;
}
.scrollLine {
  width: 1px; height: 40px; background: linear-gradient(to bottom, var(--text-muted), transparent);
  animation: scrollPulse 2s ease infinite;
}
@keyframes scrollPulse { 0%,100%{opacity:1; transform:scaleY(1)} 50%{opacity:0.4; transform:scaleY(0.5)} }

// Responsive
@media (max-width: 768px) {
  .content { grid-template-columns: 1fr; padding-top: 6rem; }
  .profileCard { display: none; } // show below hero on mobile
  .formPill { flex-direction: column; border-radius: var(--radius-lg); gap: 0; }
  .divider { width: 100%; height: 1px; }
  .formField { padding: .75rem 1rem; }
}
```

---

## 8. API ROUTE — Resend Email

```js
// app/api/contact/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { projectType, budget, timeline, email, description } = await req.json();

    if (!email) return Response.json({ error: 'Email required' }, { status: 400 });

    // Email to Radu
    await resend.emails.send({
      from: 'portfolio@radu-stefan.dev',
      to: 'grozavradustefan@gmail.com',
      subject: `New Request: ${projectType} — ${budget}`,
      html: `
        <h2 style="font-family:sans-serif">New Portfolio Request</h2>
        <table style="font-family:sans-serif; border-collapse:collapse">
          <tr><td style="padding:6px 12px;color:#888">Service</td><td style="padding:6px 12px"><strong>${projectType}</strong></td></tr>
          <tr><td style="padding:6px 12px;color:#888">Budget</td><td style="padding:6px 12px">${budget || 'Not specified'}</td></tr>
          <tr><td style="padding:6px 12px;color:#888">Timeline</td><td style="padding:6px 12px">${timeline || 'Not specified'}</td></tr>
          <tr><td style="padding:6px 12px;color:#888">Client Email</td><td style="padding:6px 12px"><a href="mailto:${email}">${email}</a></td></tr>
        </table>
        ${description ? `<p style="font-family:sans-serif;margin-top:16px"><strong>Description:</strong><br>${description}</p>` : ''}
      `,
    });

    // Confirmation to client
    await resend.emails.send({
      from: 'hello@radu-stefan.dev',
      to: email,
      subject: "Got your request — I'll reply within 24h",
      html: `
        <div style="font-family:sans-serif; max-width:500px">
          <h2>Hey! Got your request.</h2>
          <p>Thanks for reaching out about your <strong>${projectType}</strong> project.</p>
          <p>I review every request personally and will get back to you within 24 hours.</p>
          <p style="color:#888; font-size:13px">Budget: ${budget || 'TBD'} · Timeline: ${timeline || 'TBD'}</p>
          <br>
          <p>— Radu</p>
          <p style="font-size:12px; color:#999">Reply directly to this email to reach me.</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}
```

---

## 9. THREE.JS PARTICLES

```js
// lib/threeParticles.js
import * as THREE from 'three';

export function initParticles(canvas) {
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const count = 600;
  const geo   = new THREE.BufferGeometry();
  const pos   = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 18;
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x7C3AED,         // violet — matches accent
    size: 0.02,
    transparent: true,
    opacity: 0.3,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);
  camera.position.z = 5;

  let raf;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    points.rotation.y += 0.0002;
    points.rotation.x += 0.00007;
    renderer.render(scene, camera);
  };
  tick();

  const onResize = () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  };
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    geo.dispose();
    mat.dispose();
    renderer.dispose();
  };
}
```

---

## 10. GSAP UTILITIES

```js
// lib/gsapAnimations.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Universal scroll reveal — use in useEffect inside each section component
export function revealItems(selector, { stagger = 0.1, y = 50, duration = 0.7, delay = 0 } = {}) {
  return gsap.from(selector, {
    scrollTrigger: { trigger: selector, start: 'top 82%', once: true },
    y, opacity: 0, stagger, duration, delay,
    ease: 'power3.out',
  });
}

// Animated counter (for StatsBar)
export function animateCounter(el, target, suffix = '') {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
  });
}
```

---

## 11. HOME PAGE — FULL SECTION ORDER

```
/app/page.jsx — import and render in this exact order:

1.  <AnnouncementBar />    ← ticker at very top
2.  <HeroSection />        ← flagship: video + dropdown + form + profile card
3.  <StatsBar />           ← 4 animated counters: 4+ Projects · 3 Certs · 5+ Tech · 2+ Years
4.  <AboutTeaser />        ← "Young, but already serious about the craft."
5.  <ServicesPreview />    ← 4 service cards (landing, figma, ux, website) + "See all 10"
6.  <HowIWork />           ← 4 steps: Discovery → Scope → Build → Launch
7.  <ProjectsPreview />    ← 3 project cards with premium hover reveal
8.  <TechMarquee />        ← infinite scroll tech stack icons
9.  <ProofSection />       ← "Real proof first" — 4 cards redesigned
10. <CtaSection />         ← "Have a project in mind? I'm ready to build it."
```

---

## 12. FOOTER

```jsx
// Structure:
// [Avatar + Name + tagline + bio]   [Navigate]   [Elsewhere]   [Status]

// Navigate: Home · About · Projects · Services · Pricing · Blog · Contact
// Elsewhere: GitHub ↗ · Instagram ↗ · Email ↗
// Status: ● Open for freelance projects (green pulse dot)
//         📍 Chisinau, Moldova
// Bottom bar: © 2026 Radu-Stefan. All rights reserved. [GitHub] [Instagram] [Email icons]
```

---

## 13. BENTO GRID (Projects Page)

```scss
// BentoGrid.module.scss
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 320px 320px;
  gap: 1rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; grid-template-rows: auto; }
}

// bentoSize → grid area:
.large  { grid-column: 1/3; grid-row: 1/3; }   // COSMOS
.tall   { grid-column: 3/4; grid-row: 1/3; }   // Arca AI
.wide   { grid-column: 1/3; grid-row: 3/4; }   // CryptoTrack
.square { grid-column: 3/4; grid-row: 3/4; }   // Grozav Bank
```

---

## 14. ENVIRONMENT VARIABLES

```env
# .env.local — NEVER commit to Git
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://radu-stefan.dev
```

Add `RESEND_API_KEY` to Vercel dashboard under Project → Settings → Environment Variables.

---

## 15. SEO

```jsx
// app/layout.jsx
export const metadata = {
  title: 'Radu-Stefan — Full-Stack Developer',
  description: '18-year-old full-stack developer based in Chisinau, Moldova. Building fast, modern web experiences — landing pages, full websites, web apps, and UI/UX.',
  keywords: ['Radu-Stefan', 'Radusca', 'Full-Stack Developer', 'Next.js', 'React', 'Web Developer Moldova', 'Freelance Developer', 'Figma to Code'],
  openGraph: {
    title: 'Radu-Stefan — Full-Stack Developer',
    description: 'Fast, modern web experiences from Chisinau, Moldova.',
    url: 'https://radu-stefan.dev',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Radu-Stefan' }],
  },
  twitter: { card: 'summary_large_image' },
  themeColor: '#080808',
  robots: { index: true, follow: true },
};
```

---

## 16. DEPLOYMENT CHECKLIST

Before pushing to Vercel:
- [ ] Copy `my-image/radu-stefan.jpg` → `public/images/profile.jpg`
- [ ] Copy all 3 diploma PDFs → `public/diplomas/`
- [ ] Add all 5 hero videos → `public/videos/`
- [ ] Take screenshots of all 4 live projects → `public/images/projects/`
- [ ] Set real prices in `data/pricing.js`
- [ ] Add `RESEND_API_KEY` to Vercel env vars
- [ ] Verify Resend sender domain is configured
- [ ] Test form on staging before going live
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Test on mobile (disable Three.js particles check works)

---

*End of AGENTS.md — Portfolio v3.0*
*Radu-Stefan · May 2026 · Chisinau, Moldova*
*github.com/RaduscaWP*