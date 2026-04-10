# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Type-check with tsc --noEmit
npm run clean    # Remove dist/
```

## Environment

Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` for Gemini AI features.

## Architecture

GitHub-profile-inspired personal website for Aiden Hua. React 19 + Vite 6 + TypeScript + Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`).

**Layout** (`src/App.tsx`): Fixed dark top bar → `max-w-7xl` container with `Sidebar` (left) + main column (right). The main column has `Navigation` tabs on top, then `<Routes>` below.

**Routing** (react-router-dom v7):
- `/` → `Overview` — contribution graph + recent activity + pinned projects
- `/about` → `About`
- `/experiences` → `Experiences`
- `/photos` → `Photos`
- `/project/:id` → `ProjectDetail` — reads `id` param, looks up in `PROJECTS`

**Data** (`src/constants.ts`): All site content (`PROJECTS`, `ACTIVITIES`, `EXPERIENCES`) lives here as static arrays. Types are in `src/types.ts`. To add/edit projects, experiences, or activity — edit `constants.ts`.

**Path alias**: `@` resolves to the project root (e.g. `@/src/types`).

**Styling**: Tailwind utility classes only. `src/lib/utils.ts` exports a `cn()` helper (clsx + tailwind-merge) for conditional class merging.
