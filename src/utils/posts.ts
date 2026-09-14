import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/*
  `Intl` gives "September 2026"; the frame writes "September, 2026." with a comma
  and a full stop. Both the card meta line and the `past` list use this exact
  string, so it is built in one place rather than twice.
*/
const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** `September, 2026. [PTBR]` -- the meta line from frame `114:2`. */
export function formatPostMeta({ date, lang }: Post['data']): string {
  const [month, year] = monthYear.format(date).split(' ');
  return `${month}, ${year}. [${lang}]`;
}

/** Machine-readable counterpart for the `datetime` attribute. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
