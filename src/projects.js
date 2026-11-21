/**
 * projects.js - List of projects shown in the "Projects" tab of the home page
 *
 * Each project is an object with:
 * - title:   Project name
 * - summary: One-line description shown in the list
 * - type:    'free' or 'paid' (paid = something I am selling)
 * - url:     Where to see or buy it (opens in a new tab)
 * - price:   Optional, shown next to the type for paid projects (e.g. '$5')
 *
 * Projects are shown in the order they appear here.
 *
 * @example
 * {
 *     title: 'My game',
 *     summary: 'A small puzzle game made in a weekend.',
 *     type: 'free',
 *     url: 'https://github.com/allmonty/my-game',
 * },
 */
const projects = [
    {
        title: 'Better Code Agent',
        summary: 'Guardrails that keep AI-written code at production quality: AGENTS.md templates, TDD and review skills, a quality-gate hook and cross-model evals.',
        type: 'free',
        url: 'https://github.com/allmonty/better-code-agent',
    },
    {
        title: 'Gamebook Framework',
        summary: 'An open format for gamebooks: a story is one JSON file whose rules (stats, dice, combat) are data, so one engine plays many kinds of gamebook.',
        type: 'free',
        url: 'https://github.com/allmonty/gamebook-framework',
    },
];

export default projects;
