import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "./posts";
import "./blog.css";

export const metadata: Metadata = {
  title: "Blog — End-of-Life Planning, Made Simple | Finally Peace",
  description:
    "Clear, compassionate guides on funerals, cremation, wills, and planning ahead. Practical advice to help you and your family prepare for what comes next.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Finally Peace Blog — End-of-Life Planning, Made Simple",
    description:
      "Guides on funerals, cremation, wills, and planning ahead — written to make a hard topic feel simple.",
    type: "website",
    url: "https://finallypeace.com/blog",
  },
};

function Logo() {
  return (
    <Link href="/" className="bl-logo">
      <svg viewBox="0 0 86 52" width="64" height="34" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <ellipse cx="21" cy="26" rx="17" ry="13" fill="none" stroke="url(#blg)" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="55" cy="26" rx="17" ry="13" fill="none" stroke="url(#blg)" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <span className="bl-logo-name">Finally Peace</span>
    </Link>
  );
}

export default function BlogIndex() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="bl-wrap">
      <div className="bl-hero">
        <div className="bl-hero-inner">
          <header className="bl-header">
            <Logo />
            <Link href="/subscribe" className="bl-cta">Join the waitlist →</Link>
          </header>
          <div className="bl-hero-title">
            <div className="bl-eyebrow">The Finally Peace Blog</div>
            <h1>Planning ahead, <span className="serif">made simple.</span></h1>
            <p>Clear, kind guides on funerals, wills, and everything that comes next — so the hard stuff feels a little lighter.</p>
          </div>
        </div>
      </div>

      <div className="bl-main">
        {/* Featured */}
        <Link href={`/blog/${featured.slug}`} className="bl-featured">
          <div className="bl-featured-body">
            <span className="bl-tag">{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="bl-meta">{featured.dateLabel} · {featured.readMins} min read</div>
            <span className="bl-read">Read article →</span>
          </div>
          <div className="bl-featured-art" aria-hidden="true">
            <svg viewBox="0 0 120 120" width="120" height="120">
              <ellipse cx="44" cy="60" rx="30" ry="22" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="7" strokeLinecap="round"/>
              <ellipse cx="76" cy="60" rx="30" ry="22" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="7" strokeLinecap="round"/>
            </svg>
          </div>
        </Link>

        {/* Grid */}
        <div className="bl-grid">
          {rest.map((p) => (
            <Link href={`/blog/${p.slug}`} key={p.slug} className="bl-card">
              <span className="bl-tag">{p.category}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <div className="bl-meta">{p.dateLabel} · {p.readMins} min read</div>
            </Link>
          ))}
        </div>

        {/* CTA band */}
        <div className="bl-band">
          <h2>One subscription for everything that comes next.</h2>
          <p>Funeral, transportation, and legal preferences — saved in your secure profile for $15/month.</p>
          <Link href="/subscribe" className="bl-band-btn">Join the waitlist →</Link>
        </div>
      </div>
    </div>
  );
}
