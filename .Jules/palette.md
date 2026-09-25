# Palette UX & Accessibility Journal

## 2025-05-20 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Several icon-only buttons in layout headers (e.g., mobile hamburger menus, mobile logout) and table row actions (e.g., Edit, Delete) lacked accessible text names, making them unannounced or unclear for screen reader users.
**Action:** Always provide explicit `aria-label` attributes to icon-only `<Button size="icon">` components, incorporating dynamic resource names (e.g., `aria-label={`Delete ${member.full_name}`}`) where appropriate.
