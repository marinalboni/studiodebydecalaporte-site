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
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/obrigado"),
    }),
  ],
});
