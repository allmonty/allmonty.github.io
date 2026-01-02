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

const projects = [
  {
    title: 'Developer Portfolio',
    description: 'React single-page layout; writing and hobbies live in Markdown.',
    tech: ['React', 'Vite', 'Content-first'],
    link: '#',
  },
  {
    title: 'Travel Notes',
    description: 'Routes, trains, and tiny itineraries logged plainly.',
    tech: ['Markdown', 'Maps'],
    link: '#',
  },
  {
    title: 'Micro Experiments',
    description: 'Small UI sketches focused on motion, type, and restraint.',
    tech: ['Design', 'Proto'],
    link: '#',
  },
];

const hobbies = [
  {
    title: 'Photography',
    blurb: 'City corners, late light, and quiet trails.',
  },
  {
    title: 'Travel',
    blurb: 'Slow rail routes and long walks between stops.',
  },
  {
    title: 'Writing',
    blurb: 'Short notes on building and learning.',
  },
];

export default function App() {
  const initialSlug = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('post');
  }, []);

  const [viewSlug, setViewSlug] = useState(initialSlug);
  const viewPost = useMemo(
    () => (viewSlug ? posts.find((post) => post.slug === viewSlug) || null : null),
    [viewSlug]
  );

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
          <p className="eyebrow">Allmonty — portfolio / notes / hobbies</p>
          <h1>Plain text, deliberate work.</h1>
          <p className="lead">
            I build calm tools, write short logs, and keep hobbies close. Everything here stays simple: no gloss,
            just words.
          </p>
          <div className="inline-links">
            <a className="text-link" href="#projects">Projects</a>
            <span>·</span>
            <a className="text-link" href="#writing">Writing</a>
            <span>·</span>
            <a className="text-link" href="#hobbies">Hobbies</a>
          </div>
        </div>
        <div className="hero__note">
          <p className="muted">Now: building tools for small teams.</p>
          <p className="muted">Stack: React, Vite, Markdown.</p>
          <p className="muted">Location: Remote-first.</p>
        </div>
      </header>

      <main>
        <section id="projects" className="section">
          <div className="section__header">
            <p className="eyebrow">Projects</p>
            <h2>Selected work</h2>
          </div>
          <ul className="list list--lined">
            {projects.map((project) => (
              <li key={project.title} className="list__item">
                <div className="list__title">{project.title}</div>
                <div className="list__desc">{project.description}</div>
                <div className="list__meta">{project.tech.join(' • ')} — {project.link === '#' ? 'Coming soon' : project.link}</div>
              </li>
            ))}
          </ul>
        </section>

        <section id="hobbies" className="section">
          <div className="section__header">
            <p className="eyebrow">Hobbies</p>
            <h2>Offline things</h2>
          </div>
          <ul className="list list--split">
            {hobbies.map((item) => (
              <li key={item.title} className="list__item">
                <div className="list__title">{item.title}</div>
                <div className="list__desc">{item.blurb}</div>
              </li>
            ))}
          </ul>
        </section>

        <section id="writing" className="section">
          <div className="section__header">
            <p className="eyebrow">Stories</p>
            <h2>Notes and logs</h2>
          </div>
          <div className="writing">
            <div className="writing__list">
              {posts.map((post) => (
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
