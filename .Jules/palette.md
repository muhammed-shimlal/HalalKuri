## 2025-05-18 - Accessible Icon Buttons in Data Tables
**Learning:** Icon-only buttons inside data table rows (such as Edit or Delete) lack accessible text for screen readers and visual tooltips for keyboard/mouse users when rendered without `aria-label` and `title` attributes. Including the item name (e.g. `aria-label={`Edit ${member.full_name}`}`) ensures clear context for screen reader users and avoids ambiguity when multiple rows exist.
**Action:** Always provide contextual `aria-label` and `title` attributes for icon-only table action buttons.
