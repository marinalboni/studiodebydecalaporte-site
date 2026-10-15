import type { APIRoute } from "astro";
import site from "../config/site";

const sitemapUrl = new URL("/sitemap-index.xml", site.siteUrl).toString();

// Before launch, block all crawling and don't advertise the sitemap.
const body = site.launched
  ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
  : `User-agent: *\nDisallow: /\n`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
