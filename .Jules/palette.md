# Palette's UX Journal

## 2025-05-18 - Accessible Names and Tooltips on Action Buttons
**Learning:** In table row actions and header controls that use Radix/shadcn `size="icon"` Button components with Lucide icons, screen readers cannot announce the action purpose without an explicit `aria-label`, and desktop mouse users lack context without a hover `title`. Including both `aria-label` with entity context (e.g., `aria-label={"Delete " + doc.title}`) and `title` maintains visual minimalism while ensuring full accessibility and immediate micro-guidance.
**Action:** When using icon-only action buttons in tables or navigational headers, always add dynamic or descriptive `aria-label` and `title` attributes.
