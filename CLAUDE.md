# Studio Dé by Andréa Laporte — project notes

Client website for **Studio Dé by Andréa Laporte** (Andréa, known as "Deca"), a beauty studio run from her home in Santa Felicidade, Curitiba – PR. Her specialty and differential is **terapia capilar**.

- Stack: Astro (static output) + TypeScript + plain CSS with design tokens. No framework islands, no backend.
- Hosting: Netlify, deployed from GitHub. Forms: Netlify Forms.
- Domain: `studiodebyandrealaporte.com.br` ("andrea", not "deca") — **registered** at registro.br in Andréa's name on 2026-10-20, **expires 20/10/2027 (renew before then)**. Set as `siteUrl` in `site.ts`; connect it in Netlify only on launch day.
- Netlify: site deployed from GitHub (auto-deploys on push to `main`); `launched: true` since 2026-10-22, so the site is indexable (anamnese, obrigado and 404 stay noindex).
- This repo was created from my reusable template repo. Client-specific features (the anamnese page, `/minha-historia`) live **only here**, never in the template.

## Start of every session (do this first)

1. Read this file.
2. Run a search for `TODO` across `src/` and show me a short grouped list of what's still open, so I remember to fill it in.
3. Remind me if there are uncommitted changes (`git status`).

## End of every session

- Remind me to commit and push.
- Update the "Work log" and "Still to do" sections of this file with what changed.

## Rules (always follow)

- **Where things live:**
  - Business data → `src/config/site.ts`
  - All visitor-facing text → `src/content/copy.ts`
  - Colors, fonts, spacing → `src/styles/tokens.css` (font imports in `src/styles/fonts.ts`)
  - Photos/logo → `src/assets/`
  - No text, colors, or business data hard-coded in components or pages.
- **Language:** every visitor-facing text is in **Brazilian Portuguese** with correct accents: headings, buttons, labels, alt texts, meta titles/descriptions, form and error messages, JSON-LD descriptions. Only code, keys and comments may be in English.
- **Terapia capilar always comes first** (hero, services order, SEO title, about).
- **No health promises.** She is a hair therapist, not a doctor. Use "cuidado", "equilíbrio", "saúde do couro cabeludo", "avaliação", "protocolo personalizado". Never "cura", "tratamento de doenças", or guaranteed regrowth. No before/after scalp photos (they imply regrowth).
- **Don't invent facts.** Anything unknown stays a `// TODO`.
- **Accessibility:** WCAG 2.2 AA contrast; light brand colors are never used as text (use `--color-accent-text` for accent-colored text).
- **Performance/SEO:** keep Lighthouse mobile at 90+; one `<h1>` per page; JSON-LD must match the real data; name, address and phone identical everywhere (site, Google Business Profile, Instagram, WhatsApp Business).
- After changes, run `npm run build` and `npx astro check` (0 errors, 0 warnings).

## Business data (source of truth)

- Name: Studio Dé by Andréa Laporte · Short name: Studio Dé · Schema type: `BeautySalon`
- Address: Av. Francisco Gulin, 1579 – Casa 2, Santa Felicidade, Curitiba – PR, 82410-010 (`showFullAddress: true`)
- Coordinates: -25.3851078, -49.3387907
- Phone/WhatsApp: (41) 99976-3703 · +5541999763703
- Hours: seg–sex 08:00–20:00 · sáb–dom 09:00–18:00 · atendimento exclusivo com hora marcada
- Google Business Profile share link ("Como chegar"): https://share.google/k3QyXdKDiWl5m0CNh
- Price range: $$
- Services: two categories, **Terapia capilar** (11, with "Terapia Capilar Personalizada" featured, "Sob avaliação") then **Beleza** (9). Prices are in `site.ts`.

## Pages

- `/` — one-page site (hero, serviços, galeria, sobre, localização, FAQ, contato)
- `/minha-historia` — Andréa's full story, indexable, linked from About and footer
- `/ficha-de-anamnese` — hair questionnaire (Netlify form `ficha-de-anamnese`), noindex, not in sitemap or menu. Footer link toggled by `ui.showAnamneseInFooter` (currently off). Linked from the terapia capilar card ("Preencher anamnese").
- `/obrigado` (+ `?ficha=1` for the questionnaire), `/politica-de-privacidade`, `404`

## Work log

### 2026-10-15
- Filled real business data in `site.ts`; services data model now supports categories.
- New copy in `copy.ts`: SEO title/description, hero, services intro, About in Andréa's voice, FAQ (5 answered; payment and parking drafted but hidden until answered).
- Added `/minha-historia` and `/ficha-de-anamnese`. Only Part 1 (Seus dados) and Part 4 (Hábitos e cuidados) are required, plus consent. Phone fields: digits only, min 9. Errors show on blur.
- Privacy policy rewritten for LGPD, including health data (sensitive data, art. 11). Marked `TODO: revisar`.
- Map: now loads with the page (click-to-load removed), searches by business name so the pin lands on her listing. See "Pending decisions".
- Photos added (originals in `Downloads\Fotos deca`): bio, hero (hair-wash station), 6 gallery photos, all with pt-BR alt texts.
- Design/bug fixes: removed button borders, tidied footer, spacing under About heading, hours formatted "08:00 – 20:00", gallery pop-up centered, removed duplicate WhatsApp line in Contato.
- CSP was blocking inlined scripts in production; scripts are now separate files.
- Header/footer links use `/#section` so they work from other pages.
- Brand palette: purple (primary `#4a2270`, secondary `#ece3f7`, accent `#c4a3ec` with dark text, `--color-accent-text` `#6b3fa0`). Approved by Andréa on 2026-10-19.

### 2026-10-19
- Map decision: keeps loading with the page (lazy). Privacy policy: new "Mapa do Google Maps" section with link to Google's policy; "Cookies e rastreamento" corrected (the site itself sets none, only Google Maps may).
- `parseRichText` now also supports `[texto](https://…)` links (used in the privacy policy).
- Service descriptions replaced with Andréa's own texts (massagem, ozonoterapia, alta frequência, laser, LED, vacuoterapia, chaterapia, argiloterapia, sobrancelha com design). Added "Curso de Automaquiagem Personalizado" (R$ 200) to Beleza.
- Mobile: section vertical padding reduced from 6rem to 4rem via new `--space-section` token (6rem from 900px up).
- Parking FAQ answered ("Sim, há estacionamento gratuito."); payment FAQ removed (payment info won't be published). Brand colors approved by Andréa as they are.
- Real logo (Canva AI badge, stray accent over the "D" of ANDRÉA removed). Files in `src/assets/brand/`: `logo-original.png` (fixed source, white bg), `logo-badge.png` (transparent, used as JSON-LD `logo` and for her socials), `logo-symbol.png` (face/hair only). Header = symbol + "Studio Dé / by Andréa Laporte" as real text in `--color-logo` (#60479a, the logo's stroke color). New favicons/app icons (white symbol on primary) in `public/` (`favicon.svg` replaced by `favicon-96x96.png`), new share image `og-default.jpg` (badge on lavender).
- First deploy to Netlify (preview URL only; domain not bought yet, `launched` stays false).
- Removed the "Avaliações" (testimonials) section completely: component, copy, `Testimonial` type, section id and the menu/footer links (the link was showing even though the empty section was hidden). Reviews stay on her Google profile only.
- Mobile menu fix: tapping a link left the sticky header half-painted. Same-page links now wait for the drawer to close before scrolling; the closed drawer is `visibility: hidden` (links no longer tabbable off-screen) and uses `100dvh`; `html` has `scroll-padding-top: var(--header-height)` so sections don't land under the header.
- Instagram added (her only social). Closed as "won't add": public e-mail (contact is WhatsApp only; her e-mail is used only for Netlify form notifications), legal name (no registered company yet), certifications.

### 2026-10-20
- Domain registered: `studiodebyandrealaporte.com.br` (registro.br, Andréa's name, expires 20/10/2027). `siteUrl` updated in `site.ts`; canonical, sitemap, robots.txt, og:url/og:image, JSON-LD and the form `_next` URL all derive from it. Old `studiodebydecalaporte.com.br` references removed (the repo/package name `studiodebydecalaporte-site` is unchanged).
- Founding year set to 2024 (`foundingDate` in the JSON-LD).
- Privacy policy approved by Andréa as it is. "Última atualização" is now a fixed date (`copy.pages.privacy.updatedDate`, 2026-10-20) instead of the build date; change it whenever the policy text changes.
- Closed with Andréa: questionnaire required fields (parts 1 and 4 only) OK, logo OK as is, remaining service descriptions and the About text approved, photo consent confirmed for every gallery client. `images.space` was already gone from `site.ts`. Removed the stale og-image TODO (`og-default.jpg` is the final 1200×630 share image).
- Anamnese e-mail was hard to read (radio answers labelled by their option text, blank questions listed with no answer). Added a hidden field "Respostas da ficha", first in the form, filled by JS on submit: every question numbered and grouped by part, with its answer or "(sem resposta)". Strings in `copy.pages.anamnese.summary`. Tested on the preview: line breaks are kept. After building the summary, JS disables the individual fields, so the e-mail has only the summary (consent is its last block, as the LGPD record). Fields are re-enabled on `pageshow` (back button). Netlify's e-mail still listed every field it detected at build time (empty), so Netlify now registers a hidden copy of the form with only `form-name`, the summary and the honeypot; the visible form has no `data-netlify` and posts under the same form-name. The hidden copy must keep the same `action` (`/obrigado?ficha=1`), or Netlify shows its default English "Thank you" page. Trade-off: without JS the answers can't be sent, so a `<noscript>` notice (`copy.pages.anamnese.noScriptNotice`) points to WhatsApp.

### 2026-10-22
- SEO check of the built HTML before deploy. Found: Netlify 301s `/minha-historia` → `/minha-historia/` (folder output), so canonical, og:url and sitemap URLs (no slash, `trailingSlash: "never"`) pointed at redirects. Fixed with `build.format: "file"` in `astro.config.mjs` (pages now build as `minha-historia.html`, served at the clean URL) and `SEO.astro` strips `.html`/`index.html` from the canonical path. The same fix belongs in the template repo.
- Launch steps 3–5 confirmed done by Marina. Set `launched: true` (TODO removed; no TODOs left in `src/`). Local build checked: robots.txt allows all and points to the sitemap; home, `/minha-historia` and privacy policy are `index, follow`; anamnese, obrigado and 404 stay noindex; sitemap lists the 3 indexable pages.
- Gallery: replaced `penteado-coque-baixo.jpg` with `terapia-capilar-antes-e-depois.jpg`, a 1600×2000 (4:5) collage of a real client's crown, "Antes" on top and "Depois" below, labels in brand purple baked into the image. Both photos zoomed out to show the whole head at the same scale, centered on a `#ece3f7` (secondary lavender) background. Sources: `Downloads\Fotos deca\WhatsApp Image 2026-10-13 at 17.38.05 (1).jpeg` (antes) and `(2).jpeg` (depois). Alt text avoids any regrowth claim.

### 2026-10-23
- Beleza service "Corte Feminino" renamed to "Corte Terapêutico" (id `corte-terapeutico`). Description and price (R$ 120) unchanged.

## Decisions made

- **Before/after scalp photo (2026-10-22):** one real before/after collage is in the gallery, by Marina's decision, overriding the "no before/after scalp photos" rule for this image only. Check the client's photo consent covers it.

- **No public e-mail, no legal name, no certifications (2026-10-19):** WhatsApp is the only contact channel and the LGPD contact in the privacy policy. Revisit the legal name if she registers a company (MEI/CNPJ).
- **Service texts (2026-10-19):** Andréa's own descriptions stay as written, by Marina's decision, even where they make health claims.
- **Map (2026-10-19):** loads automatically with the page (no click-to-load), iframe has `loading="lazy"`, pt-BR title from `copy.ts`, `referrerpolicy="no-referrer-when-downgrade"` and a fixed 16/10 aspect ratio (no layout shift). The privacy policy has a "Mapa do Google Maps" section explaining Google may collect data and set cookies, linking to Google's privacy policy.

## Pending decisions

- None.

## Still to do (TODOs)

- Launch checklist steps 6 (verify live) to 9.

## Launch checklist (in order)

1. ~~All TODOs above resolved.~~ Done 2026-10-20.
2. ~~Map decision made and privacy policy matches it.~~ Done 2026-10-19.
3. ~~Deploy to Netlify and test on the preview URL.~~ Done 2026-10-22:
   - submit one test questionnaire and check `?ficha=1` survives the redirect (if not, the generic thank-you text shows, which is fine), and that the e-mail contains only "Respostas da ficha";
   - the embedded map loads;
   - all scripts work under the CSP (mobile menu, gallery, form validation);
   - PageSpeed Insights mobile 90+.
4. ~~In Netlify: form notifications **only to Andréa's email** (questionnaire has health data); plan to delete old submissions regularly.~~ Done 2026-10-22.
5. ~~Buy the domain at registro.br.~~ Done 2026-10-20 (`studiodebyandrealaporte.com.br`, in Andréa's name). ~~Connect it in Netlify (apex as primary, www redirects to it).~~ Done 2026-10-22.
6. ~~Set `launched: true` in `site.ts`~~ (done 2026-10-22), redeploy, check the live `robots.txt` and the home page robots meta.
7. Google Search Console: verify the domain, submit `sitemap-index.xml`, request indexing of the home page.
8. Only now: add the website link to her Google Business Profile, Instagram bio and WhatsApp Business profile.
9. Take "after" screenshots for the case study (compare with the "before" folder).