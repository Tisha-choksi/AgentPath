import type { RoadmapPhase } from "./roadmap";

export const gitData: RoadmapPhase[] = [
  {
    id: "git-1",
    phaseNumber: 1,
    title: "Git Fundamentals",
    subtitle: "version control basics",
    accent: "#F97316",
    bg: "#1f1208",
    nodes: [
      {
        id: "git-1-1",
        icon: "🔍",
        label: "What & Why Version Control",
        level: "beginner",
        concept:
          "Version control is a system that records changes to files over time so you can recall specific versions later. Without it, you'd save files like report_v1.py, report_v2_final.py, report_FINAL_USE_THIS.py — a nightmare. Git tracks every change, who made it, and why. For AI engineers, this means tracking model experiments, prompt iterations, and agent code changes with full history.",
        keyPoints: [
          "Version control = time machine for your code",
          "Collaboration: multiple people edit the same codebase without overwriting each other",
          "Rollback: broke something? Revert to any previous state instantly",
          "History: every change has an author, timestamp, and reason — blame is productive",
          "AI use case: track prompt versions, config changes, dataset preprocessing code",
        ],
        project:
          "Look at a popular AI repo on GitHub (e.g. langchain). Browse the commit history — read 10 commit messages. Open a Pull Request. Read the code review comments. Understand what version control enables for a project with hundreds of contributors.",
        stack: ["Git", "GitHub"],
        resources: [
          { title: "Git Official Docs", url: "https://git-scm.com/doc" },
        ],
      },
      {
        id: "git-1-2",
        icon: "⚙️",
        label: "Git vs Others & Installation",
        level: "beginner",
        concept:
          "Git is distributed — every developer has a full copy of the entire history locally. This means you can commit, branch, and view history without internet. Older systems (SVN, CVS) are centralized — one server holds the history; no internet means no version control. Git is the industry standard: 96%+ of developers use it. Mercurial and Perforce exist but you'll rarely encounter them.",
        keyPoints: [
          "Distributed: full repo copy locally — fast operations, works offline",
          "Centralized (SVN): history lives on a server — slower, single point of failure",
          "git --version: verify installation",
          "Homebrew (Mac): brew install git / winget (Windows): winget install git",
          "git-scm.com: official download — includes Git Bash on Windows",
        ],
        project:
          "Install Git on your machine. Run git --version. Install GitHub Desktop as a visual companion. Open a terminal and confirm git is in your PATH. Check git --help and read the top 10 commands listed.",
        stack: ["Git", "Terminal"],
        resources: [
          { title: "Install Git", url: "https://git-scm.com/downloads" },
        ],
      },
      {
        id: "git-1-3",
        icon: "🪪",
        label: "Git Configuration",
        level: "beginner",
        concept:
          "Before your first commit, Git needs to know who you are. Every commit is stamped with your name and email — this can't be changed after the fact without rewriting history. --global config applies to all repos on your machine; --local config (inside a repo) overrides it for that project. This matters when you have work and personal GitHub accounts.",
        keyPoints: [
          "git config --global user.name 'Your Name'",
          "git config --global user.email 'you@example.com'",
          "git config --global core.editor 'code --wait': use VS Code as commit message editor",
          "git config --list: see all current config values",
          "~/.gitconfig: the global config file — edit it directly if needed",
        ],
        project:
          "Configure Git globally with your name and email. Set VS Code as your default editor. Configure git config --global init.defaultBranch main. View your config with git config --list. Understand what each value controls.",
        stack: ["Git", "Terminal"],
        resources: [],
      },
    ],
  },
  {
    id: "git-2",
    phaseNumber: 2,
    title: "Repository Basics",
    subtitle: "init, stage, commit",
    accent: "#F59E0B",
    bg: "#1f1a0d",
    nodes: [
      {
        id: "git-2-1",
        icon: "📁",
        label: "Repos & Working Directory",
        level: "beginner",
        concept:
          "A repository (repo) is a folder tracked by Git. The .git/ subfolder stores the entire history — delete it and you lose all version control. The working directory is where you edit files. Git tracks three states: untracked (new files Git doesn't know about), tracked unmodified (no changes since last commit), and tracked modified (changed since last commit).",
        keyPoints: [
          "git init: initialize a new repo in the current folder",
          ".git/ folder: contains the full history — never edit manually",
          "Working tree: the actual files you see and edit",
          "git status: the most important command — run it constantly",
          "Untracked files appear red in git status — they're not versioned yet",
        ],
        project:
          "Create a new folder for an AI agent project. Run git init. Create 3 files (agent.py, config.yaml, README.md). Run git status and understand what 'untracked files' means. Understand what the .git directory contains.",
        stack: ["Git", "Terminal"],
        resources: [],
      },
      {
        id: "git-2-2",
        icon: "📸",
        label: "Staging Area & Commits",
        level: "beginner",
        concept:
          "The staging area (index) is a preparation zone between your working directory and the repository. git add moves changes to staging; git commit saves everything staged as a permanent snapshot. This two-step process lets you craft precise commits — stage only the files related to one logical change, even if you've edited many files.",
        keyPoints: [
          "git add file: stage a specific file",
          "git add .: stage all modified and new files",
          "git add -p: interactively stage hunks (partial file staging)",
          "git commit -m 'message': save staged changes as a snapshot",
          "Commit message format: imperative mood — 'Add tool calling support' not 'Added'",
        ],
        project:
          "In your agent project: modify all 3 files. Stage only agent.py and config.yaml (not README). Commit with a meaningful message. Then stage and commit README separately. Notice how you can group related changes into one commit.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-2-3",
        icon: "🗓️",
        label: "Commit History & .gitignore",
        level: "beginner",
        concept:
          "git log shows every commit: hash, author, date, message. This is your project's complete history. .gitignore tells Git which files to never track — critical for excluding secrets (.env), build artifacts (__pycache__, .pyc), model weights (.pt, .bin), and virtual environments (venv/). For AI projects, always gitignore large data files and model checkpoints.",
        keyPoints: [
          "git log --oneline: compact one-line-per-commit history",
          "git log --oneline --graph: ASCII art tree of branch history",
          "git show <hash>: see full diff of a specific commit",
          ".gitignore: one pattern per line — *.pyc, venv/, .env, *.pt",
          "github.com/github/gitignore: official gitignore templates for every language",
        ],
        project:
          "Add a .gitignore to your AI agent project: exclude .env, __pycache__/, *.pyc, venv/, *.pt (PyTorch models), .DS_Store. Create a .env file — confirm git status does NOT show it. Make 5 commits and view the history with git log --oneline --graph.",
        stack: ["Git"],
        resources: [
          { title: "gitignore.io", url: "https://www.toptal.com/developers/gitignore" },
        ],
      },
    ],
  },
  {
    id: "git-3",
    phaseNumber: 3,
    title: "Remote Repositories",
    subtitle: "github basics",
    accent: "#3B82F6",
    bg: "#0d1929",
    nodes: [
      {
        id: "git-3-1",
        icon: "☁️",
        label: "GitHub & Cloning",
        level: "beginner",
        concept:
          "GitHub hosts Git repositories on the cloud. Cloning downloads a full copy of a repo — including all commits, branches, and history. After cloning, you have a complete local copy you can work on offline. Remotes are named references to remote repository URLs. origin is the conventional name for the primary remote.",
        keyPoints: [
          "git clone <url>: download a repo with its full history",
          "git clone <url> folder-name: clone into a specific folder",
          "origin: the default remote name pointing to where you cloned from",
          "git remote -v: list all configured remotes and their URLs",
          "SSH vs HTTPS: SSH uses key-based auth (no passwords); HTTPS uses token",
        ],
        project:
          "Clone 3 popular AI repos from GitHub (e.g. openai/openai-python, langchain-ai/langchain, anthropics/anthropic-sdk-python). Explore their structure. Run git log --oneline on each. Notice how much history is already there. Check their .gitignore files.",
        stack: ["Git", "GitHub"],
        resources: [],
      },
      {
        id: "git-3-2",
        icon: "⬆️",
        label: "Push, Pull & Fetch",
        level: "beginner",
        concept:
          "Push uploads your local commits to the remote. Pull downloads remote commits and merges them into your branch. Fetch downloads remote changes without merging — safer, lets you inspect before integrating. The golden rule: always pull before you push. If your push is rejected (non-fast-forward), someone else pushed first — pull, resolve conflicts, then push.",
        keyPoints: [
          "git push origin main: push local main to the remote",
          "git pull: fetch + merge in one step",
          "git fetch origin: download remote changes, don't merge yet",
          "git pull --rebase: rebase instead of merge when pulling — cleaner history",
          "Rejected push: run git pull then git push again",
        ],
        project:
          "Create a repo on GitHub. Push your AI agent project to it. Make a commit locally and push. Then go to GitHub and edit a file directly in the browser. Pull that change down. Practice the push/pull cycle 5 times until it's automatic.",
        stack: ["Git", "GitHub"],
        resources: [],
      },
      {
        id: "git-3-3",
        icon: "🔄",
        label: "Managing Remotes & Sync",
        level: "beginner",
        concept:
          "You can have multiple remotes — useful when you fork a repo and need to track both your fork (origin) and the original (upstream). Keeping your fork in sync with upstream requires fetching upstream changes and merging them into your branch. For AI engineers working on open-source models or agent frameworks, this workflow is constant.",
        keyPoints: [
          "git remote add upstream <url>: add the original repo as 'upstream'",
          "git fetch upstream: download updates from the original repo",
          "git merge upstream/main: merge upstream changes into your branch",
          "git remote remove <name>: delete a remote reference",
          "git remote set-url origin <new-url>: change a remote's URL",
        ],
        project:
          "Fork the langchain repo on GitHub. Clone your fork. Add the original as upstream. Fetch upstream. Merge upstream/main into your main. Confirm your fork is now up to date with the original. This is the real open-source contribution workflow.",
        stack: ["Git", "GitHub"],
        resources: [],
      },
    ],
  },
  {
    id: "git-4",
    phaseNumber: 4,
    title: "Branching Fundamentals",
    subtitle: "parallel development",
    accent: "#22C55E",
    bg: "#0d1f12",
    nodes: [
      {
        id: "git-4-1",
        icon: "🌿",
        label: "Creating & Switching Branches",
        level: "beginner",
        concept:
          "A branch is an independent line of development. main is always production-ready. You branch off to work on a feature without affecting main. When done, merge back. Branches are just lightweight pointers to commits — creating one costs almost nothing. AI engineers use branches for: experimenting with different agent architectures, testing new prompts, trying different tool implementations.",
        keyPoints: [
          "git branch feature-name: create a new branch",
          "git switch feature-name: switch to a branch (modern command)",
          "git switch -c feature-name: create and switch in one command",
          "git branch: list all local branches (* = current)",
          "git branch -a: list local and remote tracking branches",
        ],
        project:
          "In your agent project, create branches for parallel experiments: feature/openai-tools, feature/anthropic-tools, experiment/chain-of-thought. Make different commits on each. Switch between them and observe how your working directory changes to match each branch.",
        stack: ["Git"],
        resources: [
          { title: "Learn Git Branching (interactive)", url: "https://learngitbranching.js.org/" },
        ],
      },
      {
        id: "git-4-2",
        icon: "✂️",
        label: "Rename, Delete & Workflows",
        level: "beginner",
        concept:
          "Branch hygiene matters in team environments — stale branches clutter the repo. Delete branches after merging. Rename a branch if you named it poorly. The standard workflow: main is always deployable, feature branches are short-lived (1–3 days), merge via PR after review. For AI projects, use descriptive names: experiment/gpt4-vs-claude, fix/token-overflow.",
        keyPoints: [
          "git branch -m old-name new-name: rename a branch",
          "git branch -d branch-name: delete a merged branch (safe — fails if unmerged)",
          "git branch -D branch-name: force delete (data loss if unmerged!)",
          "git push origin --delete branch-name: delete a remote branch",
          "Naming conventions: feature/, fix/, experiment/, refactor/, docs/",
        ],
        project:
          "Clean up your branches: rename experiment/chain-of-thought to experiment/cot-prompting. Delete the feature/openai-tools branch after confirming it's merged. Push a branch to GitHub and then delete both local and remote copies.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-4-3",
        icon: "🔀",
        label: "Merging Branches",
        level: "beginner",
        concept:
          "Merging integrates one branch's commits into another. Fast-forward merge happens when no new commits exist on the target — Git simply moves the pointer forward. Three-way merge happens when both branches have diverged — Git creates a merge commit. Always merge into the branch you want to update (switch to main, then merge feature).",
        keyPoints: [
          "git switch main && git merge feature: merge feature into main",
          "Fast-forward: no merge commit, linear history — ideal",
          "Three-way: creates a merge commit with two parents",
          "--no-ff: force a merge commit even for fast-forwards (preserves branch history)",
          "Merge conflicts: Git marks conflicting sections — you resolve them manually",
        ],
        project:
          "Merge your feature/anthropic-tools branch into main. Deliberately create a merge conflict by editing the same line in both main and a test branch. Resolve the conflict, complete the merge, verify with git log --oneline --graph.",
        stack: ["Git"],
        resources: [],
      },
    ],
  },
  {
    id: "git-5",
    phaseNumber: 5,
    title: "GitHub Essentials",
    subtitle: "profile & repos",
    accent: "#06B6D4",
    bg: "#0a1f22",
    nodes: [
      {
        id: "git-5-1",
        icon: "👤",
        label: "Account, Profile & Repos",
        level: "beginner",
        concept:
          "Your GitHub profile is your public developer portfolio. Recruiters, collaborators, and potential clients will look at it. A strong profile: pinned repos with good READMEs, consistent commit activity (green squares), stars from the community, and a bio that communicates your focus. For AI engineers: pin your agent projects, RAG implementations, and any open-source contributions.",
        keyPoints: [
          "Profile README: create a repo named username/username — it renders on your profile",
          "Pinned repos: choose 6 repos to feature prominently",
          "Contribution graph: daily commits show consistency and dedication",
          "Organizations: join your company's GitHub org for private work",
          "Stars: star repos you use — helps others discover quality projects",
        ],
        project:
          "Set up your GitHub profile completely: profile picture, bio mentioning AI/agents, location, website. Create a profile README repo with your skills and projects. Pin your 6 best repos. Write a compelling bio that would make an AI startup want to contact you.",
        stack: ["GitHub"],
        resources: [],
      },
      {
        id: "git-5-2",
        icon: "🔓",
        label: "Public vs Private Repos",
        level: "beginner",
        concept:
          "Public repos are visible to everyone — good for open-source projects, portfolios, and learning projects. Private repos are only visible to you and invited collaborators — use for client work, unreleased products, and anything containing secrets or proprietary data. Never put API keys in a public repo — GitHub scans for them and will email you, but the damage is already done.",
        keyPoints: [
          "Public: anyone can view and fork — good for portfolios and OSS",
          "Private: invite-only — use for commercial work and sensitive code",
          "GitHub Free: unlimited public and private repos",
          "Visibility change: Settings → Danger Zone → Change visibility",
          "Secret scanning: GitHub automatically detects leaked API keys in public repos",
        ],
        project:
          "Audit your GitHub repos: ensure any repo with .env files or API keys is private. Check your existing public repos for accidentally committed secrets with git log -p | grep -i 'api_key\\|secret\\|password'. Set up a rule to never commit .env files.",
        stack: ["GitHub"],
        resources: [],
      },
      {
        id: "git-5-3",
        icon: "📝",
        label: "README & Markdown",
        level: "beginner",
        concept:
          "The README is the front page of your repo — the first thing anyone sees. A great README explains: what the project does, why it matters, how to install it, how to use it, and how to contribute. Markdown is the formatting language used on GitHub — headers, bold, code blocks, lists, images, links. AI project READMEs should include architecture diagrams and example agent conversations.",
        keyPoints: [
          "# Heading 1, ## Heading 2, ### Heading 3",
          "**bold**, *italic*, `inline code`, ```code block```",
          "![alt text](image.png): embed an image",
          "[link text](https://url.com): hyperlink",
          "Badges: shields.io generates status badges for your README",
        ],
        project:
          "Write a professional README for your AI agent project: project description, architecture diagram (ASCII or image), installation steps (pip install -r requirements.txt), usage examples with code blocks, environment variables table, and contributing section. Add a license badge.",
        stack: ["Markdown", "GitHub"],
        resources: [
          { title: "GitHub Markdown Guide", url: "https://guides.github.com/features/mastering-markdown/" },
        ],
      },
    ],
  },
  {
    id: "git-6",
    phaseNumber: 6,
    title: "Collaboration Workflow",
    subtitle: "forks & pull requests",
    accent: "#8B5CF6",
    bg: "#150d2a",
    nodes: [
      {
        id: "git-6-1",
        icon: "🍴",
        label: "Forking & Pull Requests",
        level: "beginner",
        concept:
          "Forking creates your own copy of someone else's repo under your account. You can make changes freely without affecting the original. Pull Requests (PRs) propose merging your changes back into the original. This is how all open-source contributions work — fork, change, PR. For AI engineers, contributing to agent frameworks, LLM libraries, or evaluation tools is career-defining.",
        keyPoints: [
          "Fork: copy a repo to your account — original stays untouched",
          "Clone your fork locally, make changes, push to your fork",
          "Open PR: compare & pull request → write description → submit",
          "PR description: what changed, why, how to test, screenshots if UI",
          "Maintainer reviews, requests changes, approves, and merges",
        ],
        project:
          "Find a bug or typo in an AI library's documentation on GitHub. Fork the repo, fix it, commit with a clear message, push to your fork, and open a PR. Write a proper PR description. Even if not merged, this is real open-source contribution experience.",
        stack: ["GitHub", "Git"],
        resources: [],
      },
      {
        id: "git-6-2",
        icon: "👀",
        label: "Code Reviews",
        level: "intermediate",
        concept:
          "Code review is the process of a teammate examining your PR before it merges. It catches bugs, improves code quality, shares knowledge, and maintains standards. As a reviewer: understand the intent before critiquing, be specific ('this will fail when input is None' not 'this is bad'), distinguish between blocking issues and optional suggestions. Reviews are the primary learning mechanism in professional teams.",
        keyPoints: [
          "Comment on a specific line: navigate to Files Changed tab, click + next to a line",
          "Request changes: maintainer must re-review after you address comments",
          "Approve: explicitly signals you're happy with the PR",
          "Review etiquette: critique code, not the author — 'this could be simplified' not 'this is wrong'",
          "Nit: prefix non-blocking suggestions with 'nit:' so author knows it's optional",
        ],
        project:
          "Exchange code reviews with a peer: each of you opens a PR in the other's repo. Leave at least 5 line-level comments with specific, actionable feedback. One comment should be a blocking issue; others can be suggestions. Respond to all comments on your own PR.",
        stack: ["GitHub"],
        resources: [],
      },
      {
        id: "git-6-3",
        icon: "🎯",
        label: "Issues, Labels & Milestones",
        level: "beginner",
        concept:
          "Issues are GitHub's bug tracker and task manager. They document bugs, feature requests, and discussions. Labels categorize issues (bug, enhancement, good first issue). Milestones group issues into a planned release. For AI agent projects: use issues to track prompt engineering experiments, model evaluation results, tool integration bugs, and feature requests from users.",
        keyPoints: [
          "Issue template: .github/ISSUE_TEMPLATE/ — structured bug reports and feature requests",
          "Closes #123 in a commit message or PR description — auto-closes the issue on merge",
          "good first issue label: marks issues suitable for new contributors",
          "Milestone: group issues by version/sprint, track completion percentage",
          "@mention in issues: notify specific people or teams",
        ],
        project:
          "Set up issue management for your agent project: create 5 real issues (bugs or features), add appropriate labels, create a v1.0 milestone and assign 3 issues to it. Add an issue template for bug reports. Write a commit that references and closes an issue.",
        stack: ["GitHub"],
        resources: [],
      },
    ],
  },
  {
    id: "git-7",
    phaseNumber: 7,
    title: "Documentation",
    subtitle: "readable projects",
    accent: "#34D399",
    bg: "#0a1f18",
    nodes: [
      {
        id: "git-7-1",
        icon: "📖",
        label: "README & Contributing Guide",
        level: "beginner",
        concept:
          "The README sells your project; the CONTRIBUTING guide shows others how to help build it. A CONTRIBUTING.md answers: how do I set up the dev environment, what's the branch naming convention, how do I run tests, how should I write commit messages, and what's the PR review process. Well-documented projects attract more contributors and users.",
        keyPoints: [
          "README sections: Overview, Installation, Usage, Examples, Architecture, Contributing",
          "CONTRIBUTING.md: dev setup, code standards, testing instructions, PR process",
          "Badges: build status, test coverage, version, license — from shields.io",
          "Screenshots/GIFs: show don't tell — animated demos are powerful",
          "Changelog: CHANGELOG.md documents what changed in each release",
        ],
        project:
          "Write a complete CONTRIBUTING.md for your agent project: environment setup (venv, pip install), code style (ruff/black), running tests (pytest), commit message format, PR checklist, and code of conduct. This file should let a stranger contribute without asking you a single question.",
        stack: ["Markdown", "GitHub"],
        resources: [],
      },
      {
        id: "git-7-2",
        icon: "🗺️",
        label: "Code Docs & Wiki",
        level: "intermediate",
        concept:
          "Code documentation explains what code does and why it exists. Docstrings document functions and classes inline. Type hints make code self-documenting. For AI agent code: document agent capabilities, tool schemas, prompt templates, and model parameters. GitHub Wiki provides a multi-page documentation site for complex projects.",
        keyPoints: [
          "Google/NumPy style docstrings: Args, Returns, Raises, Examples sections",
          "Type hints: def search(query: str, top_k: int = 5) -> list[Document]",
          "GitHub Wiki: multi-page docs — great for architecture guides and tutorials",
          "mkdocs / Sphinx: auto-generate HTML docs from docstrings",
          "Document decisions: a short doc explaining WHY you chose a design is more valuable than explaining WHAT",
        ],
        project:
          "Add comprehensive docstrings to every function in your agent project using Google style. Add type hints to all function signatures. Create a GitHub Wiki with 3 pages: Architecture Overview, Tool Reference, and Deployment Guide.",
        stack: ["Python", "Markdown", "GitHub Wiki"],
        resources: [],
      },
      {
        id: "git-7-3",
        icon: "📋",
        label: "Project Structure & Citations",
        level: "beginner",
        concept:
          "A consistent project structure helps contributors navigate your codebase. AI projects have specific conventions: separate agents/, tools/, prompts/, data/, tests/ directories. CITATION.cff is a machine-readable citation file so researchers can properly cite your software in papers. LICENSE tells users what they can and can't do with your code.",
        keyPoints: [
          "Standard AI project layout: src/agents/, src/tools/, src/prompts/, tests/, docs/",
          "LICENSE: MIT (permissive), Apache 2.0 (permissive + patent), GPL (copyleft)",
          "CITATION.cff: cite your software in academic papers — standard format",
          "pyproject.toml: modern Python project config (replaces setup.py)",
          "Project structure README: diagram showing every folder's purpose",
        ],
        project:
          "Restructure your agent project following standard conventions. Add a LICENSE file (use MIT if unsure). Create a CITATION.cff if you'd want researchers to cite your work. Add a project structure section to your README with a directory tree and explanation of each folder.",
        stack: ["GitHub", "Python"],
        resources: [],
      },
    ],
  },
  {
    id: "git-8",
    phaseNumber: 8,
    title: "Merge Strategies",
    subtitle: "integrating changes",
    accent: "#EC4899",
    bg: "#1f0d1a",
    nodes: [
      {
        id: "git-8-1",
        icon: "➡️",
        label: "Fast-Forward & 3-Way Merge",
        level: "intermediate",
        concept:
          "Fast-forward merge: when the target branch hasn't changed since you branched, Git moves the pointer forward — no merge commit, clean linear history. Three-way merge: when both branches have new commits, Git computes the common ancestor and creates a merge commit joining both histories. Use --no-ff to always create a merge commit and preserve the branch history.",
        keyPoints: [
          "Fast-forward: feature branch diverged from main, main hasn't changed → pointer moves",
          "git merge --no-ff feature: force merge commit even if fast-forward is possible",
          "Three-way: two branches diverged from common ancestor → merge commit",
          "Merge commit message: auto-generated 'Merge branch X into Y' — you can edit",
          "git log --merges: show only merge commits",
        ],
        project:
          "Practice both merge types: create a scenario where fast-forward is possible, merge it, observe the history. Then create a scenario where both branches have new commits, merge, see the merge commit. Use git log --oneline --graph to visually compare both histories.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-8-2",
        icon: "🔄",
        label: "Rebase & Squash",
        level: "intermediate",
        concept:
          "Rebase replays your branch's commits on top of another branch — creating a linear history without merge commits. Squash merge combines all commits from a feature branch into one before merging — keeps main's history clean. Both rewrite history: never rebase commits that others have already pulled. AI teams often squash feature branches to keep the main history readable.",
        keyPoints: [
          "git rebase main: replay current branch commits on top of main",
          "Rebase rewrites commit hashes — don't rebase shared branches",
          "git merge --squash feature: stage all feature changes as one new commit",
          "Interactive rebase: git rebase -i HEAD~3 — edit last 3 commits",
          "Squash in GitHub PR: 'Squash and merge' button combines all commits",
        ],
        project:
          "Create a feature branch with 5 messy commits ('WIP', 'fix', 'fix 2', 'finally works', 'cleanup'). Use git rebase -i to squash them into 1 clean commit. Then rebase a branch onto an updated main. Understand the difference between rebase and merge.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-8-3",
        icon: "🍒",
        label: "Cherry-Pick & Conflict Resolution",
        level: "intermediate",
        concept:
          "Cherry-pick applies a single commit from any branch to your current branch — useful for backporting a bug fix to an older release branch. Merge conflicts occur when two branches changed the same code differently — Git can't auto-decide. You edit the conflict markers, choose the correct version, git add, then git commit. Conflict resolution is a daily skill in active codebases.",
        keyPoints: [
          "git cherry-pick <hash>: apply that commit to the current branch",
          "Cherry-pick range: git cherry-pick A..B — apply A through B",
          "Conflict markers: <<<< HEAD (your version) | ==== | >>>> branch (incoming)",
          "VS Code merge editor: visual three-way diff for conflict resolution",
          "git mergetool: open a configured visual merge tool",
        ],
        project:
          "Simulate a hotfix: make a critical bug fix on a hotfix branch, cherry-pick it onto both main and a release/v1 branch. Then deliberately create a merge conflict in a Python file, resolve it with VS Code's merge editor, and confirm the resolution is correct.",
        stack: ["Git", "VS Code"],
        resources: [],
      },
    ],
  },
  {
    id: "git-9",
    phaseNumber: 9,
    title: "Intermediate Git",
    subtitle: "history & HEAD",
    accent: "#EF4444",
    bg: "#1f0d0d",
    nodes: [
      {
        id: "git-9-1",
        icon: "🧠",
        label: "HEAD & Detached HEAD",
        level: "intermediate",
        concept:
          "HEAD is a pointer that tells Git where you currently are. Normally it points to a branch, which points to a commit. Detached HEAD means HEAD points directly to a commit instead of a branch — you're viewing history but any commits you make will be lost when you switch back (they won't be on any branch). Always create a branch before committing in detached HEAD state.",
        keyPoints: [
          "HEAD: pointer to the currently checked-out branch or commit",
          "git checkout <hash>: moves into detached HEAD — viewing past state",
          "Detached HEAD: safe to look, dangerous to commit without a branch",
          "git switch -c new-branch: save your detached HEAD work to a new branch",
          "HEAD~1: the commit before HEAD. HEAD~3: three commits back",
        ],
        project:
          "Navigate to a commit from 3 days ago using git checkout <hash>. Explore the codebase in that historical state. Make a commit (you'll be in detached HEAD). Then create a branch to save it. Switch back to main. Use git log to understand what happened.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-9-2",
        icon: "🔎",
        label: "Git Log Analysis",
        level: "intermediate",
        concept:
          "git log is far more powerful than most developers realize. You can filter by author, date, file, commit message pattern, or branch. For AI projects, this lets you answer: 'when did we change the system prompt?', 'which commits touched the tool calling code?', 'who made changes to the agent loop last week?'",
        keyPoints: [
          "git log --author='Name': filter by author",
          "git log --since='2 weeks ago' --until='today'",
          "git log --grep='prompt': commits with 'prompt' in the message",
          "git log -- agent.py: history of a specific file",
          "git blame agent.py: show who last changed each line and when",
        ],
        project:
          "Use git log to answer 5 questions about a popular AI repo: who has the most commits, when was a specific feature added, what changed in the last week, which files change most frequently. Use git blame to find who wrote a specific function.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-9-3",
        icon: "📊",
        label: "Branch History Visualization",
        level: "intermediate",
        concept:
          "Visualizing branch history reveals the true shape of your project's development. Multiple parallel branches, merges, and rebases create complex graphs. The --graph flag draws an ASCII tree. GUI tools (GitKraken, VS Code GitLens, GitHub's network graph) show this visually. Understanding the graph is essential for untangling complex merge conflicts.",
        keyPoints: [
          "git log --oneline --graph --all: full ASCII branch tree",
          "git log --oneline --graph --decorate: show branch and tag labels",
          "GitKraken / Sourcetree: GUI tools with beautiful branch visualization",
          "VS Code GitLens extension: inline blame, history, and branch visualization",
          "GitHub Network graph: repo → Insights → Network",
        ],
        project:
          "Clone a large active AI repo (e.g. huggingface/transformers). Run git log --oneline --graph --all | head -50. Install GitLens in VS Code. Open the repo and explore the commit history graphically. Identify merge commits, feature branches, and hotfix branches.",
        stack: ["Git", "GitLens", "VS Code"],
        resources: [],
      },
    ],
  },
  {
    id: "git-10",
    phaseNumber: 10,
    title: "Undoing Changes",
    subtitle: "reset & revert",
    accent: "#14B8A6",
    bg: "#0a1f1e",
    nodes: [
      {
        id: "git-10-1",
        icon: "↩️",
        label: "Git Reset",
        level: "intermediate",
        concept:
          "git reset moves HEAD (and optionally changes the working directory and staging area). Three modes: soft (undo commit, keep changes staged), mixed (undo commit, unstage changes, keep in working dir — the default), hard (undo commit, delete all changes — permanent data loss). Use with caution. Never hard-reset commits you've already pushed to a shared branch.",
        keyPoints: [
          "git reset --soft HEAD~1: undo last commit, keep changes staged",
          "git reset HEAD~1 (or --mixed): undo last commit, unstage changes, keep files",
          "git reset --hard HEAD~1: undo last commit, DELETE all changes (irreversible!)",
          "git reset HEAD file: unstage a specific file (keep changes in working dir)",
          "HEAD~N: go back N commits. Can also use a commit hash",
        ],
        project:
          "Practice all three reset modes: commit something, soft-reset it (verify changes are staged), commit again, mixed-reset (verify changes are in working dir but not staged), commit again, hard-reset (verify changes are gone). Understand the difference and when to use each.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-10-2",
        icon: "🔙",
        label: "Git Revert",
        level: "intermediate",
        concept:
          "git revert creates a new commit that undoes a previous commit's changes — it doesn't rewrite history. This is the safe way to undo changes that have already been pushed to a shared branch. If reset says 'erase history', revert says 'add a new page that cancels out the old one'. Always use revert for undoing commits on main or any shared branch.",
        keyPoints: [
          "git revert <hash>: create a new commit that undoes the specified commit",
          "git revert HEAD: undo the most recent commit (safe for pushed commits)",
          "git revert --no-commit <hash>: stage the reversal without committing",
          "Revert vs reset: revert = new commit (safe for shared), reset = rewrite history (local only)",
          "Revert a merge commit: git revert -m 1 <merge-commit-hash>",
        ],
        project:
          "Push 3 commits to GitHub. Then revert the second commit using git revert. Push the revert. Observe on GitHub that the history shows the original commit AND the revert commit — history is preserved. Compare this with a local hard reset (which would require force-push).",
        stack: ["Git", "GitHub"],
        resources: [],
      },
      {
        id: "git-10-3",
        icon: "🚑",
        label: "Recovering Lost Work",
        level: "intermediate",
        concept:
          "Git almost never permanently deletes anything you've committed. The reflog records every state of HEAD — even after resets, rebases, and accidental deletions. If you hard-reset away commits you needed, git reflog shows them and you can restore. For uncommitted changes: git stash before any risky operation. The rule: if it was ever committed, it can be recovered.",
        keyPoints: [
          "git reflog: log of every HEAD movement — your safety net",
          "git checkout <reflog-hash>: recover a lost commit",
          "git stash: save uncommitted changes before risky operations",
          "Deleted branch: find the tip commit in reflog, git switch -c recovered <hash>",
          "ORIG_HEAD: Git saves HEAD before every merge/rebase — git reset ORIG_HEAD to undo",
        ],
        project:
          "Simulate disaster recovery: make 3 commits, hard-reset them away, then use git reflog to find and recover them. Also: delete a branch you 'accidentally' deleted, recover it from reflog. This is a skill you'll use in production someday.",
        stack: ["Git"],
        resources: [],
      },
    ],
  },
  {
    id: "git-11",
    phaseNumber: 11,
    title: "Git Stash",
    subtitle: "temporary shelving",
    accent: "#A78BFA",
    bg: "#140d2a",
    nodes: [
      {
        id: "git-11-1",
        icon: "📦",
        label: "Saving Uncommitted Work",
        level: "intermediate",
        concept:
          "Stash temporarily shelves changes so you can switch context without committing unfinished work. Classic scenario: you're mid-feature and a urgent bug comes in — stash your changes, fix the bug on a new branch, then unstash and continue. For AI engineers: stash when switching between experiments without polluting commit history with WIP commits.",
        keyPoints: [
          "git stash: save all tracked changes (modified + staged) to stash stack",
          "git stash push -m 'description': stash with a label",
          "git stash -u: include untracked files",
          "git stash --keep-index: stash only unstaged changes (keep staged)",
          "Stash is a LIFO stack — last in, first out by default",
        ],
        project:
          "In your agent project, make changes to 3 files (simulate mid-feature work). Stash them with a descriptive message. Switch to a new branch, fix an imaginary bug, commit it. Switch back and restore your stash. Confirm all 3 files are back to their modified state.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-11-2",
        icon: "📋",
        label: "Applying & Managing Stashes",
        level: "intermediate",
        concept:
          "You can have multiple stashes on the stack. git stash list shows all of them. git stash apply replays changes without removing from the stack; git stash pop replays and removes. You can apply a specific stash by index. Stashes can be applied to different branches — useful for moving changes to the correct branch when you forgot to switch first.",
        keyPoints: [
          "git stash list: show all stashes with index and message",
          "git stash pop: apply most recent stash and remove from stack",
          "git stash apply stash@{2}: apply a specific stash by index",
          "git stash branch feature-name: create a new branch from a stash",
          "Stash apply may create conflicts if the branch has changed",
        ],
        project:
          "Build up a stash stack with 3 different stashes (each with different changes and a descriptive message). Practice applying stash@{1} without popping, then applying stash@{2}. Apply a stash to a different branch than where it was created. List and inspect each stash.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-11-3",
        icon: "🗑️",
        label: "Cleaning Stashes",
        level: "intermediate",
        concept:
          "Old stashes accumulate and become confusing. Regular cleanup prevents applying the wrong stash accidentally. git stash drop removes a single stash; git stash clear removes all stashes. Before cleaning, inspect stash contents to confirm you don't need them. Stash is a temporary tool — if work has been in stash for more than a week, it should probably be a proper WIP commit on a branch.",
        keyPoints: [
          "git stash show stash@{1}: see summary of what a stash changed",
          "git stash show -p stash@{1}: see full diff of a stash",
          "git stash drop stash@{0}: remove a specific stash",
          "git stash clear: delete ALL stashes — irreversible",
          "Alternative: git stash branch feature — turn stash into a proper branch",
        ],
        project:
          "Inspect each of your 3 stashes using git stash show -p before deciding what to do with each one. Convert one stash to a proper branch. Drop one stash you no longer need. Pop the last one. End with a clean stash list (git stash list returns empty).",
        stack: ["Git"],
        resources: [],
      },
    ],
  },
  {
    id: "git-12",
    phaseNumber: 12,
    title: "Viewing Differences",
    subtitle: "git diff",
    accent: "#0EA5E9",
    bg: "#0a1929",
    nodes: [
      {
        id: "git-12-1",
        icon: "🔍",
        label: "Staged & Unstaged Diffs",
        level: "beginner",
        concept:
          "git diff shows what changed. Without arguments it shows unstaged changes (working dir vs staging area). --staged shows staged changes (staging area vs last commit). Understanding diffs is essential for writing accurate commit messages — always review your diff before committing. For AI projects, diffing prompt files reveals exactly what changed between experiments.",
        keyPoints: [
          "git diff: unstaged changes — what's modified but not yet staged",
          "git diff --staged (or --cached): staged changes — what will be in the next commit",
          "git diff HEAD: all changes since last commit (staged + unstaged)",
          "Lines starting with - are removed, + are added, context lines are unchanged",
          "git diff -- file.py: diff only a specific file",
        ],
        project:
          "Modify 5 files in your agent project — stage 3 of them. Run git diff (unstaged only), git diff --staged (staged only), git diff HEAD (all). Read each output and verify it matches what you expect. Practice writing a commit message based only on reading the diff.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-12-2",
        icon: "📊",
        label: "Commit & Branch Comparisons",
        level: "intermediate",
        concept:
          "Compare any two points in history: two commits, two branches, a branch vs a tag. This is how you answer 'what changed between v1.0 and v1.1?' or 'what does this PR actually change?' The double-dot vs triple-dot syntax has different meanings: A..B shows commits in B not in A; A...B shows commits in either but not both.",
        keyPoints: [
          "git diff main feature: diff between two branches",
          "git diff <hash1> <hash2>: diff between two specific commits",
          "git diff v1.0 v1.1: diff between two tags",
          "git diff main...feature: changes on feature since branching from main (triple dot)",
          "git diff main feature -- agent.py: compare one file across branches",
        ],
        project:
          "Compare your feature branch against main: what exactly would be merged? Compare two commits from 2 weeks apart: what changed in your agent's tool definitions? Compare a file across branches to understand divergence. Export a diff as a patch file with git diff > changes.patch.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-12-3",
        icon: "📁",
        label: "File-Level & Stat Diffs",
        level: "intermediate",
        concept:
          "Beyond line-level diffs: --stat shows how many lines changed per file (great for PR overviews), --name-only shows only file names that changed, --word-diff shows word-level changes instead of line-level (great for prose and prompt changes). For AI engineers, word-level diffs are especially useful for comparing prompt iterations.",
        keyPoints: [
          "git diff --stat: summary of changes — file names + lines added/removed",
          "git diff --name-only: just list changed files",
          "git diff --word-diff: highlight word-level changes inline",
          "git log --stat: each commit log entry shows file change summary",
          "git diff --color-words: color only the changed words",
        ],
        project:
          "Use --stat to review a branch diff at a high level before reading the full diff. Use --word-diff to compare two versions of a prompt template. Write a Git alias for your favorite diff command: git config --global alias.wdiff 'diff --word-diff'.",
        stack: ["Git"],
        resources: [],
      },
    ],
  },
  {
    id: "git-13",
    phaseNumber: 13,
    title: "Rewriting History",
    subtitle: "clean commits",
    accent: "#84CC16",
    bg: "#111a0a",
    nodes: [
      {
        id: "git-13-1",
        icon: "✏️",
        label: "Amending Commits",
        level: "intermediate",
        concept:
          "git commit --amend replaces the most recent commit with a new one — useful for fixing typos in the commit message or adding a file you forgot to stage. The commit hash changes. Only amend commits you haven't pushed yet — amending a pushed commit requires a force-push and breaks anyone who has already pulled that commit.",
        keyPoints: [
          "git commit --amend: edit the last commit message",
          "git commit --amend --no-edit: add staged changes to last commit without editing message",
          "git commit --amend changes the commit hash — it's a new commit",
          "Only amend local, unpushed commits — amending pushed commits causes problems",
          "git push --force-with-lease: safer force push (fails if someone else pushed)",
        ],
        project:
          "Make a commit with a typo in the message. Amend it. Then make a commit, realize you forgot to stage a file, stage it and amend again. Verify with git log that there's still only one commit with the correct message and all files included.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-13-2",
        icon: "🎨",
        label: "Interactive Rebase",
        level: "advanced",
        concept:
          "Interactive rebase lets you edit, reorder, squash, split, and delete any commits in a range. It's how you clean up messy WIP commit history before opening a PR. Commands: pick (keep), reword (edit message), edit (pause to modify), squash (merge into previous), fixup (squash without message), drop (delete).",
        keyPoints: [
          "git rebase -i HEAD~5: interactively edit the last 5 commits",
          "reword: change a commit message",
          "squash / fixup: combine with the commit above it",
          "drop: delete a commit and its changes entirely",
          "edit: pause rebase to amend a commit mid-replay",
        ],
        project:
          "Make 6 messy commits: some WIP, some 'fix', some good. Use git rebase -i to: squash the WIP commits, reword a vague message, and drop an accidental debug commit. End with 3 clean, descriptive commits. Run git log --oneline to verify.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-13-3",
        icon: "🚨",
        label: "Safe Force Push",
        level: "advanced",
        concept:
          "After rewriting history (rebase, amend), your branch's commits diverge from the remote — a normal push is rejected. Force-push overwrites the remote. --force is dangerous (overwrites others' work); --force-with-lease is safer (fails if the remote has new commits you haven't seen, preventing accidental overwrites). Only force-push your own feature branches, never main.",
        keyPoints: [
          "git push --force-with-lease: force push, but fail if remote has new commits",
          "Never force push to main/master — it rewrites shared history",
          "git push --force: dangerous — overwrites remote unconditionally",
          "Branch protection rules on GitHub: require PR reviews and disable force-push on main",
          "After force-push, teammates must: git fetch origin && git reset --hard origin/feature",
        ],
        project:
          "On a personal feature branch (not main): do an interactive rebase, then force-push with --force-with-lease. Observe the warning if you try --force-with-lease when the remote has been updated by a second clone. Enable branch protection on main in your repo settings.",
        stack: ["Git", "GitHub"],
        resources: [],
      },
    ],
  },
  {
    id: "git-14",
    phaseNumber: 14,
    title: "Tags & Releases",
    subtitle: "versioning",
    accent: "#D97706",
    bg: "#1f190a",
    nodes: [
      {
        id: "git-14-1",
        icon: "🏷️",
        label: "Tags & Semantic Versioning",
        level: "intermediate",
        concept:
          "Tags mark specific commits as significant — usually releases. Unlike branches, tags don't move when new commits are made. Lightweight tags are just a pointer; annotated tags have a message, tagger, and date. Semantic versioning (semver) is the standard: MAJOR.MINOR.PATCH — 1.0.0. Increment MAJOR for breaking changes, MINOR for new features, PATCH for bug fixes.",
        keyPoints: [
          "git tag v1.0.0: lightweight tag on current commit",
          "git tag -a v1.0.0 -m 'First stable release': annotated tag",
          "git tag: list all tags",
          "git push origin v1.0.0: push a specific tag to remote",
          "Semver: 1.0.0 → 1.0.1 (bugfix) → 1.1.0 (feature) → 2.0.0 (breaking change)",
        ],
        project:
          "Tag your agent project with semantic versions: v0.1.0 (initial working version), v0.2.0 (after adding a new tool), v0.2.1 (after fixing a bug). Push all tags. Check GitHub to see the tags appear. Practice listing, showing, and deleting tags.",
        stack: ["Git", "GitHub"],
        resources: [],
      },
      {
        id: "git-14-2",
        icon: "🚀",
        label: "GitHub Releases",
        level: "intermediate",
        concept:
          "GitHub Releases turn tags into installable packages with changelogs, binary attachments, and release notes. When you publish a release, GitHub automatically creates a .zip and .tar.gz of the source. You can attach additional assets: model weights, compiled binaries, datasets. Users can install specific versions: pip install git+https://github.com/user/repo@v1.0.0.",
        keyPoints: [
          "Draft release: prepare release notes before publishing",
          "Pre-release: mark as beta/alpha — users must opt in",
          "Release assets: attach files (binaries, weights, datasets) up to 2GB",
          "Auto-generated notes: GitHub can generate changelogs from merged PRs",
          "pip install package==1.0.0: users pin to a specific release",
        ],
        project:
          "Create a GitHub Release for v1.0.0 of your agent project: write a proper release description covering what's new, attach a requirements.txt as an asset, mark it as the latest release. Subscribe to another AI repo's releases to get notified of updates.",
        stack: ["GitHub"],
        resources: [],
      },
      {
        id: "git-14-3",
        icon: "📋",
        label: "Managing Tags",
        level: "intermediate",
        concept:
          "Tags need management: deleting wrong tags, moving a tag to the correct commit, listing tags filtered by pattern. For AI projects with frequent model releases, structured tag naming is important: v1.0.0-model-gpt4, v1.0.0-model-claude. Tags are commonly used as targets for CI/CD pipelines — pushing a tag triggers a production deployment.",
        keyPoints: [
          "git tag -d v1.0.0: delete a local tag",
          "git push origin --delete v1.0.0: delete a remote tag",
          "git tag -l 'v1.*': list tags matching a pattern",
          "Move tag: delete old, create new at correct commit",
          "CI trigger on tag: on: push: tags: ['v*'] — deploy only on version tags",
        ],
        project:
          "Set up tag-based deployment in GitHub Actions: create a workflow that triggers only on tags matching v*.*.* — runs tests and logs 'Deploying version ${{ github.ref_name }}'. Push a tag and verify the workflow runs. Push a non-tag commit and verify it doesn't run.",
        stack: ["Git", "GitHub Actions"],
        resources: [],
      },
    ],
  },
  {
    id: "git-15",
    phaseNumber: 15,
    title: "GitHub Projects",
    subtitle: "planning & tracking",
    accent: "#60A5FA",
    bg: "#0d1929",
    nodes: [
      {
        id: "git-15-1",
        icon: "📊",
        label: "Kanban Boards",
        level: "beginner",
        concept:
          "GitHub Projects is a built-in project management tool. Kanban boards visualize work in progress: Todo → In Progress → Done. Cards represent issues or pull requests — you can move them across columns as work progresses. For AI agent development: track feature experiments, evaluation tasks, integration work, and bug fixes on one board.",
        keyPoints: [
          "Project → New project → Board view: drag-and-drop Kanban",
          "Cards: linked to issues or standalone tasks",
          "Custom columns: add Review, Blocked, Testing columns for your workflow",
          "Automated status: when a PR is merged, its card auto-moves to Done",
          "Filtered views: see only your assigned issues or this sprint's tasks",
        ],
        project:
          "Create a GitHub Project board for your AI agent. Add columns: Backlog, This Sprint, In Progress, Review, Done. Add 10 realistic issues to Backlog. Move 3 to This Sprint. Assign them to yourself. Create a PR linked to one issue — watch it auto-move on merge.",
        stack: ["GitHub Projects"],
        resources: [],
      },
      {
        id: "git-15-2",
        icon: "🗓️",
        label: "Roadmaps & Task Tracking",
        level: "intermediate",
        concept:
          "GitHub's Roadmap view shows issues and milestones on a timeline — useful for planning releases over weeks or months. Tasks within issues let you break a large feature into checkable sub-items. Estimates and priority fields help teams manage scope. For AI projects, roadmaps visualize: evaluation benchmarks timeline, feature release schedule, and research experiments.",
        keyPoints: [
          "Roadmap view: Project → Layout → Roadmap — timeline view with start/end dates",
          "Milestones: group issues by release — track percentage complete",
          "Task lists in issues: - [ ] Sub-task one — renders as checkboxes",
          "Custom fields: add Priority (P0/P1/P2), Estimate (S/M/L), Sprint fields",
          "Group by: organize board by priority, milestone, or assignee",
        ],
        project:
          "Plan your AI agent v2.0 release: create a milestone, assign 8 issues to it, set a target date. Switch to Roadmap view and arrange the milestones on the timeline. Add Priority and Estimate custom fields to all issues. Share a filtered view showing only P0 issues.",
        stack: ["GitHub Projects"],
        resources: [],
      },
      {
        id: "git-15-3",
        icon: "🤖",
        label: "Project Automation",
        level: "intermediate",
        concept:
          "GitHub Projects can automate card movement based on events. When a PR is opened it moves to In Progress; when merged it moves to Done; when a review is requested it moves to Review. This eliminates manual board updates and keeps the board accurate without effort. Custom automations via GitHub Actions can add cards, set fields, and close issues automatically.",
        keyPoints: [
          "Built-in automation: Settings → Workflows → enable auto-move rules",
          "Item added: auto-set status to Todo when issue is added to project",
          "PR merged: auto-set status to Done and close linked issue",
          "GitHub Actions: use actions/github-script to modify project programmatically",
          "GraphQL API: GitHub Projects v2 is fully controllable via GraphQL",
        ],
        project:
          "Enable all built-in automations for your project board. Open a PR linked to an issue and watch the board update automatically. Write a GitHub Actions workflow that adds a 'needs triage' label to any new issue that has no label assigned.",
        stack: ["GitHub Projects", "GitHub Actions"],
        resources: [],
      },
    ],
  },
  {
    id: "git-16",
    phaseNumber: 16,
    title: "Team Collaboration",
    subtitle: "orgs & permissions",
    accent: "#7C3AED",
    bg: "#160d2a",
    nodes: [
      {
        id: "git-16-1",
        icon: "🏢",
        label: "Organizations & Teams",
        level: "intermediate",
        concept:
          "GitHub Organizations are accounts that multiple people share — used by companies, open-source projects, and research groups. Within an org, Teams group members with shared repo access. As an AI engineer at a company, you'll operate inside an org: your personal repos are under your username, work repos are under the company org.",
        keyPoints: [
          "Organization: shared account — repos owned by the org, not individuals",
          "Team: group of members with the same access level to repos",
          "Team maintainer: can add/remove team members without being an org owner",
          "@org/team: mention a whole team in issues and PRs",
          "CODEOWNERS: .github/CODEOWNERS — auto-request review from the right team",
        ],
        project:
          "Create a GitHub organization for your AI projects. Invite a collaborator. Create two teams: core-dev (write access) and reviewers (read access). Add CODEOWNERS to your agent repo so changes to agent.py require review from core-dev.",
        stack: ["GitHub"],
        resources: [],
      },
      {
        id: "git-16-2",
        icon: "🔑",
        label: "Permissions & Branch Protection",
        level: "intermediate",
        concept:
          "Permission levels control what members can do: Read (view), Triage (manage issues), Write (push code), Maintain (manage repo settings), Admin (full control). Branch protection rules enforce quality gates: require PRs before merging, require status checks to pass, require code owner review, prevent force-push to main. These rules are what make teams ship with confidence.",
        keyPoints: [
          "Repo permissions: Read / Triage / Write / Maintain / Admin",
          "Branch protection: Settings → Branches → Add branch protection rule",
          "Require PR reviews: N approvals before merge",
          "Require status checks: CI must pass before merge button activates",
          "Restrict who can push: only allow specific teams to push to main",
        ],
        project:
          "Configure branch protection on your main branch: require 1 PR review, require CI status checks to pass, prevent force-push, require linear history. Try to push directly to main — confirm it's rejected. Open a PR without a review — confirm merge is blocked.",
        stack: ["GitHub"],
        resources: [],
      },
      {
        id: "git-16-3",
        icon: "🤝",
        label: "Team Workflows",
        level: "intermediate",
        concept:
          "Effective team workflows combine all the tools: branching strategy, PR templates, required reviews, CI gates, and automated deployments. The GitHub Flow is simple and widely used: branch from main → commit → PR → review → CI → merge → auto-deploy. For AI teams, add stages for: model evaluation, prompt testing, and safety review before production.",
        keyPoints: [
          "GitHub Flow: main always deployable, short-lived feature branches, PR per feature",
          "PR template: .github/pull_request_template.md — structured PR descriptions",
          "Draft PR: open early for early feedback before the work is done",
          "Required reviewers: specific people or teams must approve certain file changes",
          "Auto-merge: enable auto-merge on a PR — it merges when all checks pass",
        ],
        project:
          "Set up the complete team workflow for your org's AI agent repo: PR template (description, test plan, checklist), CODEOWNERS for critical files, required reviews, CI status checks, and auto-merge enabled. Walk a feature from branch to merged PR following the full workflow.",
        stack: ["GitHub"],
        resources: [],
      },
    ],
  },
  {
    id: "git-17",
    phaseNumber: 17,
    title: "Git Hooks",
    subtitle: "automation",
    accent: "#10B981",
    bg: "#0a1f18",
    nodes: [
      {
        id: "git-17-1",
        icon: "🪝",
        label: "Client-Side Hooks",
        level: "intermediate",
        concept:
          "Git hooks are scripts that run automatically at specific points in Git's workflow. Client-side hooks run on your local machine: pre-commit (before the commit is made), commit-msg (validate the commit message), post-commit (after commit). They're stored in .git/hooks/ — not tracked by Git by default, so teams use tools like pre-commit or husky to share them.",
        keyPoints: [
          ".git/hooks/pre-commit: script that runs before every commit",
          "Exit code 0: hook passes; non-zero: commit is aborted",
          "pre-commit framework: pip install pre-commit — manage hooks as config",
          ".pre-commit-config.yaml: define which checks to run",
          "husky: Node.js hook manager — popular in JS projects",
        ],
        project:
          "Set up pre-commit hooks for your AI agent project: (1) run ruff linter and fail if there are errors, (2) run pytest and fail if any tests fail, (3) check that no .env files are staged. Test that a commit with lint errors is blocked.",
        stack: ["pre-commit", "Python", "Git"],
        resources: [
          { title: "pre-commit docs", url: "https://pre-commit.com/" },
        ],
      },
      {
        id: "git-17-2",
        icon: "🔒",
        label: "Pre-Commit & Commit-Msg Hooks",
        level: "intermediate",
        concept:
          "Pre-commit hooks enforce code quality before bad code enters the repo. Commit-msg hooks validate message format — useful for enforcing Conventional Commits (feat: add tool calling, fix: resolve context overflow). This enables automated changelogs and semantic versioning. For AI projects: pre-commit can run safety checks on prompt templates and validate API key patterns.",
        keyPoints: [
          "Conventional Commits: type(scope): description — feat, fix, docs, test, refactor",
          "commitizen: interactive CLI for writing conventional commits",
          "commit-msg hook: validate the commit message format with regex",
          "detect-secrets: pre-commit plugin that scans for API keys and credentials",
          "mypy in pre-commit: type-check Python before committing",
        ],
        project:
          "Add to your pre-commit config: detect-secrets (block commits with API keys), a commit-msg hook validating Conventional Commits format, and mypy type checking. Try committing a file with a fake API key — confirm it's blocked. Write 5 commits using Conventional Commits format.",
        stack: ["pre-commit", "commitizen", "Git"],
        resources: [],
      },
      {
        id: "git-17-3",
        icon: "🚀",
        label: "Pre-Push & Server Hooks",
        level: "advanced",
        concept:
          "Pre-push hooks run before git push — a last line of defense before code leaves your machine. Run the full test suite here to prevent pushing broken code. Server-side hooks run on the remote (GitHub, GitLab): pre-receive (before accepting push), update, post-receive. GitHub doesn't allow custom server hooks — use GitHub Actions instead. Self-hosted GitLab/Gitea allows full server hook control.",
        keyPoints: [
          "pre-push hook: run full test suite before pushing — blocks if tests fail",
          "PUSH_COMMAND env var in pre-push: see what's being pushed",
          "Server-side pre-receive: enforce org-wide policies (commit message format, no force-push)",
          "GitHub: no custom server hooks — use branch protection + GitHub Actions instead",
          "GitLab server hooks: set up at the server level for all repos",
        ],
        project:
          "Add a pre-push hook that runs pytest and blocks the push if any test fails. Test it by intentionally breaking a test and trying to push. Bypass with git push --no-verify (understand the escape hatch exists). Document in CONTRIBUTING.md why developers should never use --no-verify.",
        stack: ["Git", "pytest"],
        resources: [],
      },
    ],
  },
  {
    id: "git-18",
    phaseNumber: 18,
    title: "GitHub CLI",
    subtitle: "terminal-first github",
    accent: "#F43F5E",
    bg: "#1f0d12",
    nodes: [
      {
        id: "git-18-1",
        icon: "💻",
        label: "Installation & Repo Management",
        level: "intermediate",
        concept:
          "GitHub CLI (gh) brings GitHub into your terminal — create repos, PRs, issues, and releases without opening a browser. For AI engineers who live in the terminal, gh becomes a daily driver. It authenticates once via gh auth login and then all GitHub operations work from anywhere.",
        keyPoints: [
          "brew install gh / winget install GitHub.cli",
          "gh auth login: authenticate with GitHub",
          "gh repo create: create a new repo interactively or with flags",
          "gh repo clone user/repo: clone a repo (like git clone but shorter)",
          "gh repo view --web: open the current repo in your browser",
        ],
        project:
          "Install GitHub CLI. Authenticate. Create a new repo entirely from the terminal (gh repo create). Clone it, make commits, push. Use gh repo view to confirm the repo looks right on GitHub without opening a browser.",
        stack: ["GitHub CLI"],
        resources: [
          { title: "GitHub CLI Docs", url: "https://cli.github.com/manual/" },
        ],
      },
      {
        id: "git-18-2",
        icon: "🔀",
        label: "PR & Issue Management",
        level: "intermediate",
        concept:
          "gh lets you create, review, and merge PRs entirely from the terminal. For fast-moving AI projects where you're pushing multiple branches per day, this eliminates constant context-switching to the browser. gh pr checkout <number> checks out a PR's branch locally for testing.",
        keyPoints: [
          "gh pr create --title 'feat: add RAG tool' --body 'description'",
          "gh pr list: see all open PRs",
          "gh pr checkout 42: check out PR #42's branch locally",
          "gh pr review --approve / --request-changes",
          "gh pr merge --squash --delete-branch: merge and clean up",
        ],
        project:
          "Manage a complete PR lifecycle from the terminal: create a branch, push it, open a PR with gh pr create, add a review comment with gh pr review, merge with gh pr merge. Also create and close 3 issues entirely from the terminal using gh issue create and gh issue close.",
        stack: ["GitHub CLI"],
        resources: [],
      },
      {
        id: "git-18-3",
        icon: "⚡",
        label: "Automation Workflows",
        level: "advanced",
        concept:
          "GitHub CLI is scriptable — embed it in shell scripts and automation. Run workflows, manage secrets, query releases, and interact with GitHub Actions all from scripts. For AI engineers: automate experiment tracking (create an issue per experiment run), release new model versions (tag + create release with gh release create), or triage incoming issues.",
        keyPoints: [
          "gh workflow run workflow.yml: trigger a workflow from terminal",
          "gh workflow list: see all workflows in the repo",
          "gh secret set API_KEY: set a repository secret from terminal",
          "gh release create v1.0.0 --notes 'changelog': create a release",
          "gh api: make raw GitHub API calls from terminal",
        ],
        project:
          "Write a shell script that automates your release process: run tests, bump version in pyproject.toml, commit, tag, push, and create a GitHub release with gh release create — all with one command. Test it end-to-end.",
        stack: ["GitHub CLI", "bash", "Git"],
        resources: [],
      },
    ],
  },
  {
    id: "git-19",
    phaseNumber: 19,
    title: "GitHub Actions",
    subtitle: "must learn for AI engineers",
    accent: "#7F77DD",
    bg: "#12102a",
    nodes: [
      {
        id: "git-19-1",
        icon: "⚙️",
        label: "Workflows, Triggers & Runners",
        level: "intermediate",
        concept:
          "GitHub Actions automates software workflows. A workflow is a YAML file in .github/workflows/ that runs jobs when triggered. Triggers include: push, pull_request, schedule (cron), workflow_dispatch (manual), and release. Runners are the virtual machines that execute jobs — GitHub provides Ubuntu, Windows, and macOS runners. For AI engineers: automate model evaluation, prompt regression tests, and agent benchmark runs.",
        keyPoints: [
          "on: push: branches: [main] — trigger on push to main",
          "on: schedule: cron: '0 9 * * 1' — run every Monday at 9am",
          "on: workflow_dispatch: — add a manual 'Run workflow' button in GitHub UI",
          "jobs: run on GitHub-hosted runners or your own self-hosted runners",
          "uses: actions/checkout@v4 — check out your repo in the runner",
        ],
        project:
          "Create 3 workflows: (1) run linting on every PR, (2) run your full test suite on every push to main, (3) a weekly scheduled job that logs 'Weekly model evaluation running'. Trigger all 3 and verify they run correctly in GitHub Actions tab.",
        stack: ["GitHub Actions", "YAML"],
        resources: [
          { title: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" },
        ],
      },
      {
        id: "git-19-2",
        icon: "🔐",
        label: "Secrets, Env Vars & Artifacts",
        level: "intermediate",
        concept:
          "Secrets store sensitive values (API keys, deploy tokens) that workflows need without hardcoding them. Environment variables configure behavior per environment (dev/staging/prod). Artifacts save workflow outputs — test reports, built binaries, evaluation results — for download after the run. For AI engineers, store your OPENAI_API_KEY or ANTHROPIC_API_KEY as secrets and use artifacts to save model evaluation reports.",
        keyPoints: [
          "Settings → Secrets → Actions: add repo secrets",
          "${{ secrets.ANTHROPIC_API_KEY }}: access a secret in workflow YAML",
          "env: MY_VAR: value — set environment variable for a step",
          "actions/upload-artifact: save files from the workflow run",
          "actions/download-artifact: retrieve artifacts in later jobs",
        ],
        project:
          "Add a workflow that calls your AI agent API in tests using a real API key stored as a GitHub Secret. Save the test results as an artifact. Add the workflow to a PR — confirm the API key is not visible in logs (GitHub masks secrets automatically).",
        stack: ["GitHub Actions"],
        resources: [],
      },
      {
        id: "git-19-3",
        icon: "🤖",
        label: "AI Engineering Pipelines",
        level: "advanced",
        concept:
          "GitHub Actions transforms how AI engineers ship. Automated pipelines can: run prompt regression tests on every PR (catch prompt regressions before merge), run model evaluations on a schedule, build and push Docker images with your agent, deploy to production on tag push, and notify Slack when evaluation scores drop. This is CI/CD for AI systems.",
        keyPoints: [
          "Matrix strategy: test against multiple model versions in parallel",
          "Environment protection: require manual approval before prod deploy",
          "Reusable workflows: define once, call from multiple repos",
          "Concurrency: cancel in-progress runs when a new push comes in",
          "GitHub Actions cache: cache pip dependencies to speed up runs by 10x",
        ],
        project:
          "Build a complete AI agent CI/CD pipeline: (1) on PR — run prompt tests against 3 model versions using matrix strategy, (2) on merge to main — build Docker image, push to GHCR, (3) on version tag — deploy to Render with manual approval gate. End-to-end automated shipping.",
        stack: ["GitHub Actions", "Docker", "GHCR", "Render"],
        resources: [],
      },
    ],
  },
  {
    id: "git-20",
    phaseNumber: 20,
    title: "GitHub APIs",
    subtitle: "automation & integration",
    accent: "#2563EB",
    bg: "#0d1929",
    nodes: [
      {
        id: "git-20-1",
        icon: "🔌",
        label: "REST & GraphQL APIs",
        level: "advanced",
        concept:
          "GitHub exposes its entire platform via APIs. The REST API covers most operations; the GraphQL API is more efficient for complex queries (fetch repo + issues + PRs in one request). Both require authentication. For AI engineers: use GitHub APIs to build experiment tracking tools, auto-create issues from model evaluation results, or aggregate data across multiple repos.",
        keyPoints: [
          "REST: api.github.com/repos/{owner}/{repo}/issues — standard HTTP requests",
          "GraphQL: api.github.com/graphql — query exactly the fields you need",
          "PyGithub: pip install PyGithub — Python client for GitHub REST API",
          "Rate limits: 5000 requests/hour authenticated, 60 unauthenticated",
          "GitHub token: Settings → Developer Settings → Personal Access Tokens",
        ],
        project:
          "Using PyGithub, write a Python script that: lists all open issues in your agent repo, creates a new issue with a specific label, and adds a comment to an issue. Then write a GraphQL query that fetches repo stats (stars, forks, open issues) in a single request.",
        stack: ["PyGithub", "Python", "GitHub API"],
        resources: [
          { title: "GitHub REST API Docs", url: "https://docs.github.com/en/rest" },
        ],
      },
      {
        id: "git-20-2",
        icon: "🔑",
        label: "Authentication & Automation",
        level: "advanced",
        concept:
          "API authentication options: Personal Access Tokens (PAT) for individual use, GitHub Apps for production integrations (have their own identity, fine-grained permissions, installable on any repo). Fine-grained PATs specify exactly which repos and operations are allowed — better than classic tokens. For automation scripts that run in CI, use GITHUB_TOKEN (automatically provided in Actions).",
        keyPoints: [
          "GITHUB_TOKEN: automatically provided in GitHub Actions — no setup needed",
          "Fine-grained PAT: specify exact repo + permission scope",
          "GitHub App: production-grade, installable on orgs, has bot identity",
          "Authorization header: 'Authorization: Bearer <token>'",
          "Never commit tokens — use secrets or environment variables",
        ],
        project:
          "Write a GitHub Actions workflow that uses the automatic GITHUB_TOKEN to: comment on PRs with automated test results, add labels to issues based on content, and close stale issues (no activity in 30 days). This is real automation that saves hours of manual work.",
        stack: ["GitHub Actions", "GitHub API", "GITHUB_TOKEN"],
        resources: [],
      },
      {
        id: "git-20-3",
        icon: "🏭",
        label: "Repository Automation",
        level: "advanced",
        concept:
          "Combining GitHub API + GitHub Actions enables powerful repository automation: auto-assign reviewers based on changed files, sync issues to external project management tools, generate weekly summary reports, auto-close resolved issues, and update project boards. For AI teams: automate experiment tracking by creating GitHub issues from model evaluation runs.",
        keyPoints: [
          "actions/github-script: run JavaScript with full Octokit API access inside Actions",
          "octokit.issues.create(): create issues programmatically",
          "octokit.pulls.list(): query open PRs and act on them",
          "Scheduled automation: cron job that queries API and performs actions",
          "Webhook + serverless function: react to GitHub events in real-time",
        ],
        project:
          "Build an AI experiment tracker: every time your model evaluation workflow runs, automatically create a GitHub issue titled 'Eval run {date}' with the accuracy metrics as the body, add an 'experiment' label, and link it to a GitHub Project milestone.",
        stack: ["GitHub Actions", "actions/github-script", "GitHub API"],
        resources: [],
      },
    ],
  },
  {
    id: "git-21",
    phaseNumber: 21,
    title: "GitHub Developer Tools",
    subtitle: "webhooks & apps",
    accent: "#DC2626",
    bg: "#1f0d0d",
    nodes: [
      {
        id: "git-21-1",
        icon: "🪝",
        label: "Webhooks",
        level: "advanced",
        concept:
          "Webhooks send HTTP POST requests to your server when GitHub events occur: new push, PR opened, issue created, release published. Instead of polling the API every minute, GitHub calls you. Essential for real-time integrations: sync GitHub issues to your task tracker, trigger a deployment when a PR merges, notify a Slack channel of new comments.",
        keyPoints: [
          "Settings → Webhooks → Add webhook: register your server URL",
          "Events: choose which events trigger the webhook (push, PR, issue, release, all)",
          "Payload: JSON body with full event details sent to your URL",
          "Secret: validate webhook authenticity with HMAC-SHA256 signature",
          "Ngrok: expose local server for webhook development and testing",
        ],
        project:
          "Build a webhook receiver in FastAPI: listen for pull_request events, when a PR is opened log the PR title and author to a file. Use ngrok to expose your local server. Register it as a GitHub webhook. Open a PR and confirm your server receives the event.",
        stack: ["FastAPI", "ngrok", "GitHub Webhooks"],
        resources: [],
      },
      {
        id: "git-21-2",
        icon: "🤖",
        label: "GitHub Apps & OAuth Apps",
        level: "advanced",
        concept:
          "GitHub Apps are production integrations with their own identity (appear as 'YourApp[bot]'), fine-grained permissions, and installation across orgs. OAuth Apps act on behalf of a user. GitHub Apps are preferred for bots and automation. For AI engineers: build a GitHub App that automatically runs your agent evaluation when code changes and comments results on PRs.",
        keyPoints: [
          "GitHub App: bot identity, can be installed on any repo or org, JWT auth",
          "OAuth App: acts as a user, broader permissions, simpler to start",
          "Permissions: request only what you need — least privilege",
          "Installation token: short-lived token (1 hour) for API calls",
          "Octokit/app.js or PyGithub: libraries for building GitHub Apps",
        ],
        project:
          "Register a GitHub App that adds a label to new PRs based on which files changed (e.g. 'agent-code' if agent.py changes, 'prompts' if any .txt file changes). Install it on your repo. Open a PR and verify the bot correctly labels it.",
        stack: ["GitHub Apps", "Python", "FastAPI"],
        resources: [
          { title: "GitHub Apps Docs", url: "https://docs.github.com/en/apps" },
        ],
      },
      {
        id: "git-21-3",
        icon: "🔗",
        label: "Integrations",
        level: "advanced",
        concept:
          "The GitHub Marketplace offers thousands of pre-built integrations: CI/CD (CircleCI, Travis), code quality (Codecov, SonarCloud), security (Snyk, CodeQL), project management (Jira, Linear), and monitoring (Datadog). For AI projects: integrate an LLM-powered code review tool, connect to your experiment tracking system (W&B, MLflow), or set up automated security scanning.",
        keyPoints: [
          "GitHub Marketplace: pre-built apps for your repo",
          "CodeQL: free GitHub-native code scanning for security vulnerabilities",
          "Codecov: test coverage reports on every PR",
          "Dependabot: auto-creates PRs to update outdated dependencies",
          "Required status checks: integrations can block merges if their check fails",
        ],
        project:
          "Set up 3 integrations for your agent repo: (1) CodeQL security scanning, (2) Dependabot for automatic dependency updates, (3) Codecov for test coverage reporting. Confirm all 3 show up as status checks on your next PR. Review the first Dependabot PR it creates.",
        stack: ["GitHub Marketplace", "CodeQL", "Dependabot"],
        resources: [],
      },
    ],
  },
  {
    id: "git-22",
    phaseNumber: 22,
    title: "Advanced Git Topics",
    subtitle: "power tools",
    accent: "#059669",
    bg: "#0a1f18",
    nodes: [
      {
        id: "git-22-1",
        icon: "📜",
        label: "Reflog & Bisect",
        level: "advanced",
        concept:
          "Reflog records every movement of HEAD — your safety net for recovering from any mistake. git bisect does binary search through your commit history to find exactly which commit introduced a bug. You mark a commit as 'good' and one as 'bad'; bisect checks out commits in between, you test each, and Git narrows to the exact guilty commit. Essential for debugging regressions in AI agent behavior.",
        keyPoints: [
          "git reflog: complete history of HEAD positions — go back to any state",
          "git reflog expire --expire=90.days: prune old reflog entries",
          "git bisect start: begin binary search",
          "git bisect bad HEAD: mark current commit as broken",
          "git bisect good v1.0.0: mark old commit as working — bisect narrows to culprit",
        ],
        project:
          "Use git bisect to find which commit broke a test in your project: mark current HEAD as bad, mark a commit from 2 weeks ago as good. Run git bisect run pytest tests/test_agent.py to automate the search. Git will identify the exact commit that introduced the bug.",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-22-2",
        icon: "🌳",
        label: "Worktree & Attributes",
        level: "advanced",
        concept:
          "git worktree checks out multiple branches simultaneously into separate folders — without stashing or switching. Essential when you're running a long evaluation on main while fixing a bug on a feature branch. git attributes defines per-file rules: text normalization (line endings), diff drivers (use nbdiff for Jupyter notebooks), merge strategies, and LFS tracking patterns.",
        keyPoints: [
          "git worktree add ../repo-feature feature-branch: check out branch in separate folder",
          "git worktree list: show all active worktrees",
          "git worktree remove ../repo-feature: clean up when done",
          ".gitattributes: * text=auto (normalize line endings), *.ipynb diff=notebook",
          "merge=union: for files like AUTHORS where both sides should be kept",
        ],
        project:
          "Use git worktree to run a model evaluation on main while simultaneously fixing a bug on a feature branch. Add a .gitattributes file to your project: normalize line endings, set *.ipynb to use nbdiff, and configure *.pt and *.bin as binary (no text diffs).",
        stack: ["Git"],
        resources: [],
      },
      {
        id: "git-22-3",
        icon: "📦",
        label: "Git LFS & Patches",
        level: "advanced",
        concept:
          "Git LFS (Large File Storage) stores large files outside the Git repo — only a pointer stays in the repo. Critical for AI projects with model weights, datasets, and embeddings. Without LFS, a 5GB model weight committed to a repo means every clone downloads 5GB. git patch exports commits as .patch files — useful for sharing changes without a shared remote.",
        keyPoints: [
          "git lfs install: enable LFS globally",
          "git lfs track '*.pt': track PyTorch model files with LFS",
          ".gitattributes: LFS tracking rules are stored here",
          "git lfs pull: download actual LFS files (not downloaded on clone by default)",
          "git format-patch HEAD~3: export last 3 commits as .patch files",
        ],
        project:
          "Set up Git LFS for your AI project: track *.pt, *.bin, *.gguf, *.safetensors. Add a small model file, commit it, push it. Verify the .git folder doesn't contain the actual bytes (only a pointer). Clone the repo fresh and use git lfs pull to download the model. Export a patch of your last 5 commits and apply it to a fresh clone.",
        stack: ["Git LFS", "Git"],
        resources: [
          { title: "Git LFS Docs", url: "https://git-lfs.com/" },
        ],
      },
    ],
  },
];
