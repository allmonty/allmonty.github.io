/**
 * projects.js - List of projects shown in the "Projects" tab of the home page
 *
 * Each project is an object with:
 * - title:   Project name
 * - summary: One-line description shown in the list
 * - type:    'free' or 'paid' (paid = something I am selling)
 * - site:    Optional link to the live site or store page
 * - repo:    Optional link to the source code repository
 *            At least one of site/repo is required. The image and title open
 *            the site if there is one, otherwise the repo. All links open in a new tab.
 * - price:   Optional, shown next to the type for paid projects (e.g. '$5')
 * - image:   Optional thumbnail, 2:1 (e.g. a GitHub social preview resized to 640x320),
 *            stored in public/resources/projects/ and referenced with an absolute path
 *
 * Projects are shown in the order they appear here.
 *
 * @example
 * {
 *     title: 'My game',
 *     summary: 'A small puzzle game made in a weekend.',
 *     type: 'free',
 *     site: 'https://allmonty.github.io/my-game/',
 *     repo: 'https://github.com/allmonty/my-game',
 * },
 */
const projects = [
    {
        title: 'Better Code Agent',
        summary: 'Guardrails that keep AI-written code at production quality: AGENTS.md templates, TDD and review skills, a quality-gate hook and cross-model evals.',
        type: 'free',
        repo: 'https://github.com/allmonty/better-code-agent',
        image: '/resources/projects/better-code-agent.jpg',
    },
    {
        title: 'Gamebook Framework',
        summary: 'An open format for gamebooks: a story is one JSON file whose rules (stats, dice, combat) are data, so one engine plays many kinds of gamebook.',
        type: 'free',
        site: 'https://allmonty.github.io/gamebook-framework/',
        repo: 'https://github.com/allmonty/gamebook-framework',
        image: '/resources/projects/gamebook-framework.jpg',
    },
    {
        title: 'System Design Atlas',
        summary: '42 system-design case studies with interactive diagrams, an incident casebook, primers and a practice workbook, in English and Brazilian Portuguese.',
        type: 'free',
        site: 'https://allmonty.github.io/system-design-atlas/',
        repo: 'https://github.com/allmonty/system-design-atlas',
        image: '/resources/projects/system-design-atlas.jpg',
    },
];

export default projects;
