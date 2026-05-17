export const heroServices = [
  {
    id: 'landing-page',
    label: 'Landing Page',
    subtext:
      'Conversion-focused single pages built fast, deployed to Vercel, mobile-first from line one.',
    video: '/videos/hero-landing-page.mp4',
    fallbackImage: '/images/hero-landing.jpg',
    position: 'center 48%',
    formPlaceholder:
      'Tell me about the landing page, the audience, and the references you want matched.',
    budgets: ['$300-500', '$500-800', '$800-1200', '$1200+'],
    timelines: ['3-5 days', '1 week', '2 weeks', 'Flexible'],
  },
  {
    id: 'figma-to-code',
    label: 'Figma to Code',
    subtext:
      'You design it - I build it exactly. HTML/CSS/React, every pixel, every hover state.',
    video: '/videos/hero-figma-code.mp4',
    fallbackImage: '/images/hero-figma.jpg',
    position: 'center 38%',
    formPlaceholder:
      'Share the Figma file or describe the screens, states, and components that need to be built.',
    budgets: ['$200-400', '$400-700', '$700-1200', '$1200+'],
    timelines: ['2-4 days', '1 week', '2 weeks', 'Flexible'],
  },
  {
    id: 'uiux-design',
    label: 'UI/UX Design',
    subtext:
      'Clean Figma systems designed before a single line of code is written. Components included.',
    video: '/videos/hero-uiux-design.mp4',
    fallbackImage: '/images/hero-design.jpg',
    position: 'center 34%',
    formPlaceholder:
      'Tell me what needs to be designed and the quality level you need the interface to reach.',
    budgets: ['$300-500', '$500-900', '$900-1500', '$1500+'],
    timelines: ['3-5 days', '1 week', '2 weeks', 'Flexible'],
  },
  {
    id: 'full-website',
    label: 'Full Website',
    subtext:
      'Multi-page with navigation, SEO, contact form, Vercel deployment. The complete package.',
    video: '/videos/hero-full-website.mp4',
    fallbackImage: '/images/hero-website.jpg',
    position: 'center 40%',
    formPlaceholder:
      'Describe the pages, goals, offer, and structure you need so the scope can be quoted clearly.',
    budgets: ['$700-1000', '$1000-1500', '$1500-2500', '$2500+'],
    timelines: ['1 week', '2 weeks', '3 weeks', 'Flexible'],
  },
];

export const defaultHero = {
  subtext:
    'Choose a service to preview the workflow, swap the hero video, and send a request with the right context from the first message.',
  video: '/videos/hero-default.mp4',
  fallbackImage: '/images/hero-default.jpg',
  position: 'center 32%',
};
