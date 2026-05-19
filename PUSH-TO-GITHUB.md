# PUSH TO YOUR GITHUB

Three steps. Do them in your terminal once you've unpacked the tarball.

## 1. Unpack the archive

```bash
tar -xzf aj-portfolio.tar.gz
cd aj-portfolio
```

The git repo is already initialised with a clean first commit on `main`. You can verify:

```bash
git log --oneline
# 068fcc9 feat: initial commit — Next.js 15 + R3F intergalactic portfolio
```

## 2. Create the repo on GitHub

Pick **one** of these:

### Option A — using GitHub CLI (fastest, recommended)
```bash
# install once: https://cli.github.com
gh auth login
gh repo create aj-portfolio --public --source=. --remote=origin --push
```
Done. That single command creates the repo on github.com under your account, wires up the remote, and pushes.

### Option B — manual (no CLI)
1. Go to https://github.com/new
2. Repository name: `aj-portfolio` (or whatever you like)
3. **Do not** initialise with README/gitignore/license — your local repo already has those
4. Click **Create repository**
5. Copy the repo URL (e.g. `https://github.com/Aryan-Jadon18/aj-portfolio.git`)
6. Back in your terminal:
   ```bash
   git remote add origin https://github.com/Aryan-Jadon18/aj-portfolio.git
   git push -u origin main
   ```

## 3. Deploy to Vercel

Once it's on GitHub:

```bash
# install once
npm i -g vercel
vercel              # link & deploy in one prompt
vercel --prod       # promote to production URL
```

Or via the dashboard:
1. https://vercel.com/new
2. Pick your `aj-portfolio` repo
3. Click **Deploy** — Vercel auto-detects Next.js. No config needed.

You'll have a live URL in about 60 seconds.

## 4. Local dev (sanity check before pushing, optional)

```bash
cd aj-portfolio
npm install         # or pnpm install
npm run dev         # http://localhost:3000
```

## Heads up

- The repo includes `CLAUDE.md` and `.claudeignore` — when you open Claude Code in this folder later, those files give it project context for free (no token spend re-discovering the structure).
- All résumé content lives in `lib/data.ts`. Edit there, not in section components.
- Don't commit `.env*` files. The `.gitignore` already covers them.
