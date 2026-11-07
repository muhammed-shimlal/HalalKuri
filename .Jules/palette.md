# Palette's Journal

## 2026-07-18 - Mobile Navigation Icon-Only Buttons
**Learning:** Mobile headers often rely on compact icon buttons (e.g. Menu and LogOut triggers in `AdminLayout` and `MemberLayout`) which lacked `aria-label` and `sr-only` descriptive text, unlike `PublicLayout`. Icon-only buttons must consistently provide both an `aria-label` attribute and a `<span className="sr-only">` element so screen reader users receive clear, context-appropriate feedback.
**Action:** When adding or auditing layout header navigation controls, always verify that icon-only buttons include descriptive `aria-label` and inner `sr-only` text.
