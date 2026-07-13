import { SITE_URL } from '@/lib/site';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const SERVICE_ID = `${SITE_URL}/#professional-service`;

export const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Radu-Stefan',
      alternateName: 'Radusca',
      jobTitle: 'Software Developer',
      url: SITE_URL,
      image: `${SITE_URL}/images/profile.jpg`,
      email: 'mailto:grozavradustefan@gmail.com',
      homeLocation: {
        '@type': 'Place',
        name: 'Chisinau, Moldova',
      },
      sameAs: ['https://github.com/RaduscaWP', 'https://www.instagram.com/radusca_/'],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'Radu-Stefan — Software Developer',
      url: SITE_URL,
      inLanguage: 'en',
      author: { '@id': PERSON_ID },
    },
    {
      '@type': 'ProfessionalService',
      '@id': SERVICE_ID,
      name: 'Radu-Stefan Software Development',
      description:
        'Freelance website, web application, automation, API integration, and interface implementation services.',
      url: `${SITE_URL}/services`,
      image: `${SITE_URL}/images/profile.jpg`,
      email: 'mailto:grozavradustefan@gmail.com',
      founder: { '@id': PERSON_ID },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chisinau',
        addressCountry: 'MD',
      },
      sameAs: ['https://github.com/RaduscaWP', 'https://www.instagram.com/radusca_/'],
    },
  ],
};

export function createBreadcrumbStructuredData(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, `${SITE_URL}/`).toString(),
    })),
  };
}

export function createArticleStructuredData(post) {
  if (!post || post.draft) return null;

  const image = post.image || '/images/hero-default.jpg';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: 'en',
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: new URL(image, `${SITE_URL}/`).toString(),
    author: { '@id': PERSON_ID },
  };
}

export function serializeStructuredData(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
