import { blogPosts } from '@/data/blog';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radu-stefan.dev';

export default function sitemap() {
  const staticRoutes = ['', '/about', '/projects', '/services', '/pricing', '/blog', '/contact'];
  const now = new Date();

  const staticEntries = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  const blogEntries = blogPosts
    .filter((p) => p.published)
    .map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}
