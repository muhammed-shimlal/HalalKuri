# Palette UX & Accessibility Journal

## 2025-05-18 - Screen Reader Guidance in Mobile Bottom Navigation Bar
**Learning:** Mobile bottom navigation bars without `aria-label` or `aria-current="page"` make screen reader navigation ambiguous as users cannot tell which route is currently active.
**Action:** Always provide `aria-label="Mobile Navigation"` on mobile `<nav>` elements and dynamic `aria-current={isActive ? 'page' : undefined}` on active route links.
