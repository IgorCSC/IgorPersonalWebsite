import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * The blog. One markdown file per post in `src/content/blog/`; the file name
 * is the slug, so `hello-world.md` is served at `/blog/hello-world`.
 *
 * `lang` is part of the schema rather than inferred because the design prints
 * it next to every date -- the frame's meta line reads `October, 2025. [EN]`.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        date: z.coerce.date(),
        lang: z.enum(['EN', 'PTBR']),
        /* Only the three most recent posts show their cover, but any post may carry one. */
        cover: image().optional(),
        coverAlt: z.string().optional(),
        description: z.string().optional(),
        draft: z.boolean().default(false),
      })
      /*
        A cover with no alt text is an accessibility bug that is invisible until
        someone hits it with a screen reader. Failing the build is cheaper.
      */
      .refine((data) => !data.cover || (data.coverAlt && data.coverAlt.length > 0), {
        message: 'coverAlt is required whenever cover is set',
        path: ['coverAlt'],
      }),
});

export const collections = { blog };
