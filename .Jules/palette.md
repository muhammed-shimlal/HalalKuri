# Palette's Journal - UX & Accessibility Learnings

## 2025-10-30 - Accessible Icon Buttons in Layout Headers
**Learning:** Mobile top navigation bars and layout headers in this application heavily rely on icon-only buttons (such as mobile menu toggle and logout icons). Without explicit `aria-label` and `title` attributes, screen readers read these buttons without context, and mouse/touch users lack tooltip guidance.
**Action:** Always provide explicit `aria-label` and `title` attributes to icon-only `<Button>` instances across layout and header components.
