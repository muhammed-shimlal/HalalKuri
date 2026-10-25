## 2025-10-25 - Contextual ARIA Labels for Table & Mobile Action Buttons
**Learning:** Icon-only action buttons in data tables (e.g. edit, delete) and mobile headers (menu toggle, log out) lack accessible names by default when using icon components without text. Generic labels like "Delete" on every row can confuse screen reader users who need context on which item is being acted upon.
**Action:** Always provide specific contextual ARIA labels (e.g. `aria-label={`Delete ${member.full_name}`}`) for table row actions, and clear descriptive labels for mobile header controls.
