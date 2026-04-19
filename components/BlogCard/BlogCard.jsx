import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './BlogCard.module.scss';

const categoryAccent = {
  Career:   '#7C3AED',
  Dev:      '#6366F1',
  Personal: '#F59E0B',
};

function isDraftPost(content) {
  return /^\[PLACEHOLDER:/s.test(content);
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function BlogCard({ post }) {
  const isDraft = isDraftPost(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={styles.card}
      style={{ '--cat-accent': categoryAccent[post.category] || 'var(--accent)' }}
    >
      <div className={styles.top}>
        <span className={styles.category}>{post.category}</span>
        <span className={styles.date}>
          {formatDate(post.date)} / {post.readTime}{isDraft ? ' / Draft' : ''}
        </span>
      </div>

      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{post.excerpt}</p>

      <span className={styles.cta}>
        {isDraft ? 'Read draft' : 'Read article'} <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
