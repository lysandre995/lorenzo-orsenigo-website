#!/bin/bash
# Deploy script for Lorenzo Orsenigo website
# Deploys from main branch to gh-pages branch

set -e  # Exit on error

echo "========================================"
echo "Lorenzo Orsenigo Website - Deploy Script"
echo "========================================"
echo ""

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "ERROR: Not on main branch. Currently on: $CURRENT_BRANCH"
    echo "Please switch to main branch first."
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "WARNING: You have uncommitted changes on main branch."
    echo "Please commit or stash your changes before deploying."
    exit 1
fi

echo "[1/6] Pulling latest changes from main..."
git pull origin main

echo ""
echo "[2/6] Building the site..."
npm run build

echo ""
echo "[3/6] Switching to gh-pages branch..."
git checkout gh-pages

echo ""
echo "[4/6] Copying built site to docs folder..."
rm -rf docs/*
cp -r _site/* docs/

echo ""
echo "[5/6] Ensuring CNAME file exists..."
echo "lorenzoorsenigo.com" > docs/CNAME

echo ""
echo "[6/6] Committing and pushing to gh-pages..."
git add docs/
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M')"
git push origin gh-pages

echo ""
echo "[SUCCESS] Returning to main branch..."
git checkout main

echo ""
echo "========================================"
echo "Deployment completed successfully!"
echo "========================================"
echo ""
echo "Your site has been deployed to GitHub Pages."
echo "Visit: https://lorenzoorsenigo.com"
echo ""
