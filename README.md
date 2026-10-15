# Site template — fast, SEO-first local business sites

A reusable Astro template for small local-business sites (first instance: a
home hair salon in Brazil). Static output, no server, no framework islands,
plain CSS with design tokens, Netlify Forms, and SEO/structured data built in.

Everything specific to one client lives in exactly **four places**:

| What | File |
|---|---|
| Business facts (name, domain, NAP, hours, services, prices, schema type, social, form provider, floating WhatsApp button) | `src/config/site.ts` |
| All visible copy (headings, CTAs, form labels, legal text, per-page SEO text) | `src/content/copy.ts` |
| Theme (3 brand colors, type scale, spacing) + font files | `src/styles/tokens.css` + `src/styles/fonts.ts` |
| Photos + logo | `src/assets/brand/` and `src/assets/images/{hero,gallery,about,space}/` |

Everything else is derived from those: `astro.config.mjs` reads `siteUrl`
from `site.ts`; `robots.txt` and `site.webmanifest` are generated at build
time (`src/pages/robots.txt.ts`, `src/pages/site.webmanifest.ts`); and
`<meta name="theme-color">` + the manifest colors are read from
`--color-primary`/`--color-bg` in `tokens.css` by `src/lib/theme.ts` — so
the theme color can't drift, and the build fails if those tokens are
removed.

Components never contain a business name, phone number, price, color, or
visible string — they only read from the four places above. A grep check
(see "Verifying no hard-coded copy" below) confirms this holds.

## Status: placeholder data

This repo currently has **real business identity** (name, domain) but
**placeholder content** for anything the client hasn't provided yet: phone,
address, exact hours, service prices, testimonials, FAQ wording, logo, and
all photos. Every placeholder is marked `// TODO` in `site.ts`, or is a
generated solid/gradient `.jpg`/`.svg` in `src/assets/`. The site builds and
looks complete with these placeholders so nothing blocks development —
replace them before launch using the checklist below. `launched: false` in
`site.ts` keeps search engines out until then (noindex on every page,
`Disallow: /` in robots.txt).

## Decisions made without asking (documented here per the brief)

- **Fonts**: Outfit (headings) + Inter (body), self-hosted via `@fontsource`,
  Latin subset, only the weights actually used (Outfit 600; Inter 400/500)
  are imported and preloaded. All font imports live in `src/styles/fonts.ts`.
- **Placeholder palette**: warm terracotta primary, blush secondary, rose
  accent — generic enough to swap wholesale per client in `tokens.css`.
- **`trailingSlash: 'never'`** in `astro.config.mjs`, canonical URLs and the
  sitemap are consistent with that.
- **Netlify Forms** is the default form provider; Formspree is supported by
  flipping one config value (`form.provider`) — see below.
- **Home-based business privacy**: `address.showFullAddress` controls
  whether the street/number appear on public pages (footer, Location
  section, and the LocalBusiness JSON-LD's `streetAddress`). When `false`,
  only neighborhood/city/postal code are public, with copy explaining the
  full address is sent after booking. **This client agreed to show her
  address (it's on her Google listing), so it's `true`.** Default to
  `false` for other home-based clients until they confirm.
- **WhatsApp CTA placement**: the header holds only the logo + nav. The
  booking CTA is a floating button on every screen size (icon-only circle
  on mobile, pill with a visible label on desktop), plus the Hero CTA and
  per-service links. Toggle or move it with
  `ui.floatingWhatsApp: { enabled, position: "right" | "left" }` in
  `site.ts`; the footer and `scroll-padding-bottom` automatically reserve
  room for it (and reserve nothing when it's disabled).
- **www → apex redirect is configured in Netlify, not in code**: in the
  Netlify UI, Domain management → add both `example.com` and
  `www.example.com`, and set the apex as the **primary domain**. Netlify
  then 301-redirects `www` to it (with HTTPS). Nothing in `netlify.toml`
  references a domain.
- **Gallery/testimonials/FAQ ship with a few placeholder entries** rather
  than empty arrays, since these sections need *some* content to build/demo
  correctly. The **Testimonials** section is the one exception that
  auto-hides itself when `site.testimonials` is empty — useful once you
  delete the placeholders for a client with no reviews yet.
- **`copyLocale`** in `site.ts` is informational, not a runtime switch: this
  template builds one language per deployed site. To localize for an English
  client, duplicate the whole repo/template and replace `copy.ts` with
  English strings (same `SiteCopy` type catches any missing key at build
  time) — no i18n runtime is included or needed.
- **JSON-LD `logo`** currently reuses the OG placeholder image (no real
  raster logo yet); replace once a square/near-square brand logo exists.
- **No `aggregateRating`/review markup** is emitted for the business, per
  Google's guidance that self-served LocalBusiness reviews aren't eligible
  for rich results — reviews stay visible on the page only.

## New client checklist

1. **`src/config/site.ts`** — replace every value, especially everything
   marked `// TODO`: `siteUrl` (the domain — the only place it's set; the
   Astro config, sitemap, robots.txt, canonical URLs and JSON-LD all read
   it), `business.name`/`shortName` (also used for the web app manifest),
   NAP, hours, services/prices, about, testimonials, FAQ, social links,
   `schemaType` (e.g. `"RoofingContractor"`, `"Plumber"` for a US
   home-service client), and `copyLocale`. Decide:
   - `address.showFullAddress` — `false` for a home-based business that
     hasn't agreed to publish its street/number.
   - `ui.floatingWhatsApp` — `enabled: false` to hide the floating button,
     or `position: "left"` to move it.
2. **`src/content/copy.ts`** — rewrite the marketing copy (including
   `floatingWhatsapp.label`, the button's visible label/accessible name).
   For a non-pt-BR client, write it directly in the target language (there
   is one active copy file per deployed site — see the `copyLocale` note
   above).
3. **`src/styles/tokens.css`** — replace the 3 brand colors (and their
   `-contrast` pairs). `theme-color` and the manifest colors follow
   `--color-primary`/`--color-bg` automatically — nothing to sync by hand.
4. **Fonts** — if keeping Outfit/Inter, no change needed. To swap fonts,
   install the new `@fontsource/*` package(s), edit **only**
   `src/styles/fonts.ts` (CSS imports + the `?url` preload imports), and
   update `--font-heading`/`--font-body` in `tokens.css`.
5. **Images** — replace every file in `src/assets/brand/` and
   `src/assets/images/{hero,gallery,about,space}/`, keeping the filenames
   referenced in `site.ts.images` (or update those filenames too). Update
   every `alt` text in `site.ts.images` to describe the real photo.
   Regenerate `public/favicon.svg`, `public/favicon.ico`,
   `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`
   from the real logo (the SVG favicon has the brand color baked in).
6. **`netlify.toml`** — no per-client edits needed. Only adjust the CSP if
   you add a new third-party origin (e.g. a different map/analytics
   provider — there currently are none).
7. Run `npm run build` and `npx astro check` — both should be clean.
8. **Deploy**: push to GitHub, connect the repo in Netlify (build command
   `npm run build`, publish directory `dist` — already set in
   `netlify.toml`), then **in the Netlify UI**:
   - Domain management → add the apex domain and `www.` and set the
     **apex as primary domain**, so Netlify 301-redirects `www` → apex.
     (This used to be a `[[redirects]]` rule in `netlify.toml`; it now
     lives in the dashboard so the repo stays domain-free.)
   - Turn on email notifications for the `contato` form (Site
     configuration → Forms → Form notifications).

   Neither can be set from code.
9. **Go live: set `launched: true` in `site.ts`** and redeploy. Until then
   every page carries `<meta name="robots" content="noindex, nofollow">`
   and `/robots.txt` is `Disallow: /` with no `Sitemap:` line, so a
   placeholder build on the real domain can't be indexed. After the deploy,
   confirm `https://<domain>/robots.txt` shows `Allow: /` plus the
   `Sitemap:` line, and that the home page's robots meta is
   `index, follow`.
10. Submit the sitemap (`https://<domain>/sitemap-index.xml`) in Google
    Search Console, and set up/verify the Google Business Profile.

## Switching the form provider

Set `form.provider` in `site.ts` to `"formspree"` and fill in
`form.formspreeId`. `ContactForm.astro` switches the form's `action`,
honeypot field name, and hidden redirect field automatically — no component
changes needed. Both origins (`'self'` and `formspree.io`) are already
allowed in `netlify.toml`'s CSP `form-action` directive either way.

## Verifying no hard-coded copy

```sh
grep -rnoE '(alt|aria-label|placeholder|title)="[^{}"][^"]*"' src/components src/pages --include="*.astro"
```

Should return nothing. (Text nodes should likewise only ever be `{copy...}`
or `{site...}` expressions — a quick visual scan of any new component is
usually enough to catch a stray literal string.)

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Type-check `.astro`/`.ts` files (strict mode) |

## Project structure

```text
src/
  config/site.ts        # business data (the one source of truth)
  content/copy.ts        # all visible copy (typed SiteCopy)
  styles/tokens.css       # design tokens (colors, type scale, spacing...)
  styles/global.css       # reset, base styles, .container, .sr-only, skip link, floating-CTA clearance
  styles/fonts.ts         # @fontsource imports + woff2 preload URLs (the only file to edit for fonts)
  assets/brand/           # logo, favicon source, default OG image
  assets/images/{hero,gallery,about,space}/
  lib/
    fill.ts               # {token} interpolation for copy strings
    hours.ts              # business-hours formatting + schema.org hours
    whatsapp.ts            # wa.me link builder
    schema.ts              # JSON-LD (@graph) builder
    images.ts              # import.meta.glob → ImageMetadata resolver
    richtext.ts             # safe **bold**/paragraph parsing (no raw HTML)
    theme.ts               # reads --color-primary/--color-bg from tokens.css at build time
  components/
    SEO.astro, StructuredData.astro
    Header.astro, MobileMenu.astro, Footer.astro, FloatingWhatsApp.astro
    sections/{Hero,Services,Gallery,About,Testimonials,Location,FAQ,Contact}.astro
    ui/{Button,WhatsAppLink,MapFacade,ContactForm}.astro
  layouts/BaseLayout.astro
  pages/{index,obrigado,politica-de-privacidade,404}.astro
  pages/robots.txt.ts       # generated from site.siteUrl
  pages/site.webmanifest.ts # generated from site.ts + tokens.css colors
public/{favicon.svg,favicon.ico,apple-touch-icon.png,icon-192.png,icon-512.png}
netlify.toml
```
