# Megan Cheng: Portfolio

A static site built with [Astro](https://astro.build) and the Space Grotesk font, served from the site's own files rather than Google Fonts.

## Run it

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs static files to dist/
npm run check:launch # fails until every item in the brief's must-fix list is done
```

Requires Node 22.12+.

## Where things live

| What | File |
| --- | --- |
| Every metric / number on the site | `src/data/metrics.ts` |
| Name, email, LinkedIn, résumé link, nav | `src/data/site.ts` |
| Colours, type, frame lines | `src/styles/global.css` |
| Homepage | `src/pages/index.astro` |
| Canadian Tire case study | `src/pages/work/canadian-tire.astro` |
| About / AI Playground | `src/pages/about.astro`, `src/pages/playground.astro` |

Images go in `public/` (e.g. `public/work/ct-hero.png`) and replace the `<Placeholder>` components.

## Before launch

`npm run check:launch` lists what's still open. It covers:

- [ ] **Reconcile numbers** in `src/data/metrics.ts` against source data: $540K vs. $177K + $366K = $543K,
      and whether 26.61% is a relative *lift*. Set `verified: true` and fill in `source`.
      In dev, unverified numbers show a dashed orange outline.
- [ ] Headshot, annotated before/after screenshots.
- [ ] Case study copy: sections in grey dashed boxes (research, team, rationale, testing, summary).
- [ ] Résumé PDF: drop it in `public/` and set `resume` in `src/data/site.ts`.
- [ ] Domain: set `site` in `astro.config.mjs`.

## Deploy

Any static host works. Build command `npm run build`, output directory `dist`.

- **Cloudflare Pages**: free, fast, and includes DNS. The recommended choice if the domain is also bought there.
- **Vercel / Netlify**: import the GitHub repo; Astro is auto-detected.

Then add the custom domain in the host's dashboard and point DNS at it as instructed.
