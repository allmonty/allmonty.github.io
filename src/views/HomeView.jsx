import React from 'react';

// Links shown in the hero, one row per group
const linkGroups = [
    [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/allanbrados', title: 'Professional profile/resume' },
        { label: 'Resume', href: 'https://allmonty.github.io/resume', title: 'Professional profile/resume' },
    ],
    [
        { label: 'GitHub', href: 'https://github.com/allmonty', title: 'Code repositories and projects' },
        { label: 'Gitlab', href: 'https://gitlab.com/allmonty', title: 'Code repositories and projects' },
        { label: 'Bitbucket', href: 'https://bitbucket.org/allmonty/workspace/repositories/', title: 'Code repositories and projects' },
    ],
    [
        { label: 'Stack Overflow', href: 'https://stackoverflow.com/users/7228231/allan-david', title: 'Q&A and community for programmers' },
        { label: 'Medium', href: 'https://medium.com/@allmonty', title: 'Blogging platform' },
    ],
    [
        { label: 'Personal Instagram', href: 'https://www.instagram.com/allmonty/', title: 'For my friends and family' },
        { label: 'Photos Instagram', href: 'https://www.instagram.com/allmonty.lens/', title: 'My tentative to be a photographer' },
    ],
    [
        { label: 'QR code', href: '/qrcode/', title: 'QR code to share this site' },
    ],
];

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
                        Hello! I am a programmer with passion for playing games, taking photos, enjoying good food and drinks, and playing the trumpet.
                    </p>
                    <p className="additional-info">
                        I hope to share useful things I learn along the way, and document my experiments and adventures.
                    </p>
                </div>
                <div className="hero__note">
                    <div className="social-links">
                        {linkGroups.map((group, i) => (
                            <div key={i} className="social-links__row">
                                {group.map((link, j) => (
                                    <React.Fragment key={link.label}>
                                        {j > 0 && <span>·</span>}
                                        <a className="text-link" href={link.href} target="_blank" rel="noreferrer"
                                            title={link.title}>
                                            {link.label}
                                        </a>
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <main>
                <section id="stories" className="section">
                    <div className="section__header">
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
                <p className="muted text-sm">© {new Date().getFullYear()} Allmonty. All content on this site is owned by me and may not be used without my consent.</p>
            </footer>
        </div>
    );
}
