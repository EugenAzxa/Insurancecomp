import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "../posts";
import "../blog.css";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found | Finally Peace" };
  return {
    title: `${post.title} | Finally Peace`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://finallypeace.com/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Finally Peace" },
    publisher: { "@type": "Organization", name: "Finally Peace" },
  };

  return (
    <div className="bl-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bl-article-top">
        <header className="bl-header bl-header-light">
          <Link href="/" className="bl-logo">
            <svg viewBox="0 0 86 52" width="64" height="34" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="alg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <ellipse cx="21" cy="26" rx="17" ry="13" fill="none" stroke="url(#alg)" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="55" cy="26" rx="17" ry="13" fill="none" stroke="url(#alg)" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <span className="bl-logo-name dark">Finally Peace</span>
          </Link>
          <Link href="/blog" className="bl-back">← All articles</Link>
        </header>
      </div>

      <article className="bl-article">
        <span className="bl-tag">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="bl-article-meta">{post.dateLabel} · {post.readMins} min read</div>

        <div className="bl-content">
          {post.body.map((b, i) => {
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "p") return <p key={i}>{b.text}</p>;
            if (b.type === "quote") return <blockquote key={i}>{b.text}</blockquote>;
            if (b.type === "ul") return (
              <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            );
            return null;
          })}
        </div>

        {/* Inline CTA */}
        <div className="bl-inline-cta">
          <div>
            <strong>Ready to plan ahead?</strong>
            <span>Customize your funeral, transportation, and legal preferences in one secure profile — $15/month, cancel anytime.</span>
          </div>
          <Link href="/subscribe" className="bl-band-btn">Join the waitlist →</Link>
        </div>
      </article>

      {/* Related */}
      <div className="bl-main">
        <h2 className="bl-related-title">Keep reading</h2>
        <div className="bl-grid">
          {related.map((p) => (
            <Link href={`/blog/${p.slug}`} key={p.slug} className="bl-card">
              <span className="bl-tag">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <div className="bl-meta">{p.dateLabel} · {p.readMins} min read</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
