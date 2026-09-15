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

/*
  Reading time is derived from the text, never stored in frontmatter -- a number
  an author has to remember to update is a number that goes stale the first time
  a paragraph is cut.

  200 wpm is the usual desk-reading figure. It is deliberately a round guess:
  the point is to tell a reader "a coffee" from "a sitting", not to be accurate
  to the minute.
*/
const WORDS_PER_MINUTE = 200;

/*
  `post.body` is raw markdown, so the syntax has to come out before counting or
  every heading hash and list bullet inflates the total. Fenced code is dropped
  whole: it is read, not skimmed, and counting its tokens as words would badly
  overstate a post that happens to include a long listing.
*/
function plainText(markdown: string): string {
  return markdown
    .replace(/^---\n[\s\S]*?\n---/, '')       // stray frontmatter
    .replace(/```[\s\S]*?```/g, ' ')          // fenced code
    .replace(/`[^`]*`/g, ' ')                 // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')    // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')  // links, keeping the text
    .replace(/<[^>]+>/g, ' ')                 // inline html
    .replace(/^[>#\-*+\d.\s]+/gm, ' ')        // heading, quote and list markers
    .replace(/[*_~]/g, ' ');                  // emphasis
}

export interface ReadingStats {
  words: number;
  minutes: number;
}

/** Word count and reading estimate for a post, computed at build time. */
export function readingStats(post: Post): ReadingStats {
  const words = plainText(post.body ?? '')
    .split(/\s+/)
    .filter(Boolean).length;

  /* Never round to zero -- "0 min read" on a real post reads as a bug. */
  return { words, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
}
