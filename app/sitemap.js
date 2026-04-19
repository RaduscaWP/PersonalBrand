import { blogPosts } from '@/data/blog';

const BASE = 'https://radu-stefan.vercel.app';

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
