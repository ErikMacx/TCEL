// Shared site constants and integration placeholders.
// Each placeholder below is wired through the components so there is a single
// place to update once the real accounts exist.

export const SITE_NAME = 'TCEL';
export const SITE_SUB = 'The Consultancy Execution Leader';

export const CAL_URL = 'https://cal.eu/eric-mclean-ulhmrt';

export const CONTACT_EMAIL = 'eric@tcel.com';

// TODO(contact): confirm current phone. Source carries the Cyprus number.
export const PHONE_DISPLAY = '+357 99 920 089';
export const PHONE_HREF = 'tel:+35799920089';

// Newsletter signup hands off to the beehiiv hosted subscribe page (free plan).
// Goes live once the beehiiv publication is launched. Verify the path returns 200.
export const NEWSLETTER_ACTION = 'https://erics-newsletter-7ef56a.beehiiv.com/subscribe';

// TODO(turnstile): paste the Cloudflare Turnstile public site key for the
// /ai/diagnostic form. While empty, the form runs without the bot widget and the
// diagnostic function skips verification (unless TURNSTILE_SECRET is set server-side).
export const TURNSTILE_SITE_KEY = '';
