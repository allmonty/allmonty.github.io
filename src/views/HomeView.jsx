import React from 'react';

export default function HomeView({
    allTags,
    selectedTags,
    toggleTag,
    setSelectedTags,
    filteredPosts,
    openPost,
}) {
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
