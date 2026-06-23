// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

// Static output. Canonical host is www.tcel.com behind Cloudflare Pages.
export default defineConfig({
  site: 'https://www.tcel.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  adapter: cloudflare()
});