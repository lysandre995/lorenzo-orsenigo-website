@echo off
REM Deploy script for Lorenzo Orsenigo website
REM Deploys from main branch to gh-pages branch

echo ========================================
echo Lorenzo Orsenigo Website - Deploy Script
echo ========================================
echo.

REM Check if we're on main branch
git branch --show-current > current_branch.tmp
set /p CURRENT_BRANCH=<current_branch.tmp
del current_branch.tmp

if not "%CURRENT_BRANCH%"=="main" (
    echo ERROR: Not on main branch. Currently on: %CURRENT_BRANCH%
    echo Please switch to main branch first.
    pause
    exit /b 1
)

REM Check for uncommitted changes
git diff-index --quiet HEAD --
if errorlevel 1 (
    echo WARNING: You have uncommitted changes on main branch.
    echo Please commit or stash your changes before deploying.
    pause
    exit /b 1
)

echo [1/6] Pulling latest changes from main...
git pull origin main
if errorlevel 1 (
    echo ERROR: Failed to pull from main
    pause
    exit /b 1
)

echo.
echo [2/6] Building the site...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo [3/6] Switching to gh-pages branch...
git checkout gh-pages
if errorlevel 1 (
    echo ERROR: Failed to checkout gh-pages branch
    git checkout main
    pause
    exit /b 1
)

echo.
echo [4/6] Copying built site to docs folder...
if exist docs rmdir /s /q docs
mkdir docs
xcopy /s /e /y _site\* docs\
if errorlevel 1 (
    echo ERROR: Failed to copy files
    git checkout main
    pause
    exit /b 1
)

echo.
echo [5/6] Ensuring CNAME file exists...
echo lorenzoorsenigo.com > docs\CNAME

echo.
echo [6/6] Committing and pushing to gh-pages...
git add docs/
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do (set DEPLOY_DATE=%%c-%%b-%%a)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (set DEPLOY_TIME=%%a:%%b)
git commit -m "Deploy: %DEPLOY_DATE% %DEPLOY_TIME%"
if errorlevel 1 (
    echo WARNING: Nothing to commit or commit failed
)
git push origin gh-pages
if errorlevel 1 (
    echo ERROR: Failed to push to gh-pages
    git checkout main
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Returning to main branch...
git checkout main

echo.
echo ========================================
echo Deployment completed successfully!
echo ========================================
echo.
echo Your site has been deployed to GitHub Pages.
echo Visit: https://lorenzoorsenigo.com
echo.
pause
