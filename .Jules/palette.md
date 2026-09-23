# Palette's Journal - Critical Learnings

## 2025-05-18 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Icon-only buttons used for navigation toggles and table actions (Edit, Delete) in UI components often omit `aria-label` or descriptive accessible text, rendering them unannounced or confusing to screen reader users.
**Action:** Always provide explicit, context-aware `aria-label` attributes for icon-only `<Button size="icon">` elements (e.g. `aria-label={`Edit ${member.full_name}`}`).
