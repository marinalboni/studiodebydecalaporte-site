// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
// The domain lives only in site.ts — canonical URLs, the sitemap, robots.txt
// and JSON-LD all derive from it, so a new client never edits this file.
import site from "./src/config/site";

// https://astro.build/config
export default defineConfig({
  site: site.siteUrl,
  output: "static",
  trailingSlash: "never",
  build: {
    // Emit /minha-historia.html instead of /minha-historia/index.html: Netlify
    // 301s folder URLs to their trailing-slash form, which would make every
    // slash-less canonical and sitemap URL point at a redirect.
    format: "file",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/obrigado") && !page.includes("/ficha-de-anamnese"),
    }),
  ],
  vite: {
    build: {
      // Astro inlines small <script>s into the HTML by default, but the CSP
      // in netlify.toml only allows script-src 'self' — so every script must
      // ship as an external /_astro/*.js file.
      assetsInlineLimit: 0,
    },
  },
});
