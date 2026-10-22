# Palette's Journal - UX & Accessibility Insights

## 2025-05-15 - Icon-only buttons and Navigation accessibility
**Learning:** Icon-only navigation and table action buttons in React layout/table components need explicit `aria-label` attributes and active routes require `aria-current="page"` for screen readers to convey context properly.
**Action:** Always include `aria-label` on icon-only `<Button>` triggers and `aria-current={isActive ? 'page' : undefined}` on active route `<Link>` elements.
