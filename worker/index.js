// Worker entry for the TCEL site. The site is static (Astro build in dist/),
// served by the ASSETS binding; this Worker only adds the one server route,
// POST /api/diagnostic, reusing the handler in functions/api/diagnostic.js.
//
// With both `assets` and `main` configured, Cloudflare serves a matching static
// asset first and only invokes this Worker when no asset matches (so every page
// is served straight from dist/). We handle /api/diagnostic and fall back to the
// assets binding for anything else, preserving the static site's behaviour.
import { onRequestPost } from "../functions/api/diagnostic.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/diagnostic") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { allow: "POST" },
        });
      }
      return onRequestPost({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
