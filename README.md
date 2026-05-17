# aj-portfolio

> Cinematic intergalactic 3D portfolio · Aryan Singh Jadon
> Software Engineer · Backend · Cloud · Gen-AI

Built with **Next.js 15 · React 19 · TypeScript · React Three Fiber · Tailwind CSS**.

---

## Quick start

Requires Node 20+. Use any package manager.

```bash
pnpm install        # or npm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
```

## Deploy to Vercel

```bash
# option A: CLI
npx vercel

# option B: GitHub
# push to GitHub, then "Import Project" in vercel.com dashboard
# zero-config — Vercel auto-detects Next.js
```

## Project structure

```
app/
  layout.tsx        root layout (fonts, metadata)
  page.tsx          composes all sections
  globals.css       design tokens + section styles
components/
  Space.tsx         React Three Fiber scene (stars/nebula/planet/sats)
  Preloader.tsx     terminal boot sequence
  Hud.tsx           top status bar + clock
  SideNav.tsx       scroll-spy side nav
  Terminal.tsx      interactive fake shell
  Reveal.tsx        IntersectionObserver fade-in wrapper
sections/
  Hero.tsx · Mission.tsx · Skills.tsx · Log.tsx · Missions.tsx · Contact.tsx
lib/
  data.ts           ⭐ SINGLE SOURCE OF TRUTH for content
  icons.tsx         inline SVG icons
CLAUDE.md           context for Claude Code (saves AI credits)
.claudeignore       files Claude Code shouldn't read
```

## Editing content

**All résumé/project data is in `lib/data.ts`.** Don't hardcode in sections.

```ts
// Add a project:
projects.push({
  id: "005",
  title: "My new thing",
  description: "...",
  status: "shipped",
  metrics: [{ value: "10×", label: "speed" }],
  stack: ["TypeScript"],
  tag: "AI",
});
```

## Performance

- DPR capped (1.5 mobile / 2 desktop)
- Particle counts reduced ~60% on mobile
- WebGL canvas is dynamic-imported with `ssr: false`
- No post-processing — keeps mid-range laptops smooth
- Honours `prefers-reduced-motion`

Lighthouse target: ≥ 85 Performance on mobile.

## Working with Claude Code

This repo includes `CLAUDE.md` and `.claudeignore` so future Claude sessions start with full context (and don't waste tokens reading lockfiles).

```bash
# at repo root
claude
# Claude will auto-read CLAUDE.md and respect .claudeignore
```

## License

Personal portfolio — content (résumé/projects/copy) is © Aryan Singh Jadon.
Code structure can be used as reference for your own portfolio.
