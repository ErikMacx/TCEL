# TCEL fortnightly newsletter

A short letter for busy SME and family-business CEOs: **one idea to chew on**, not
a news roundup or a to-do list. Voice and standards match the website (we/Eric,
no em dashes, answer-first, plain and senior).

## The format

- **One idea only.** A single significant development, framed as a strategic idea
  for a group CEO. ~300 words in the body.
- **Structure:** a sharp subject line, the idea stated up front, the two or three
  ways to read it, the TCEL line on what to actually do, then one question to sit
  with. Signed "Eric McLean, TCEL", and a soft "book a conversation" footer.
- **Idea source:** [GrabStack](https://www.grabstack.com) (Eric's curated
  AI-intelligence site). Each fortnight, pick the single item from The Wire or
  Landscape that is most decision-relevant for an SME owner or family group, not
  for a technologist. Favour: does AI improve my margins, what happens to my team,
  where does AI genuinely create advantage.
- **Cadence:** every two weeks, Tuesday mornings.

## How it runs

The website deploys from GitHub to Cloudflare Pages. The newsletter list, template
and sending live in **beehiiv** (chosen for the generous free tier and editorial
templates). beehiiv's API is read-only for posts, so issues are not pushed by API.
The flow is:

1. A fortnightly Claude Code routine reads GrabStack, picks the item, and drafts
   the issue into `issues/YYYY-MM-DD-slug.md`, then notifies Eric.
2. **Eric approves.** He pastes the issue into a beehiiv draft (saved template),
   reviews, and hits Send. Approval and send stay human and inside beehiiv.

The automation needs no beehiiv credentials. Outstanding setup (Eric): create the
beehiiv publication and template, and provide the embed snippet so the site signup
form (currently `#` on the Insights hub) points to beehiiv.

## Issues

Each issue is one markdown file in `issues/`, kept as the archive of what was sent.
