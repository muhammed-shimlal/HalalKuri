## 2025-05-18 - Explicit Accessible Labels for Action Icons & Static Component Scope
**Learning:** Icon-only action buttons in tables and mobile headers require context-aware `aria-label` attributes (e.g., `Edit ${member.full_name}`) for screen reader navigation clarity. Declaring sub-components inside render functions causes component re-creations on every state update.
**Action:** Always provide descriptive `aria-label` props on icon-only `<Button size="icon">` components and extract sub-components outside the parent component's render scope.
