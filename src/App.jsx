import React, { useMemo, useState } from 'react';

const rawPosts = import.meta.glob('./articles/*.md', { as: 'raw', eager: true });

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

const projects = [
  {
    title: 'Developer Portfolio',
    description: 'React single-page layout that highlights work, writing, and hobbies in a compact view.',
    tech: ['React', 'Vite', 'CSS Modules'],
    link: '#',
  },
  {
    title: 'Travel Notes',
    description: 'Photo-forward stories with quick meta data to keep trips memorable and easy to skim.',
    tech: ['Markdown', 'Content-first'],
    link: '#',
  },
  {
    title: 'Micro Experiments',
    description: 'Lightweight UI sketches that explore motion, typography, and color palettes.',
    tech: ['Design', 'Prototyping'],
    link: '#',
  },
];

const hobbies = [
  {
    title: 'Photography',
    blurb: 'Chasing light and framing honest moments in cities and on trails.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Travel',
    blurb: 'Collecting slow itineraries, rail routes, and small cafes worth revisiting.',
    image:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Writing',
    blurb: 'Short notes about building products, learning, and weekend projects.',
    image:
      'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function App() {
  const [activeSlug, setActiveSlug] = useState(posts[0]?.slug || null);
  const activePost = useMemo(
    () => posts.find((post) => post.slug === activeSlug) || posts[0] || null,
    [activeSlug]
  );

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__text">
          <p className="eyebrow">Portfolio • Writing • Hobbies</p>
          <h1>Hi, I'm Allmonty.</h1>
          <p className="lead">
            I design and build thoughtful software, capture photos on the road, and share stories about
            the process. This site keeps my projects and notes in one place.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#projects">View projects</a>
            <a className="btn ghost" href="#writing">Read stories</a>
          </div>
        </div>
        <div className="hero__card">
          <div className="hero__badge">Now</div>
          <h3>Building calm, useful tools.</h3>
          <p className="muted">Focused on developer experience, small teams, and deliberate design.</p>
          <ul className="tags">
            <li>React</li>
            <li>Design systems</li>
            <li>Product thinking</li>
          </ul>
        </div>
      </header>

      <main>
        <section id="projects" className="section">
          <div className="section__header">
            <p className="eyebrow">Projects</p>
            <h2>Selected work</h2>
          </div>
          <div className="cards-grid">
            {projects.map((project) => (
              <article key={project.title} className="card">
                <h3>{project.title}</h3>
                <p className="muted">{project.description}</p>
                <div className="chip-row">
                  {project.tech.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
                <a className="text-link" href={project.link}>
                  Coming soon
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="hobbies" className="section section--alt">
          <div className="section__header">
            <p className="eyebrow">Hobbies</p>
            <h2>What I do offline</h2>
          </div>
          <div className="gallery">
            {hobbies.map((item) => (
              <article key={item.title} className="gallery__item">
                <div className="gallery__image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="gallery__body">
                  <h3>{item.title}</h3>
                  <p className="muted">{item.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="writing" className="section">
          <div className="section__header">
            <p className="eyebrow">Stories</p>
            <h2>Blog and notes</h2>
          </div>
          <div className="writing">
            <div className="writing__list">
              {posts.map((post) => (
                <button
                  key={post.slug}
                  className={`post-card ${post.slug === activePost?.slug ? 'post-card--active' : ''}`}
                  onClick={() => setActiveSlug(post.slug)}
                >
                  <div>
                    <p className="muted text-sm">{post.date}</p>
                    <h3>{post.title}</h3>
                    <p className="muted">{post.summary}</p>
                  </div>
                  <div className="chip-row">
                    {post.tags.map((tag) => (
                      <span key={tag} className="chip chip--ghost">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            {activePost && (
              <article className="post">
                {activePost.cover && <img className="post__cover" src={activePost.cover} alt="" />}
                <p className="muted text-sm">{activePost.date}</p>
                <h3>{activePost.title}</h3>
                <div className="post__body">
                  {activePost.content.split(/\n\n/).map((block, idx) => (
                    <p key={idx}>{block}</p>
                  ))}
                </div>
              </article>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="muted text-sm">Made with React and Markdown. Drop a line anytime.</p>
      </footer>
    </div>
  );
}
