import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal/SectionReveal';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import { blogPosts } from '@/data/blog';
import styles from './post.module.scss';

export function generateStaticParams() {
  return blogPosts.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

function getDraftOutline(content) {
  const match = content.match(/^\[PLACEHOLDER:\s*(.*)\]$/s);
  if (!match) return null;

  return match[1].trim();
}

export default function BlogPost({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug && p.published);
  if (!post) notFound();

  const draftOutline = getDraftOutline(post.content);
  const paragraphs = draftOutline
    ? [
        'This article is outlined, but not fully written yet.',
        `Planned focus: ${draftOutline}`,
      ]
    : post.content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);

  return (
    <article className={styles.page}>
      <Link href="/blog" className={styles.back}>
        <ArrowLeft size={14} /> All posts
      </Link>

      <header className={styles.head}>
        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">/</span>
          <span>{post.readTime}</span>
          {draftOutline ? (
            <>
              <span aria-hidden="true">/</span>
              <span>Draft</span>
            </>
          ) : null}
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </header>

      <SectionReveal>
        <div className={styles.body}>
          {draftOutline ? (
            <p className={styles.draftBadge}>
              <span className={styles.dot} /> Draft - full article coming soon
            </p>
          ) : null}
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal>
        <div className={styles.cta}>
          <h2>Liked this? Let&apos;s build something.</h2>
          <div className={styles.ctaRow}>
            <MagneticButton href="/contact" variant="primary">
              Start a project <ArrowUpRight size={14} />
            </MagneticButton>
            <Link href="/blog" className={styles.textLink}>
              Read more posts
            </Link>
          </div>
        </div>
      </SectionReveal>
    </article>
  );
}
