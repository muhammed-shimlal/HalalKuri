# Palette's Journal - UX & Accessibility Insights

## 2025-05-20 - Icon-Only Buttons Require Descriptive ARIA Labels
**Learning:** Icon-only action buttons (e.g., edit, delete, mobile drawer triggers) rendered in tables or card grids lack text content, causing screen readers to announce them as unlabelled "button".
**Action:** Always provide explicit, context-rich `aria-label` attributes (including dynamic entity names like `aria-label={`Edit ${member.full_name}`}`) on icon-only `<Button size="icon">` components.
