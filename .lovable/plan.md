## Goal
Get the project compiling and rendering the homepage with its existing stack (React + react-router-dom + Tailwind v3). No stack changes.

## Context
- Dependencies were just reinstalled and the Vite dev server is now up on port 8080 (last log: `VITE v5.4.21 ready in 474 ms`).
- The "SSR rendering failed" runtime error is a leftover from before the reinstall (it was caused by a stale TanStack Start plugin trying to load a non-existent `src/server.ts`). `vite.config.ts` is clean — only `@vitejs/plugin-react-swc`, no TanStack, no SSR.
- Stack confirmed correct: `react-router-dom@6`, `tailwindcss@3.4`, classic `postcss.config.js`, `@tailwind base/components/utilities` in `src/index.css`.

## Steps
1. Run `bun install` again only if `node_modules` is missing (already installed last turn; skip otherwise).
2. Tail dev-server logs to confirm Vite is still serving on :8080 with no errors.
3. Run a one-shot `tsc --noEmit` (via `bunx tsc -p tsconfig.json --noEmit`) to surface any compile errors in the existing code. Fix only blocking type errors if any appear — no refactors.
4. Open the preview at `/` and take a screenshot of the homepage to confirm `Index.tsx` renders (splash → hero → sections), and verify Tailwind classes are applied (gold accent, dark bg).
5. If the runtime-error overlay still shows "SSR rendering failed" after a hard reload, it's stale; confirm by checking the live console has no new errors.

## Out of scope
- No migration to TanStack Start or Tailwind v4.
- No visual redesign — only fix what blocks the page from rendering.
- No new features.
