// functions/api/diagnostic.js  ->  POST /api/diagnostic
//
// The public, free AI-feasibility taster behind /ai/diagnostic. One cheap model
// call on a fast model; a qualitative first read, never specific figures. The
// full pipeline (scoring, cost model, staffing, roadmap) stays private.
//
// Secrets (set in the Cloudflare Pages project, never in the repo):
//   ANTHROPIC_API_KEY  (required)  the Anthropic API key
//   TURNSTILE_SECRET   (optional)  Cloudflare Turnstile secret; enables bot check
// Bindings (optional):
//   RL                 a KV namespace, for the per-IP daily cap

const MODEL = "claude-haiku-4-5-20251001"; // cheap and fast: right for a free taster
const DAILY_CAP = 5; // diagnostics per IP per day when the RL KV namespace is bound

// System prompt, verbatim from the taster spec (section 2). No em dashes.
const SYSTEM_PROMPT = `You are the senior adviser behind TCEL's free AI-feasibility diagnostic. A small or mid-sized business owner has filled in a short form. Give them a brief, honest first read on where AI agents are likely to help, written as TCEL would write it: direct, senior, plain, and never salesy.

Use only what they told you. Do not invent facts about their business, and do not give specific savings figures, costs, percentages, or timelines: this is a first read, not a full diagnosis, and a real estimate needs their actual volumes and costs. If you are tempted to quote a number, describe scale qualitatively instead (for example, "likely material" or "probably worth a closer look").

Structure the reply in four short parts, using these headings:
- **Where the opportunities likely sit.** Three or four areas, each one sentence: the area, why it is a candidate, and the likely actor (almost always a human-in-the-loop agent, where the agent does the bulk and a person approves).
- **Fix this first.** If their answers suggest a broken process (for example systems that do not talk, or work arriving in a form no agent can read), name it, and say it should be sorted before automating. If nothing stands out, say the foundations look workable.
- **Where AI will not help you.** One or two honest lines: judgement calls, key relationships, and physical work stay with people.
- **A sensible first step.** Point to the safest kind of pilot for them (high-volume, internal, reversible, measurable), and invite them to run the full diagnostic or talk to us.

Keep the whole reply under 250 words. Use British English. Do not use em dashes; use commas, colons, and full stops. Be encouraging but never overpromise.`;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

const clip = (s, n) => (typeof s === "string" ? s.slice(0, n) : "");

function intakeToText(d) {
  return [
    `Sector: ${clip(d.sector, 60)}`,
    `Headcount: ${clip(d.headcount, 30)}`,
    `Heaviest work: ${(Array.isArray(d.heaviest) ? d.heaviest : []).map((x) => clip(x, 40)).join(", ")}`,
    `Monthly volume: ${clip(d.volume, 30)}`,
    `Biggest time-sink: ${clip(d.timesink, 200)}`,
    `Systems talk to each other: ${clip(d.systems, 20)}`,
    `What would help most: ${clip(d.goal, 30)}`,
    `Anything else: ${clip(d.notes, 300)}`,
  ].join("\n");
}

// Cloudflare Turnstile server-side verification.
async function verifyTurnstile(secret, token, ip) {
  if (!token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const out = await res.json();
    return out.success === true;
  } catch {
    return false;
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json().catch(() => null);
    if (!data || !data.sector || !data.heaviest) {
      return json({ error: "Please complete the form and try again." }, 400);
    }

    const ip = request.headers.get("cf-connecting-ip") || "anon";

    // Bot protection: verify the Turnstile token when a secret is configured.
    if (env.TURNSTILE_SECRET) {
      const ok = await verifyTurnstile(env.TURNSTILE_SECRET, data.turnstileToken, ip);
      if (!ok) {
        return json({ error: "We could not verify that you are human. Please try again." }, 403);
      }
    }

    // Per-IP daily cap, so a single visitor cannot run up cost. Uses a KV
    // namespace bound as RL; if it is not bound, the cap is simply skipped.
    if (env.RL) {
      const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
      const key = `rl:${ip}:${day}`;
      const used = parseInt((await env.RL.get(key)) || "0", 10);
      if (used >= DAILY_CAP) {
        return json(
          { error: "You have reached today's free diagnostic limit. Please book a conversation, and we can go further." },
          429,
        );
      }
      // Reserve this run before the model call. Expires after 24h.
      await env.RL.put(key, String(used + 1), { expirationTtl: 60 * 60 * 24 });
    }

    // Misconfiguration is the most common cause of failure: say so plainly
    // rather than pretending the service is "busy".
    if (!env.ANTHROPIC_API_KEY) {
      console.error("diagnostic: ANTHROPIC_API_KEY is not set on the Worker");
      return json(
        { error: "The diagnostic is not switched on yet. Please book a conversation, and we will run it with you." },
        503,
      );
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 900,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: intakeToText(data) }],
      }),
    });

    if (!res.ok) {
      // Log the real upstream status and body to Workers Logs so failures are
      // diagnosable, and map the common cases to clearer copy for the visitor.
      const detail = await res.text().catch(() => "");
      console.error("diagnostic: Anthropic API error", res.status, detail.slice(0, 500));
      if (res.status === 401 || res.status === 403) {
        return json(
          { error: "The diagnostic is not configured correctly yet. Please book a conversation in the meantime." },
          502,
        );
      }
      if (res.status === 429 || res.status === 529) {
        return json({ error: "The diagnostic is busy right now. Please try again in a minute." }, 503);
      }
      return json({ error: "The diagnostic hit a snag. Please try again shortly." }, 502);
    }

    const out = await res.json();
    const text = (out.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    if (!text) return json({ error: "No result this time. Please try again." }, 502);
    return json({ sketch: text });
  } catch (e) {
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
}
