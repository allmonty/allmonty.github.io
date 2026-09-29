# allmonty.github.io

A personal portfolio and blog site built with React and Vite, deployed to GitHub Pages.

## Features

- 📝 Markdown-based blog posts with YAML frontmatter
- 🏷️ Tag-based filtering
- 🎨 Clean, minimalist design
- ⚡ Fast development with Vite
- 📱 Responsive layout

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Marked** - Markdown parser for blog posts
- **GitHub Pages** - Hosting

## Project Structure

```
├── src/
│   ├── App.jsx           # Main app component with routing & post loading
│   ├── main.jsx          # React entry point
│   ├── qrcode.jsx        # React entry point for the /qrcode page
│   ├── styles.css        # Global styles
│   ├── articles/         # Markdown blog posts
│   └── views/
│       ├── HomeView.jsx  # Post feed/listing page
│       ├── PostView.jsx  # Individual post view
│       └── QrCodeView.jsx # Business-card QR code page
├── qrcode/index.html     # HTML entry for /qrcode
├── public/               # Static assets
├── docs/                 # Built output for GitHub Pages
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

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

Visit `http://localhost:5173` to view the site.

### Building

```bash
# Build for production
npm run build
```

The built files will be output to the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Writing Blog Posts

Create a new Markdown file in `src/articles/` with YAML frontmatter:

```markdown
---
title: Your Post Title
date: 2026-01-02
tags: [tag1, tag2]
summary: A brief summary of your post
---

Your post content here in Markdown...
```

The app will automatically load and parse all `.md` files in the articles directory.

## Deployment

This site is configured for GitHub Pages deployment. The built files in the `docs/` folder are served directly by GitHub Pages.

To deploy:
1. Build the project: `npm run build`
2. Commit and push the `docs/` folder to the main branch
3. GitHub Pages will automatically serve the site

## License

This project is proprietary and not available for public use.
