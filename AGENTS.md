# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React + TypeScript portfolio site.

- `src/` holds all app code (`App.tsx`, route wiring in `main.tsx`).
- `src/components/`, `src/shared/`, and `src/data/` contain UI pieces and data models.
- `src/assets/` contains local images and SVGs; `public/` is for static files served as-is.
- `dist/` is the build output (generated).

## Build, Test, and Development Commands

Use npm scripts for local work:

- `npm run dev` starts the Vite dev server.
- `npm run build` runs TypeScript compile + production build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint across the repo.

Deployment helpers (AWS):

- `make build` builds the site.
- `make deploy` builds, clears S3, uploads `dist/`, and invalidates CloudFront.

## Coding Style & Naming Conventions

- TypeScript + React with functional components.
- Formatting: Prettier with `prettier-plugin-tailwindcss` (see `.prettierrc`), 2-space indentation.
- Linting: ESLint with `typescript-eslint`, `react-hooks`, and `react-refresh` (`eslint.config.js`).
- Naming: PascalCase for components (`HeroSection.tsx`), camelCase for variables/functions.

## Testing Guidelines

No automated test framework is configured. Validate changes with:

- `npm run lint`
- `npm run build`
- Manual UI check via `npm run dev` or `npm run preview`

## Commit & Pull Request Guidelines

Recent history mostly follows Conventional Commits (e.g., `feat:`, `chore:`) with a few legacy-style messages. Prefer Conventional Commits for new work.
PRs should include:

- A short summary of changes.
- Screenshots or screen recordings for UI updates.
- Notes on any manual checks performed.

## Security & Configuration Tips

- AWS deploy uses `AWS_PROFILE`, `AWS_REGION`, and `S3_BUCKET` from `Makefile`.
- Never commit credentials; rely on local AWS config and profiles.
