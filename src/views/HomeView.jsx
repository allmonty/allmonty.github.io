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
                    <p className="eyebrow">My stories, notes, and projects</p>
                    <h1>Allmonty</h1>
                    <p className="lead">
                        I like to code, play games, take photos, enjoy good food and drinks, and play the trumpet.
                    </p>
                    <p className="additional-info">
                        I hope to share useful things I learn along the way, and document my little adventures.
                    </p>
                </div>
                <div className="hero__note">
                    <p className="muted">Me on the internet:</p>
                    <div className="social-links">
                        <a className="text-link" href="https://www.instagram.com/allmonty/" target="_blank" rel="noreferrer"
                            title="For my friends and family">
                            Personal Instagram
                        </a>
                        <span>·</span>
                        <a className="text-link" href="https://www.instagram.com/allmonty.lens/" target="_blank" rel="noreferrer"
                            title="My tentative to be a photographer">
                            Photos Instagram
                        </a>
                        <span>·</span>
                        <a className="text-link" href="https://www.linkedin.com/in/allanbrados" target="_blank" rel="noreferrer"
                            title="Professional profile/resume">
                            LinkedIn
                        </a>
                        <span>·</span>
                        <a className="text-link" href="https://github.com/allmonty" target="_blank" rel="noreferrer"
                            title="Code repositories and projects">
                            GitHub
                        </a>
                        <span>·</span>
                        <a className="text-link" href="https://gitlab.com/allmonty" target="_blank" rel="noreferrer"
                            title="Code repositories and projects">
                            Gitlab
                        </a>
                        <span>·</span>
                        <a className="text-link" href="https://bitbucket.org/allmonty/workspace/repositories/" target="_blank" rel="noreferrer"
                            title="Code repositories and projects">
                            Bitbucket
                        </a>
                        <span>·</span>
                        <a className="text-link" href="https://stackoverflow.com/users/7228231/allan-david" target="_blank" rel="noreferrer"
                            title="Q&A and community for programmers">
                            Stack Overflow
                        </a>
                        <span>·</span>
                        <a className="text-link" href="https://medium.com/@allmonty" target="_blank" rel="noreferrer"
                            title="Blogging platform">
                            Medium
                        </a>
                    </div>
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
