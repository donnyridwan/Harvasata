# Harvasta

Landing page for **Harvasta** — a cold-spring luxury cottage — built from a Claude Design
prototype and rebuilt as a fast, static, **dependency-free** website tuned for Lighthouse and
ready to deploy on Vercel.

## Deploy to Vercel

The static site lives at the **repository root**, so no extra configuration is needed.

1. Push to GitHub (already done).
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import this repo.
3. Framework Preset: **Other**. Build Command: *(empty)*. Output Directory: *(leave default)*.
4. Deploy.

Vercel serves `index.html` and `assets/` directly. [`vercel.json`](vercel.json) adds long-lived
cache headers for fonts/images/JS (Lighthouse "efficient cache policy") plus basic security
headers, and [`.vercelignore`](.vercelignore) keeps the raw design bundle out of the deployment.

Or with the CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

## Run locally

```bash
npx serve .        # or: python -m http.server 8080
```

Then run Lighthouse (Chrome DevTools → Lighthouse → Mobile → Analyze).

## Repository layout

```
index.html       Production landing page (markup + critical CSS inlined)
assets/js/        ~2 KB deferred script (loader, nav, scroll-reveal, video hook)
assets/img/       Optimized responsive WebP images (+ hero JPG fallback)
assets/fonts/     Self-hosted Latin woff2 subsets (Instrument Serif, Inter Tight, DM Mono)
vercel.json       Cache + security headers
optimize.js       The sharp script used to regenerate images (dev only — `npm i sharp`)
harvasta/         Original Claude Design handoff bundle (prototype + raw assets, not deployed)
```

## Performance choices

- **LCP** — hero is a real `<img>` with `srcset`/`sizes`, `fetchpriority="high"`, and a
  `preload` hint; WebP keeps the 1280w hero ~156 KB.
- **No render-blocking** — all CSS inlined in `<head>`; JS is `defer`-loaded.
- **Fonts** — self-hosted woff2 (no third-party round-trip), `font-display: swap`, the two
  above-the-fold families preloaded.
- **CLS** — every image has explicit `width`/`height`; reveal animations use only
  `transform`/`opacity`.
- **Icons** — inlined as static SVG (no icon-loader script).
- **Caching** — immutable headers on hashed-stable static assets via `vercel.json`.
- **Reduced motion** — all animations (incl. loader) collapse under `prefers-reduced-motion`.

## Notes

- The video play button is accessible but has no media wired up yet — attach a real `<video>`
  or embed in `assets/js/main.js` where marked.
