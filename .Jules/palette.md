# Palette's Journal - Critical Learnings

## 2026-11-03 - Accessible Mobile Navigation and Header Action Buttons
**Learning:** Responsive layouts (`MemberLayout` and `AdminLayout`) condense sidebar navigation and actions into icon-only buttons (`Menu`, `LogOut`) in mobile headers. Without explicit `aria-label` and `title` attributes on these icon-only `<Button size="icon">` elements, screen reader and assistive technology users receive no contextual clue about the button's action.
**Action:** When adding or auditing layout headers and toolbar buttons with `size="icon"`, always verify that descriptive `aria-label` and `title` props are supplied on the `<Button>` component or that an inner `<span className="sr-only">` element is present.
