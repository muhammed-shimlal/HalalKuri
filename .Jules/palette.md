# Palette's UX & Accessibility Journal

## 2025-05-14 - Accessible Password Visibility Toggles
**Learning:** Password inputs in authentication forms benefit significantly from visibility toggles, especially on mobile or constrained input environments, but need specific accessibility attributes (`type="button"`, dynamic `aria-label`, `aria-pressed`, and `pr-10` padding on the input) so screen readers convey state accurately and text does not overlap the icon.
**Action:** When implementing password fields, always wrap the input in a relative container with right padding (`pr-10`), use an icon button with explicit `type="button"`, dynamic `aria-label` describing the action ("Show password" / "Hide password"), `aria-pressed`, and clear `focus-visible` styling.
