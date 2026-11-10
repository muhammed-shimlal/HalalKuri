# Palette UX Journal

## 2025-05-18 - Accessible Names for Mobile Navigation & Header Icon Buttons
**Learning:** Mobile layout headers frequently use icon-only `<Button size="icon">` triggers (such as hamburger menu Sheet triggers or quick logout buttons). Without explicit `aria-label` attributes or accessible text, assistive technologies announce them generically as empty buttons, impairing screen reader navigation.
**Action:** Always provide an explicit `aria-label` (e.g. `aria-label="Open navigation menu"` or `aria-label="Log out"`) on all icon-only buttons in mobile layout headers and drawers.
