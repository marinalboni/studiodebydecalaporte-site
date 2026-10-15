// =============================================================================
// FONTS — the only file to touch when changing a client's typefaces.
//
// 1. `npm install @fontsource/<family>` for each new family.
// 2. Replace the CSS imports below with just the weights the design uses.
// 3. Point the `?url` imports at the Latin .woff2 files that render above the
//    fold (usually the heading weight + the regular body weight) — those are
//    preloaded in <head> by BaseLayout.astro.
// 4. Update --font-heading / --font-body in tokens.css to the new family names.
// =============================================================================

import "@fontsource/outfit/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";

import outfitHeading from "@fontsource/outfit/files/outfit-latin-600-normal.woff2?url";
import interBody from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";

/** woff2 URLs to <link rel="preload"> on every page. */
export const fontPreloads: string[] = [outfitHeading, interBody];
