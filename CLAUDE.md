# Studio Dé by Andréa Laporte — project notes

Client website for **Studio Dé by Andréa Laporte** (Andréa, known as "Deca"), a beauty studio run from her home in Santa Felicidade, Curitiba – PR. Her specialty and differential is **terapia capilar**.

- Stack: Astro (static output) + TypeScript + plain CSS with design tokens. No framework islands, no backend.
- Hosting: Netlify, deployed from GitHub. Forms: Netlify Forms.
- Domain: `studiodebydecalaporte.com.br` (registered at registro.br in Andréa's name; connect it only on launch day).
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
- Services: two categories, **Terapia capilar** (11, with "Terapia Capilar Personalizada" featured, "Sob avaliação") then **Beleza** (8). Prices are in `site.ts`.

## Pages

- `/` — one-page site (hero, serviços, galeria, sobre, avaliações, localização, FAQ, contato)
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
- Brand palette: purple (primary `#4a2270`, secondary `#ece3f7`, accent `#c4a3ec` with dark text, `--color-accent-text` `#6b3fa0`). Final colors still to confirm with Andréa.

### 2026-10-19
- Map decision: keeps loading with the page (lazy). Privacy policy: new "Mapa do Google Maps" section with link to Google's policy; "Cookies e rastreamento" corrected (the site itself sets none, only Google Maps may).
- `parseRichText` now also supports `[texto](https://…)` links (used in the privacy policy).
- Service descriptions replaced with Andréa's own texts (massagem, ozonoterapia, alta frequência, laser, LED, vacuoterapia, chaterapia, argiloterapia, sobrancelha com design). Added "Curso de Automaquiagem Personalizado" (R$ 200) to Beleza.
- Mobile: section vertical padding reduced from 6rem to 4rem via new `--space-section` token (6rem from 900px up).

## Decisions made

- **Map (2026-10-19):** loads automatically with the page (no click-to-load), iframe has `loading="lazy"`, pt-BR title from `copy.ts`, `referrerpolicy="no-referrer-when-downgrade"` and a fixed 16/10 aspect ratio (no layout shift). The privacy policy has a "Mapa do Google Maps" section explaining Google may collect data and set cookies, linking to Google's privacy policy.

## Pending decisions

- **Questionnaire required fields:** confirm with Andréa that only parts 1 and 4 being required is OK (her original Google Form required almost everything).

## Still to do (TODOs)

- **Contact:** email (also add it to the privacy policy), Instagram and other social links, Google Business Profile URL in `sameAs`.
- **Practical info:** payment methods, parking (their FAQ answers stay hidden until filled), founding year, legal name, certifications/courses.
- **Content:** testimonials (section hidden while empty; reviews on Google aren't showing text yet), real logo (current one is a placeholder wordmark), OG/share image (1200×630), favicons from the real logo, final brand colors in `tokens.css`.
- **Unused:** `images.space` entries in `site.ts` aren't shown anywhere (studio photos go in the gallery instead). Remove or use them.
- **Reviews by Andréa:** her new service descriptions contain health/growth claims that clash with the no-health-promises rule (ozonoterapia "redução da caspa e de dermatites", alta frequência "bactericidas, fungicidas e cicatrizantes", laser "crescimento… de novos fios", LED "reduz a queda de cabelo", argiloterapia "auxiliam no crescimento") — decide whether to soften; remaining Claude-written descriptions (terapia personalizada, microagulhamento, drug delivery, other Beleza items); the condensed About text; the privacy policy (and set a real "last updated" date).
- **Photo consent:** confirm every client shown in the gallery agreed to appear on the site.

## Launch checklist (in order)

1. All TODOs above resolved (search `TODO` in `src/`).
2. ~~Map decision made and privacy policy matches it.~~ Done 2026-10-19.
3. Deploy to Netlify and test on the preview URL:
   - submit one test questionnaire and check `?ficha=1` survives the redirect (if not, the generic thank-you text shows, which is fine);
   - the embedded map loads;
   - all scripts work under the CSP (mobile menu, gallery, form validation);
   - PageSpeed Insights mobile 90+.
4. In Netlify: form notifications **only to Andréa's email** (questionnaire has health data); plan to delete old submissions regularly.
5. Connect the domain `studiodebydecalaporte.com.br` (apex as primary, www redirects to it).
6. Set `launched: true` in `site.ts`, redeploy, check the live `robots.txt` and the home page robots meta.
7. Google Search Console: verify the domain, submit `sitemap-index.xml`, request indexing of the home page.
8. Only now: add the website link to her Google Business Profile, Instagram bio and WhatsApp Business profile.
9. Take "after" screenshots for the case study (compare with the "before" folder).