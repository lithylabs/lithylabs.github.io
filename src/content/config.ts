import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    readingTime: z.string().optional(),
    type: z.enum(['insight', 'journal']).optional(),
    journalNumber: z.number().int().positive().optional(),
    draft: z.boolean().optional(),
  }),
});

// One file per Frenemy Game. The body is the short description on /frenemy.
const frenemyColor = z.enum(['red', 'blue', 'gold', 'green', 'teal', 'purple']);

const frenemyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    game: z.number().int().positive(),
    title: z.string(),
    date: z.date(),
    // Same choices as the episode's thumbnail.
    colorA: frenemyColor,
    colorB: frenemyColor,
    face: z.enum(['neutral', 'aggressive', 'grudge', 'friendly', 'calculating', 'defensive', 'greedy']),
    // Mascot angle in degrees. Same on every screen for this game; vary it between games.
    tilt: z.number(),
    // Leave out until the game is played.
    result: z.enum(['me', 'ai']).optional(),
    youtubeId: z.string().optional(),
    replay: z.string().url().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'frenemy': frenemyCollection,
};
