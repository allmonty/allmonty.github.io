import React, { useState } from 'react';
import projects from '../projects.js';

// Filter options: 'all' shows everything, the others match a project's type
const filters = ['all', 'free', 'paid'];

/**
 * Projects tab of the home page: free/paid filter and the project list.
 * Each project links out to where it can be seen or bought.
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
            <div className="writing">
                <div className="writing__list">
                    {shown.map((project) => (
                        <a
                            key={project.title}
                            className="post-card project-card"
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="list__title">{project.title}</div>
                            <div className="list__desc">{project.summary}</div>
                            <div className="list__meta">
                                {[project.type, project.price].filter(Boolean).join(' · ')}
                            </div>
                        </a>
                    ))}
                    {shown.length === 0 && (
                        <p className="muted">
                            {projects.length === 0 ? 'No projects yet.' : `No ${filter} projects yet.`}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
