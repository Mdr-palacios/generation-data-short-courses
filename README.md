# Generation Data — Short Course Series Mockup

A draft landing page for the Generation Data short-course relaunch: three C3-ready trainings (Spreadsheet Power, Cybersecurity, and an Español track) with a shared application/payment flow section and a publishing-path explainer.

Status: **draft mockup, pending team approval** (see badge at the top of the page). No copy on the live page should be treated as final until the team signs off.

## What's here

- `index.html` — the entire site. One self-contained file (HTML + inline `<style>` + inline `<script>`), no build step, no dependencies besides a Fontshare CDN link for the General Sans / Satoshi type pairing.
- `assets/` — empty on purpose. The mockup is diagram/text-driven, so no images were needed yet. Drop any future photography, illustrations, or the final logo file here.

Sections in `index.html` (in page order), each with an anchor id used by the nav bar:

| Section | Anchor | Notes |
|---|---|---|
| Hero | `#top` | Draft badge, headline, two CTA buttons |
| Mockup overview | `#mockup-includes` | Stats + "built for accessibility/transfer" cards |
| Course 1 — Spreadsheet | `#spreadsheet` | Navy band |
| Course 2 — Cybersecurity | `#cybersecurity` | Slate band, includes the pill/step diagram |
| Course 3 — Español | `#espanol` | Teal band, `lang="es"` on the section, full Spanish copy |
| Application flow | `#application-flow` | 3-step numbered explainer for the future Airtable + payment flow |
| Publishing path | `#publishing-path` | GitHub Pages → Squarespace → custom domain cards |
| Footer | — | Logo, tagline, external link to generationdata.org |

## Running it locally

No build tools needed — it's static HTML.

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just double-click `index.html` to open it directly in a browser (all styles/scripts are inline, so this works too).

## Publishing on GitHub Pages

This repo is already wired for Pages:

1. Push to the `main` branch.
2. In the repo settings, **Pages** is set to deploy from `main` / root (`/`). No workflow file needed since there's no build step.
3. Your site will be live at `https://<your-username>.github.io/generation-data-short-courses/`.

To update the live site, edit `index.html` and push — Pages rebuilds automatically (usually within a minute).

## Where the placeholder links are

Every call-to-action button (Apply, Partner, Waitlist, Cohort, Solicitar, Traer) currently points to `#application-flow` (the on-page explainer section) instead of a real form. Each one has:

- An HTML comment directly above it, e.g. `<!-- TODO: replace href with the Airtable application form URL once registration opens -->`
- A `data-cta` attribute for quick lookup, e.g. `data-cta="apply-course-1"`

Search `index.html` for `TODO` or `data-cta` to find all of them. Current identifiers:

- `apply-course-1`, `partner-course-1` (Spreadsheet)
- `waitlist-course-2`, `cohort-course-2` (Cybersecurity)
- `info-course-3`, `cohort-course-3` (Español)

When registration opens, swap each `href="#application-flow"` for the matching Airtable form URL (and later a Squarespace/payment link once a checkout flow exists).

## Migrating to Squarespace later

The page was deliberately built as one HTML file with clearly separated, self-contained bands (`#spreadsheet`, `#cybersecurity`, `#espanol`, etc.) so the move to Squarespace is mostly copy-and-restyle rather than a rebuild:

1. **Header/nav** → Squarespace's built-in site header + navigation menu. Recreate the four nav links (Spreadsheet, Cybersecurity, Spanish, Apply) as menu items; the logo SVG can be uploaded as a site logo or embedded via a Code block.
2. **Hero (`#top`)** → a Squarespace "Cover Page" or full-width banner section. Copy the eyebrow, headline, subhead, and two buttons into Squarespace's native text/button blocks — no need to keep it as raw HTML.
3. **Mockup overview (`#mockup-includes`)** → a 3-up stat section + 3-up feature-card section. Both map directly to standard Squarespace grid/summary blocks.
4. **Each course band (`#spreadsheet`, `#cybersecurity`, `#espanol`)** → give each its own Squarespace page (or a page section) using: a colored banner block for the title bar, a two-column layout for the body copy + "Ideal audience / Accessibility choices" sidebar card, and bullet lists for "what participants practice" and "included takeaways." The Cybersecurity pill diagram can be rebuilt with Squarespace's native icon/step blocks, or kept as an embedded SVG/Code block if you want the exact look.
5. **Application flow (`#application-flow`)** → a 3-column "how it works" section, widely supported as a native Squarespace layout.
6. **Publishing path (`#publishing-path`)** → this section is only relevant while both platforms are in play; drop it once the site fully lives on Squarespace.
7. **Footer** → Squarespace's built-in footer, with the logo mark and the generationdata.org link.
8. **CTA buttons** → once you're on Squarespace, replace the placeholder `#application-flow` links with the live Airtable form and, later, the Squarespace/payment checkout URL — same TODO markers described above apply.

Because everything currently uses semantic HTML with plain CSS custom properties (no framework classes), the copy can be pasted straight into Squarespace's rich-text/code blocks and restyled with Squarespace's own design panel without fighting inherited styles.

## Accessibility notes

- Skip link to main content, visible focus states on all interactive elements.
- Light/dark mode toggle (in-memory only, no stored preference).
- The Cybersecurity pill diagram and the application-flow diagram both have `role="img"` + `aria-label` plus visible caption text, so the same information is available to screen reader and sighted users alike.
- `target="_blank" rel="noopener noreferrer"` on the external generationdata.org link.

## Source content

Copy is based on the user-provided mockup spec and the attached course plan PDF (instructors, pricing tiers, and course dates for the Aug 2026 cohort). Treat all pricing, dates, and instructor names as draft until the team confirms them.
