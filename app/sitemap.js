import { blogPosts } from '@/data/blog';
import { SITE_URL } from '@/lib/site';

export default function sitemap() {
  const staticRoutes = ['', '/about', '/projects', '/services', '/pricing', '/blog', '/contact'];
  const now = new Date();

  const staticEntries = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  const blogEntries = blogPosts
    .filter((p) => p.published && !p.draft)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}
