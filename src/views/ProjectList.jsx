import React, { useState } from 'react';
import projects from '../projects.js';

// Filter options: 'all' shows everything, the others match a project's type
const filters = ['all', 'free', 'paid'];

/**
 * Projects tab of the home page: free/paid filter and the project list.
 * Each project shows an optional thumbnail and links to its site and/or repository.
 */
export default function ProjectList() {
    const [filter, setFilter] = useState('all');

    const shown = filter === 'all'
        ? projects
        : projects.filter((project) => project.type === filter);

    return (
        <>
            <div className="tag-filter">
                {filters.map((option) => (
                    <button
                        key={option}
                        className={`tag-button ${filter === option ? 'tag-button--active' : ''}`}
                        onClick={() => setFilter(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="writing__list">
                {shown.map((project) => {
                    // Image and title open the site when there is one, otherwise the repo
                    const mainLink = project.site || project.repo;
                    const links = [
                        project.site && { label: 'Site', href: project.site },
                        project.repo && { label: 'Repository', href: project.repo },
                    ].filter(Boolean);

                    return (
                        <div
                            key={project.title}
                            className={`project-card ${project.image ? 'project-card--with-image' : ''}`}
                        >
                            {project.image && (
                                <a className="project-card__image-link" href={mainLink} target="_blank" rel="noreferrer"
                                    tabIndex={-1} aria-hidden="true">
                                    <img className="project-card__image" src={project.image} alt="" loading="lazy" />
                                </a>
                            )}
                            <div>
                                <a className="list__title project-card__title" href={mainLink} target="_blank" rel="noreferrer">
                                    {project.title}
                                </a>
                                <div className="list__desc">{project.summary}</div>
                                <div className="list__meta">
                                    {[project.type, project.price].filter(Boolean).join(' · ')}
                                </div>
                                <div className="project-card__links">
                                    {links.map((link, i) => (
                                        <React.Fragment key={link.label}>
                                            {i > 0 && <span>·</span>}
                                            <a className="text-link" href={link.href} target="_blank" rel="noreferrer">
                                                {link.label}
                                            </a>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {shown.length === 0 && (
                    <p className="muted">
                        {projects.length === 0 ? 'No projects yet.' : `No ${filter} projects yet.`}
                    </p>
                )}
            </div>
        </>
    );
}
