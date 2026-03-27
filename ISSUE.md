# Bug: Starlight base CSS leaks from `/docs` into `/` in Astro preview

## Summary

This repro uses Starlight only for `/docs/`, but the home page `/` still gets a shared Starlight stylesheet in preview mode.

## Environment

- Astro `6.1.0`
- `@astrojs/starlight` `0.38.2`
- `@astrojs/cloudflare` `13.1.4`
- Tailwind CSS v4 with `@tailwindcss/vite`

## Reproduction

1. `bun install`
2. `bun run build`
3. `bun run preview`
4. Open `http://127.0.0.1:4321/`
5. Open `http://127.0.0.1:4321/docs/`

## Expected

Only `/docs/` should load Starlight base/reset CSS.

## Actual

`/` also loads the same Starlight stylesheet used by docs:

- `/` loads `/_astro/index@_@astro.EnuQFs_q.css`
- `/docs/` also loads `/_astro/index@_@astro.EnuQFs_q.css`

That file contains `@layer starlight.base`, including the Starlight CSS variables and reset/base rules.

## Minimal Trigger

The smallest trigger isolated in this repro is the shared header importing:

```astro
import { getRelativeLocaleUrl } from 'astro:i18n'
```

If that import is removed and replaced with a local URL helper, `/` stops receiving the shared Starlight stylesheet.
