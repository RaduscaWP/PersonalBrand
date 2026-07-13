import { blogPosts } from '@/data/blog';
import { indexableRoutes, toAbsoluteUrl } from '@/lib/metadata';

export default function sitemap() {
  const staticEntries = indexableRoutes.map(({ path, changeFrequency, priority }) => ({
    url: toAbsoluteUrl(path),
    changeFrequency,
    priority,
  }));

  const blogEntries = blogPosts
    .filter((p) => p.published && !p.draft)
    .map((p) => ({
      url: toAbsoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}
