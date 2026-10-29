## 2025-05-18 - Contextual ARIA labels for icon-only table action buttons
**Learning:** Icon-only action buttons in data tables and grid cards (such as edit and delete buttons) need contextual screen reader labels containing the item's name or title (e.g. `Edit John Doe` or `Delete Terms.pdf`) rather than generic labels like `Edit` or `Delete`. Generic labels cause screen reader users navigating by buttons to hear repeated non-distinct options.
**Action:** Always construct dynamic `aria-label`s on icon-only table action buttons using item entity properties.
