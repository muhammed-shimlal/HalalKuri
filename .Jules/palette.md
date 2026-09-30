## 2025-05-18 - Accessible Icon-Only Buttons
**Learning:** Icon-only buttons used in data tables (edit/delete actions) and mobile header controls lack discernible text for screen readers if `aria-label` is not explicitly provided.
**Action:** Always provide descriptive `aria-label` props (including entity context like `aria-label={`Edit ${member.full_name}`}`) when rendering `Button` components with `size="icon"` or containing only SVG icons.
