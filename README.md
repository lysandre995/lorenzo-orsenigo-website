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

## Deployment to GitHub Pages

This site is deployed to GitHub Pages using the `gh-pages` branch with a custom domain.

### Initial Setup (already done)

The repository has two main branches:
- `main` - Source code and development
- `gh-pages` - Deployment branch serving the `docs/` folder
- `master` - Legacy branch (kept for reference)

### Deploy New Changes

1. **Make changes on the `main` branch:**
   ```bash
   git checkout main
   # Make your changes
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Build and deploy to GitHub Pages:**
   ```bash
   # Build the site
   npm run build

   # Switch to gh-pages branch
   git checkout gh-pages

   # Copy built site to docs folder
   rm -rf docs/*
   cp -r _site/* docs/

   # Ensure CNAME file exists
   echo "lorenzoorsenigo.com" > docs/CNAME

   # Commit and push
   git add docs/
   git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M')"
   git push origin gh-pages

   # Return to main branch
   git checkout main
   ```

### GitHub Pages Settings

Ensure your repository settings have:
- **Source**: Deploy from a branch
- **Branch**: `gh-pages`
- **Folder**: `/docs`
- **Custom domain**: `lorenzoorsenigo.com`

The CNAME file in the `docs/` folder ensures the custom domain is preserved after each deployment.

## Image Optimization

This site uses optimized images to ensure fast loading times. When adding new images:

### Quick Optimization (Recommended)

Use the installed `sharp-cli` to optimize images before adding them:

```bash
# Optimize a single image (resize to max 1920px width, quality 85%)
npx sharp-cli -i src/assets/img/your-image.jpg -o src/assets/img/your-image.jpg resize 1920 --withoutEnlargement --quality 85 --mozjpeg

# Optimize multiple images at once
cd src/assets/img
for file in *.jpg; do
  npx sharp-cli -i "$file" -o "${file%.*}_opt.jpg" resize 1920 --withoutEnlargement --quality 85 --mozjpeg
  mv "${file%.*}_opt.jpg" "$file"
done
```

### Optimization Guidelines

- **Maximum width**: 1920px (sufficient for most screens)
- **Quality**: 85% (good balance between size and quality)
- **Format**:
  - Use JPG for photos
  - Use PNG only for images requiring transparency
  - Consider converting PNG to JPG if transparency isn't needed
- **Target size**: Aim for under 500KB per image

### Tools Installed

- `@11ty/eleventy-img` - For advanced image processing
- `sharp-cli` - Command-line image optimization

### Example Optimizations

Recent optimizations achieved:
- 6.3MB → 236KB (96% reduction)
- 4.7MB → 214KB (95% reduction)
- 3.2MB → 664KB (79% reduction)
