# Palette UX & Accessibility Journal

## 2025-05-18 - Accessibility for Icon-Only Buttons in Dashboards and Data Tables
**Learning:** Icon-only action buttons (such as mobile header controls and table row actions like Edit/Delete) lack accessible text for screen reader users when rendered without explicit `aria-label` or visually hidden text.
**Action:** Always provide explicit `aria-label` attributes to icon-only `<Button size="icon">` components. For table row actions, include contextual target information in the label (e.g. `aria-label={`Edit ${member.full_name}`}`) to distinguish actions across multiple rows.
