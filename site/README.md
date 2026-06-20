# Harvasta — Landing Page

Production implementation of `Harvasta.dc.html` (Claude Design prototype), rebuilt as a
fast, static, dependency-free site optimized for Lighthouse.

## Run it

Any static server works, e.g.:

```bash
npx serve .          # then open the printed URL
# or
python -m http.server 8080
```

Open the page and run Lighthouse (Chrome DevTools → Lighthouse → Mobile → Analyze).

## Structure

```
index.html              # all markup + critical CSS inlined (no render-blocking CSS)
assets/js/main.js        # ~2 KB, deferred — loader, nav, scroll-reveal, video hook
assets/img/*.webp        # optimized, responsive images (hero has 768/1280/1920 widths)
assets/fonts/*.woff2     # self-hosted Latin subsets (Instrument Serif, Inter Tight, DM Mono)
optimize.js              # the sharp script used to generate the images (needs `npm i sharp`)
```

## Performance choices

- **LCP** — hero is a real `<img>` with `srcset`/`sizes`, `fetchpriority="high"`, and a
  `<link rel="preload">`. WebP keeps the 1280w hero ~156 KB.
- **No render-blocking** — all CSS is inlined in `<head>`; JS is `defer`-loaded.
- **Fonts** — self-hosted woff2 (no third-party round-trip), `font-display: swap`, the two
  above-the-fold families preloaded.
- **CLS** — every image has explicit `width`/`height`; reveal animations use only
  `transform`/`opacity`.
- **Icons** — inlined as static SVG (no icon-loader script, no custom-element hydration).
- **Below-the-fold images** — `loading="lazy"` + `decoding="async"`.
- **Reduced motion** — all animations (incl. loader) collapse under
  `prefers-reduced-motion`.

## Notes

- The video play button is a working, accessible button but has no media wired up yet —
  attach a real `<video>` or embed in `main.js` where marked.
- Small uppercase eyebrow labels use the prototype's low-opacity ink color; if a perfect
  Lighthouse **Accessibility** score matters, bump their contrast (they're design-faithful
  as-is).
