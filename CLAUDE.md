# CLAUDE.md

> Project context for Claude Code. Keep this file short and current — it loads on every session and consumes tokens.

## What this is

Personal portfolio for **Aryan Singh Jadon** — Software Engineer at Capgemini. Cinematic intergalactic 3D experience built for recruiters and founders. Inspired by Bruno Simon (immersion only, not mechanics).

Live: _(set after deploy)_

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Three.js** via **@react-three/fiber** + **@react-three/drei**
- **Tailwind CSS** for utilities · **CSS variables** in `app/globals.css` for design tokens
- **Framer Motion** for reveal animations
- Deploys to **Vercel** with zero config

## File map

```
app/
  layout.tsx          → root layout, fonts, metadata
  page.tsx            → composes all sections in order
  globals.css         → design tokens, reusable classes (.holo-card, .btn, etc.)
components/
  Space.tsx           → R3F <Canvas> — fixed background, stars/nebula/planet/sats
  Preloader.tsx       → terminal boot sequence
  Hud.tsx             → top status bar + clock
  SideNav.tsx         → right-rail scroll-spy nav
  Terminal.tsx        → fake interactive shell (help/skills/projects/etc)
  Reveal.tsx          → IntersectionObserver-based fade-in wrapper
sections/
  Hero.tsx · Mission.tsx · Skills.tsx · Log.tsx · Missions.tsx · Contact.tsx
lib/
  data.ts             → SINGLE SOURCE OF TRUTH for content (projects, skills, metrics)
  icons.tsx           → inline SVG icons
```

## Source of truth

**All résumé content lives in `lib/data.ts`.** Never hardcode project/skill/metric strings in section components — import from `data.ts`. If a recruiter-facing fact is wrong, fix it there.

## Common tasks

| Want to... | Edit |
| --- | --- |
| Add/change a project | `lib/data.ts` → `projects` array |
| Update Capgemini metrics | `lib/data.ts` → `experience.impacts` and `achievements` |
| Change skills | `lib/data.ts` → `capabilities` array |
| Adjust 3D scene density | `components/Space.tsx` → `STAR_COUNT`, `NEB_COUNT`, `SAT_COUNT` constants |
| Add a new section | Create in `sections/`, import in `app/page.tsx`, add to `SideNav.tsx` |
| Change colors/fonts | `app/globals.css` `:root` block and `app/layout.tsx` (fonts) |
| Tweak preloader text | `components/Preloader.tsx` → `BOOT_LINES` |

## Conventions

- **Client components** are explicit with `"use client"` at top. Default to server components.
- **Three.js code stays inside `Space.tsx`.** Don't sprinkle R3F across components.
- **No post-processing** (`@react-three/postprocessing`). Keeps mid-range laptops smooth.
- **DPR capped** at 1.5 mobile / 2 desktop in `Space.tsx`.
- **prefers-reduced-motion** is honored — check it before adding new animations.
- **Numbers > adjectives** in copy. Recruiters scan metrics; that's the whole point.

## Don't

- Don't add a driving game / orbit controls / first-person nav. Bruno Simon's car is hostile to recruiters with 90 seconds.
- Don't add post-processing bloom — kills FPS on mid-range hardware.
- Don't replace the wireframe planet with a textured GLTF without measuring Lighthouse first.
- Don't break the design tokens (`--cyan`, `--bg-0`, etc.). Use them everywhere instead of raw hex.
- Don't add tracking / analytics without asking — privacy default.

## Performance budget

- Lighthouse Performance > 85 (mobile)
- Initial JS < 200 KB gzipped
- LCP < 2.5s on 4G
- Bundle analyze before merging anything that adds a heavy dep

## Deploy

```bash
# local
pnpm dev          # or npm run dev

# production
pnpm build && pnpm start

# Vercel — push to main, auto-deploys
```

## Contact data

Personal data lives in `lib/data.ts` → `profile`. If updating:
- email: `jadonaryansingh@gmail.com`
- phone: `+91 62657 35822`
- github: `https://github.com/Aryan-Jadon18`
- linkedin: `https://www.linkedin.com/in/aryan-j-4971ab1b7`
