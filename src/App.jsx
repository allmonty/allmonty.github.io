/**
 * App.jsx - Main React component for the portfolio site
 * 
 * This component handles:
 * - Loading and parsing Markdown articles from the /articles folder
 * - Routing between the home feed and individual post views via URL params
 * - Tag-based filtering of posts
 * - Rendering posts as HTML via the marked library
 */

import React, { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';

// Load all .md files from the articles folder at build time
const rawPosts = import.meta.glob('./articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/**
 * Parses the YAML-like frontmatter block (between ---).
 * Extracts metadata like title, date, tags, summary.
 * Handles both string values and array values (e.g., tags: [blog, tech])
 */
const parseMetaBlock = (block) => {
  const meta = {};
  const lines = block.split(/\n/).filter(Boolean);
  for (const line of lines) {
    const [rawKey, ...rest] = line.split(':');
    const key = rawKey.trim();
    const rawValue = rest.join(':').trim();
    if (!key) continue;
    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      meta[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^"|"$/g, ''))
        .filter(Boolean);
    } else {
      meta[key] = rawValue.replace(/^"|"$/g, '');
    }
  }
  return meta;
};

/**
 * Parses a single Markdown file:
 * 1. Extracts the slug from the filename
 * 2. Splits frontmatter (---) from body content
 * 3. Parses metadata from the frontmatter block
 * 4. Creates a post object with slug, title, date, tags, summary, and content
 */
const parseMarkdown = (path, raw) => {
  const slug = path.split('/').pop().replace('.md', '');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/);
  const metaBlock = match ? match[1] : '';
  const body = match ? match[2].trim() : raw.trim();
  const meta = parseMetaBlock(metaBlock);
  const excerpt = body.split(/\n\n/)[0].slice(0, 220).trim();
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    tags: meta.tags || [],
    summary: meta.summary || excerpt,
    cover: meta.cover || '',
    content: body,
  };
};

// Parse all loaded markdown files into post objects
const posts = Object.entries(rawPosts).map(([path, raw]) => parseMarkdown(path, raw));

// Configure marked for GitHub Flavored Markdown support and line breaks
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Converts Markdown string to HTML.
 * Used when rendering full post content.
 */
const renderMarkdown = (md) => marked.parse(md || '');

// Sort posts by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

/**
 * Main App component with routing and state management
 */
export default function App() {
  // Check URL for ?post=slug to determine initial route
  const initialSlug = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('post');
  }, []);

  // State for which post is currently being viewed (null = home feed)
  const [viewSlug, setViewSlug] = useState(initialSlug);
  // State for which tags are currently selected in the filter
  const [selectedTags, setSelectedTags] = useState([]);

  // Find the post object matching the current viewSlug
  const viewPost = useMemo(
    () => (viewSlug ? posts.find((post) => post.slug === viewSlug) || null : null),
    [viewSlug]
  );

  // Extract all unique tags from all posts, sorted alphabetically
  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter posts based on selected tags (shows posts with ANY of the selected tags)
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter((post) =>
      selectedTags.some((tag) => post.tags.includes(tag))
    );
  }, [selectedTags]);

  // Toggle a tag on/off in the filter
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Listen for browser back/forward navigation and update URL state
  useEffect(() => {
    const handler = () => {
      const params = new URLSearchParams(window.location.search);
      setViewSlug(params.get('post'));
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  // Navigate to a specific post view and update URL
  const openPost = (slug) => {
    const url = `?post=${slug}`;
    window.history.pushState({}, '', url);
    setViewSlug(slug);
  };

  // Return to home feed and update URL
  const goHome = () => {
    window.history.pushState({}, '', window.location.pathname);
    setViewSlug(null);
  };

  // Single post view: display full content of the selected post
  if (viewPost) {
    return (
      <div className="app-shell">
        <header className="hero hero--single">
          <div className="hero__text">
            <p className="eyebrow">Story</p>
            <h1>{viewPost.title}</h1>
            <p className="muted text-sm">{viewPost.date}</p>
          </div>
          <div className="hero__note">
            <p className="muted">Tags: {viewPost.tags.join(' / ') || '—'}</p>
            <button className="text-link" onClick={goHome} aria-label="Back to home">
              ← Back
            </button>
          </div>
        </header>
        <main>
          <article className="post post--full">
            <div
              className="post__body"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(viewPost.content) }}
            />
          </article>
        </main>
      </div>
    );
  }

  // Home feed view: display hero, tag filters, and list of posts
  return (
    <div className="app-shell">
      {/* Hero section with site intro */}
      <header className="hero">
        <div className="hero__text">
          <p className="eyebrow">Allmonty — stories, notes, and projects</p>
          <h1>Plain text, deliberate work.</h1>
          <p className="lead">
            I build calm tools, write about learning, and document hobbies plainly. Everything here lives in Markdown.
          </p>
          <div className="inline-links">
            <a className="text-link" href="#stories">Stories</a>
          </div>
          <div className="social-links">
            <a className="text-link" href="https://www.linkedin.com/in/your-handle" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span>·</span>
            <a className="text-link" href="https://github.com/your-handle" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span>·</span>
            <a className="text-link" href="mailto:you@example.com">
              Email
            </a>
          </div>
        </div>
        <div className="hero__note">
          <p className="muted">Now: building tools for small teams.</p>
          <p className="muted">Stack: React, Vite, Markdown.</p>
          <p className="muted">Location: Remote-first.</p>
        </div>
      </header>

      <main>
        <section id="stories" className="section">
          <div className="section__header">
            <p className="eyebrow">Stories & Notes</p>
            <h2>All posts</h2>
          </div>
          <div className="tag-filter">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'tag-button--active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button className="tag-button tag-button--clear" onClick={() => setSelectedTags([])}>
                clear
              </button>
            )}
          </div>
          <div className="writing">
            <div className="writing__list">
              {filteredPosts.map((post) => (
                <button
                  key={post.slug}
                  className="post-card"
                  onClick={() => openPost(post.slug)}
                >
                  <div className="muted text-sm">{post.date}</div>
                  <div className="list__title">{post.title}</div>
                  <div className="list__desc">{post.summary}</div>
                  <div className="list__meta">{post.tags.join(' / ')}</div>
                </button>
              ))}
              {filteredPosts.length === 0 && (
                <p className="muted">No posts with selected tags.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="muted text-sm">Built with React and Markdown. Plain text on purpose.</p>
      </footer>
    </div>
  );
}
