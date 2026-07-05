# 🤝 Contributing to Insight

Thank you for your interest in contributing to **Insight**! We welcome contributions of all kinds — bug fixes, new features, documentation improvements, and more.

Please take a moment to read through this guide before opening a pull request.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Code Style](#code-style)

---

## 📜 Code of Conduct

By participating in this project, you agree to uphold our community standards:

- Be respectful and inclusive in all interactions
- Provide constructive feedback
- Focus on what's best for the project and community
- Assume good faith from other contributors

We reserve the right to remove comments, commits, or contributions that violate these standards.

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository via GitHub, then clone your fork
git clone https://github.com/<your-username>/insight-blog.git
cd insight-blog
```

### 2. Add the Upstream Remote

```bash
git remote add upstream https://github.com/AvishkaGihan/insight-blog.git
```

### 3. Set Up Your Environment

Follow the [Getting Started](./README.md#-getting-started) section in the README to configure your `.env` file and install dependencies.

### 4. Seed the Database

```bash
npm run seed
```

This gives you a working set of users, posts, and comments to develop against.

---

## 🔄 Development Workflow

1. **Sync** your fork before starting any work:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a branch** for your change (see [Branching Strategy](#branching-strategy) below).

3. **Make your changes.** Keep commits small and focused.

4. **Test** your changes manually against the running dev server.

5. **Push** your branch to your fork:
   ```bash
   git push origin <your-branch-name>
   ```

6. **Open a Pull Request** from your fork's branch into `main` on the upstream repo.

---

## 🌿 Branching Strategy

Use the following naming conventions for your branches:

| Prefix | Purpose | Example |
|---|---|---|
| `feat/` | A new feature | `feat/add-post-tags` |
| `fix/` | A bug fix | `fix/comment-like-count` |
| `docs/` | Documentation only changes | `docs/update-api-table` |
| `refactor/` | Code restructure, no behaviour change | `refactor/auth-middleware` |
| `style/` | Formatting, whitespace, linting | `style/prettier-pass` |
| `chore/` | Dependency updates, tooling | `chore/update-mongoose` |

---

## 💬 Commit Message Convention

We follow a simplified version of [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>

[optional body]

[optional footer(s)]
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `style`, `chore`, `test`

**Examples:**

```
feat(posts): add category filter to search page
fix(auth): resolve JWT cookie not being cleared on sign-out
docs(readme): add API endpoint table
chore(deps): upgrade mongoose to v8.5
```

Rules:
- Use **present tense** ("add feature" not "added feature")
- Use **imperative mood** ("move file" not "moves file")
- Keep the summary line under **72 characters**
- Reference issues in the footer: `Closes #42`

---

## 📬 Pull Request Process

1. **One PR per concern.** Don't bundle unrelated changes in a single PR.
2. **Fill in the PR template** completely — describe what the change does and why.
3. **Screenshot or screen-record** any UI changes and attach them to the PR description.
4. **Keep your branch up to date** with `upstream/main` before requesting review.
5. **Address review feedback** promptly. PRs with no activity for 14 days may be closed.
6. A PR can be merged once it has:
   - At least **1 approving review** from a maintainer
   - No unresolved review comments
   - A clean, descriptive commit history

---

## 🐛 Reporting Bugs

Before opening a bug report, please search existing [issues](https://github.com/AvishkaGihan/insight-blog/issues) to avoid duplicates.

When filing a new bug report, include:

1. **A clear, descriptive title**
2. **Steps to reproduce** the problem (be specific)
3. **Expected behaviour** — what you thought would happen
4. **Actual behaviour** — what actually happened
5. **Environment details:**
   - OS and version
   - Node.js version (`node -v`)
   - Browser and version
6. **Screenshots or error logs** if applicable

Use the label `bug` when creating the issue.

---

## 💡 Suggesting Features

Feature requests are welcome! Please open an issue and:

1. Use a clear, descriptive title beginning with `[Feature Request]`
2. Describe **the problem** you're trying to solve (not just the solution)
3. Describe **your proposed solution** in as much detail as possible
4. List any **alternatives** you've considered
5. Add the label `enhancement`

For large features, please open a discussion or issue first before spending time implementing — this allows maintainers to provide early feedback.

---

## 🎨 Code Style

### JavaScript / JSX

- We use **ES Modules** (`import`/`export`) throughout
- Prefer **arrow functions** for component definitions and callbacks
- Use **async/await** over `.then()` chains
- Keep components **small and focused** — if a component exceeds ~150 lines, consider splitting it

### CSS / Tailwind

- Use **Tailwind utility classes** for all styling in the frontend
- Avoid inline `style` props unless absolutely necessary
- Maintain consistency with the existing **design tokens** (amber accent colours, dark/light theme variables)

### API Routes

- Follow **RESTful conventions** for new endpoints
- Always return consistent JSON: `{ success: true, data: ... }` or `{ success: false, message: "..." }`
- Use the existing `errorHandler` utility for all error responses

---

Thank you again for contributing — your effort makes Insight better for everyone! 🎉
