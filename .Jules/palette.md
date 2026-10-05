# Palette's UX & Accessibility Journal

## 2025-05-10 - Icon-Only Button ARIA Labels
**Learning:** Icon-only action buttons in tabular and layout headers (like edit, delete, mobile menu, mobile logout) lacked accessible names, making them inaccessible to screen reader users.
**Action:** Always provide explicit `aria-label`s with dynamic context (e.g. `aria-label={`Edit ${member.full_name}`}`) for icon-only action buttons in tables and headers.
