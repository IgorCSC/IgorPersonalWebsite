# Igor's Personal Website

My new personal website, with statements, blog-posts, cv, projects and misc content.

Built with [Astro](https://astro.build) (static output) and Tailwind v4. No client-side
JavaScript ships.

## Development

```sh
npm install
npm run dev      # local dev server
npm run check    # type + template diagnostics
npm run build    # static output to dist/
npm run preview  # serve the built output
```

## Design

The landing page is implemented from two Figma frames, `Landing_computer` and
`Landing_Mobile_prototype`. Its colours, type scale, and measures live as tokens in
`src/styles/global.css` under `@theme` — type and spacing are the desktop frame's
values scaled 1.2x for on-screen readability.

The phone frame is the same page under responsive rules, not a separate layout: the
wordmark breaks to two lines, the nav becomes two rows of three, and the portrait is
cropped to a landscape box above the prose.

Components should not hardcode design values; add a token instead, so the sections
still to be built stay consistent without re-deriving the design.

## License

The MIT License in this repository applies to the site's source code:
templates, stylesheets, scripts, and configuration.

Written content and images (everything under /content and /assets/img)
is © 2026 Igor de Camargo e Souza Câmara, all rights reserved.
