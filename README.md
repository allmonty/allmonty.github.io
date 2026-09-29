# allmonty.github.io

A personal portfolio and blog site built with React and Vite, deployed to GitHub Pages.

## Features

- 📝 Markdown-based blog posts with YAML frontmatter
- 🏷️ Tag-based filtering
- 🎨 Clean, minimalist design
- ⚡ Fast development with Vite
- 📱 Responsive layout
- 🔳 Business-card page with a QR code to the site at `/qrcode`

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Marked** - Markdown parser for blog posts
- **qrcode.react** - QR code rendering for `/qrcode`
- **GitHub Pages** - Hosting

## Project Structure

```
├── src/
│   ├── BlogApp.jsx       # Blog component with routing & post loading
│   ├── main.jsx          # React entry point
│   ├── qrcode.jsx        # React entry point for the /qrcode page
│   ├── styles.css        # Global styles
│   ├── articles/         # Markdown blog posts
│   └── views/
│       ├── HomeView.jsx  # Post feed/listing page
│       ├── PostView.jsx  # Individual post view
│       └── QrCodeView.jsx # Business-card QR code page
├── index.html            # HTML entry for the main site (/)
├── qrcode/index.html     # HTML entry for /qrcode
├── public/               # Static assets (post images)
├── docs/                 # Built output for GitHub Pages (don't edit by hand)
├── vite.config.js        # Multi-page build config
├── AGENTS.md             # Guide for AI agents working on the project
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20.19 or higher (the exact version is pinned in `.tool-versions`)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/allmonty/allmonty.github.io.git
cd allmonty.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Visit `http://localhost:5173` to view the site, and `http://localhost:5173/qrcode` for the QR code page.

### Building

```bash
# Build for production
npm run build
```

The built files will be output to the `docs/` directory, which is what GitHub Pages serves.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Writing Blog Posts

Create a new Markdown file in `src/articles/` with YAML frontmatter:

```markdown
---
title: "Your Post Title"
date: "2026-01-02"
tags: [tag1, tag2]
summary: "A brief summary of your post"
---

Your post content here in Markdown...
```

Name the file `YYYYMMDD_short_name.md`. The filename (without `.md`) becomes the post URL: `/?post=YYYYMMDD_short_name`.

The app will automatically load and parse all `.md` files in the articles directory, newest first.
Keep the frontmatter simple: one `key: value` per line and inline lists like `[a, b]`.

Put post images in `public/resources/photos/post_YYYYMMDD/` and reference them with absolute paths, e.g. `/resources/photos/post_YYYYMMDD/photo.jpg`.

## Adding a Standalone Page

Pages with their own URL (like `/qrcode`) are separate HTML entries, because GitHub Pages needs a real file for each path.
See the "How pages and routing work" section of [AGENTS.md](AGENTS.md) for the steps.

## Deployment

This site is configured for GitHub Pages deployment. The built files in the `docs/` folder are served directly by GitHub Pages.

To deploy:
1. Build the project: `npm run build` (this replaces the contents of `docs/`)
2. Commit and push to `master`
3. GitHub Pages will automatically serve the site

## Contributing with AI agents

AI agents should read [AGENTS.md](AGENTS.md) first. It covers the architecture, conventions, design rules and deployment.

## License

This project is proprietary and not available for public use.
