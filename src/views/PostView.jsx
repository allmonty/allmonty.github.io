import React from 'react';

export default function PostView({ viewPost, goHome, renderMarkdown }) {
    if (!viewPost) return null;

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
