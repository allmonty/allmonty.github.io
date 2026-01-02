import React, { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';

const rawPosts = import.meta.glob('./articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

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

const posts = Object.entries(rawPosts).map(([path, raw]) => parseMarkdown(path, raw));

marked.setOptions({
  breaks: true,
  gfm: true,
});

const renderMarkdown = (md) => marked.parse(md || '');

// Sort posts by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

export default function App() {
  const initialSlug = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('post');
  }, []);

  const [viewSlug, setViewSlug] = useState(initialSlug);
  const [selectedTags, setSelectedTags] = useState([]);

  const viewPost = useMemo(
    () => (viewSlug ? posts.find((post) => post.slug === viewSlug) || null : null),
    [viewSlug]
  );

  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter((post) =>
      selectedTags.some((tag) => post.tags.includes(tag))
    );
  }, [selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    const handler = () => {
      const params = new URLSearchParams(window.location.search);
      setViewSlug(params.get('post'));
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const openPost = (slug) => {
    const url = `?post=${slug}`;
    window.history.pushState({}, '', url);
    setViewSlug(slug);
  };

  const goHome = () => {
    window.history.pushState({}, '', window.location.pathname);
    setViewSlug(null);
  };

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

  return (
    <div className="app-shell">
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
