import type { APIRoute } from "astro";
import site from "../config/site";
import { backgroundColor, themeColor } from "../lib/theme";

const manifest = {
  name: site.business.name,
  short_name: site.business.shortName,
  start_url: "/",
  display: "standalone",
  background_color: backgroundColor,
  theme_color: themeColor,
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json" },
  });
