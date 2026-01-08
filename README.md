# Lorenzo Orsenigo - Personal Website

Personal website for composer and researcher Lorenzo Orsenigo, built with Eleventy.

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm start

# Build for production
npm run build
```

## Project Structure

```
src/
├── _data/              # JSON data files
├── _includes/          # Nunjucks templates
│   ├── layouts/        # Page layouts
│   └── components/     # Reusable components
├── assets/             # Static assets (CSS, images)
├── phd/                # PHD project pages
├── projects/           # Project pages
└── *.md                # Page content

_site/                  # Generated site (after build)
```

## Key Features

- Dark theme design
- Random grid layout for PHD projects
- Multimedia carousel (images, videos, YouTube embeds)
- Responsive navigation and breadcrumbs
- Events listing
- 404 page

## Technologies

- **Eleventy** (11ty) - Static site generator
- **Nunjucks** - Template engine
- **Phosphor Icons** - Icon library
- Vanilla CSS with custom properties

## Deployment

Build the site with `npm run build` and deploy the `_site` folder to any static hosting service.
