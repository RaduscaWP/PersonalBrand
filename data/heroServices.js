export const heroServiceDomains = [
  {
    id: 'web-development',
    label: 'Web Development',
    subtext:
      'Choose Web Development for landing pages, full websites, Figma-to-code builds, UI/UX, or React/Next.js interfaces.',
    video: '/videos/hero-full-website.mp4',
    fallbackImage: '/images/hero-website.jpg',
    position: 'center 40%',
    services: [
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
    ],
  },
  {
    id: 'software-automation',
    label: 'Software & Automation',
    subtext:
      'Choose Software & Automation for scripts, API integrations, business workflows, internal tools, or AI-assisted implementation.',
    video: '/videos/hero-default.mp4',
    fallbackImage: '/images/hero-default.jpg',
    position: 'center 32%',
    services: [
      {
        id: 'automation-scripts',
        label: 'Automation Scripts',
        subtext:
          'Python or JavaScript scripts that remove repetitive work: files, reports, data cleanup, scraping, and small utilities.',
        video: '/videos/hero-default.mp4',
        fallbackImage: '/images/hero-default.jpg',
        position: 'center 32%',
        formPlaceholder:
          'Describe the repetitive task, inputs, outputs, apps involved, and how often it needs to run.',
        budgets: ['$100-250', '$250-500', '$500-1000', '$1000+'],
        timelines: ['1-2 days', '3-5 days', '1 week', 'Flexible'],
      },
      {
        id: 'api-integrations',
        label: 'API Integrations',
        subtext:
          'Connect forms, CRMs, emails, dashboards, and third-party tools through clean API and webhook flows.',
        video: '/videos/hero-figma-code.mp4',
        fallbackImage: '/images/hero-figma.jpg',
        position: 'center 38%',
        formPlaceholder:
          'List the tools or APIs that need to talk to each other, the data flow, and the success condition.',
        budgets: ['$200-400', '$400-800', '$800-1500', '$1500+'],
        timelines: ['2-4 days', '1 week', '2 weeks', 'Flexible'],
      },
      {
        id: 'workflow-automation',
        label: 'Workflow Automation',
        subtext:
          'Automations for lead capture, email routing, CRM updates, Google Sheets, Airtable, and internal operations.',
        video: '/videos/hero-default.mp4',
        fallbackImage: '/images/hero-default.jpg',
        position: 'center 32%',
        formPlaceholder:
          'Tell me the workflow you do manually now, where it starts, where it ends, and what should be automated.',
        budgets: ['$150-350', '$350-700', '$700-1200', '$1200+'],
        timelines: ['2-4 days', '1 week', '2 weeks', 'Flexible'],
      },
      {
        id: 'internal-tools',
        label: 'Internal Tools',
        subtext:
          'Small dashboards, admin panels, and business tools built with React/Next.js, APIs, and secure form handling.',
        video: '/videos/hero-full-website.mp4',
        fallbackImage: '/images/hero-website.jpg',
        position: 'center 40%',
        formPlaceholder:
          'Describe the internal tool, users, data, permissions, and the actions the tool needs to support.',
        budgets: ['$500-900', '$900-1500', '$1500-3000', '$3000+'],
        timelines: ['1 week', '2 weeks', '3 weeks', 'Flexible'],
      },
    ],
  },
];

export const heroServices = heroServiceDomains.flatMap((domain) =>
  domain.services.map((service) => ({
    ...service,
    domainId: domain.id,
    domainLabel: domain.label,
  })),
);

export const defaultHero = {
  subtext:
    'Choose a domain first, then a service. The page adapts the video, scope language, budget, and timeline around the work you actually need.',
  video: '/videos/hero-default.mp4',
  fallbackImage: '/images/hero-default.jpg',
  position: 'center 32%',
};
