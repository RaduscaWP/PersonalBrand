import { SITE_URL } from '@/lib/site';

export const SITE_NAME = 'Radu-Stefan';
export const DEFAULT_TITLE = 'Radu-Stefan — Software Developer';
export const DEFAULT_DESCRIPTION =
  'Software developer in Chisinau building clear, reliable websites, web applications, automations, and API-connected workflows.';

const DEFAULT_IMAGE = {
  url: '/images/hero-default.jpg',
  width: 1920,
  height: 1080,
  alt: 'Radu-Stefan software developer portfolio',
};

function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}

function brandedTitle(title) {
  if (!title || title === DEFAULT_TITLE) return DEFAULT_TITLE;
  return `${title} | ${SITE_NAME}`;
}

export function createMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE.url,
  imageWidth = DEFAULT_IMAGE.width,
  imageHeight = DEFAULT_IMAGE.height,
  imageAlt = DEFAULT_IMAGE.alt,
  type = 'website',
  publishedTime,
  robots = { index: true, follow: true },
} = {}) {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image);
  const resolvedTitle = brandedTitle(title);
  const openGraph = {
    title: resolvedTitle,
    description,
    url: canonical,
    siteName: SITE_NAME,
    locale: 'en_US',
    type,
    images: [
      {
        url: socialImage,
        width: imageWidth,
        height: imageHeight,
        alt: imageAlt,
      },
    ],
  };

  if (type === 'article' && publishedTime) {
    openGraph.publishedTime = publishedTime;
  }

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [{ url: socialImage, alt: imageAlt }],
    },
    robots,
  };
}

export const indexableRoutes = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
];

export function toAbsoluteUrl(path) {
  return absoluteUrl(path);
}
