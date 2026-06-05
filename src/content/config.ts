import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Insights briefs. Each is an answer-first piece titled as a real question.
// Seeded entries are draft: true placeholders that demonstrate the structure;
// Eric replaces them with signed-off content. Drafts are hidden in production.
const briefs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/briefs' }),
  schema: z.object({
    title: z.string(),            // the question
    dek: z.string(),              // the answer-first summary
    theme: z.enum(['Strategy', 'AI', 'Leadership', 'SME', 'Gulf']),
    date: z.coerce.date(),
    readingTime: z.string(),      // e.g. "6 min"
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),    // the single featured brief on the hub
    comingSoon: z.boolean().default(false),  // dimmed "in progress" card
  }),
});

export const collections = { briefs };
