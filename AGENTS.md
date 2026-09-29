# AGENTS.md

Guide for AI agents working on this repository. Read it before making changes.

## What this is

Personal site and blog of Allmonty (Allan Monteiro), served at <https://allmonty.github.io> by GitHub Pages.
It is a small Vite + React app with no backend, no router library, no TypeScript, no tests and no linter.

## Commands

Node version is pinned in `.tool-versions` (nodejs 25.2.1).

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Production build into `docs/`, replacing its contents |
| `npm run preview` | Serve the `docs/` build locally |

There is no test suite. Verify changes by running `npm run build` (it must succeed) and checking the affected pages with `npm run dev`.

## Layout

```
index.html              HTML entry for the main site (/)
qrcode/index.html       HTML entry for the business-card page (/qrcode/)
vite.config.js          Multi-page build config + dev redirect /qrcode -> /qrcode/
src/
  main.jsx              Startup file for / : mounts <BlogApp />
  qrcode.jsx            Startup file for /qrcode/ : mounts <QrCodeView />
  BlogApp.jsx           Blog state and routing; also loads and parses the Markdown posts
  styles.css            The only stylesheet, shared by every page
  articles/             Blog posts (Markdown with frontmatter)
  views/
    HomeView.jsx        Intro, social links, tag filter and post list
    PostView.jsx        A single post
    QrCodeView.jsx      QR code pointing to https://allmonty.github.io
public/                 Static files copied as-is into the build (post images)
docs/                   Build output that GitHub Pages serves (written by `npm run build`, committed). Never edit by hand.
```

## How pages and routing work

GitHub Pages is static hosting: a URL path must match a real file.

- **Blog (`/`)**: one HTML page. `BlogApp.jsx` reads `?post=<slug>` from the URL and switches between `HomeView` and `PostView` with `history.pushState` and a `popstate` listener. New blog-like screens should follow this query-param pattern.
- **Standalone pages (like `/qrcode/`)**: each one is a separate Vite HTML entry. To add a page named `foo`:
  1. Create `foo/index.html`, copying the `<head>` (viewport meta, Google Fonts) from `index.html` and pointing its script at `/src/foo.jsx`.
  2. Create `src/foo.jsx`, which imports `./styles.css` and mounts the view, mirroring `src/qrcode.jsx`.
  3. Create `src/views/FooView.jsx`.
  4. Add `'foo'` to the `pages` array in `vite.config.js`. This adds it to the build and to the dev/preview redirect from `/foo` to `/foo/`.

Keep startup files (`main.jsx`, `qrcode.jsx`) limited to mounting. Components live in their own files so React Fast Refresh keeps working.

## Blog posts

- File: `src/articles/YYYYMMDD_short_name.md`. The filename without `.md` is the slug used in `?post=`.
- Every `.md` in that folder is picked up automatically (`import.meta.glob` in `BlogApp.jsx`), and posts are sorted by `date`, newest first.
- Frontmatter, parsed by the small hand-written parser in `BlogApp.jsx` (not a real YAML parser):
  ```markdown
  ---
  title: "Post title"
  date: "2026-01-02"
  tags: [tech, photos]
  summary: "One-line summary shown in the list."
  ---
  ```
  Use one `key: value` per line. Lists must be inline `[a, b]`. No multi-line values or nesting. The file must use LF line endings, or the frontmatter will not be detected. If `summary` is missing, the start of the first paragraph is used.
- The body is rendered with `marked` (GFM, `breaks: true`) and inserted as raw HTML. Inline HTML is allowed and used for photo layouts. Content is trusted: only the site owner writes posts.
- Images go in `public/resources/photos/post_YYYYMMDD/` and are referenced with absolute paths like `/resources/photos/post_YYYYMMDD/photo.jpg`.

## Design rules

The look is minimalist, text-focused and dark. New UI must match it.

- Use the tokens defined on `:root` in `src/styles.css`: `--bg`, `--ink`, `--muted`, `--accent` (orange `#ff8c42`), `--border`, and the fonts `--text` (Manrope, for headings) and `--code` (IBM Plex Mono, for body text).
- No rounded corners, no shadows, no card boxes. Separate sections with 1px solid `--border` lines, and list items with dashed ones.
- Small uppercase labels use the `.eyebrow` class. Links use `.text-link`. The accent color is for hover and active states.
- Class names follow BEM-style `block__element--modifier` (for example `hero__text`, `tag-button--active`).
- Every page must work on phones: check at about 375px wide with no horizontal scroll. Breakpoints in use are 900px and 640px.
- Add styles to `src/styles.css`. Don't add CSS files, CSS-in-JS or UI libraries.
- The site is dark-only. There is no light theme.

## Code style

- Plain JavaScript/JSX with ES modules. Function components and hooks only.
- 4-space indentation in `src/`, 2-space in `vite.config.js`, tabs in the HTML entries. Match the file you're editing.
- Modules and non-obvious functions have short JSDoc-style comments. Keep that level of commenting.
- Keep dependencies minimal. Current runtime dependencies: `react`, `react-dom`, `marked`, `qrcode.react`.

## Deployment

GitHub Pages serves the `docs/` folder of `master`. There is no CI.

1. `npm run build`. It empties `docs/` and writes the new build there (`build.outDir` in `vite.config.js`).
2. Commit source changes and the updated `docs/`, then push to `master`.

Rebuild whenever source changes are meant to go live. Otherwise `docs/` stays out of date.

Only deploy when the site owner asks.

## Git

- The default branch is `master`. The owner commits directly to it.
- Commit messages are short, lowercase and imperative: `add qrcode business card page`, `rename App to BlogApp`.
- Don't commit `node_modules/`. Only commit or push when asked.

## Known quirks

- `BlogApp.jsx` mixes post loading/parsing (plain JS) with component state. Moving the parsing into something like `src/models/posts.js` has been discussed but not done.
- Post frontmatter supports a `cover` field in the parser, but no view uses it yet.
- `README.md` is for humans. Keep its "Project Structure" section in sync when you add or move files.
