export interface NavItem {
  href: string;
  label: string;
}

/**
 * Single source of truth for the six nav items in the design.
 * Adding a real page later is a one-line change here; `aria-current`
 * resolution in SiteNav.astro follows automatically.
 */
export const navItems: NavItem[] = [
  { href: '/', label: 'home' },
  { href: '/blog', label: 'blog' },
  { href: '/photos', label: 'photos' },
  { href: '/cv', label: 'cv' },
  { href: '/projects', label: 'projects' },
  { href: '/lists', label: 'lists' },
];
