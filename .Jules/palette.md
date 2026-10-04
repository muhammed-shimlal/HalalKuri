## 2025-10-04 - ARIA Labels on Table Action Icon Buttons
**Learning:** Icon-only buttons in table action cells (like edit and delete icons) lack contextual labels for screen readers unless explicitly given descriptive labels containing item identifiers.
**Action:** Always provide dynamic `aria-label={`Edit ${item.name}`}` or `aria-label={`Delete ${item.name}`}` on table icon action buttons.
