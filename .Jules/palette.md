# Palette UX Journal

## 2025-10-26 - Screen Reader Accessibility for Icon-Only Buttons
**Learning:** Using both `aria-label` and `<span className="sr-only">` on the same button causes screen readers (VoiceOver, NVDA) to announce the label twice.
**Action:** Use `aria-label` directly on the `<button>` element for icon-only controls, and avoid duplicate `<span className="sr-only">` elements within the same button.
