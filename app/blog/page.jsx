import SectionReveal from '@/components/SectionReveal/SectionReveal';
import BlogCard from '@/components/BlogCard/BlogCard';
import { blogPosts } from '@/data/blog';
import { createMetadata } from '@/lib/metadata';
import styles from './blog.module.scss';

export const metadata = createMetadata({
  title: 'Notes / Lab',
  description:
    'Development notes and clearly marked editorial outlines from Radu-Stefan on web development, cybersecurity, and building software.',
  path: '/blog',
  image: '/images/hero-figma.jpg',
  imageAlt: 'Radu-Stefan development notes and lab',
});

export default function BlogPage() {
  const posts = blogPosts
    .filter((post) => post.published)
    .sort((left, right) => new Date(right.date) - new Date(left.date));
  const draftCount = posts.filter((post) => post.draft).length;
  const completeCount = posts.length - draftCount;

  return (
    <div className={`page-wrap ${styles.page}`}>
      <header className={`page-hero page-hero--center page-hero--photo ${styles.hero}`}>
        <span className="page-kicker">Notes / Lab</span>
        <h1 className="page-title">
          Working notes, with their <strong>status left visible.</strong>
        </h1>
        <p className="page-lede">
          A quiet place for development ideas and article outlines. Drafts remain outside search
          indexing and are never presented as finished authority content.
        </p>
      </header>

      <section className="section-shell section-shell--light">
        <SectionReveal>
          <div className="section-inner">
            <div className={styles.labHeader}>
              <div className={styles.labCopy}>
                <span className="section-kicker">Editorial status</span>
                <h2 className={`section-title ${styles.lightTitle}`}>
                  A public notebook, <strong>not a finished publication.</strong>
                </h2>
                <p className={`${styles.lightCopy} section-lede`}>
                  Open an outline to see the planned focus. Finished articles will replace the lab
                  label only when the full body is ready to read.
                </p>
              </div>

              <dl className={styles.labStatus}>
                <div>
                  <dt>Mode</dt>
                  <dd>Notes / Lab</dd>
                </div>
                <div>
                  <dt>Finished</dt>
                  <dd>{completeCount}</dd>
                </div>
                <div>
                  <dt>Outlines</dt>
                  <dd>{draftCount}</dd>
                </div>
                <div>
                  <dt>Draft indexing</dt>
                  <dd>Noindex</dd>
                </div>
              </dl>
            </div>

            <h2 className={styles.listTitle}>Current notes</h2>
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
