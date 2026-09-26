## 2025-05-18 - Accessibility for Icon-Only Buttons
**Learning:** Icon-only buttons used in layout headers (menu, logout) and admin data tables (edit, delete) lacked `aria-label` attributes, rendering them unannounced or ambiguously announced by screen readers.
**Action:** Always inspect icon-only `<Button size="icon">` elements across layouts and data tables to ensure they include contextual `aria-label` attributes (e.g., `Edit ${item.name}`, `Delete ${item.name}`, `Open navigation menu`).
