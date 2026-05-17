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
    .filter((post) => post.published)
    .sort((left, right) => new Date(right.date) - new Date(left.date));

  return (
    <div className={`page-wrap ${styles.page}`}>
      <header className={`page-hero page-hero--center page-hero--photo ${styles.hero}`}>
        <span className="page-kicker">Blog</span>
        <h1 className="page-title">
          Notes, breakdowns, and article <strong>outlines in progress.</strong>
        </h1>
        <p className="page-lede">
          Draft articles stay clearly marked until they are fully written. That keeps the section
          honest while still showing the topics the portfolio is growing into.
        </p>
      </header>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-kicker">Current Posts</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  Writing that supports the portfolio <strong>without pretending to be finished.</strong>
                </h2>
              </div>
              <p className={`${styles.lightCopy} section-lede`}>
                Some pieces are published as outlines for now. The point is to signal direction
                without passing placeholder content off as polished work.
              </p>
            </div>

            <div className={styles.grid}>
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
