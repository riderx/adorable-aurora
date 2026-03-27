# Astro 6 + Starlight CSS Leak Repro

Minimal reproduction for a preview-mode leak where Starlight base/reset CSS is attached to `/` even though Starlight only serves `/docs/`.

## Stack

- Astro `6.1.0`
- `@astrojs/starlight` `0.38.2`
- `@astrojs/cloudflare` `13.1.4`
- Tailwind CSS v4 via `@tailwindcss/vite`

## Repro

```bash
bun install
bun run build
bun run preview
```

Then open:

- `http://127.0.0.1:4321/`
- `http://127.0.0.1:4321/docs/`

## Expected

- `/` should only load the website stylesheet.
- `/docs/` should load the Starlight styles.

## Actual

- `/` also loads the shared Starlight stylesheet.
- In the current build, `/` includes both:
  - `/_astro/index@_@astro.CY5fRZ19.css`
  - `/_astro/index@_@astro.EnuQFs_q.css`
- `/docs/` includes:
  - `/_astro/index@_@astro.EnuQFs_q.css`
  - `/_astro/print.ehPL0gv-.css`

`index@_@astro.EnuQFs_q.css` contains the Starlight base layer (`@layer starlight.base`), so it is leaking onto the non-doc page.

## Minimal Trigger In This Repro

The shared website layout imports `src/components/Header.astro`, and that header imports:

```astro
import { getRelativeLocaleUrl } from 'astro:i18n'
```

Replacing that with a local helper makes the shared Starlight CSS stop appearing on `/`.
