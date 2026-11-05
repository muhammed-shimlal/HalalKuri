# Palette's Journal - Critical UX Learnings

## 2025-05-18 - Missing ARIA Labels on Mobile Header Icon Buttons
**Learning:** In responsive layouts across the application (like `AdminLayout` and `MemberLayout`), mobile header navigation triggers and logout action buttons use icon-only `Button size="icon"` elements. While `PublicLayout` provided `<span className="sr-only">Toggle menu</span>`, `AdminLayout` and `MemberLayout` lacked `aria-label` or screen-reader text, creating accessibility barriers on mobile devices.
**Action:** When adding or updating `Button size="icon"` buttons, always supply an explicit `aria-label` and `<span className="sr-only">...</span>` label as well as a `title` tooltip where applicable to guarantee full screen-reader and keyboard accessibility.
