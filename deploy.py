import subprocess
import sys
import shutil
from pathlib import Path
from datetime import datetime
from contextlib import contextmanager

REPO_ROOT = Path(__file__).parent.resolve()
WORKTREE_PATH = REPO_ROOT.parent / "gh-pages-temp"
SITE_DIR = REPO_ROOT / "_site"
DOCS_DIR = WORKTREE_PATH / "docs"


class DeployError(Exception):
    """Custom exception for deploy errors."""
    pass


def run(cmd, cwd=REPO_ROOT):
    print(f"> {cmd}")
    result = subprocess.run(cmd, shell=True, cwd=cwd)
    if result.returncode != 0:
        raise DeployError(f"Command failed with exit code {result.returncode}: {cmd}")


def git_output(cmd):
    return subprocess.check_output(cmd, shell=True, cwd=REPO_ROOT).decode().strip()


def cleanup_worktree():
    """Cleanup worktree and any leftover files."""
    print("\nCleaning up worktree...")
    try:
        subprocess.run(
            f"git worktree remove {WORKTREE_PATH} --force",
            shell=True, cwd=REPO_ROOT, capture_output=True
        )
    except Exception:
        pass
    subprocess.run("git worktree prune", shell=True, cwd=REPO_ROOT, capture_output=True)
    if WORKTREE_PATH.exists():
        shutil.rmtree(WORKTREE_PATH, ignore_errors=True)


@contextmanager
def worktree_context():
    """Context manager that ensures worktree cleanup on success or failure."""
    cleanup_worktree()
    worktree_created = False
    try:
        run(f"git worktree add {WORKTREE_PATH} gh-pages")
        worktree_created = True
        yield
    finally:
        if worktree_created:
            cleanup_worktree()


def main():
    print("========================================")
    print("Lorenzo Orsenigo Website - Deploy Script")
    print("========================================\n")

    # 1. Check branch
    branch = git_output("git branch --show-current")
    if branch != "main":
        print(f"ERROR: Not on main branch (current: {branch})")
        return 1

    # 2. Check clean working tree
    status = git_output("git status --porcelain")
    if status:
        print("ERROR: You have uncommitted changes.")
        return 1

    # 3. Pull
    print("[1/7] Pulling latest changes...")
    run("git pull origin main")

    # 4. Build
    print("\n[2/7] Building site...")
    run("npm run build")

    # 5-9. Worktree operations (with automatic cleanup)
    print("\n[3/7] Preparing gh-pages worktree...")
    with worktree_context():
        # Sync gh-pages with remote
        run("git fetch origin gh-pages", cwd=WORKTREE_PATH)
        run("git reset --hard origin/gh-pages", cwd=WORKTREE_PATH)

        # Clean up old files (keep only docs/)
        print("\n[4/7] Cleaning old files from gh-pages...")
        for item in WORKTREE_PATH.iterdir():
            if item.name in (".git", "docs"):
                continue
            print(f"  Removing: {item.name}")
            if item.is_dir():
                shutil.rmtree(item)
            else:
                item.unlink()

        # 5. Copy files
        print("\n[5/7] Copying site files...")
        if DOCS_DIR.exists():
            shutil.rmtree(DOCS_DIR)
        shutil.copytree(SITE_DIR, DOCS_DIR)

        # 6. CNAME
        print("\n[6/7] Writing CNAME...")
        (DOCS_DIR / "CNAME").write_text("lorenzoorsenigo.com", encoding="utf-8")

        # 7. Commit & push
        print("\n[7/7] Commit & push...")
        run("git add docs/", cwd=WORKTREE_PATH)

        # Check if there are changes to commit
        status = subprocess.run(
            "git diff --cached --quiet",
            shell=True, cwd=WORKTREE_PATH
        )
        if status.returncode == 0:
            print("No changes to deploy - site is already up to date.")
        else:
            date = datetime.now().strftime("%Y-%m-%d %H:%M")
            run(f'git commit -m "Deploy: {date}"', cwd=WORKTREE_PATH)
            run("git push origin gh-pages --force", cwd=WORKTREE_PATH)

    print("\n========================================")
    print("Deployment completed successfully!")
    print("========================================")
    print("https://lorenzoorsenigo.com")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except DeployError as e:
        print(f"\nERROR: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n\nDeploy interrupted by user.")
        sys.exit(130)
    except Exception as e:
        print(f"\nUnexpected error: {e}")
        sys.exit(1)
