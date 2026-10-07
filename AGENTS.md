# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single frontend app: a personal portfolio website ("Aiden Hua")
built with Vite 6 + React 19 + TypeScript + Tailwind CSS v4. There is no backend
service to run despite `express`/`dotenv`/`@google/genai` appearing in
`package.json` — they are unused by the app itself.

Standard commands (see `package.json` scripts):
- Dev server: `npm run dev` — serves on `http://localhost:3000` (bound to `0.0.0.0`).
- Lint / typecheck: `npm run lint` (runs `tsc --noEmit`).
- Build: `npm run build` (Vite production build into `dist/`).
- Preview built output: `npm run preview`.

Non-obvious notes:
- The GitHub contribution calendar (`src/components/SnakeCalendar.tsx`) fetches
  live data from `github-contributions-api.jogruber.de` at runtime, and
  `src/index.css` imports web fonts from Google Fonts / jsDelivr. These need
  outbound network access; without it the calendar shows an error and fonts
  fall back, but the rest of the page still renders.
- A `/favicon.ico` 404 in the browser console is expected — no favicon is
  defined in `index.html`. It is harmless.
- `GEMINI_API_KEY` is wired into `vite.config.ts` via `define` but is not
  referenced by app code, so no secret is required to run or build.
