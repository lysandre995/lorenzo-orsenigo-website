import subprocess
import sys
import shutil
from pathlib import Path
from datetime import datetime

REPO_ROOT = Path(__file__).parent.resolve()
WORKTREE_PATH = REPO_ROOT.parent / "gh-pages-temp"
SITE_DIR = REPO_ROOT / "_site"
DOCS_DIR = WORKTREE_PATH / "docs"


def run(cmd, cwd=REPO_ROOT):
    print(f"> {cmd}")
    result = subprocess.run(cmd, shell=True, cwd=cwd)
    if result.returncode != 0:
        sys.exit(result.returncode)


def git_output(cmd):
    return subprocess.check_output(cmd, shell=True, cwd=REPO_ROOT).decode().strip()


print("========================================")
print("Lorenzo Orsenigo Website - Deploy Script")
print("========================================\n")

# 1. Check branch
branch = git_output("git branch --show-current")
if branch != "main":
    print(f"ERROR: Not on main branch (current: {branch})")
    sys.exit(1)

# 2. Check clean working tree
status = git_output("git status --porcelain")
if status:
    print("ERROR: You have uncommitted changes.")
    sys.exit(1)

# 3. Pull
print("[1/6] Pulling latest changes...")
run("git pull origin main")

# 4. Build
print("\n[2/6] Building site...")
run("npm run build")

# 5. Prepare worktree
print("\n[3/6] Preparing gh-pages worktree...")
# Clean up any existing worktree (registered or not)
try:
    subprocess.run(f"git worktree remove {WORKTREE_PATH} --force", shell=True, cwd=REPO_ROOT, capture_output=True)
except:
    pass
# Also prune any missing worktrees
subprocess.run("git worktree prune", shell=True, cwd=REPO_ROOT, capture_output=True)
# Remove directory if it still exists
if WORKTREE_PATH.exists():
    shutil.rmtree(WORKTREE_PATH)
run(f"git worktree add {WORKTREE_PATH} gh-pages")

# Sync gh-pages with remote
run("git fetch origin gh-pages", cwd=WORKTREE_PATH)
run("git reset --hard origin/gh-pages", cwd=WORKTREE_PATH)

# 6. Copy files
print("\n[4/6] Copying site files...")
if DOCS_DIR.exists():
    shutil.rmtree(DOCS_DIR)
shutil.copytree(SITE_DIR, DOCS_DIR)

# 7. CNAME
print("\n[5/6] Writing CNAME...")
(DOCS_DIR / "CNAME").write_text("lorenzoorsenigo.com", encoding="utf-8")

# 8. Commit & push
print("\n[6/6] Commit & push...")
date = datetime.now().strftime("%Y-%m-%d %H:%M")
run("git add docs/", cwd=WORKTREE_PATH)
run(f'git commit -m "Deploy: {date}"', cwd=WORKTREE_PATH)
run("git push origin gh-pages --force", cwd=WORKTREE_PATH)

# 9. Cleanup
print("\nCleaning up...")
try:
    run(f"git worktree remove {WORKTREE_PATH}")
except:
    # If worktree removal fails, try to clean up manually
    if WORKTREE_PATH.exists():
        shutil.rmtree(WORKTREE_PATH)
    subprocess.run("git worktree prune", shell=True, cwd=REPO_ROOT, capture_output=True)

print("\n========================================")
print("Deployment completed successfully!")
print("========================================")
print("https://lorenzoorsenigo.com")
