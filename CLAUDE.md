# CLAUDE.md — Personal Developer Portfolio
> **VERSION 2.0 — Updated April 2026**
> This file is the single source of truth for building this project.
> Read every section before writing a single line of code.
> Do not improvise. Do not add unlisted sections. Do not use generic AI aesthetics.
> When in doubt — re-read this file. The answer is here.

---

## 0. LOCAL PROJECT STRUCTURE (EXISTING FILES)

The project folder already exists on disk. Here is the current state before any Next.js setup:

```
PORTFOLIO/                          <- root project folder
├── diplomas/
│   ├── Databases.pdf               <- Certiport IT Specialist: Databases (Score: 743)
│   ├── Networking.pdf              <- Certiport IT Specialist: Networking (Score: 920)
│   └── Python.pdf                  <- Certiport IT Specialist: Python (Score: 720)
├── my-image/
│   └── radu-stefan.jpg             <- Profile photo of Radu — USE THIS everywhere a photo is needed
└── CLAUDE.md                       <- this file
```

### 0.1 Asset Migration Plan

When setting up the Next.js project, immediately copy the existing assets to the correct public folders:

```bash
# Run from project root after Next.js setup
cp my-image/radu-stefan.jpg public/images/profile.jpg
mkdir -p public/diplomas
cp diplomas/Databases.pdf public/diplomas/Databases.pdf
cp diplomas/Networking.pdf public/diplomas/Networking.pdf
cp diplomas/Python.pdf public/diplomas/Python.pdf
```

### 0.2 How Profile Photo Is Used

File: `public/images/profile.jpg` (copied from `my-image/radu-stefan.jpg`)

| Location | Usage | Style |
|---|---|---|
| Home Hero | Circular photo inside styled card, right side | border-radius 50%, violet glow border |
| About Page | Larger photo, left column | Squircle shape, slight -3deg tilt |
| Footer | Tiny avatar, 32x32 | Circular |

In Next.js, always use the `<Image>` component from `next/image`:
```jsx
import Image from 'next/image';

<Image
  src="/images/profile.jpg"
  alt="Radu — Full-Stack Developer"
  width={400}
  height={400}
  priority
  style={{ objectFit: 'cover' }}
/>
```

### 0.3 How Diplomas Are Used

Files: `public/diplomas/Databases.pdf`, `Networking.pdf`, `Python.pdf`

Diplomas appear ONLY on the About page, in the Education & Certifications section.
Each diploma gets a downloadable card. Do NOT embed PDFs as iframes — open in new tab only:

```jsx
<a
  href="/diplomas/Python.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className={styles.certLink}
>
  View Certificate
</a>
```

---

## 1. PROJECT OVERVIEW

| Field | Value |
|---|---|
| Type | Personal Developer Portfolio |
| Owner | Radu (full name: Radu-Stefan) |
| Nickname | Radusca |
| Age | 18 |
| Location | Chisinau, Moldova |
| Purpose | Attract freelance clients + establish professional online presence |
| Language | English only — 100%, zero Romanian on this site |
| Deployment | Vercel (free tier) |
| Domain | Vercel subdomain at launch, custom domain later |
| GitHub | https://github.com/RaduscaWP |
| Instagram | https://www.instagram.com/radusca_?igsh=MXNkc3lreTQ5cXd5cA== |

---

## 2. TECH STACK

| Layer | Technology | Version | Reason |
|---|---|---|---|
| Framework | Next.js | 14.x App Router | Routing, SEO, performance |
| UI | React | 18.x | Component model |
| Styling | SCSS Modules + global SCSS | latest | Proves CSS skill |
| Animations | Framer Motion | 11.x | Page transitions + spring |
| Scroll Animations | Intersection Observer API | native | No extra library |
| Icons | Lucide React | 0.383.0 | Clean, consistent |
| Email | @emailjs/browser | 4.x | No backend needed |
| Fonts | next/font Google Fonts | built-in | Zero layout shift |
| Package Manager | npm | latest | |
| Version Control | Git + GitHub | | |

**HARD RULES:**
- NO Tailwind CSS. Not even one utility class.
- NO Bootstrap, Material UI, Chakra, shadcn, or any component library.
- NO jQuery. Vanilla JS only for custom scripts.
- NO styled-components or CSS-in-JS.
- Build every component from scratch using SCSS modules.

---

## 3. DESIGN SYSTEM

### 3.1 Color Palette — Define in `app/globals.scss`

```scss
:root {
  // Backgrounds
  --bg-primary:   #080808;
  --bg-surface:   #111111;
  --bg-elevated:  #1A1A1A;
  --bg-overlay:   rgba(8, 8, 8, 0.92);

  // Text
  --text-primary:   #F0F0F0;
  --text-secondary: #888888;
  --text-muted:     #444444;
  --text-on-accent: #FFFFFF;

  // Accent — Violet
  --accent:       #7C3AED;
  --accent-hover: #6D28D9;
  --accent-light: #A78BFA;
  --accent-dim:   rgba(124, 58, 237, 0.15);
  --accent-glow:  rgba(124, 58, 237, 0.25);

  // Borders
  --border:        rgba(255, 255, 255, 0.07);
  --border-hover:  rgba(255, 255, 255, 0.15);
  --border-accent: rgba(124, 58, 237, 0.4);

  // Status colors (service availability badges)
  --status-green:      #10B981;
  --status-green-bg:   rgba(16, 185, 129, 0.12);
  --status-yellow:     #F59E0B;
  --status-yellow-bg:  rgba(245, 158, 11, 0.12);
  --status-orange:     #F97316;
  --status-orange-bg:  rgba(249, 115, 22, 0.12);
  --status-red:        #EF4444;
  --status-red-bg:     rgba(239, 68, 68, 0.12);

  // Shadows
  --shadow-sm:     0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md:     0 4px 16px rgba(0, 0, 0, 0.5);
  --shadow-lg:     0 8px 32px rgba(0, 0, 0, 0.6);
  --shadow-accent: 0 0 32px rgba(124, 58, 237, 0.2);
}
```

### 3.2 Typography

```jsx
// app/layout.jsx — Font imports
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
// Apply both variables to <body> className
```

```scss
// globals.scss — font assignments
// Also import JetBrains Mono via Google Fonts URL in globals.scss

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-syne), sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--text-primary);
}

body, p, span, li {
  font-family: var(--font-dm-sans), sans-serif;
}

code, .mono, .tag, .label-mono {
  font-family: 'JetBrains Mono', monospace;
}
```

**Font size scale (CSS variables in :root):**
```scss
--fs-hero:  clamp(3.5rem, 8vw, 7rem);
--fs-h1:    clamp(2.5rem, 5vw, 4.5rem);
--fs-h2:    clamp(1.8rem, 3vw, 2.8rem);
--fs-h3:    clamp(1.2rem, 2vw, 1.6rem);
--fs-body:  1rem;
--fs-small: 0.875rem;
--fs-xs:    0.75rem;
--fs-mono:  0.8rem;
```

### 3.3 Spacing System (8-point grid)

```scss
--space-1:  0.25rem;  // 4px
--space-2:  0.5rem;   // 8px
--space-4:  1rem;     // 16px
--space-6:  1.5rem;   // 24px
--space-8:  2rem;     // 32px
--space-12: 3rem;     // 48px
--space-16: 4rem;     // 64px
--space-20: 5rem;     // 80px
--space-24: 6rem;     // 96px

--max-width:       1200px;
--content-padding: clamp(1.5rem, 5vw, 3rem);
--section-gap:     clamp(4rem, 10vh, 8rem);
--card-padding:    clamp(1.25rem, 3vw, 2rem);

--radius-sm:   8px;
--radius-md:   12px;
--radius-lg:   16px;
--radius-pill: 100px;
```

### 3.4 Visual Identity Rules — Non-Negotiable

1. Background is `#080808`. Never pure `#000000`. Never dark gray.
2. Cards: `--bg-surface` + `1px solid var(--border)`. Hover: border becomes `--border-accent`, faint violet glow.
3. Accent violet is RARE. Only on: primary CTAs, active nav links, highlighted stats, hover glows.
4. NO gradients except: one subtle radial glow (violet, opacity 0.06-0.08) behind the hero section.
5. NO color drop shadows. Only dark rgba shadows + violet glow for accents.
6. NO stock images from external URLs. Placeholders = styled divs with a color.
7. Generous negative space. Do not crowd.
8. Borders are barely visible: `rgba(255,255,255,0.07)`.
9. Noise texture on body (faint, opacity 0.03) adds depth. See globals.scss section.

---

## 4. COMPLETE FILE STRUCTURE

```
portfolio/
│
├── app/
│   ├── layout.jsx              # Root layout: fonts, Navbar, Footer, CustomCursor, PageTransition
│   ├── globals.scss            # CSS reset, variables, global base styles
│   ├── page.jsx                # Home page
│   ├── about/page.jsx
│   ├── projects/page.jsx
│   ├── services/page.jsx
│   ├── pricing/page.jsx
│   ├── blog/
│   │   ├── page.jsx            # Blog listing
│   │   └── [slug]/page.jsx     # Individual post
│   └── contact/page.jsx
│
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.scss
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.module.scss
│   ├── CustomCursor/
│   │   ├── CustomCursor.jsx    # 'use client'
│   │   └── CustomCursor.module.scss
│   ├── PageTransition/
│   │   └── PageTransition.jsx  # Framer Motion AnimatePresence
│   ├── SectionReveal/
│   │   ├── SectionReveal.jsx   # Intersection Observer wrapper
│   │   └── SectionReveal.module.scss
│   ├── MagneticButton/
│   │   ├── MagneticButton.jsx
│   │   └── MagneticButton.module.scss
│   ├── Hero/
│   │   ├── Hero.jsx
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
│   │   ├── CertCard.jsx        # Uses /diplomas/ PDFs
│   │   └── CertCard.module.scss
│   ├── BlogCard/
│   │   ├── BlogCard.jsx
│   │   └── BlogCard.module.scss
│   ├── ContactForm/
│   │   ├── ContactForm.jsx     # EmailJS integration
│   │   └── ContactForm.module.scss
│   └── Marquee/
│       ├── Marquee.jsx         # Infinite scrolling tech stack
│       └── Marquee.module.scss
│
├── data/
│   ├── projects.js
│   ├── services.js
│   ├── pricing.js
│   ├── blog.js
│   ├── stack.js
│   └── stats.js
│
├── lib/
│   └── emailjs.js
│
├── styles/
│   └── mixins.scss
│
├── public/
│   ├── images/
│   │   ├── profile.jpg         # <- COPY FROM: my-image/radu-stefan.jpg
│   │   ├── og-image.jpg        # 1200x630 — create manually in Figma or Canva
│   │   └── projects/
│   │       ├── cosmos.jpg      # Screenshot of https://space-project-orcin.vercel.app/
│   │       ├── arca-ai.jpg     # Screenshot of https://arca-ai-rho.vercel.app/
│   │       ├── cryptotrack.jpg # Screenshot of https://crypto-track-rho.vercel.app/
│   │       └── grozav-bank.jpg # Screenshot of https://grozav-bank.vercel.app/
│   ├── diplomas/
│   │   ├── Databases.pdf       # <- COPY FROM: diplomas/Databases.pdf
│   │   ├── Networking.pdf      # <- COPY FROM: diplomas/Networking.pdf
│   │   └── Python.pdf          # <- COPY FROM: diplomas/Python.pdf
│   ├── favicon.ico
│   ├── sitemap.xml
│   └── robots.txt
│
├── .env.local                  # NEVER commit this file
├── .gitignore
├── next.config.js
└── package.json
```

---

## 5. DATA FILES — COMPLETE CONTENT

### 5.1 `data/projects.js`

```js
export const projects = [
  {
    id: 1,
    title: 'COSMOS',
    slug: 'cosmos',
    category: 'Educational Website',
    shortDescription: 'Romanian-language space & astronomy educational platform with Three.js 3D Jupiter model, scrollytelling narrative, Voyager disassembly mode, and an interactive quiz system.',
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
    shortDescription: 'AI-powered web platform with modern interface and intelligent automation features.',
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
    shortDescription: 'Real-time cryptocurrency tracking dashboard with live market data, price charts, and clean fintech UI.',
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
    shortDescription: 'Crypto-focused financial platform concept with sleek fintech UI, clean and professionally designed.',
    tags: ['React', 'JavaScript', 'SCSS', 'Figma'],
    liveUrl: 'https://grozav-bank.vercel.app/',
    githubUrl: 'https://github.com/RaduscaWP',
    image: '/images/projects/grozav-bank.jpg',
    bentoSize: 'square',  // col 3, row 3
    featured: false,
  },
];
```

### 5.2 `data/services.js`

```js
export const services = [
  // AVAILABLE NOW
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Fast, conversion-focused single pages. Pixel-perfect, mobile-first, SEO-ready, deployed to Vercel.',
    icon: 'Layout',
    availability: 'now',
    availableLabel: 'Available Now',
  },
  {
    id: 'figma-to-code',
    title: 'Figma to Code',
    description: 'You design it in Figma — I build it exactly. HTML/CSS/React, pixel-perfect, responsive on all screens.',
    icon: 'Figma',
    availability: 'now',
    availableLabel: 'Available Now',
  },
  {
    id: 'uiux-design',
    title: 'UI/UX Design',
    description: 'Clean, modern interfaces designed in Figma before a single line of code is written. Component systems and mobile variants included.',
    icon: 'Palette',
    availability: 'now',
    availableLabel: 'Available Now',
  },
  {
    id: 'full-website',
    title: 'Full Website',
    description: 'Multi-page websites with navigation, SEO metadata, contact forms, and professional Vercel deployment.',
    icon: 'Globe',
    availability: 'now',
    availableLabel: 'Available Now',
  },
  {
    id: 'web-app',
    title: 'Web Application',
    description: 'Interactive applications built with React and Next.js. SPAs, dashboards, admin panels, and data-driven tools.',
    icon: 'Code2',
    availability: 'now',
    availableLabel: 'Available Now',
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Technical SEO: metadata, Open Graph tags, sitemap, robots.txt, performance optimization, Core Web Vitals fixes.',
    icon: 'Search',
    availability: 'now',
    availableLabel: 'Available Now',
  },

  // COMING SOON
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'REST APIs, database design, authentication, and server-side logic using Node.js and Express.',
    icon: 'Server',
    availability: 'summer-2026',
    availableLabel: 'Available Summer 2026',
  },
  {
    id: 'cybersecurity-audit',
    title: 'Cybersecurity Audit',
    description: 'Web application security audit: vulnerability scanning, penetration testing basics, security report with remediation steps.',
    icon: 'Shield',
    availability: 'fall-2026',
    availableLabel: 'Available Fall 2026',
  },
  {
    id: 'desktop-mobile',
    title: 'Desktop & Mobile Apps',
    description: 'Native desktop applications (C#, .NET) and cross-platform mobile apps (React Native).',
    icon: 'Smartphone',
    availability: 'summer-2027',
    availableLabel: 'Available Summer 2027',
  },
  {
    id: 'systems',
    title: 'Low-Level Systems',
    description: 'Performance-critical software written in C++ and C. Systems programming, tooling, and embedded-adjacent work.',
    icon: 'Cpu',
    availability: 'summer-2027',
    availableLabel: 'Available Summer 2027',
  },
];
```

### 5.3 `data/pricing.js`

```js
// NOTE TO RADU: Replace all $X and $Y with real numbers before launch.
// Research Fiverr rates for your service area before setting prices.
// Strategy: Start slightly below market, raise after first 3-5 reviews.

export const pricing = [
  {
    id: 'landing-page',
    service: 'Landing Page',
    priceRange: '$X — $Y',    // TODO: replace
    highlight: true,          // "Most Popular" badge
    description: 'Perfect for startups, products, events, or personal brands.',
    includes: [
      '1-page fully responsive design',
      'SEO metadata (title, description, OG tags)',
      'Contact form with email delivery',
      'Vercel deployment',
      '2 rounds of revisions',
      'Delivered in 3-5 business days',
    ],
    turnaround: '3-5 days',
  },
  {
    id: 'figma-to-code',
    service: 'Figma to Code',
    priceRange: '$X — $Y',    // TODO: replace
    highlight: false,
    description: 'You provide the Figma file — I build it exactly as designed.',
    includes: [
      'Pixel-perfect HTML/CSS/React output',
      'Fully responsive (mobile + desktop)',
      'Clean, commented, maintainable code',
      'Hover states and transitions included',
      '1 round of revisions',
      'Delivered in 2-4 business days',
    ],
    turnaround: '2-4 days',
  },
  {
    id: 'uiux-design',
    service: 'UI/UX Design',
    priceRange: '$X — $Y',    // TODO: replace
    highlight: false,
    description: 'Professional Figma design files, ready for development.',
    includes: [
      'Figma file — yours to keep forever',
      'Desktop + mobile variants',
      'Component system / design tokens',
      'Annotated for developers',
      '2 rounds of revisions',
      'Delivered in 3-6 business days',
    ],
    turnaround: '3-6 days',
  },
  {
    id: 'full-website',
    service: 'Full Website',
    priceRange: '$X — $Y',    // TODO: replace
    highlight: false,
    description: 'Multi-page sites with everything you need to go live.',
    includes: [
      'Up to 6 pages',
      'Responsive Navbar + Footer',
      'Contact form with EmailJS',
      'Full SEO setup',
      'Vercel deployment + domain guidance',
      '3 rounds of revisions',
      'Delivered in 1-2 weeks',
    ],
    turnaround: '1-2 weeks',
  },
  {
    id: 'web-app',
    service: 'Web Application',
    priceRange: '$X — $Y',    // TODO: replace
    highlight: false,
    description: 'React/Next.js applications with real interactivity.',
    includes: [
      'React or Next.js codebase',
      'State management',
      'REST API integration',
      'Authentication (if needed)',
      'Vercel deployment',
      'Delivered in 1-3 weeks',
    ],
    turnaround: '1-3 weeks',
  },
  {
    id: 'seo',
    service: 'SEO Package',
    priceRange: '$X / month',  // TODO: replace
    highlight: false,
    description: 'Monthly SEO management for existing websites.',
    includes: [
      'Technical SEO audit',
      'Metadata optimization',
      'Core Web Vitals monitoring',
      'Sitemap + robots.txt',
      'Monthly performance report',
    ],
    turnaround: 'Ongoing',
  },
];
```

### 5.4 `data/blog.js`

```js
export const blogPosts = [
  {
    id: 1,
    slug: 'cybersecurity-alongside-webdev',
    title: "Why I'm Learning Cybersecurity Alongside Web Development",
    excerpt: "Most developers wait until they're established before touching security. I think that's backwards — here's why I started from day one.",
    date: '2026-04-15',
    category: 'Career',
    readTime: '5 min read',
    image: null,
    published: true,
    content: `[PLACEHOLDER: Write 400+ words about CEH goal, OSCP, why security mindset makes you a better developer, TryHackMe experience, ethical hacking path.]`,
  },
  {
    id: 2,
    slug: 'building-cosmos-threejs',
    title: 'Building COSMOS: Lessons from My First Three.js Project',
    excerpt: "I set out to build an educational space website for Romanian students. I ended up learning more than I planned.",
    date: '2026-03-20',
    category: 'Dev',
    readTime: '7 min read',
    image: '/images/projects/cosmos.jpg',
    published: true,
    content: `[PLACEHOLDER: Write about building COSMOS — Three.js Jupiter model, scrollytelling, Voyager disassembly, quiz system, performance challenges, lessons learned.]`,
  },
  {
    id: 3,
    slug: 'water-polo-to-code',
    title: 'From Water Polo to Code: Discipline Transfers',
    excerpt: "Six years as a national-level goalkeeper taught me things no programming tutorial ever could.",
    date: '2026-02-10',
    category: 'Personal',
    readTime: '6 min read',
    image: null,
    published: true,
    content: `[PLACEHOLDER: Write about water polo career 2017-2023, goalkeeper, national level Moldova, team disbandment, transition to tech, how athletic discipline applies to coding: consistency, pressure, resilience, deadlines.]`,
  },
];
```

### 5.5 `data/stack.js`

```js
// For the infinite marquee + About page grid
// Icon names match DevIcons CDN naming
// URL pattern: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg

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
```

### 5.6 `data/stats.js`

```js
export const stats = [
  { value: 4,  suffix: '+', label: 'Projects Delivered' },
  { value: 3,  suffix: '',  label: 'Certiport Certifications' },
  { value: 5,  suffix: '+', label: 'Technologies Mastered' },
  { value: 2,  suffix: '+', label: 'Years of Consistent Learning' },
];
```

---

## 6. COMPONENTS — FULL SPECIFICATION WITH CODE

### 6.1 `CustomCursor`

```jsx
// components/CustomCursor/CustomCursor.jsx
'use client';
import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, animFrame;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    const addHover = () => ringRef.current?.classList.add(styles.hovered);
    const rmHover  = () => ringRef.current?.classList.remove(styles.hovered);
    const addView  = () => ringRef.current?.classList.add(styles.viewing);
    const rmView   = () => ringRef.current?.classList.remove(styles.viewing);

    document.addEventListener('mousemove', onMouseMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', rmHover);
    });
    document.querySelectorAll('[data-cursor="view"]').forEach(el => {
      el.addEventListener('mouseenter', addView);
      el.addEventListener('mouseleave', rmView);
    });

    animate();
    return () => { document.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(animFrame); };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
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
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none; z-index: 9999;
  will-change: transform;
}

.ring {
  position: fixed; top: 0; left: 0;
  width: 32px; height: 32px;
  border: 1.5px solid var(--accent);
  border-radius: 50%;
  pointer-events: none; z-index: 9998;
  opacity: 0.6; will-change: transform;
  transition: width .2s, height .2s, opacity .2s, background .2s;

  &.hovered {
    width: 48px; height: 48px;
    margin: -8px 0 0 -8px;
    background: var(--accent-dim); opacity: 1;
  }

  &.viewing {
    width: 64px; height: 64px;
    margin: -16px 0 0 -16px;
    background: var(--accent-dim); opacity: 1;
    &::after {
      content: 'VIEW';
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem; color: var(--accent-light);
    }
  }
}
```

---

### 6.2 `Navbar`

```jsx
// components/Navbar/Navbar.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>R.</Link>

        <ul className={`${styles.links} ${open ? styles.open : ''}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                onClick={() => setOpen(false)}
              >
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
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 1000;
  transition: background .3s, border-color .3s, backdrop-filter .3s;
  border-bottom: 1px solid transparent;

  &.scrolled {
    background: var(--bg-overlay);
    backdrop-filter: blur(20px);
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
  font-family: var(--font-syne); font-size: 1.5rem;
  font-weight: 800; color: var(--text-primary);
  text-decoration: none; margin-right: auto;
  letter-spacing: -0.02em;
}

.links {
  display: flex; list-style: none; gap: 0.25rem; margin: 0; padding: 0;
}

.link {
  display: block; padding: .5rem .75rem;
  font-size: var(--fs-small); font-weight: 500;
  color: var(--text-secondary); text-decoration: none;
  border-radius: var(--radius-sm);
  position: relative; transition: color .2s;

  &::after {
    content: ''; position: absolute;
    bottom: 4px; left: .75rem; right: .75rem;
    height: 1px; background: var(--accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform .3s cubic-bezier(.16, 1, .3, 1);
  }

  &:hover { color: var(--text-primary); &::after { transform: scaleX(1); } }
  &.active { color: var(--accent-light); &::after { transform: scaleX(1); } }
}

.burger { display: none; background: none; border: none; color: var(--text-primary); }

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

### 6.3 `SectionReveal`

```jsx
// components/SectionReveal/SectionReveal.jsx
'use client';
import { useEffect, useRef } from 'react';
import styles from './SectionReveal.module.scss';

export default function SectionReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add(styles.visible), delay);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return <div ref={ref} className={`${styles.reveal} ${className}`}>{children}</div>;
}
```

```scss
// SectionReveal.module.scss
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
}
.visible { opacity: 1; transform: translateY(0); }
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
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
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
  transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s;
}
.primary {
  background: var(--accent); color: var(--text-on-accent);
  &:hover { background: var(--accent-hover); box-shadow: var(--shadow-accent); }
}
.secondary {
  background: transparent; color: var(--text-primary); border: 1px solid var(--border-hover);
  &:hover { border-color: var(--accent); color: var(--accent-light); }
}
```

---

### 6.5 `CertCard` — Uses Actual Diploma PDFs

```jsx
// components/CertCard/CertCard.jsx
// This component is HARDCODED — data comes from the actual files in public/diplomas/
import { Award, ExternalLink } from 'lucide-react';
import styles from './CertCard.module.scss';

const certs = [
  {
    title: 'IT Specialist: Python',
    issuer: 'Certiport',
    score: '720 / 1000',
    year: '2025',
    pdf: '/diplomas/Python.pdf',    // Source: diplomas/Python.pdf (copied to public)
    accentColor: '#3776AB',
  },
  {
    title: 'IT Specialist: Databases',
    issuer: 'Certiport',
    score: '743 / 1000',
    year: '2025',
    pdf: '/diplomas/Databases.pdf', // Source: diplomas/Databases.pdf (copied to public)
    accentColor: '#336791',
  },
  {
    title: 'IT Specialist: Networking',
    issuer: 'Certiport',
    score: '920 / 1000',
    year: '2025',
    pdf: '/diplomas/Networking.pdf',// Source: diplomas/Networking.pdf (copied to public)
    accentColor: '#00BCF2',
  },
];

export default function CertCard() {
  return (
    <div className={styles.grid}>
      {certs.map((cert) => (
        <div key={cert.title} className={styles.card}>
          <div className={styles.iconWrap} style={{ '--c': cert.accentColor }}>
            <Award size={22} />
          </div>
          <div className={styles.info}>
            <span className={styles.meta}>{cert.issuer} · {cert.year}</span>
            <h3 className={styles.title}>{cert.title}</h3>
            <span className={styles.score}>Score: {cert.score}</span>
          </div>
          <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className={styles.link}>
            View Certificate <ExternalLink size={13} />
          </a>
        </div>
      ))}
    </div>
  );
}
```

```scss
// CertCard.module.scss
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.card {
  display: flex; flex-direction: column; gap: .75rem;
  padding: var(--card-padding); background: var(--bg-surface);
  border: 1px solid var(--border); border-radius: var(--radius-lg);
  transition: border-color .3s, box-shadow .3s;
  &:hover { border-color: var(--border-accent); box-shadow: 0 0 24px var(--accent-glow); }
}

.iconWrap {
  width: 44px; height: 44px; border-radius: var(--radius-sm);
  background: rgba(from var(--c) r g b / 0.15);
  display: flex; align-items: center; justify-content: center;
  color: var(--c);
}

.meta { font-family: 'JetBrains Mono', monospace; font-size: var(--fs-xs); color: var(--text-muted); }
.title { font-size: var(--fs-h3); font-weight: 700; color: var(--text-primary); margin: .25rem 0; }
.score { font-family: 'JetBrains Mono', monospace; font-size: var(--fs-mono); color: var(--accent-light); }

.link {
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: var(--fs-xs); color: var(--text-secondary);
  text-decoration: none; margin-top: auto;
  transition: color .2s;
  &:hover { color: var(--accent-light); }
}
```

---

### 6.6 BentoGrid CSS — Projects Page

```scss
// BentoGrid.module.scss
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 320px 320px;
  gap: 1rem;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--content-padding);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

// bentoSize values map to grid areas:
.large  { grid-column: 1 / 3; grid-row: 1 / 3; }  // COSMOS
.tall   { grid-column: 3 / 4; grid-row: 1 / 3; }  // Arca AI
.wide   { grid-column: 1 / 3; grid-row: 3 / 4; }  // CryptoTrack
.square { grid-column: 3 / 4; grid-row: 3 / 4; }  // Grozav Bank

// Project card inner
.card {
  position: relative; overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  cursor: none;
  background-size: cover; background-position: center;
  transition: border-color .3s;

  &::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
    transition: opacity .3s;
  }

  &:hover {
    border-color: var(--border-accent);
    .overlay { opacity: 1; }
    .name { transform: translateY(-4px); }
    .arrow { color: var(--accent-light); transform: scale(1.2); }
  }
}

.bottom {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 1.5rem;
}

.tags { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: .75rem; }
.tag {
  padding: .2rem .6rem; border-radius: var(--radius-sm);
  background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
  font-family: 'JetBrains Mono', monospace; font-size: var(--fs-xs);
  color: var(--text-primary);
}

.name { font-family: var(--font-syne); font-size: var(--fs-h3); font-weight: 700; color: white;
  transition: transform .3s; }
.category { font-size: var(--fs-small); color: rgba(255,255,255,0.6); }

.arrow { position: absolute; top: 1.25rem; right: 1.25rem;
  color: rgba(255,255,255,0.6); transition: color .3s, transform .3s; }

.overlay {
  position: absolute; bottom: 4rem; left: 1.5rem; right: 1.5rem;
  background: rgba(255,255,255,0.05); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm);
  padding: .75rem; font-size: var(--fs-small); color: rgba(255,255,255,0.8);
  opacity: 0; transition: opacity .3s;
}
```

---

## 7. PAGES — FULL SPECIFICATION

### 7.1 HOME (`/`)

**Section order:**
1. Hero
2. StatsBar
3. About Me Teaser
4. Services Preview
5. Featured Projects Preview
6. Tech Stack Marquee
7. Testimonials
8. Final CTA

---

#### Section 1: Hero

```
LAYOUT: 100vh, 2-column (text left, profile card right)
On mobile: single column, stacked

BACKGROUND:
  - Color: var(--bg-primary) — #080808
  - Radial violet glow behind heading: radial-gradient(ellipse 60% 40% at 30% 50%, rgba(124,58,237,0.08), transparent)
  - Noise texture overlay from body::before

LEFT COLUMN CONTENT (in order, staggered animation):
  [0ms]    mono label: "Full-Stack Developer & Cybersecurity Enthusiast"
  [150ms]  H1 line 1: "Hi, I'm Radu."
  [300ms]  H1 line 2: "I build things for the web."
  [500ms]  body: "18-year-old developer based in Chisinau, Moldova.
                   I craft fast, modern digital experiences — from pixel-perfect
                   landing pages to full web applications."
  [700ms]  CTA row:
           [MagneticButton href="/projects" variant="primary"] "View My Work"
           [MagneticButton href="/contact" variant="secondary"] "Hire Me"
           | divider |
           [GitHub icon → https://github.com/RaduscaWP]
           [Instagram icon → https://www.instagram.com/radusca_?igsh=MXNkc3lreTQ5cXd5cA==]

RIGHT COLUMN CONTENT:
  Styled card (--bg-surface, border, border-radius: var(--radius-xl))
  Inside:
    - Image: /images/profile.jpg (copied from my-image/radu-stefan.jpg)
      border-radius 50%, 200x200px, box-shadow: 0 0 32px var(--accent-glow)
    - Below photo: "Radu" in Syne Bold
    - Tag: "📍 Chisinau, Moldova" (mono, small, muted)
    - Tag: "🎓 Step IT Academy" (mono, small, muted)
    - Link to GitHub (small, icon + text)
  Card slides in from right at 900ms delay.

PARALLAX (on scroll):
  data-parallax attribute on hero content div.
  JS: translateY(scrollY * 0.3), opacity fades from 1 to 0 at 500px scroll.
```

---

#### Section 2: StatsBar

```
LAYOUT: Full-width, --bg-surface, border top + bottom.
        4 items in a row (flex, evenly spaced).
        On mobile: 2x2 grid.

ITEMS (from data/stats.js):
  4+   Projects Delivered
  3    Certiport Certifications
  5+   Technologies Mastered
  2+   Years of Consistent Learning

STYLE:
  Number: var(--font-syne), --fs-h1, var(--accent) color
  Label:  var(--font-dm-sans), --fs-small, --text-secondary

ANIMATION:
  Count-up from 0 when section enters viewport.
  Duration: 1.5s,