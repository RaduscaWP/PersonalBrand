import SectionReveal from '@/components/SectionReveal/SectionReveal';
import BlogCard from '@/components/BlogCard/BlogCard';
import { blogPosts } from '@/data/blog';
import styles from './blog.module.scss';

export const metadata = {
  title: 'Blog',
  description:
    'Essays and notes by Radu-Stefan on web development, cybersecurity, and the path from athlete to developer.',
};

export default function BlogPage() {
  const posts = blogPosts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>/ Blog</span>
        <h1 className={styles.title}>
          Notes & <span className={styles.accent}>essays.</span>
        </h1>
        <p className={styles.lede}>
          Occasional writing on the projects I build, the path I&rsquo;m on, and the security
          mindset I think every developer should have.
        </p>
      </header>

      <SectionReveal>
        <section className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
      </SectionReveal>
    </div>
  );
}
