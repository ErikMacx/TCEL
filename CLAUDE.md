# TCEL / Eric McLean site

This repo is the **only** TCEL workspace. It is unrelated to any other site
(pentagonphysics.com in particular). Do not pull context from, or touch, other
projects when working here.

## Who

Eric McLean (TCEL, The Consultancy Execution Leader) is a senior strategy and
transformation consultant for the CEOs of complex, multi-business groups in the
Gulf and EMEA. Voice on the site is "we". Buyer is the group CEO.

## Goal

The single most important goal is **findability by AI answer engines** (ChatGPT,
Claude, Perplexity, Gemini, Google AI Overviews). Every choice serves clean
server-rendered HTML, answer-first content, structured data, and a crawlable,
well-mapped site.

## Stack

- **Astro**, static output. `@astrojs/sitemap`. `site: 'https://www.tcel.com'`.
- Host: **Cloudflare Pages** (auto-deploy on push). Build `npm run build`, output `dist`.
- Repo: **github.com/erikmacx** (private).
- Domain: **tcel.com**, registered at Namecheap.

## Standards (do not break)

- **No em dashes anywhere.** Use commas, colons or full stops.
- **Answer-first content**: the direct answer in the first 60 to 120 words,
  self-contained sections, questions as headings.
- **Accessibility pattern**: content is visible by default. Fade-in animations are
  gated behind `@media (prefers-reduced-motion: no-preference)` and an `html.js`
  class, so reduced motion or a script failure can never hide content. Keep exactly.
- Colour tokens in `:root` and fonts (Fraunces, Hanken Grotesk, IBM Plex Mono) are
  fixed. Do not redesign or rewrite copy without being asked.

## Design source of truth

The locked design and copy live in the root `index.html` and `insights.html`
(kept for reference during the port; to be removed once parity is confirmed).
The Astro pages must match them.

## Open items to confirm

Headshot (into `public/assets/`), contact email (`eric@tcel.com` is a guess),
Cal.com booking URL, header direction, and the Cyprus location/phone in the
footer (Eric has since moved). Placeholders are marked with `TODO(...)` and
collected in `src/consts.ts`.
