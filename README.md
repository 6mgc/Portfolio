# Megan Cheng: Portfolio

A static site built with [Astro](https://astro.build) with Manrope (headings) and Inter (body text), served from the site's own files rather than Google Fonts.

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

- [ ] **Confirm the remaining numbers** in `src/data/metrics.ts` (+67% omni-channel, +30% PDP view rate).
      $540K and the 26.61% conversion rate are confirmed. Set `verified: true` and fill in `source`.
      In dev, unverified numbers show a dashed orange outline.
- [ ] Headshot, annotated before/after screenshots.
- [ ] Case study copy: sections in grey dashed boxes (research, team, rationale, testing, summary).
- [ ] Domain: set `site` in `astro.config.mjs` to the live address.

## Password-protected case study

The Canadian Tire case study is encrypted at build time by `scripts/protect.mjs` (AES-256-GCM, key
derived from the password with PBKDF2). The published HTML holds only the encrypted content and an
unlock form, so the text can't be read without the password. Images are separate files and aren't
encrypted.

- Set the password as the `CASE_STUDY_PASSWORD` environment variable. On Vercel: Project → Settings →
  Environment Variables, then redeploy. To change the password, change the variable and redeploy.
- If the variable is missing, the build still succeeds but the page ships locked with no content.
- Locally: `CASE_STUDY_PASSWORD=yourpassword npm run build`.
- Once unlocked, the page stays open for the rest of that browser tab's session.

## Deploy

Any static host works. Build command `npm run build`, output directory `dist`.

- **Cloudflare Pages**: free, fast, and includes DNS. The recommended choice if the domain is also bought there.
- **Vercel / Netlify**: import the GitHub repo; Astro is auto-detected.

Then add the custom domain in the host's dashboard and point DNS at it as instructed.
