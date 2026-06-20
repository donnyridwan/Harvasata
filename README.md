# Harvasta

Landing page for **Harvasta** — a cold-spring luxury cottage — built from a Claude Design
prototype and rebuilt as a fast, static, dependency-free website tuned for Lighthouse.

## Live site

The production site lives in [`site/`](site/). See [`site/README.md`](site/README.md) for how
to run it and the full list of performance optimizations.

```bash
cd site
npx serve .        # or: python -m http.server 8080
```

## Repository layout

```
site/        Production landing page (static HTML/CSS/JS, optimized images, self-hosted fonts)
harvasta/    Original Claude Design handoff bundle (the source prototype + raw assets)
```
